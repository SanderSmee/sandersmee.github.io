---
layout: post
title:  "Plantuml labels like swagger-ui"
categories: documentation
tags: [plantuml, asciidoc, swagger-ui]
---

It's great to have [Asciidoc labels like swagger-ui][2] in the documentation, but would it be possible to extend this even further? In asciidoc documentation I also use [Plantuml][1] diagrams, e.g. to illustrate the sequence of interaction between microservices.
Is it possible to label those interactions like swagger-ui, just as I now can in asciidoc?

In Plantuml it's possible to declare macros. I created a reusable macro for a message in a sequence diagram, that has a note next to it. By giving the note a stereotype it can have custom styling in the diagram, and can look like a label.

```text
@startuml
!definelong Request(verb, msg, desc)
msg : desc
rnote <<verb>><<HTTP>> left color
""verb""
end note
!enddefinelong

!define GET(msg, desc) Request(" GET ", msg, desc)
!define POST(msg, desc) Request(" POST ", msg, desc)
!define PUT(msg, desc) Request(" PUT ", msg, desc)

actor User
User --> Browser : click resource
GET(Browser --> Resource, /path/to/resource)
Browser <-- Resource : response
POST(Browser -> Resource, '""JSON"" new Resource')
note right
  more note to
  this message
end note
User <-- Browser : display resource
@enduml
```

To give the note a style resembling a label I used the following styling. First some generic styling for each label, based on the `<<HTTP>>` stereotype. Specific styling for a verb goes through its own `<<verb>>` stereotype.

```text
skinparam note<<HTTP>> {
  textAlignment center
  backgroundColor #darkgrey
  borderColor transparent
  fontName monospaced
  fontColor #fff
  shadowing false
}
skinparam noteBackgroundColor<<GET>> #61affe
skinparam noteBackgroundColor<<POST>> #49cc90
skinparam noteBackgroundColor<<PUT>> #fca130
skinparam noteBackgroundColor<<DELETE>> #f93e3e
skinparam noteBackgroundColor<<HEAD>> #9012fe
skinparam noteBackgroundColor<<OPTIONS>> #0d5aa7
skinparam noteBackgroundColor<<PATCH>> #50e3c2
```

The following results in this diagram:

![Plantuml with httplabels][img]

> Written with Plantuml 1.2018.10

[1]: http://plantuml.com/
[2]: {{ site.baseurl }}{% post_url 2018-09-14-asciidoc-swagger %}
[img]: {{ site.baseurl }}{% link assets/img/posts/plantuml-httplabels.png %}
