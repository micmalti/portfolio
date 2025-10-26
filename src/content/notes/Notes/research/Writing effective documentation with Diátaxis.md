---
title: Writing effective documentation with Diátaxis
updated: 2025-09-03 15:04:00Z
created: 2024-04-19 04:18:00Z
source: https://www.youtube.com/watch?v=710uQqIqsWk
latitude: 35.89547060
longitude: 14.46650720
altitude: 0.0000
tags:
  - writing
---

*These notes are based on a Python Docs Community workshop about the Diátaxis documentation framework which is [available on Youtube](https://www.youtube.com/watch?v=710uQqIqsWk).*

A recurring problem in documentation is the issue of structure, which can be reframed in terms of user needs. Documentation must address both theoretical (understanding) and practical aspects of the software. It should serve users both while they are acquiring competence (studying) and when applying the software to their work.  

Diátaxis promotes the idea of thinking about documentation as four distinct components, each with its own style and purpose. This doesn’t necessary mean they should be kept entirely separate, but rather that the intent behind each section should be clear so that the appropriate writing style is used.  

- **Tutorial**
The purpose of a tutorial is to provide a learning experience, not just to demonstrate how to accomplish a specific task. It should instill confidence by ensuring success at each step. Avoid unnecessary details to maintain focus. Instead, link to additional context for users who want to explore further.  

- **How-to guide**
A how-to guide focuses on applying knowledge through practical steps. It has a clear objective and serves users who are already competent. It should prioritize actionable steps without digressing into explanations (though brief notes are acceptable).  

- **Reference**
A reference provides a technical description of the software to help users use it, excluding explanatory content. It should be authoritative and developed alongside the code itself.

- **Explanation**
An explanation supports users in studying the software by consolidating learning. It offers context, discusses choices and alternatives, and provides justifications for design choices.

When it comes to open-source software, the README can include the explanation, tutorial (e.g., installation), and how-to guides, while the MkDocs documentation can serve as the reference with code examples.  

Documentation is often stressful because it feels like chasing a moving target as the project evolves. To mitigate this, avoid planning sections too far ahead (which creates visibly incomplete work). Instead, document only what is already available. This ensures the documentation remains complete, even if it is never truly "finished."