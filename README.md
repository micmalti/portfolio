# Active feature list

### General

- [ ] Set font type scale

Use typescale.com and copy the CSS code from
[here](https://baseline.is/tools/type-scale-generator/). Also, refer to this
[blog post](https://thetrevorharmon.com/blog/how-to-prepare-and-use-variable-fonts-on-the-web/)
which should include details about how to make font sizes responsive.

Use ems to adjust the letter spacing so it's applied relative to the font size of the
element you're styling.

Undecided between Noto Sans and Poppins, but leaning more towards the former since
Poppins may cause readability issues due to its a being similar to o,
[among others](https://medium.com/@chiahoushen/design-system-selecting-a-new-typeface-for-better-readability-e42af6c22c27).
Run usability tests.

- [ ] Set colour scheme

- [ ] Implement responsive design

Media queries, or the use of device widths to target particular layouts, go against
the underlying theory of responsive design which advocates for content to fit _any_
viewport. Meanwhile, CSS Grid and Flexbox ensure that it is content that dictates the
breakpoints, not the other way around.

While both can be used at the same time, the grid layout is ideal for structured
layouts, with a parent that controls its children; a flexbox allows the children to
be resized independently of the parent. See [here](https://utopia.fyi/) for details.

- [ ] Create section layout

Include the section side titles (set at the centre of the viewport) and contact
button with a conditional statement to hide the latter in the case of the Contact
section.

- [ ] Create general layout

Include the header, the footer and the option to include a side title. Set a dark
scrollbar (or disabled with the no-scroll library), and style the active text
selection using the selection modifier.

- [ ] Create article layout

This is for the blog posts as well as the privacy policy and the disclaimer.

- [ ] ~~Add scroll-to-anchor animation~~

~~The idea behind it is to limit the user's viewport to one section only, but this
will mess up with the Home fade in/out animation. It's mostly good for the about
section. See [here](https://caseyjamesperno.com/blog/astro-header-anchors/) for an
implementation. This [example](https://rodneylab.com/astro-scroll-to-anchor/) is
broken.~~

- [ ] Add home button

Set the button as part of a fixed header with passthrough like Steven Mengin's (or
[with transparency](https://ellodave.dev/blog/article/using-svgs-as-astro-components-and-inline-css/)),
hidden only on the Home section. Apply a lighten on hover animation to it.

- [ ] Add contact button

Button with a hover animation, hidden only on the Contact section and on small
screens. When clicked, trigger a scroll-to-anchor animation if on main page, or else
redirect.

- [ ] Add footer

Make the footer responsive with clickable external buttons and a Disclaimer button
with underline on hover.

- [ ] Add disclaimer

Link to it from the footer with a button hover animation. Refer to this
[example](https://www.aqr.com/Insights/Research/Alternative-Thinking/Active-and-Passive-Investing-The-Long-Run-Evidence).

- [ ] Add CV

Clicking the CV button shall open a new tab displaying the CV, or download it?

- [ ] Add text animations

Learn the fundamentals of CSS animations (see [animate.css](https://animate.style/)).
But once that knowledge is grasped, turn to libraries for complex object animations.
No reason to re-invent the wheel. GSAP, Barba.js, AoS, ScrollMagic, are all excellent
solutions but GSAP is the most complete.

Check out [Lenis](https://lenis.darkroom.engineering/). See also
[this one](https://github.com/michalsnik/aos).

Make the text show up from the bottom to the top, particularly the title. See
Carvico, [this one](https://essams.com/article-build-robust-ux-case-study.html) and
this [heading animation](https://analoguefoundation.com/).

- [ ] Add hyperlink animation

Adopt the
[link hover effect](https://stackoverflow.com/questions/64746108/replicate-hackernoon-url-effect-css)
as implemented by Hackernoon.

- [ ] Add license

Read [here](https://github.com/microsoft/referencesource/issues/55) for the
distinction between copyright and license type. Interesting note about copyright at
the bottom of [this page](https://zenhabits.net/).

### Home

- [ ] Hide header

- [ ] Update profile image

Convert image to SVG then export at a higher resolution before editing. Use optimized
webp with fallback to png.

- [ ] Add job title animation

See [here](https://mateusf.com/) for implementation and
[here](https://www.reddit.com/r/quant/comments/fvfcau/what_are_the_differences_between_quant_roles/)
to choose the correct titles.

- [ ] ~~Add Blog widget~~

~~Widget split into two parts: a button with a hover animation, and a heading
carousel with an underline on hover animation. Clicking the title opens the linked
article and clicking the button shows the blog. On a small display, the button is
hidden and replaced with static text. Truncate the article title based on the display
size. This won't be pursued since it takes the user's attention away from the planned
navigation.~~

- [ ] ~~Add announcement banner~~

~~Use it to advertise the book launch, and later switch it with the Blog widget.
Likewise, this won't be pursued since it takes the user's attention away from the
planned navigation.~~

- [ ] Add availability tag

- [ ] Add fade to black animation

Change the transparency of the elements on scroll (increase when out-of-focus,
decrease when in-focus), similar to this
[implementation](https://www.stevenmengin.com/).

- [ ] Add down arrow

May be required to counter the illusion of completeness. If clicked, move viewport to
the next section. Refer to this [example](https://www.uflgame.com/en-en).

### About

- [ ] Add timeline

A similar component is the accordion. Use
[Carvico's](https://www.carvico.com/en/company/) as a template.

- [ ] Add intro

A 2-3 sentence description in which you mention "based in the EU" (and "Renaissance
man" or "polymath"?)

- [ ] Update copy

- [ ] Add section atwork

Follow Quantica Capital's [example](https://quantica-capital.com/en/publications) by
using an
[text-to-image generator](https://deepai.org/machine-learning-model/text2img) to
produce artwork following the style of 20th century artists. Overlay the images with
a dark linear gradient to improve readability. Use fade in/out for the image
animation. Consider excluding them on small screens.

### Book

- [ ] ~~Add switcher~~

~~Add an anchor to the top of the switcher such that when the user switches to a
different section, the viewport moves upwards to show the top part.~~

- [ ] ~~Make title sticky~~

- [ ] ~~Add text end markers~~

- [ ] Create moving image carousel

See
[here](https://stackoverflow.com/questions/76606431/how-to-create-a-moving-image-carousel-with-pure-css-and-html)
for details. There's no need to convert the artwork to SVG format (clear out the
background only).

- [ ] Make copy responsive

The text layout shall follow this
[example](https://discoveries2021.ucsd.edu/it-began-with-seven-tea-kettles/).

- [ ] Deploy Quarto sub-domain

- [ ] Add 'Read book' button

### Blog

- [ ] Add articles

- [ ] Add intro

Highlight the fact that the topics covered in the blog (or journal) are wide-ranging,
reflecting my various interests.

- [ ] Add 'View all' button

Link to blog from 'Featured articles' section, with the hover animation.

- [ ] Add featured articles to index page

- [ ] Add cards

The text within each card shall be taken from the corresponding article and truncated
accordingly. Hovering over the card shall animate the post title with an underline.
Is underline on hover animation better
[here](https://web.archive.org/web/20230609001703/https://www.netrixdigital.com/)
than Tushi's or [here](https://buzzworthystudio.com/)?

- [ ] Add pagination

Back and forward arrows at the bottom should suffice (turning grey if no pages are
left), but this is only a concern if the blog has many posts. Once clicked, the
viewport must show the top of the page.

- [ ] Add tags

Might consider showing them within the blog card as well, but likely excluded on
small screens. Show tags on the top page where users can click on them to filter out
the posts below.

- [ ] Add context menu

Show which section is currently displayed by increasing the font weight of its
heading. Hide the menu on small screens. See
[example](https://kld.dev/adding-webmentions/).

- [ ] Add back button

Animate the button with a move to the left on hover.

- [ ] Support link sharing

### Contact

- [ ] Add contact form

Resize fields based on the viewport.

- [ ] Add privacy policy

Follow the same layout as a blog article. Link it to the contact form via a
hyperlink. See
[here](https://plausible.io/blog/privacy-policy-page#why-should-i-create-a-privacy-policy)
for details. Use either TermsFeed or Free Privacy Policy Generator.

- [ ] Integrate contact form submission API

[KwesForms](https://www.sitepoint.com/astro-kwesforms-rive/) has a free tier (limited
to 100 submissions a month).

- [ ] Add form submission notification

# Planned features

### Performance

- [ ] Implement Lighthouse recommendations

Use both the extension and https://pagespeed.web.dev/. SEO is the most important.

- [ ] Turbo integration to improve SPA loading time

In an SPA, the server responds to user requests by sending JSON (not HTML), and the
client is responsible for doing a partial page update, updating the page as needed
with the received payload. This can be achieved by a JS client like React (or Turbo?)

See [here](https://dev.to/chirdeparag/spa-behaviour-in-astro-js-5c6p) and
[here](https://www.reddit.com/r/rails/comments/1cnpe04/what_exactly_is_the_difference_between_turbo/)
to learn more.

- [ ] Add SVG plot support

Observable Plot is a library from the Observable framework (see docs) which
statically serves plots as SVGs from a JSON data input. See
[here](https://github.com/beingflo/marending.dev/blob/eee4f3dfc3d0d3e6399e67140d1e962988e2769e/src/pages/notes/league-data/index.astro)
for example code, though re-implement it in MDX like in this
[example](https://github.com/val-town/val-town-blog/blob/a8986d9e5ce02b7b6df139754f98fac1c2bb2763/src/content/blog/fastify.mdx?plain=1).

### SEO

- [ ] Improve SEO ranking

Refer to the
[Google's starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

The most important meta tag for ranking is the title tag, not keyword tags. Read
[here](https://backlinko.com/on-page-seo) to learn more about how to create clickable
titles. Adding an image (and a meta tag image) to every blog post gains more
attention when sharing links on social media.

Ensure a diverse and relevant link profile to maintain and improve rankings, and
invest in brand recognition and authority within your niche.

### UX

- [ ] Set a circular mouse pointer

An implementation following this [example](https://www.stevenmengin.com/)
necessitates a change to how buttons are animated, at the very least. See also this
[tutorial](https://dev.to/mattmarquise/how-to-create-a-custom-circular-cursor-for-your-website-4i7p).

- [ ] Change heading style

Font headings are ideal for a
[dev-oriented portfolio](https://adriengervaix.com/about.html), in which open-source
projects are given more attention.

- [ ] Change blog card

See [here](https://blog.djnavarro.net/) for inspiration.

- [ ] Add background music

Using
[instrumental music](https://connorrothschild.github.io/v4/post/covid-gun-spikes)
would be worth testing. See [here](https://www.uflgame.com/en-en) for another
example.

- [ ] Add multi-language support

Limit this feature only for the index page.

### New sections

- [ ] Add case studies/publications section

Make sure to highlight problems and ways to solve them, preferibly by linking to a
case study in the blog. Limit the text to a single page to improve readability.
Consider whether you should drop the 'Featured posts' section.

- [ ] Add featured projects section

See [here](https://mateusf.com/) for the inclusion of a skills carousel.

- [ ] Add product launch section

### Web analytics

- [ ] Configure Plausible integration

### CMS

- [ ] Configure TinaCMS integration

Refer to the docs to set up
[contextual editing with TinaCMS](https://www.youtube.com/watch?v=drzueIgkEJg)
instead of, or complimentary to, using Joplin with
[mark-magic](https://github.com/mark-magic/mark-magic) or
[joplin-garden-worker](https://github.com/benlau/joplin-garden-worker).

### Blog

- [ ] Add Webmentions support

Refer to this [tutorial](https://kld.dev/adding-webmentions/). See
([example](https://mxb.dev/blog/the-indieweb-for-everyone/)). Consider also Giscus.

- [ ] Add search functionality

Limited to the blog page, in place of the tag filter list. Search functionality can
be easily implemented using [Algolia](https://route360.dev/en/post/astro-algolia/)
(see [tutorial](https://www.youtube.com/watch?v=XnV_2MWqAhQ)).

- [ ] Make article title stick to the top

Have the blog title contract to one side and stay fixed, like in this
[example](https://connorrothschild.github.io/v4/post/covid-gun-spikes).
