---
layout: post
title:  "Asciidoc labels like swagger-ui"
categories: documentation
tags: [asciidoc, swagger-ui]
---

If you're building a rest api with spring-boot and want to document the api, you have two good options to do this; [Springfox][1], or [Spring REST Docs][2]. Springfox creates (interactive) documentation through a swagger-ui to use by a developer, Spring REST Docs creates documentation via asciidoc. And what's best is that you can simply combine the two in a project.

I wanted to create some connection or similarity between the swagger-ui and asciidoc documentation. I came across a [blogpost by mrhaki][3] that inspired me to extend the snippets in his example.

Using the following snippets, it's possible to label HTTP verbs in the Spring REST Docs in the same colors as in the swagger-ui.

```text
= Attributes with HTTP labels
// Include contents of docinfo.html in HTML head with CSS style definitions
:docinfo1:

// Document attributes with styling
:http-get: pass:quotes[[.http.get]#GET#]
:http-post: pass:quotes[[.http.post]#POST#]
:http-put: pass:quotes[[.http.put]#PUT#]
// More can be added for the other HTTP verbs

== Sample section

=== {http-get} Request
=== {http-post} Create resource
=== {http-put} Modify resource
```

Below is the `docinfo.html` with the CSS style definitions. It contains colors for all verbs, corresponding to the default swagger-ui colors.
```html
<style>
.http {
    color: #fff;
    background-color: beige;
    padding: .1em .6em;
    font-size: .75em;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: .25em;
}

.http.get  {background-color: #61affe;}
.http.post {background-color: #49cc90;}
.http.put  {background-color: #fca130;}
.http.delete {background-color: #f93e3e;}
.http.head {background-color: #9012fe;}
.http.options {background-color: #0d5aa7;}
.http.patch {background-color: #50e3c2;}
</style>
```

This gives the following result in the Spring REST Docs output.

![Asciidoc with httplabels][img]


> Written with Asciidoc 1.5.6

[1]: http://springfox.github.io/springfox/
[2]: https://spring.io/projects/spring-restdocs
[3]: http://mrhaki.blogspot.com/2018/09/awesome-asciidoctor-document-attributes.html
[img]: {{ site.baseurl }}{% link assets/img/posts/asciidoc-httplabels.png %}
