---
title:  "Loading DBUnit data in a Spring TestExecutionListener"
categories:
  - Programming
tags:
  - spring
  - dbunit
date: 2015-01-01
published: false
---
You can use Spring `TestExecutionListener` to load DBUnit data per test class.

[Lieven Doclo][doclo] and [Dan Haywood][haywood] have shown how to make it easier to use DBUnit to load data in unittests. Their solutions uses a junit `@Rule`, which - by the mechanics of JUnit - is executed before each testmethod in a testclass. There's also [the project Spring test DBUnit][springtestdbunit] executes loading data per testcase.

Our requirement was loading a dataset before each testclass, as we're using springs `AbstractSpringTransactionalJUnit4Test`.

```java
/**
 * A TestExecutionListener which enables per-testclass data set loading using DbUnit. This listener is meant to be
 * used in a Spring context, requesting a DataSource from the testclass. Therefore the testclass must implement the
 * DataSourceProvider interface.
 *
 * This rule supports Spring-style resource urls (classpath:/..., file:/...) and is capable of handling
 * multiple CSV and Flat XML DbUnit data set files (auto-detected by extension).
 * The data sets are automatically reordered so that foreign keys are resolved correctly when loading
 * the data set.
 *
 * @see DataSourceProvider
 *
 * @author Lieven DOCLO
 * @author Dan HAYWOOD
 * @author Sander SMEMAN
 */
@Component
public class DBUnitLoaderTestExecutionListener extends AbstractTestExecutionListener {
    private DataSource dataSource;
    private ResourceLoader resourceLoader;
    private IDatabaseTester databaseTester;

    private Class<?> currentClass = null;

    @Override
    public void afterTestClass(final TestContext testContext) throws Exception {
        if (databaseTester != null) {
            databaseTester.onTearDown();
        }
    }

    @Override
    public void prepareTestInstance(final TestContext testContext) throws Exception {
        if (!testContext.getTestClass().equals(currentClass)) {
            Object testInstance = testContext.getTestInstance();

            if (testInstance instanceof DataSourceProvider) {
                dataSource = ((DataSourceProvider) testInstance).getDataSource();
            }
            resourceLoader = testContext.getApplicationContext();

            try {
                Data data = testContext.getTestClass().getAnnotation(Data.class);
                if (data != null) {
                    databaseTester = new DataSourceDatabaseTester(dataSource);
                    databaseTester.setSetUpOperation(DatabaseOperation.CLEAN_INSERT);

                    FlatXmlDataSetBuilder builder = new FlatXmlDataSetBuilder();
                    builder.setColumnSensing(true);

                    String[] dataSetFiles = data.resources();
                    List<IDataSet> dataSets = new ArrayList<IDataSet>(dataSetFiles.length);
                    for (String dataSetFile : dataSetFiles) {
                        IDataSet ds;
                        if (dataSetFile.endsWith(".xml")) {
                            ds = builder.build(resourceLoader.getResource(dataSetFile).getInputStream());
                        } else if (dataSetFile.endsWith(".csv")) {
                            ds = new CsvDataSet(resourceLoader.getResource(dataSetFile).getFile());
                        } else {
                            throw new IllegalStateException(
                                    "DbUnitRule only supports JSON, CSV or Flat XML data sets for the moment");
                        }
                        dataSets.add(ds);
                    }
                    CompositeDataSet dataSet = new CompositeDataSet(dataSets.toArray(new IDataSet[dataSets.size()]));

                    ReplacementDataSet filteredDataSet = new ReplacementDataSet(dataSet);
                    filteredDataSet.addReplacementObject("[NULL]", null);

                    databaseTester.setDataSet(filteredDataSet);
                    databaseTester.onSetup();
                }
            } finally {
                currentClass = testContext.getTestClass();
            }
        }
    }
}
```

This requires the testclass to implement the DataSourceProvider interface.

Note that if you're using `AbstractSpringTransactionalJUnit4Test` that that class gets a `DataSource` injected, but it is not an attribute of that class. You have to override the `void setDataSource(DataSource ds)` method and keep a reference to the provided datasource.

```java
public interface DataSourceProvider {
    DataSource getDataSource();
}
```


[doclo]: http://www.insaneprogramming.be/blog/2011/11/22/having-fun-json-dbunit-continued/ "Having Fun With JSON and DbUnit, Continued"
[haywood]: http://danhaywood.com/2011/12/20/db-unit-testing-with-dbunit-json-hsqldb-and-junit-rules/ "DB unit testing with dbUnit, JSON, HSQLDB and JUnit Rules"
[springtestdbunit]: https://springtestdbunit.github.io/spring-test-dbunit/ "Spring Test DBUnit"
