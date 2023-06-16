I want to tell a cautionary tale about automation and the process with which to chose the targets of automation.
In past projects of mine, two of which I can talk about here, I have been made aware that my choice in *what* to automate has cost more time than it saved.

I'm not talking about projects or tasks the scale of manufacture, not even about job-automation, but rather, about tasks that aid professionals in performing their tasks.

Before we get into it, I want to take a moment to discuss the apparent absense of good terms for this field. There is an abundance for terms within the design and [software development](https://en.wikipedia.org/wiki/Automatic_programming) field with *CAD* and [*CASE*](https://en.wikipedia.org/wiki/Computer-aided_software_engineering), among others, but automating user-side tasks has less distinguished terminology.

### Case-study: Weather

While still at secondary school I worked on a (professional facing) weather warning system. The goals were to both fully automate tasks the professional(s) would perform, mostly generating plots, and develop a user facing interface for interacting with the weather data. This was still in the days where not using a framework for [Model-View-Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) was acceptable. The user facing web-interface didn't pose a challenge here, instead I was to learn a lesson about prioritization.

Implementation details aside, I was left with the choice of prioritizing which tasks to automate:

1. A textual representation of forecast data for arbitrary locations over multiple days
2. A natural language representation of a single day close in the future

The meteorological professional I was working with spent around 45 minutes in the morning of each workday to both create a map of the region with weather symbols superimposed on a already generated ground weather map, and writing 1 to 2 paragraphs about the weather of the *next* day. Fully generating the entire map was out of scope of the project, at that time at least, but he still estimated the time to create the graphic could be cut by 20-30 minutes if the paragraphs could be automated, as picking and placing icons on the map is done very quickly and doesn't require a lot of *accuracy*[^1].

The textual representation of forecast data is a lot simpler to explain. It turns out the local community had converged on using a completely non-standard (afaik) way of sharing weather data. My best guess is that the chosen file-format is a direct result of the way local weather stations report their data or came to be *by accident* when the first person hosted their weather data, but it seems lost to time. A single file looks like this:

```
# Berlin {+52.52;+13.41}
# 2020-10-05 15:20:03.32552928 +0200 CEST
# YYYY-MM-DD HH:MM:SS TEMP MIN HUMID WINDGRAD FORCE RAIN CLOUDCOVER
2020-10-05 15:20:03 16.6 14.9 72 260 2.1 0.0 8
2020-10-05 15:00:00 15.6 14.7 75 248 3.2 0.3 8 
2020-10-06 03:00:00 12.3 12.3 78 205 4.7 0.0 8 
2020-10-06 15:00:00 15.4 15.4 65 216 6.0 0.2 6 
2020-10-07 03:00:00 13.4 13.4 76 226 4.2 0.2 8 
2020-10-07 15:00:00 16.1 16.1 64 243 4.9 0.5 5 
2020-10-08 03:00:00 10.7 10.7 78 246 5.0 0.0 3 
```

It contains forecast data for a single location, [Berlin](https://kunden.viwetter.de/txt/Berlin) in this case, for multiple points in time (in the future). I've never seen it used for anything else.

To cut this story short: I've spent weeks to generate the best natural language summary of a single day's weather, which turns out to still not be good enough to please everyone. It's in production right now, but still has to be manually checked. On the other hand, if I decided to automate the generation of the text file first it could have aided the professional writing their paragraphs **and** would have been done in hours, having saved minutes each day for months in which I was working on the generation of natural language. The usefulness wouldn't have ended there either. Because I chose to emit the text file from a template, after implementing that, it only takes a handfull of lines to add additional output formats. The one most intuitive to add was [CSV](https://kunden.viwetter.de/csv/Berlin), which I honestly wonder why no one wanted before I came along and added it.

---
### Case-study: Highscore

This incident I can not divulge as much information about, as it's still in current development, but it is the reason I decided to write this post. Imaging you have a large amount of 2D data (literally a spreadsheet) with a lot of unformatted data, entered by many people using different *standards*[^2]. The data stored there should really be stored in a database, with checks whenever data is entered, but historically the spreadsheet was both *powerful enough* and enabled last minute changes in the saved dataset. Now, the task is to parse the data and generate a score for each row, given the data is very sparse. I hacked together a Python script which handles all the cases I've seen in the last years, which so far seems to do the job, saving one of my coworkers hours of work each month[^3]. The output, generated by my script or my coworker, is a sorted list of the scores and their row-id, *or so I thought*.

Months later, I am tasked with surviving an old piece of software, completely unmaintained for years and with little to none documentation[^4]. It's aim is to display a more comprehensive and easily accessible score to the users. My contract is for only a few hours each month, so I spent close to two entire months *deploying* this system, just to find out it barely achieves what it set out to do and the *comprehensiveness* of the new and improved score is left open to the people deploying it, meaning I would have to write the metrics myself.

Luckily, the old script came up in a discussion about this, which I had forgotten by then. Instead of reviving this new system, the wanted metrics could easily be shoved in my crappy script with little to no other downside, than being in Python instead of JavaScript.

But why did we want the new system to begin with? Had I learned my lesson from the first example here, I should have known: my crappy script didn't fully automate the task. My supervisor still had to copy the output from my script, *manually add html tags with classes* and upload it to a CMS. Similar to how my natural language forecast generator saved 20 minutes, but added 5, this automation saved the tedious work, but still required someone to interact with the data, making this new fully automated system look so much better than it actually is. 

---
### Summary

What is the solution? **Communication**, had I known that the script should've output HTML, I would have added it. Knowing now that doing so only required 10 minutes, having done it, it could have been part of the first version of the script. The lesson is: don't automate the task that takes the longest to do manually, automate the task that is the most easy to automate[^5]. 

[^1]: If you took the time to read a paragraph about tomorrows weather and it turns out to be completely wrong you're going to be mad, but if a rain icon is placed 5km north of where you are, and it doesn't rain, you're not even going to notice.
[^2]: It really is a mess. Depending on their system even the font, font-size, color and encoding is different. Honestly, I'm amazed the export to CSV is successful every time. The largest problem is time and date information, which everyone just pastes into cells in their machines default locale. I've pestered everyone to change to a tool I've developed in my freetime just to be able to control the way time and dates are formatted for this task.
[^3]: The scores need to be calculated regularly.
[^4]: Oh, how much fun I had...
[^5]: Or formulate it as an optimization problem, chosing the task which minimizes (manual labor after automation) / (manual labor before automation).