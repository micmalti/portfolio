---
title: 'Finding the right font pair: A step-by-step guide'
updated: 2025-08-10 09:03:00Z
created: 2024-09-30 23:04:00Z
latitude: 48.57340530
longitude: 7.75211130
altitude: 0.0000
tags:
  - ux/ui
---

#### Step 1

Relying on [inspiration alone](https://fontofweb.com/) may just not be enough. Check whether the most popular fonts on Fonts in Use are available for download as a [variable font](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings) on Fontsource. Variable fonts "put more typographic control in the hands of the user". For instance, optical sizing ensures that the style adapts to specific text sizes; it is enabled by default for fonts that have an optical size variation axis. Different optical sizes can be split into separate font files or be assigned to the optical size axis within a variable font.

Typographers know that a large headline will probably require tighter spacing, while small type needs the opposite treatment: letter spaces and word spaces need to be opened up to preserve readability. Dedicated optical sizes allow them to overcome these issues: all formal design decisions — not just spacing, but also letter proportions and shape details — have been tailored to a specific application size.

:::note
Adding an optical size axis will typically double the font file size, although this depends on the family and the other axes used – it can range between 1.2 — 2.6x.
:::

These are the most common typefaces in the Fonts in Use database that are also available on Fontsource:
- Inter
- Montserrat
- Open Sans
- Roboto (unavailable as a variable font)
- Work Sans
This part may need to be revisted, partly because the sites under consideration weren't filtered by type.

#### Step 2

Use Fontpair to find matching font types for the fonts that were found. For instance, Montserrat is matched with 
EB Garamond and Orelega One; Della Respira and Cormorant are matched with Open Sans, and Work Sans is matched with Forum.

#### Step 3

Visually inspect the fonts. Key characters to look for are numbers (particularly 0 and 7), symbols, and the letters a, j, g and f. For instance, Poppins may cause readability issues due to its a being similar to o, [among others](https://medium.com/@chiahoushen/design-system-selecting-a-new-typeface-for-better-readability-e42af6c22c27). This step limited the selection to Inter.

#### Step 4

Run an advanced search on MaxiBestOf or Fonts in Use and Typ.io for the shortlisted fonts to check whether there are any entries that match your intended use case. If needed, refer to r/Typography for guidance.

Playfair Display has a large lowercase which helps it work for the mid-sized copy on the web, but its readability is really stretched at small sizes. This may have been rectified with support for optical sizing. Libre Caslon Display is the display version of Libre Caslon Text, optimized for web headlines. 

EB Garamond is paired with Inter on Wordpress. Yet, it doesn't come with optical sizing. Roboto Serif and Fraunces have optical sizing as well as grade and softness, respectively.

By the end, the font pair was identified: Inter and Source Serif, with Geist Mono as a monospace font. Refer to the examples [here](https://maple.finance/) and [here](https://venopage.com/).