---
layout: post
---

Because I am playing with the idea to pursue a post-graduate position, even if I have now decided that I will spend the next year in Odense, I wanted to keep an eye on vacancies at SDU Odense. Though I found [their vacant positions](https://www.sdu.dk/en/service/ledige_stillinger) unusable for the following reasons:

- Unable to be used without JS/Ajax loading of data
- Font/size not accessible
- Slow and annoying UX
    - Settings reset on navigation
    - Ajax loading noticeably slowly
- No publishing date for each vacancy
- Seemingly random order

And most importantly: no RSS feed for vacancies!

## Solution

I made an [RSS Feed](https://mtib.dev/sdu-open.xml) which you can subscribe to for free to track both publication dates and get an overview without having to deal with the sub-par website experience. The code is open-source on GitHub, [have a look](https://github.com/mtib/sdu_openrss).

## Open Problems

It would be nice to have the entire data of the post as part of the item's description. But I didn't want to host a mirror of their text on my page without their consent. I would have to contact them for permission, **or they would need to offer an RSS Feed themselves**.

Their [Jobbank](https://jobbank.sdu.dk/jobs?keyword=&order_by=&types%5B%5D=1&types%5B%5D=2&types%5B%5D=11&positions%5B%5D=15&locations%5B%5D=11850137&action=search) also doesn't offer an RSS feed. However, that page hosts enough dynamic content that one RSS feed would be overwhelming.