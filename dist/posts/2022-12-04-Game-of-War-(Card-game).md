[Game of War](https://en.wikipedia.org/wiki/War_(card_game)) is a card game I got re-introduced recently.
It sparked my interest because its outcome is almost completely determined by the hands dealt at the beginning of the game.
I was already refreshing my [Rust](https://www.rust-lang.org/) skills using the current [Advent of Code](https://adventofcode.com/) so I thought it a good opportunity to give into my curiosity and learn some more about this game.

Because I wanted to keep it fun I did not research anything about this game.
This is likely fully studied and available somewhere else on the internet.
If you are looking for a *correct* analysis, look elsewhere.
This is an exploration and description of my journey, because it is fun.

I can recommend to read the wikipedia article linked above to learn more about the game, I will not explain the rules here.
I will also only consider the two-player version of this game, though most of the observations will also apply to versions with more players.
I am also aware that the version of the game I have [modelled and simulated (in Rust)](https://github.com/mtib/gowsim) is not exactly how it is described online.
There seem to be many slightly different version of this game, and the version I learned and modelled was taught to me under slight intoxication after a long day so *there be errors*.
Speaking of, for the slight chance that the person who taught me this game is reading this *👋 thanks for the nice day, and thanks for teaching this game to me*.

*As of writing this I am still running a larger set of simulations, and I am planning to run more detailed stats later too.*

## Observations

1. Randomness is only introduced by the way the cards that are won are picked up.
    - In a _short battle_ both players play one card, the winner places the card on their pile, but which card is on top, their own or the losing card of the opponent.
    - In a _war_ the piles counted out during the war as well as the starting cards may be picked up in any order relative to each other using some slight of hand (which is not against the rules or specified as far as I am concerned). However, the piles should not be mixed with each other, but instead treated as units.
1. Game states can repeat, and the game can still come to an end.
1. Stategy can be applied to the way cards are picked up to optimise the outcome.
    - After at most 26 rounds we should be able to know the complete state of the game exactly if no wars occur.

## Simulations

I ran some of the smaller sample size simulations on my M1 Macbook Air, the longer and larger simulations were run on a DigitalOcean Droplet.
On a single core I was usually able to simulate between 30k and 50k games per second.
The games have a very small memory footprint, in part thanks to rust, so I am also planning on parallelising the simulation.

Here are some preliminary results on game length:

![](https://docs.google.com/spreadsheets/d/e/2PACX-1vRY-vcTQf-OJv-PGWb9IDt_WHDL2XWK1ZPKmk4MqLMv-_RHMb_6xzNshoNeBPV8S6PdfmMI_GYvkUl1/pubchart?oid=260058671&amp;format=image)

Counting the number of games that end with a certain number of turns.
Both the starting hands and the way cards won are picked up (constrained as described above) were randomised uniformly.

![](https://docs.google.com/spreadsheets/d/e/2PACX-1vRY-vcTQf-OJv-PGWb9IDt_WHDL2XWK1ZPKmk4MqLMv-_RHMb_6xzNshoNeBPV8S6PdfmMI_GYvkUl1/pubchart?oid=1236431051&amp;format=image)

What this data tells us already:

- The most likely game length is (around) 44 turns
- A one turn game is possible (king-war which ends in another king-war which resolves to one player)
- 1% of games end in 9 turns or less
- 50% of games end in 90 turns or less
- 90% of games end in 239 turns or less
- 99.99% of games end in 844 turns or less
- The longest running game observed was 1953 turns long

I can share the [CSV](../assets/war/data.csv) containing the result of the simulation, counting the number of games ending at a certain turn count.

## TODO

These are as much TODOs for me as they are invitations to anyone reading this to research this further:

- Write a player AI that applies slight of hand and card counting to create the best response to what we know about the opponents hand
- Create some more stats on avg. number of wars per game
- Analyse this game properly (not just statistically evaluation simulations)
