---
layout: post
---

Because I am playing with the idea to pursue a post-graduate position, but I have now decided that I will spent the next year in Odense I wanted to keep an eye on vacancies at SDU Odense. Though I found [their vacant positions](https://www.sdu.dk/en/service/ledige_stillinger) basically unusable for the following reasons:

- Unable to be used without JS/Ajax loading of data
- Font/size not accessible
- Slow and annoying UX
    - Settings reset on navigation
    - Ajax loading noticably slowly
- No publishing date for each vacancy
- Seemingly random order

And most importantly no RSS feed for vacancies!

## Solution

I made an [RSS Feed](https://mtib.dev/sdu-open.xml), which you can subscribe to for free, to track both publication dates and get an overview without having to deal with the sub-par website experience. The code is open-sourced on github, [have a look](https://github.com/mtib/sdu_openrss).

## Open Problems

While it would be nice to have the entire data of the job posting as part of the description of the item, I didn't want to basically host a mirror of their text on my own page without their consent. The solution would be either for me to contact them for permissions **or them to offer a RSS Feed of their own**, which would be preferable.