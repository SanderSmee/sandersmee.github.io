---
layout: post
title:  "Reduce the code to noise ratio of maven POMs"
category: programming
tags: [maven, yaml]
# date: 2018-10-29
---

I really like maven for the structured way it provides for defining and building a project.
But sometimes I wish for a less verbose notation than the XML of the Project Object Model (POM).
For example, gradles dependency notation is far shorter than mavens dependency declaration.

Looking for a less verbose way to declare a maven POM, I found [polyglot maven][polyglot].
It allows one to write a maven POM in another dialect than XML.
Since you see YAML more and more I decided to try that dialect, and see if my maven descriptor would be clearer.

The minimum version of maven this works on, is maven 3.3.1. Since that version it's possible to provide per project configuration. or extension of maven.

1. Create a directory to work in, `{projectdir}`.

1.  Create a maven base project:
    ```shell
    mvn archetype:generate
        -DgroupId={project-packaging}
        -DartifactId={project-name}
        -DarchetypeArtifactId={maven-template}
        -DinteractiveMode=false
    ```

1.  Create a file `{projectdir}/.mvn/extensions.xml`:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <extensions>
        <extension>
            <groupId>io.takari.polyglot</groupId>
            <artifactId>polyglot-yaml</artifactId>
            <version>0.3.1</version>
        </extension>
    </extensions>
    ```

1.  Convert the `pom.xml` from the created project to YAML:
    ```shell
    mvn io.takari.polyglot:polyglot-translate-plugin:translate \
    -Dinput=pom.xml -Doutput=pom.yaml
    ```

[polyglot]: https://github.com/takari/polyglot-maven
