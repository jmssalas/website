---
title: From Customer-Specific Projects to a Shared Platform
description: How we turned several customer-specific implementations into a shared industrial platform by identifying what was truly common and separating it from what was bound to vary.
pubDate: 2026-09-23
---

## We Didn't Start With a Platform

When I joined the team, it was formed by three people: the manager, the electrical engineer, and the software engineer. There was no platform. There were several small, customer-specific implementations, developed independently by the software engineer.

Everything depended on the software engineer, and when I say "everything", I really mean everything: from the source code to the deployment, including version control and access to the customer-specific installations.

There was no Git repository. Version control was done by having different project folders in a directory on the software engineer's computer. Therefore, there was no shared code or knowledge, not even a reliable way to determine which version of each project was actually deployed at each client.

Furthermore, each customer-specific implementation was treated as an independent software project, even though they shared a lot of functionality. Over time, they began to diverge as more functionality and client-specific requirements were added.

It wasn't sustainable in the long run, not even for a single developer, let alone as the team grew, and even less so once the team became remote and started working asynchronously.

## Turning an Idea Into an Architecture

After several months of trying to adapt to their way of working, handling independent projects with barely any communication with the other engineer, I proposed during one of our meetings that the two of us stop working on separate projects for a moment and spend some time together figuring out what we actually had and what we wanted to build.

That "get together" meant spending three weeks full-time at the office, in person. At the beginning, my role was to listen to the other engineer's full vision of how the platform should look and behave.

We didn't start from scratch, in the strictest sense of the word. He had a very clear idea of what we needed to build, but he hadn't managed to articulate it in a way that was independent of the specific client implementations.

An empty room, a big whiteboard, and long, long talks were all we needed. From there, the main concepts, relationships, boundaries, and responsibilities began to emerge.

The knowledge that was only in the other engineer's mind, and implicit in the small implementations, started to become something that could be implemented as a core architecture.

## Finding the Core

If there was one thing that was truly clear from the beginning, it was the main entities and how they were supposed to relate to one another. These four entities formed the starting point:

![image](/images/notebook/core-entities.png)

They were the primary entities because they represented the main elements the platform needed to model:

- **Device**, representing a physical device (e.g. a Modbus device).
- **Resource**, representing a measurement or control element belonging to a device (e.g. a temperature sensor).
- **Datapoint**, representing a real-time value (e.g. 5°C).
- **Alarm**, representing when a real-time value falls outside a specified range.

Once we had these entities and their relationships, the core of the platform started to become clear. It was the part responsible for representing everything from a physical device to the state of its values and the alarms associated with them.

From there, two natural extremes emerged:

- On one side, the part that had to deal with physical devices and communication protocols in order to retrieve and send values: **Drivers**.
- On the other, the part that had to communicate with the outside world when something was wrong and an alarm was triggered: **Notifications**.

Everything between these two extremes was part of the platform's core.

## Keeping the Core Stable

Once we had identified the core, the next question was what should actually be part of it.

We already knew that the physical installations were going to vary. Different customers could have different devices, different protocols, different relationships between them, and different requirements. What we didn't know was exactly how they would vary in the future.

What we did know was that we didn't want those differences to end up inside the core. Otherwise, we would eventually have the same problem we were trying to solve: a different implementation for every customer, just inside a shared project.

So we decided that the core should be something we would never have to touch again. Not literally, but as a design goal.

The core would represent what was common, while everything that varied would live outside it. Device and protocol-specific differences would be handled by Drivers. Relationships between entities would be defined through configuration rather than being hardcoded for a particular installation. Customer-specific behaviour would also stay outside the common core whenever possible.

We didn't try to predict every possible variation the platform might have to support. We simply wanted to make sure that when something new appeared, it would not force us to change what was already common.

At this point, though, this was still just an architectural idea. We had drawn the boundary on a whiteboard. The next step was to find out whether it actually worked.

## Testing the Boundary

The first thing we implemented was the core itself, together with a single device: a Controllino. It was used as a testing device, so we could build and validate the core without having to deal with a real customer installation.

Once the core was working and the complete flow was in place, I implemented the Modbus driver.

The interesting part was that I didn't have to change the core to make it work.

The Modbus driver handled the communication with the device and provided the data to the rest of the platform through the same model that the Controllino driver was already using. Everything else remained untouched.

This was the moment when we realized that the boundary we had designed was actually working.

Adding a new device or protocol didn't mean adding another implementation of the platform. It meant implementing the corresponding driver and connecting it to the existing core.

The architecture we had drawn on the whiteboard was no longer just a way of organizing the code. It had survived its first real test.

## What This Architecture Enabled

The main thing this architecture changed was that we no longer had to build the platform again for every installation.

The core could remain common while each installation could have its own devices, protocols, relationships, and specific requirements. When a new device or protocol appeared, we could add it through a driver without changing the rest of the platform.

This didn't make the installations identical. They were still different, and they always would be. What changed was where that difference lived.

Instead of spreading customer-specific decisions throughout the platform, we had a common core with clear boundaries around it. That allowed us to reuse the same foundation across different installations while still adapting the platform to each one.

The architecture didn't remove the complexity of the physical world. It gave that complexity somewhere to live without making the whole system depend on it.
