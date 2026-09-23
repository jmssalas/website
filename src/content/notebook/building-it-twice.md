---
title: "Building It Twice"
description: "What I learned from building a working solution before building one that could grow."
pubDate: 2026-09-22
---

**Demo:** [Live application](https://demo-ftc.jmssalas.com/) · **Code:** [Original](https://github.com/jmssalas/football-teams-creator) · [Go rewrite](https://github.com/jmssalas/go-football-teams-creator)



## The Problem

My brother plays football regularly at a local football supporters' club. They used to form the teams using a free application that randomly generated teams from a set of players. This worked well enough until the number of players in the club increased and not everyone played every day.

The bigger problem was that the teams were completely random, so they weren't necessarily balanced. The application could easily put most of the stronger players on the same team, leaving the other team with the less experienced players.

They were looking for a way to create balanced teams objectively, and my brother asked me if I could build something for them. After a brief conversation one morning, we concluded that the new application needed to include the following features:

- A list of players.
- Statistics for each player: matches won, drawn, and lost.
- A scoring system based on those statistics.
- Selection of a subset of players and generation of balanced teams based on their scores.

It was a fairly small and manageable application, so I decided to take on the project —especially since I didn't expect it to take long to implement.

## The First Version

### Building Something Usable

At that time, I was working primarily with JavaScript, SvelteKit, and SQLite, so I decided to use them to keep things simple. It was a stack I was comfortable with and it allowed me to build something functional quickly.

The initial data model was deliberately simple: a player database containing each player's name and the number of matches they had won, drawn, and lost.

The logic for generating teams was the most technically interesting part, as it required exploring different combinations of players to find a balanced distribution. I decided to use backtracking for this. Since the number of players would not exceed 20, this approach was more than feasible for the application.

The first functional version was implemented in a single afternoon. It was a very simple application, with a rough structure and plenty of things that could have been done better. Nevertheless, it was functional and even deployed on an AWS EC2 instance —which was what really mattered at that point.

### What I Didn't Overthink

I have to admit that I didn't give this first version much thought. There were no architectural designs or database model diagrams. I knew what I wanted to build, so I just went ahead and built it without overcomplicating things.

As for the code, I didn't worry about defining responsibilities or structuring it in any particular way. I simply followed the standard SvelteKit structure and used Drizzle as the database layer, so I wouldn't have to work directly with SQLite. That was pretty much it.

The objective of this first version was to validate the problem and see whether it actually met the needs of my brother and his club.

## When The Application Started Fighting Back

To my surprise, my brother and the club actually started using the app, and they were very happy with it. As they continued using it, adding more players and keeping more statistics, new needs and features began to emerge: the ability to store the teams created for each match, record the actual result of each match instead of just a win, draw, or loss, and more.

Fortunately, none of these new features broke the application or required a major restructuring of the code. The problem arose cumulatively. Every new feature required changing parts of the application that had not initially been designed to change together. Responsibilities were mixed, and the code structure was becoming increasingly difficult to extend.

Things that had been easy to change at the beginning were gradually becoming constraints.


## Starting Again

The new football season kicked off in September, as usual, and that was when my brother asked me: _"Can we wipe the existing stats and start from scratch this season?"_

I replied: _"And lose everything you already have? Wouldn't it be better to keep a record for each season? That way, you would have a history and be able to compare seasons."_

I could already picture the look on my brother's face when he asked: _"Could we really do that?"_

After thinking about it and considering how the application had evolved over time, I realized that I needed to rethink the project if I wanted to make it easier to keep adding features like this one.

Instead of refactoring the existing project, I decided to start again, this time with all the knowledge I had already gained:

- How the application was actually being used.
- What information it really needed.
- Which relationships between entities were important.
- Which parts of the application were likely to evolve over time.

The second version didn't start from a hypothesis. It started from a real application that had already been used in practice.

## Redesigning The Data Model

I've always been a firm believer that a well-conceived and well-defined data model gives a system a solid foundation to evolve over time. However, we don't always have enough information to get it right from the beginning. In this case, I simply didn't know beforehand what the application would actually need.

The first thing I wanted to rethink was the data model. In the first version, I had to deal with several migrations, some of which were technically absurd and could clearly have been avoided with a better initial design.

I wanted to clearly separate players, matches, teams, and results. A match would no longer be something simply associated with a set of players. Teams and results would have their own responsibilities and relationships. Statistics would no longer be stored as cumulative values, but calculated from the underlying match data.

I wanted to design the new data model around the needs I was already aware of, with the aim of reducing the number of future features that would require structural changes to the model.

## Why Go?

Up to this point, I haven't said much about technologies or programming languages, but there is something I’d like to discuss now: the programming language I chose for the second version: Go.

The reason I decided to use Go is very simple: I was curious about it and wanted to learn how to use it. It wasn't about performance or scalability. It was simply curiosity, combined with the fact that the application was small enough to experiment with it without taking a significant risk. 

Go also gave me the opportunity to rebuild the backend while learning a new programming language.


## What I Kept

If there was one thing I was clear about before rebuilding the entire application, it was that several parts of the existing application worked perfectly fine and didn't need to change. These were:

- **SQLite as the database**, because there was no real problem that justified changing it.
- **The team generation algorithm based on backtracking**, because it worked and the number of players was still small enough that there were no real performance concerns.
- **The frontend being responsible for generating the teams**, because there was no reason to move this logic to the backend.
- **The application remaining a SPA**, because the existing approach was already working well.
- **The application itself remaining essentially the same**, since the goal was to improve its internal structure, not to build a different product.

## What Changed Between Versions

| **First version**                                   | **Second version**                   |
| --------------------------------------------------- | ------------------------------------ |
| Built to validate the idea                          | Built with knowledge from real usage |
| Fast to implement                                   | Designed for easier change           |
| Responsibilities more coupled                       | Responsibilities separated           |
| Initial data model                                  | Redesigned data model                |
| Frontend closely involved with application behavior | Frontend communicates through an API |
| SvelteKit backend/API                               | Go API                               |

The second version was not a replacement because the first one had failed. It was a different version of the same application, built with a much clearer understanding of what the system actually needed.

## What Building It Twice Taught Me

There are many lessons this project taught me, and they are quite far from the generic "clean code is important". In summary, they were:

- Building something quickly might be the right decision when you don't have a clear picture of the problem and are still discovering it.
- Using something in the real world reveals problems you never would have imagined or anticipated during the design phase.
- The first version had a completely different purpose from the second version, and that's absolutely fine.
- Maintenance doesn't always manifest itself as bugs or performance issues. Sometimes, the symptom is as simple as every change becoming harder to implement.
- A rebuild should take advantage of everything learned from using the system in production.
- Not everything needs to be replaced.
- Architecture decisions should respond to real problems rather than to the "need" to use a specific architecture.
