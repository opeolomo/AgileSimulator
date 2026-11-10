# Agile Simulator — Corporate Banking

An interactive simulator that lets scaled-agile teams in a corporate bank practise the framework on realistic client scenarios. Participants pick their portfolio, level and role, then steer a scenario through each agile event, questionnaire style, and see how every decision moves **Client Value**, **Flow & Predictability**, **Risk & Compliance** and **Team Health**.

## Run it

No build step and no dependencies.

- Open `index.html` in a browser, or
- serve the folder (`python3 -m http.server`) or publish it with any static host such as GitHub Pages.

## What is in the box

| Area | Details |
|---|---|
| Portfolios | Payments, Liquidity Management, FX, Trade & Working Capital, Digital Channels, Data, Commercial Issuing, Digital Assets |
| Work breakdown | Team, Team of Teams (ART), Value Stream (Solution Train), Portfolio, ExCo |
| Roles | 22 roles, filtered by level — Scrum Master, Product Owner, RTE, Product Manager, Epic Owner, Executive Sponsor and more |
| Events | 15 events across a Planning Interval, from Strategy & OKR Alignment through PI Planning, team events, System and Solution Demos to Inspect & Adapt |
| Scenarios | Fictional client scenarios for every portfolio (two for Digital Assets), plus a shared question bank (55 questions in total) |
| Debrief | Overall score, the four measures, a printable plan and decision log, and retrospective prompts |

Each participant meets only the events their level attends. Questions can be single choice, multi-select or free text (captured in the plan).

## Admin module

Open **Admin** in the header. The default PIN is `agile`; change it under *Settings & data*.

Admins can add, edit, reorder and delete portfolios, scenarios, questions (with answer options, per-measure impact and feedback), roles, levels and events.

**Sharing changes.** Edits are saved in the admin's browser only. To roll them out to everyone:

1. *Settings & data → Export configuration*.
2. Save the file as `config.json` next to `index.html` on your host. The simulator loads it automatically for all users.

Alternatively, other users can import the file on their own device.

The PIN deters casual edits. It is not a security control: the app has no server, so anyone with the files can read the content.

## Structure

```
index.html        page shell
css/styles.css    styling, light and dark themes, print layout
js/data.js        default content (portfolios, roles, events, scenarios, questions)
js/graphics.js    SVG icons and event-room illustrations
js/briefing.js    mission-briefing sound, voice read-out and typewriter text
js/app.js         simulation flow, scoring, debrief and admin module
```

Terminology follows common scaled-agile practice. This is an independent learning aid; clients and scenarios are fictional.
