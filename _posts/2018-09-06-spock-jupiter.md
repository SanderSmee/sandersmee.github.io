---
layout: post
title:  "Combining Spock 1.2 and Junit 5 tests"
categories: programming
tags: [junit, spock, gradle]
date: 2018-09-06
last_modified_at: 2018-10-01
---

Great projects keep moving forward. [JUnit5][1] is available since september 2017 and [Spock][2] 1.2 was completed in september 2018.
Since Spock is based on junit4, I wondered what it would take to use Spock 1.2 together with JUnit5.

As it turns out, it's quite easy to make that happen. JUnit5 comes with a _vintage_ engine to run junit4 based tests. If that is available on the test classpath, your Spock tests run like on junit4.

The following example is based on gradle, and is the minimum for getting started in gradle. It declares the dependencies and instructs gradle to use the JUnit5 `JUnitPlatform` to execute the tests.

I have a [sample repository][repo] that includes a maven `pom.xml`. The repository also includes a JUnit5 test, to prove that a combination of JUnit5 and Spock tests can exist in the same project.

```groovy
plugins {
  id 'java'
  id 'groovy'
}

repositories {
  mavenCentral()
}

sourceCompatibility = 1.8

dependencies {
  testCompile "org.spockframework:spock-core:1.2-groovy-2.5"
  implementation "org.junit.jupiter:junit-jupiter-api:5.3.0"
  testRuntimeOnly "org.junit.vintage:junit-vintage-engine:5.3.0"
}

test {
  useJUnitPlatform()
}
```

> Written with Spock 1.2, JUnit 5.3.0, and Gradle 4.10

> 2018-10-01: Update for Spock 1.2 release

[1]: https://junit.org/junit5/
[2]: http://spockframework.org
[repo]: http://github.com/sandersmee/spock-jupiter
