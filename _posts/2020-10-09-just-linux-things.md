---
layout: post
slug: just linux things
---

There are so many things I wish I had known way before I ended up learning about them. I based these on conversations I have with first and second year computer science students, and the things they don't know about.

I might come back to this and add more items at a later point.

---
{: data-content="honourable mentions"}

There are some honourable mentions, which in themselves don't have anything to do with Linux.

- Python's [argparse](https://docs.python.org/3/library/argparse.html) and the Namespace object
  These are only in the same bullet point because they are described in the same documentation file. I, however, included them for completely different reasons:

  1. `argparse`s programming interface for parsing command line input is, hands down, the best CLI parser I have used. It's simple but powerful, you can define subparsers easily, using it is shorter than hacky DIY solutions and safer. The output of `-h` is top of the class too. A close second is [clap-rs/clap](https://github.com/clap-rs/clap) for Rust. I appreciate that clap allows you to define the CLI through many different means.
  2. `Namespace` is a hidden gem. I'll cut the explaination of why it is cooler than you think a bit short, as thats only relevant for python programmers: *Do you want JavaScript objects in Python?* Use a Namespace object! 
- musl vs. glibc: libc is a complicated piece of software. You interact with it more often than you think when you code anything. It also is the cause of the [weirdest errors](https://drewdevault.com/2020/09/25/A-story-of-two-libcs.html) and frustration you can imagine. You think you can cross-compile to a lot of systems? You better hope they have the same glibc version you do! Or you use musl, a non glibc libc, and deal with the disadvantages that come with not compiling against the standard that glibc has become, ... but what if your dependencies do? If you have never heard about this problem, it a nice rabbit-hole to go down, that I'll leave up to you.
- git: honestly, if you write any code, or even anything plaintext, you should use a version control system! Using git gives you the most choice in platforms to host on.

---
{: data-content="good to know"}

The juicy bits, that I think every computer-science-inclined person should have heard about:

- Shell / Process management
  - [webhook](https://github.com/adnanh/webhook#what-is-webhook) is a badly named, amazing, tool. Have you noticed that basically everything is a webapp nowadays, furthermore, have you noticed that almost everything supports webhooks now? It also makes sense, supporting webhooks is so simple, all one has to do is support sending HTTP requests when something happens and send context information along with the request - done. But that's only the sending side, what about the receiving side? You *could* use something like [IFTTT](https://ifttt.com/) to receive and act on the webhooks, but I've made some bad experiences with it, and it also leads to overly complicated setups, if all you want to do is run a script when something happens (i.e. a push to a repo). The webhook tool allows you to define the endpoints you want to listen on and the command you want to run on a request. That's it, but it just works and is portable. Complete recommendation for anyone who runs a server and wants to use webhooks.
  - [flock](https://linux.die.net/man/1/flock) is a program.
  - [daemon-start-stop](http://manpages.ubuntu.com/manpages/bionic/man8/start-stop-daemon.8.html) allows you to daemonize any executable. If flock isn't enough, this is it.
- Notetaking
  - Markdown
    
    I you need to use LaTeX, you'll know, but for every other type of typesetting or notetaking in general, you should use a markdown flavour and maybe a markdown notetaking app. I still write a lot of *pure* Markdown in vscode but have started using [notable](https://github.com/notable/notable) a few years ago, and now have my entire work and study notes organised in it, easily accessible as text, convertible into almost any known format, easy to read and pretty. I don't know if I would still recommend notable to everyone as there's been some internal controversities as it has moved from open-source to closed-source, but the app itself is still very good (esp. the inclusion of AsciiMath is great).

    But Markdown can help with more than just notetaking, I've held multiple presentations written in Markdown using [reveal.js](https://revealjs.com/markdown/) and got compliments on the slidesets. Turns out using Markdown forces you to be more structured and brings a certain simplicity to the slides. As you can allways fall back to HTML (even though that is rarely necessary) you can recreate any slideset using Markdown. Another advantage is that you can more easily scan adjacent slides in the plaintext Markdown file as compared to something like PowerPoint or LibreOffice Impress.
- Selfhosted
  - [docker](https://www.docker.com/) can be a hassle to set up, but allows you to run containers. I'm not going to explain containers here, but if you ever had the problem that something runs on one machine, but not on yours, containers can solve that problem: think of it as shipping the machine, instead of the software (and still being more performant than a VM). Writing a Dockerfile for your own application is easier than you think. But writing a *good* Dockerfile is an art. You can easily containerize any app by shipping it with everything included in Gigabyte sized containers, or craft a clean description of everything necessary to run your app and ship that instead - but once you have that, deploying your app is only one command away. 
  - [gitea](https://www.gitea.com/) is a selfhosted alternative to GitHub and GitLab. GitLab is just *too big* for my needs, but you can literally deploy gitea on a Raspberry Pi with some attached storage and that will allow you to host all your (and your friends) git repositories with all bells and whistles included. It is so lightweight that you won't need to upgrade your infrastructure unless you throw a lot of people at it. You can even build your own CI/CD infrastructure with [drone ci](https://drone.io/). Webhook from above comes in handy here.
- Programming
  - `man` pages' numbers are systematic. If you don't know what manpages are, you have to fix that! But once you know they exist there's still a lot to learn. It scares me how much space information from or about man pages take up in my brain. Just like a knee-jerk reaction I have to say: `man <number> <page>` when a particular topic comes up in conversation. But one part that I only learned about embarassingly recently: The number of the page is based on the type of information on the page. I should've read `man man` earlier:

    ```
    The table below shows the section numbers of the manual followed by the types of pages they contain.

    1   Executable programs or shell commands
    2   System calls (functions provided by the kernel)
    3   Library calls (functions within program libraries)
    4   Special files (usually found in /dev)
    5   File formats and conventions, e.g. /etc/passwd
    6   Games
    7   Miscellaneous (including macro packages and conventions), e.g. man(7), groff(7)
    8   System administration commands (usually only for root)
    9   Kernel routines [Non standard]
    ```