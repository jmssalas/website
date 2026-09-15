---
title: 'Designing a platform from zero'
description: 'An industrial edge platform shaped by real-time data, constrained hardware and the need to evolve without creating a new codebase for every customer.'
pubDate: 'Jul 08 2022'
---

## The problem

The system had to run at customer sites where hardware, connectivity and operational conditions could not be treated as abstractions. It needed to collect and process real-time data while remaining understandable to the people responsible for operating it.

<ul class="constraint-list">
	<li>Industrial edge systems running at customer sites.</li>
	<li>Real-time data and industrial protocols.</li>
	<li>Constrained hardware and remote operation.</li>
	<li>Multiple customers without multiple codebases.</li>
</ul>

## The architectural decision

The platform had to emerge from those constraints instead of hiding them. That meant making the boundaries between the edge environment, the data model and the operational workflows explicit before choosing implementation details.

## What changed

A shared platform made the common structure visible and gave customer-specific behavior a place to evolve without forking the entire system. The result was a system that could be extended deliberately instead of rebuilt under pressure.
