/* Default content for the Scaled Agile Simulator.
   Everything here can be changed at runtime in the Admin module.
   Impact arrays are [Client Value, Flow & Predictability, Risk & Compliance, Team Health]. */
(function () {
  const o = (text, i, feedback) => ({ text, impact: { v: i[0], f: i[1], r: i[2], m: i[3] }, feedback });
  let n = 0;
  const q = (scenario, event, prompt, options, extra) =>
    Object.assign({ id: 'q' + ++n, scenario, event, levels: [], type: 'single', prompt, options }, extra || {});

  window.AS_DEFAULTS = {
    version: 1,
    adminPin: 'agile',

    metrics: [
      { id: 'v', name: 'Client Value', hint: 'Are corporate clients getting outcomes they care about?' },
      { id: 'f', name: 'Flow & Predictability', hint: 'Does work move smoothly and land when promised?' },
      { id: 'r', name: 'Risk & Compliance', hint: 'Are regulatory, operational and security risks under control?' },
      { id: 'm', name: 'Team Health', hint: 'Are people engaged, trusted and working at a sustainable pace?' }
    ],

    portfolios: [
      { id: 'payments', name: 'Payments', icon: 'payments', active: true, blurb: 'Domestic, cross-border and instant payments for corporate clients.' },
      { id: 'liquidity', name: 'Liquidity Management', icon: 'liquidity', active: true, blurb: 'Cash pooling, sweeping, virtual accounts and treasury visibility.' },
      { id: 'fx', name: 'FX', icon: 'fx', active: true, blurb: 'Foreign exchange pricing, hedging and execution.' },
      { id: 'trade', name: 'Trade & Working Capital', icon: 'trade', active: true, blurb: 'Letters of credit, guarantees, supply chain and receivables finance.' },
      { id: 'digital', name: 'Digital Channels', icon: 'digital', active: true, blurb: 'Corporate portal, mobile, host-to-host and API connectivity.' },
      { id: 'data', name: 'Data', icon: 'data', active: true, blurb: 'Client insights, analytics platforms and regulatory data.' },
      { id: 'issuing', name: 'Commercial Issuing', icon: 'issuing', active: true, blurb: 'Corporate, purchasing and virtual cards.' }
    ],

    levels: [
      { id: 'team', name: 'Team', alias: 'Agile Team', blurb: 'A cross-functional team of 5–11 people delivering value every iteration.' },
      { id: 'art', name: 'Team of Teams', alias: 'Agile Release Train', blurb: '5–12 teams planning, committing and delivering together each Planning Interval.' },
      { id: 'vs', name: 'Value Stream', alias: 'Solution Train', blurb: 'Multiple trains and suppliers building one large solution end to end.' },
      { id: 'portfolio', name: 'Portfolio', alias: 'Lean Portfolio Management', blurb: 'Strategy, investment funding and governance across value streams.' },
      { id: 'exco', name: 'ExCo', alias: 'Executive Committee', blurb: 'Enterprise strategy, risk appetite and the conditions for agility.' }
    ],

    roles: [
      { id: 'sm', name: 'Scrum Master / Team Coach', short: 'Scrum Master', levels: ['team'], blurb: 'Coaches the team, facilitates events and removes impediments.' },
      { id: 'po', name: 'Product Owner', short: 'PO', levels: ['team'], blurb: 'Owns the team backlog and maximises the value the team delivers.' },
      { id: 'dev', name: 'Engineer / Developer', short: 'Engineer', levels: ['team'], blurb: 'Designs, builds and tests the solution with built-in quality.' },
      { id: 'qa', name: 'Quality Engineer', short: 'QA', levels: ['team'], blurb: 'Builds quality in through test automation and acceptance criteria.' },
      { id: 'ba', name: 'Business Analyst', short: 'Analyst', levels: ['team'], blurb: 'Connects client needs, operations and regulation to stories.' },
      { id: 'ux', name: 'UX Designer', short: 'UX', levels: ['team'], blurb: 'Represents the corporate user — treasurers, approvers, operators.' },
      { id: 'rte', name: 'Release Train Engineer', short: 'RTE', levels: ['art'], blurb: 'Chief coach of the train; facilitates PI events and flow.' },
      { id: 'pm', name: 'Product Manager', short: 'Product Mgr', levels: ['art'], blurb: 'Owns the ART backlog, vision and roadmap; voice of the client.' },
      { id: 'sa', name: 'System Architect', short: 'Architect', levels: ['art'], blurb: 'Guides the technical vision and the architectural runway.' },
      { id: 'bo', name: 'Business Owner', short: 'Business Owner', levels: ['art', 'portfolio'], blurb: 'Accountable for business outcomes; assigns business value to PI objectives.' },
      { id: 'ste', name: 'Solution Train Engineer', short: 'STE', levels: ['vs'], blurb: 'Coordinates the trains and suppliers that make up the value stream.' },
      { id: 'solm', name: 'Solution Manager', short: 'Solution Mgr', levels: ['vs'], blurb: 'Owns the solution vision, roadmap and capability backlog.' },
      { id: 'sola', name: 'Solution Architect', short: 'Sol. Architect', levels: ['vs'], blurb: 'Defines the architecture that spans trains and suppliers.' },
      { id: 'eo', name: 'Epic Owner', short: 'Epic Owner', levels: ['portfolio'], blurb: 'Shepherds an epic through the portfolio Kanban with a lean business case.' },
      { id: 'lpm', name: 'Lean Portfolio Manager', short: 'LPM', levels: ['portfolio'], blurb: 'Aligns strategy, funding and governance across value streams.' },
      { id: 'ea', name: 'Enterprise Architect', short: 'Ent. Architect', levels: ['portfolio'], blurb: 'Steers technology strategy and enablers across the portfolio.' },
      { id: 'coach', name: 'Agile Coach (LACE)', short: 'Coach', levels: ['portfolio', 'art'], blurb: 'Leads the change and builds lean-agile capability.' },
      { id: 'risk', name: 'Risk & Compliance Partner', short: 'Risk', levels: ['portfolio', 'art'], blurb: 'Embeds regulatory and operational risk thinking early in the flow.' },
      { id: 'sponsor', name: 'Executive Sponsor', short: 'Sponsor', levels: ['exco'], blurb: 'Champions the initiative and clears enterprise-level impediments.' },
      { id: 'head', name: 'Head of Corporate Banking', short: 'Head of CB', levels: ['exco'], blurb: 'Owns client relationships and commercial outcomes.' },
      { id: 'cio', name: 'CIO / CTO', short: 'CIO', levels: ['exco'], blurb: 'Owns technology strategy, resilience and engineering capability.' },
      { id: 'cro', name: 'Chief Risk Officer', short: 'CRO', levels: ['exco'], blurb: 'Sets risk appetite and holds the line on conduct and regulation.' }
    ],

    /* Ordered as they occur across one Planning Interval (PI). */
    events: [
      { id: 'strategy', name: 'Strategy & OKR Alignment', scene: 'table', cadence: 'Annually, refreshed quarterly', levels: ['exco', 'portfolio'], keyRoles: ['sponsor', 'head', 'cio', 'cro', 'lpm'],
        purpose: 'Leaders translate enterprise strategy into strategic themes and measurable outcomes that guide every investment decision.' },
      { id: 'epic-review', name: 'Portfolio Kanban & Epic Review', scene: 'kanban', cadence: 'Monthly', levels: ['exco', 'portfolio', 'vs'], keyRoles: ['eo', 'lpm', 'ea', 'bo', 'risk', 'solm'],
        purpose: 'Big initiatives (epics) are visualised, analysed with a lean business case and approved in small, testable increments.' },
      { id: 'pre-pi', name: 'Pre-PI Planning', scene: 'table', cadence: 'Before each PI', levels: ['vs', 'art'], keyRoles: ['ste', 'solm', 'sola', 'rte', 'pm', 'sa'],
        purpose: 'Trains and suppliers align on vision, priorities and capacity so that PI Planning starts with a ready backlog.' },
      { id: 'pi-planning', name: 'PI Planning', scene: 'board', cadence: 'Every 8–12 weeks, 2 days', levels: ['team', 'art', 'vs', 'portfolio'], keyRoles: ['rte', 'pm', 'bo', 'sa', 'po', 'sm', 'dev'],
        purpose: 'Everyone on the train plans together face to face: teams draft plans, surface dependencies and risks, and commit to PI objectives.' },
      { id: 'refinement', name: 'Backlog Refinement', scene: 'board', cadence: 'Weekly', levels: ['team'], keyRoles: ['po', 'ba', 'dev', 'qa', 'ux'],
        purpose: 'The team and Product Owner split, clarify and estimate upcoming stories so they are ready to be pulled.' },
      { id: 'iteration-planning', name: 'Iteration Planning', scene: 'board', cadence: 'Start of each 2-week iteration', levels: ['team'], keyRoles: ['po', 'sm', 'dev', 'qa', 'ba'],
        purpose: 'The team agrees an iteration goal and pulls the stories it can realistically finish, based on capacity.' },
      { id: 'daily', name: 'Daily Stand-up', scene: 'circle', cadence: 'Daily, 15 minutes', levels: ['team'], keyRoles: ['sm', 'dev', 'qa', 'ba', 'ux', 'po'],
        purpose: 'The team synchronises around the iteration goal, makes work visible and raises impediments early.' },
      { id: 'art-sync', name: 'ART Sync', scene: 'circle', cadence: 'Weekly (Coach Sync + PO Sync)', levels: ['art', 'team'], keyRoles: ['rte', 'pm', 'sm', 'po', 'sa'],
        purpose: 'Scrum Masters, Product Owners and train leaders check progress against PI objectives and manage cross-team dependencies.' },
      { id: 'iteration-review', name: 'Iteration Review', scene: 'stage', cadence: 'End of each iteration', levels: ['team'], keyRoles: ['po', 'dev', 'qa', 'ux', 'bo'],
        purpose: 'The team demonstrates working, tested stories to stakeholders and gathers feedback.' },
      { id: 'retro', name: 'Iteration Retrospective', scene: 'retro', cadence: 'End of each iteration', levels: ['team'], keyRoles: ['sm', 'dev', 'qa', 'ba', 'ux', 'po'],
        purpose: 'The team reflects on how it works and agrees one or two concrete improvements for the next iteration.' },
      { id: 'system-demo', name: 'System Demo', scene: 'stage', cadence: 'Every iteration', levels: ['art', 'team', 'vs', 'portfolio'], keyRoles: ['pm', 'bo', 'rte', 'sa', 'po', 'risk'],
        purpose: 'The integrated work of all teams on the train is shown in a production-like environment — the true measure of progress.' },
      { id: 'solution-demo', name: 'Solution Demo', scene: 'stage', cadence: 'Once per PI', levels: ['vs', 'portfolio', 'exco'], keyRoles: ['solm', 'ste', 'sola', 'bo', 'sponsor', 'head'],
        purpose: 'The whole value stream shows the integrated solution to clients and senior stakeholders for objective evaluation.' },
      { id: 'portfolio-sync', name: 'Portfolio Sync', scene: 'kanban', cadence: 'Monthly', levels: ['portfolio'], keyRoles: ['lpm', 'eo', 'ea', 'bo', 'coach', 'risk'],
        purpose: 'Portfolio leaders review epic progress, spend against guardrails, dependencies and capacity across value streams.' },
      { id: 'inspect-adapt', name: 'Inspect & Adapt', scene: 'retro', cadence: 'End of each PI', levels: ['art', 'team', 'vs', 'portfolio'], keyRoles: ['rte', 'pm', 'bo', 'sm', 'po', 'coach'],
        purpose: 'The train reviews PI results, measures predictability and runs a problem-solving workshop on its biggest systemic issue.' },
      { id: 'qbr', name: 'Strategic Portfolio Review', scene: 'table', cadence: 'Quarterly', levels: ['exco', 'portfolio'], keyRoles: ['sponsor', 'head', 'cio', 'cro', 'lpm', 'eo'],
        purpose: 'Executives inspect outcomes against strategy and decide whether to persevere, pivot or stop investments.' }
    ],

    scenarios: [
      { id: 's-payments', portfolio: 'payments', active: true, title: 'Instant Payouts Before the Deadline', client: 'Northwind Logistics', initiative: 'Instant Bulk Payouts',
        brief: 'Northwind Logistics pays 40,000 drivers and carriers every week and wants instant bulk payouts with rich ISO 20022 remittance data. A scheme migration deadline lands in two PIs, a fintech rival is courting the client, and the legacy payments engine only runs overnight batches.' },
      { id: 's-liquidity', portfolio: 'liquidity', active: true, title: 'Real-Time Cash Visibility', client: 'Helix Pharma', initiative: 'Virtual Accounts & Real-Time Sweeping',
        brief: 'Helix Pharma’s group treasurer runs 300 accounts across 14 countries and wants virtual accounts with real-time cross-border sweeping. Tax and regulatory rules differ in every market, and the core banking platform posts balances only at end of day.' },
      { id: 's-fx', portfolio: 'fx', active: true, title: 'Hedging on Autopilot', client: 'Aurora Airlines', initiative: 'Automated FX Hedging API',
        brief: 'Aurora Airlines wants its treasury system to hedge fuel and ticket-revenue exposures automatically through an API, at agreed rules, around the clock. Pricing latency, credit-limit checks and conduct rules all have to work in milliseconds.' },
      { id: 's-trade', portfolio: 'trade', active: true, title: 'Paperless Trade Finance', client: 'Kestrel Commodities', initiative: 'Digital Letters of Credit',
        brief: 'Kestrel Commodities waits up to nine days for a letter of credit to be issued and checked. They want a digital journey with electronic documents. Sanctions screening, operations teams in three hubs and correspondent banks are all part of the flow.' },
      { id: 's-digital', portfolio: 'digital', active: true, title: 'One Portal to Rule Them All', client: 'Orion Retail Group', initiative: 'Unified Corporate Portal',
        brief: 'Orion Retail Group’s finance staff log into three different channels to pay suppliers, check balances and approve FX. The bank has promised one portal with mobile approvals. Every product portfolio must expose its services, and 6,000 client users have to migrate without disruption.' },
      { id: 's-data', portfolio: 'data', active: true, title: 'Insights Clients Will Pay For', client: 'Meridian Manufacturing', initiative: 'Cash-Flow Forecasting Insights',
        brief: 'Meridian Manufacturing wants predictive cash-flow forecasts built from its transaction history. The data sits in eleven product systems with inconsistent definitions, and regulators expect full lineage and client-consent controls on every data set.' },
      { id: 's-issuing', portfolio: 'issuing', active: true, title: 'Virtual Cards at Scale', client: 'Summit Travel Partners', initiative: 'Virtual Cards for B2B Payments',
        brief: 'Summit Travel Partners wants to generate single-use virtual cards for every supplier booking — millions a year — with spend controls and automatic reconciliation. The card processor is an external vendor on a quarterly release cycle, and fraud teams are nervous.' }
    ],

    questions: [
      /* ───────────── Strategy & OKR Alignment ───────────── */
      q('*', 'strategy', 'The board has approved a "digital-first corporate bank" strategy. {client} is one of many clients asking for {initiative}. How do you turn strategy into direction for the {portfolio} portfolio?', [
        o('Publish a few strategic themes with measurable outcomes (OKRs) and let portfolios propose how to achieve them', [8, 4, 2, 6], 'Strategic themes plus OKRs give clear intent while leaving room for the people closest to the client to work out the "how". This is decentralised decision-making with alignment.'),
        o('Hand each portfolio a detailed three-year project list with fixed scope, dates and budgets', [-6, -6, 0, -6], 'A fixed three-year project list locks in guesses made when you knew least. Teams deliver the plan rather than the outcome, and pivoting becomes politically expensive.'),
        o('Let each portfolio set its own direction independently — they know their clients best', [0, -6, -4, 2], 'Autonomy without alignment produces local optimisation. Corporate clients experience the bank as one firm; seven disconnected roadmaps will collide in the channels and in the core.'),
        o('Wait for the annual budget cycle to decide', [-8, -4, 0, -4], 'Annual cycles are too slow for a market where a fintech can onboard your client in a quarter. Lean budgeting funds value streams continuously and adjusts quarterly.')
      ]),
      q('*', 'strategy', 'How should ExCo fund the work in the {portfolio} portfolio?', [
        o('Fund long-lived value streams with a lean budget and guardrails; review allocation every quarter', [6, 8, 2, 6], 'Funding value streams instead of projects keeps stable teams together, removes project-approval queues and lets leaders shift money as evidence arrives — within agreed guardrails.'),
        o('Fund individual projects, each with a full business case approved by the investment committee', [-4, -8, 2, -6], 'Project funding moves people to the work, creates approval queues and treats every change as a variance. Much of the cost of delay hides in those queues.'),
        o('Give technology a single pot and let them prioritise', [-6, 0, -2, -2], 'This separates the money from business accountability. Business Owners must stay engaged in prioritisation for the investment to track client outcomes.')
      ]),

      /* ───────────── Portfolio Kanban & Epic Review ───────────── */
      q('*', 'epic-review', '{initiative} for {client} arrives as a large epic. What do you ask the Epic Owner to bring before committing serious money?', [
        o('A lean business case with a clear hypothesis, a minimum viable product (MVP) and leading indicators', [8, 6, 4, 2], 'Treating an epic as a hypothesis lets you fund the smallest experiment that proves or disproves it, then persevere or pivot on evidence rather than opinion.'),
        o('A fully detailed requirements specification and a three-year delivery plan', [-4, -8, 2, -4], 'Big upfront specification delays learning for months and gives a false sense of certainty. Most of the risk is in assumptions that only real client feedback can test.'),
        o('Nothing more — the client is important, so approve it now', [2, -4, -8, -2], 'Skipping analysis feels fast, but the portfolio takes on work with unknown cost, risk and regulatory exposure. Work in process climbs and everything slows down.')
      ]),
      q('*', 'epic-review', 'The portfolio Kanban shows 14 epics "in implementation" and teams are spread thin. A new high-priority epic appears. What do you do?', [
        o('Apply a WIP limit: stop or pause lower-value epics before starting the new one', [6, 10, 2, 6], 'Limiting work in process is the fastest way to improve flow. "Stop starting, start finishing" — a paused epic costs less than fourteen epics that all finish late.'),
        o('Start it — ask teams to absorb it alongside current work', [-2, -10, -4, -8], 'Overloading the system lengthens every queue. Context switching rises, quality falls and predictability collapses across the whole portfolio.'),
        o('Sequence epics by weighted shortest job first (WSJF) and pull the new one when capacity frees up', [6, 6, 2, 4], 'WSJF prioritises by cost of delay divided by job size, so short, valuable work goes first. Pulling on capacity keeps the system from overloading.')
      ]),

      /* ───────────── Pre-PI Planning ───────────── */
      q('*', 'pre-pi', 'PI Planning is three weeks away. The top features for {initiative} are still vague one-liners. What is your move?', [
        o('Run focused refinement with Product Management, architects and teams so the top ten features have benefit hypotheses and acceptance criteria', [6, 8, 2, 4], 'A ready backlog is the single biggest predictor of a good PI Planning. Features need enough clarity to plan against — not complete specifications.'),
        o('Leave it — the teams will figure out the details during PI Planning', [-4, -8, -2, -6], 'Teams will spend two expensive days discovering what the features mean instead of planning them. Expect weak objectives and a low confidence vote.'),
        o('Have architects write detailed designs for every feature so nothing is left open', [-2, -4, 2, -4], 'Over-preparing removes the team’s ownership of the solution and delays planning. Aim for intentional architecture plus emergent design.')
      ]),
      q('*', 'pre-pi', 'How much of the train’s capacity do you reserve for enablers — architecture runway, technical debt, compliance and resilience work?', [
        o('Agree an explicit capacity allocation (for example 70% features / 30% enablers) with Business Owners and revisit it each PI', [4, 6, 8, 4], 'An explicit, negotiated capacity allocation stops enabler work from being crowded out every PI. In a bank, resilience and regulatory work is not optional — make it visible.'),
        o('100% business features this PI — enablers can wait until the deadline has passed', [4, -4, -10, -6], 'It looks faster for one PI. Then the runway runs out, defects climb, and audit findings arrive. Deferred technical and regulatory work always charges interest.'),
        o('Let each team decide privately how much hidden time to spend on technical work', [-2, -4, -2, 0], 'Hidden work destroys trust and predictability. Make the trade-off transparent so Business Owners can own it.')
      ]),

      /* ───────────── PI Planning ───────────── */
      q('*', 'pi-planning', 'Day one of PI Planning. Business Owners want all twelve features. The teams’ draft plans show capacity for eight. What do you do?', [
        o('Commit to the eight that fit, list the rest as uncommitted objectives, and let Business Owners rank the trade-offs', [6, 10, 2, 8], 'Plans built on real capacity are plans you can keep. Uncommitted objectives give honest visibility of stretch goals without counting on them.'),
        o('Commit to all twelve — the teams will find a way', [-2, -12, -4, -10], 'Over-commitment is the classic way to destroy predictability and morale. Something will slip; you just do not know what yet, and neither does the client.'),
        o('Add contractors from next week to cover the gap', [-2, -6, -4, -2], 'Adding people late makes a late effort later. Onboarding in a bank — access, controls, domain knowledge — consumes the very capacity you were trying to add.')
      ]),
      q('*', 'pi-planning', 'The program board lights up with red strings: your work for {client} depends on another train that has not planned for it. How do you handle it?', [
        o('Walk over, negotiate the dependency face to face, put it on the board and raise it as a program risk to be ROAMed', [4, 8, 4, 6], 'PI Planning exists precisely for this conversation. A visible, owned dependency is manageable; an invisible one is a surprise in iteration four.'),
        o('Note it in the plan and assume they will deliver in time', [-2, -10, -2, -2], 'An assumed dependency is an unmanaged risk. Without an explicit agreement on which iteration they will deliver in, your plan is fiction.'),
        o('Build a temporary workaround inside your own team so you do not need them', [0, -2, -6, -2], 'Sometimes pragmatic, but duplicating capability inside a bank creates extra surface for audit, security and reconciliation. Talk first.')
      ]),
      q('*', 'pi-planning', 'It is time for the confidence vote. Your team averages two fingers out of five. What happens next?', [
        o('Pause, hear the concerns, rework the plan — reduce scope or resolve risks — and vote again', [4, 8, 2, 10], 'The confidence vote is a commitment mechanism, not theatre. A low vote is valuable data; honouring it builds the psychological safety that makes future plans reliable.'),
        o('Record the low vote and move on — the agenda is tight', [-2, -8, -2, -10], 'Ignoring the vote teaches people that speaking up is pointless. Next PI they will show five fingers and say nothing.'),
        o('Ask leadership to remind the teams how important this delivery is', [-2, -6, 0, -12], 'Pressure does not change capacity. It only changes what people are willing to tell you.')
      ]),
      q('*', 'pi-planning', 'Write one PI objective for your group that {client} would recognise as valuable. (Free text — this is captured in your plan.)', [], { type: 'text' }),

      /* ───────────── Backlog Refinement ───────────── */
      q('*', 'refinement', 'A story reads: "Build the new approval workflow for {client}". It is estimated at 21 points — more than the team finishes in an iteration. What do you do?', [
        o('Split it into thin vertical slices that each deliver something testable (for example single approver first, then multi-level, then limits)', [6, 8, 2, 4], 'Small vertical slices flow faster, get feedback sooner and reduce risk. Each slice should still be demonstrable end to end.'),
        o('Split it by layer: database story, API story, screen story', [-2, -4, 0, -2], 'Horizontal slices deliver nothing usable until all are done, so feedback and integration risk are pushed to the end.'),
        o('Keep it whole and carry it over two iterations', [-2, -8, -2, -4], 'Carry-over hides progress and delays feedback. If it does not fit in an iteration, it is not ready.')
      ]),

      /* ───────────── Iteration Planning ───────────── */
      q('*', 'iteration-planning', 'Two engineers are on leave this iteration and a compliance training day is scheduled. How does the team plan?', [
        o('Calculate actual capacity for this iteration and pull only what fits, anchored on a clear iteration goal', [2, 10, 2, 8], 'Capacity-based planning is how teams become predictable. An iteration goal gives focus and room to adapt when surprises come.'),
        o('Plan to the usual velocity — the team should make up the difference', [-2, -8, -4, -8], 'Planning beyond capacity guarantees carry-over or cut corners. In a bank, cut corners tend to surface as incidents.'),
        o('The Product Owner assigns stories to named individuals to make sure everything is covered', [-2, -2, 0, -8], 'The team owns the plan. Assigning work to individuals creates silos and removes the self-organisation that makes teams resilient to absence.')
      ]),
      q('*', 'iteration-planning', 'Which of these belong in your team’s Definition of Done for work touching client money? (Select all that apply.)', [
        o('Automated tests pass in the pipeline', [0, 3, 4, 1], 'Automation makes quality repeatable and fast.'),
        o('Security and compliance controls are evidenced automatically', [0, 2, 6, 1], 'Compliance built into the pipeline beats a manual gate at the end.'),
        o('Accepted by the Product Owner against acceptance criteria', [4, 2, 0, 1], 'The Product Owner confirms it delivers the intended value.'),
        o('"Works on my machine"', [-2, -4, -6, -2], 'Until it is integrated and tested in a production-like environment it is not done.'),
        o('Sign-off collected by email from five separate committees', [-2, -8, 0, -4], 'Heavy manual sign-offs create queues without adding safety. Shift the controls left and automate the evidence.')
      ], { type: 'multi' }),

      /* ───────────── Daily Stand-up ───────────── */
      q('*', 'daily', 'In the stand-up an engineer mentions — almost in passing — that the test environment for the payments gateway has been down for two days.', [
        o('Make it visible as an impediment, swarm on what the team can do, and escalate the rest the same day', [2, 10, 2, 6], 'Two days of silent blocking is two days lost. The stand-up exists to surface impediments; the Scrum Master makes sure they are owned and escalated.'),
        o('Note it and discuss it at the retrospective next week', [-2, -8, -2, -4], 'Retrospectives improve the system; they are too late for an active blocker. Impediments need action today.'),
        o('Ask the engineer to work on something else in the meantime', [-2, -4, 0, -2], 'This raises work in process and leaves the real problem unsolved. The blocked story is still blocked.')
      ]),
      q('*', 'daily', 'The stand-up has turned into a 40-minute status report to the manager, one person at a time.', [
        o('Refocus on the iteration goal: walk the board right to left, keep to 15 minutes, take details to a "meet-after"', [2, 8, 0, 8], 'The stand-up is the team’s own planning event. Walking the board keeps the focus on finishing work rather than on being busy.'),
        o('Cancel stand-ups and replace them with a written status update', [-2, -6, -2, -4], 'You lose the daily chance to re-plan together and catch blockers. Fix the event; do not delete it.'),
        o('Keep it — the manager needs the detail', [-2, -4, 0, -8], 'Status reporting erodes ownership. Managers can see progress on the board and at the demo.')
      ]),

      /* ───────────── ART Sync ───────────── */
      q('*', 'art-sync', 'Mid-PI, one team reports that a committed PI objective for {client} is at risk because a shared service is late.', [
        o('Make it visible, re-ROAM the risk, and work with Product Management and Business Owners to re-plan scope or sequence', [4, 8, 4, 6], 'Bad news early is good news. The ART Sync lets the train adjust together while there are still options.'),
        o('Keep it amber on the report and hope to recover in the IP iteration', [-4, -10, -4, -4], 'The Innovation & Planning iteration is not a buffer for overruns. "Watermelon" reporting — green outside, red inside — destroys trust when it bursts.'),
        o('Ask the team to work weekends to hit the date', [0, -4, -4, -12], 'Heroics do not fix a dependency on someone else, and unsustainable pace raises the error rate in systems that move client money.')
      ]),
      q('*', 'art-sync', 'A senior relationship manager goes straight to a team with an "urgent" new request for {client} that would displace planned work.', [
        o('Route it through Product Management: assess value and cost of delay, then make a transparent trade-off against the PI plan', [6, 6, 2, 6], 'Agility welcomes change — through a single, visible prioritisation path. The trade-off should be a business decision, made in the open.'),
        o('The team takes it on quietly to keep the stakeholder happy', [0, -10, -2, -6], 'Shadow work breaks commitments invisibly. Other stakeholders find out when their feature is late.'),
        o('Refuse — the PI plan is locked until the next PI', [-6, 2, 0, -2], 'A PI plan is a commitment, not a cage. Refusing all change misses real opportunities; the skill is making trade-offs explicit.')
      ]),

      /* ───────────── Iteration Review ───────────── */
      q('*', 'iteration-review', 'A story is "90% done" — coded, but not tested against the acceptance criteria. Do you demo it?', [
        o('No. Show only work that meets the Definition of Done and be transparent about what is not finished', [2, 6, 6, 4], 'Only done work counts. Transparency about what is not finished is what makes the review trustworthy.'),
        o('Demo it and count the points — it is basically finished', [0, -8, -6, -2], 'Partial credit inflates velocity and hides risk. The last 10% is usually where the defects are.'),
        o('Show slides describing what it will do', [-2, -4, 0, -2], 'Working software is the measure of progress. Slides cannot be tested by a stakeholder.')
      ]),

      /* ───────────── Iteration Retrospective ───────────── */
      q('*', 'retro', 'The retrospective produced fifteen improvement ideas. Last iteration’s actions were never done.', [
        o('Pick one or two improvements, turn them into backlog items with owners, and plan them into the next iteration', [2, 8, 2, 8], 'Relentless improvement happens in small, finished steps. Putting improvement items in the backlog gives them real capacity.'),
        o('Record all fifteen in the wiki so nothing is lost', [0, -4, 0, -6], 'A long list nobody acts on teaches the team that retrospectives change nothing.'),
        o('Skip retrospectives for a while — the deadline is too close', [-2, -6, -2, -8], 'Under pressure is exactly when the system needs inspection. Skipping the retro removes the brake as you speed up.')
      ]),

      /* ───────────── System Demo ───────────── */
      q('*', 'system-demo', 'The system demo is tomorrow. Each team’s work passes on its own, but the integrated flow fails in the staging environment.', [
        o('Demo what is truly integrated, show the failure honestly, and make fixing integration the train’s top priority', [2, 8, 6, 4], 'The system demo is the only objective measure of progress. An honest failure now is far cheaper than discovering it at release.'),
        o('Let each team demo separately from its own environment', [0, -8, -6, -2], 'Team-by-team demos hide the integration risk the system demo is designed to expose.'),
        o('Cancel the demo until everything works', [-4, -8, -2, -4], 'Cancelling removes the feedback loop and the cadence. Integration problems grow in the dark.')
      ]),

      /* ───────────── Solution Demo ───────────── */
      q('*', 'solution-demo', 'Who do you invite to the solution demo of {initiative}?', [
        o('Real users from {client} alongside operations, risk and senior stakeholders — and you ask for candid feedback', [10, 4, 4, 4], 'Putting the real solution in front of real client users is the fastest way to validate the hypothesis. Operations and risk in the room avoids late surprises.'),
        o('Internal senior stakeholders only — clients see it when it is finished', [-6, 0, 0, -2], 'You delay the most valuable feedback until it is most expensive to act on.'),
        o('Nobody outside the teams; send a recorded video afterwards', [-6, -2, -2, -4], 'A video is one-way. The demo is a conversation that shapes the next PI.')
      ]),
      q('*', 'solution-demo', '{client}’s treasurer says the demo is impressive but the feature they need most is not the one you built first.', [
        o('Thank them, capture the insight, and re-prioritise the roadmap for the next PI using cost of delay', [10, 4, 0, 4], 'This is the system working. Learning in one PI that priorities were off is a success — you still have time and budget to respond.'),
        o('Explain that the roadmap was agreed and signed off last year', [-10, 0, 0, -4], 'Following a plan over responding to the client is how banks lose mandates to faster competitors.'),
        o('Promise both features for next quarter without checking capacity', [2, -10, -2, -8], 'An unvalidated promise to a client becomes a forced commitment on the teams — and usually a broken one.')
      ]),

      /* ───────────── Portfolio Sync ───────────── */
      q('*', 'portfolio-sync', 'An epic has consumed its MVP budget. Leading indicators show client adoption well below the hypothesis.', [
        o('Hold a pivot-or-persevere decision on the evidence — stop or reshape the epic and release the capacity', [6, 8, 2, 4], 'Stopping is a valid, valuable outcome. Lean portfolio governance is about funding what works, not defending sunk cost.'),
        o('Extend the funding — too much has been invested to stop now', [-6, -6, -2, -4], 'Sunk cost is not a reason to continue. Every pound here is a pound not spent on a better hypothesis.'),
        o('Change the success measures so the epic appears on track', [-8, -4, -8, -6], 'Moving the goalposts destroys the integrity of the whole governance system — and in a regulated firm, misleading reporting is a conduct issue.')
      ]),
      q('*', 'portfolio-sync', 'Value streams are spending within budget, but three have quietly drifted to 95% "run the bank" work with almost no investment in new capability.', [
        o('Use the investment-horizon guardrail: make the mix visible and rebalance with the value stream leads', [6, 4, 4, 2], 'Guardrails exist to keep a healthy balance between today’s operations and tomorrow’s growth without micromanaging each decision.'),
        o('Take the budget back and approve every item centrally from now on', [-4, -10, 0, -8], 'Centralising every decision recreates the approval queues lean budgets were meant to remove.'),
        o('Leave it — they are within budget', [-6, 0, -2, 0], 'Being on budget while starving the future is a strategic failure that no variance report will show.')
      ]),

      /* ───────────── Inspect & Adapt ───────────── */
      q('*', 'inspect-adapt', 'The train delivered 62% of planned business value this PI. How do you use the Inspect & Adapt workshop?', [
        o('Share the numbers openly, run root-cause analysis on the biggest systemic problem, and put the improvement into the next PI backlog', [4, 8, 2, 8], 'Predictability improves when the train treats misses as system problems to solve, not people to blame. Improvement items need real capacity in the next PI.'),
        o('Find out which teams missed and ask their managers for recovery plans', [-2, -4, 0, -12], 'Blame drives problems underground. Most delivery problems live in the system — dependencies, environments, overload — not in individuals.'),
        o('Re-baseline the objectives so the figure looks closer to 80%', [-4, -6, -6, -6], 'Adjusting the measure hides the problem and guarantees it recurs.')
      ]),
      q('*', 'inspect-adapt', 'Root-cause analysis points to the same issue for the third PI running: releases wait three weeks for a manual change-approval board.', [
        o('Bring risk and change management in as partners to automate evidence and move to risk-based, pre-approved standard changes', [6, 10, 6, 6], 'Controls matter; queues do not. Automating evidence usually makes the control stronger and faster at once. Solving it with risk colleagues, not around them, is what makes it stick.'),
        o('Accept it — banks are regulated and nothing can be done', [-4, -8, 0, -6], 'Regulation requires effective controls, not slow ones. Many banks have automated this successfully.'),
        o('Bypass the board for "urgent" releases', [0, 2, -14, -2], 'Circumventing a control is a serious conduct and operational risk. Change the control properly — never work around it.')
      ]),

      /* ───────────── Strategic Portfolio Review ───────────── */
      q('*', 'qbr', 'At the quarterly review, how does ExCo judge whether {initiative} is succeeding?', [
        o('Outcome measures — client adoption, time to value, NPS, cost to serve — alongside flow and predictability', [10, 4, 2, 4], 'Outcomes tell you whether the investment is working. Output measures such as milestones hit and budget spent only tell you that people were busy.'),
        o('Milestones delivered on time and on budget against the original plan', [-4, 0, 0, -4], 'On time and on budget says nothing about whether clients are using it. It rewards following the plan, not achieving the outcome.'),
        o('Lines of code and story points delivered per team', [-6, -6, 0, -8], 'Comparing teams on output invites gaming and tells you nothing about value.')
      ]),
      q('*', 'qbr', 'A regulator has issued new operational-resilience expectations that affect every portfolio. How does ExCo respond?', [
        o('Adjust strategic themes and guardrails, fund the enabler work explicitly, and let value streams plan it into the next PI', [2, 6, 12, 4], 'Regulatory change is strategy input. Feeding it through themes and the normal planning cadence gets a faster, better-integrated response than a parallel programme.'),
        o('Launch a separate emergency programme with its own teams and governance', [-2, -8, 4, -6], 'A parallel programme competes for the same experts and systems, and its changes collide with the trains’ work.'),
        o('Ask each team to fit it in around current commitments', [-4, -6, -8, -8], 'Unfunded mandates lead to overload and uneven compliance — the worst outcome with a regulator.')
      ]),

      /* ═════════════ Scenario-specific questions ═════════════ */
      // Payments
      q('s-payments', 'epic-review', 'For Instant Bulk Payouts, what is the smallest thing you could ship that proves the idea for Northwind?', [
        o('Instant payouts in one currency for one client segment, capped at a low value limit, running beside the batch engine', [10, 6, 4, 2], 'A thin end-to-end slice proves the scheme connection, fraud controls and reconciliation with real money, while limiting exposure.'),
        o('Replace the entire legacy batch engine first, then add instant payments on top', [-8, -10, 2, -6], 'A multi-year replatform delivers no client value before the deadline and concentrates risk into one big cut-over.'),
        o('A polished clickable prototype of the payout screen', [0, -2, -4, 0], 'Useful for usability, but the real risks here are scheme connectivity, liquidity and fraud — a prototype tests none of them.')
      ]),
      q('s-payments', 'pi-planning', 'Fraud screening for instant payments must respond in under 200 ms, and the fraud platform team sits in another train. How do you plan for it?', [
        o('Invite them into your planning, agree the interface early and plan an integration spike in iteration one', [4, 8, 8, 4], 'Tackling the riskiest integration first buys learning while there is still time to adapt. Shared planning turns a dependency into a joint commitment.'),
        o('Plan fraud integration for the last iteration, once the payment flow works', [-2, -8, -8, -2], 'Leaving the highest-risk item to the end is how deadlines are missed. A late fraud failure blocks go-live entirely.'),
        o('Launch with fraud checks done after the payment is sent', [2, 2, -14, -2], 'An instant payment cannot be recalled. Post-event screening on an irrevocable payment is outside any reasonable risk appetite.')
      ]),
      q('s-payments', 'system-demo', 'The demo shows instant payouts working, but ISO 20022 remittance data is truncated when it reaches Northwind’s ERP system.', [
        o('Treat it as a top-priority finding, pair with the client’s ERP team and fix the mapping next iteration', [10, 4, 2, 2], 'Rich remittance data is the reason the client wants this. Finding the gap in a demo, with weeks to spare, is exactly what demos are for.'),
        o('Log a defect to fix after go-live — payments work, which is what matters', [-8, 0, -2, -2], 'For a treasurer, a payment they cannot reconcile is only half a payment.'),
        o('Tell the client to upgrade their ERP', [-10, 0, 0, -2], 'Pushing the problem to the client is an invitation for the fintech rival.')
      ]),
      // Liquidity
      q('s-liquidity', 'epic-review', 'Real-time sweeping across 14 countries is a huge epic. Where do you start?', [
        o('Two countries with simple rules and high client volume, to prove real-time balances and sweeping end to end', [8, 8, 4, 2], 'Start where learning is cheapest and value is real. The architecture gets validated before you meet the hardest tax and regulatory regimes.'),
        o('All 14 countries at once so the client gets the full proposition', [-4, -10, -6, -6], 'Fourteen regulatory regimes in one release means the slowest legal opinion sets the date for everyone.'),
        o('The most complex jurisdiction first — if that works, the rest are easy', [0, -6, 0, -4], 'Tackling risk early is good, but starting with the hardest regulatory case delays any client value by many months.')
      ]),
      q('s-liquidity', 'pi-planning', 'Real-time sweeping needs intraday balances, but the core banking platform only posts at end of day. The core team says a change will take three PIs.', [
        o('Plan an enabler: an event-driven intraday balance service fed from the core, agreed with the System Architect and the core team', [6, 6, 4, 4], 'Architectural runway built just ahead of need lets features flow without waiting years for a core replacement.'),
        o('Wait three PIs for the core change', [-10, -4, 0, -4], 'Nine months of waiting is nine months of cost of delay — and Helix will be talking to other banks.'),
        o('Have the feature team estimate balances from payment messages without telling the core team', [2, -2, -10, -2], 'A shadow ledger nobody governs is a reconciliation and regulatory-reporting incident in waiting.')
      ]),
      q('s-liquidity', 'system-demo', 'In the demo, a sweep leaves an entity in one country briefly overdrawn, which may breach local lending rules.', [
        o('Stop the line: bring in legal and compliance, add the rule as an automated control, and re-demo', [2, 2, 14, 2], 'Compliance built into the solution as an automated rule is a permanent fix. Catching it in a demo costs days; catching it in production costs a regulatory breach.'),
        o('Add a manual end-of-day check by operations', [0, -4, 2, -2], 'A manual detective control catches the breach after it has happened and does not scale to 300 accounts.'),
        o('Ship it — the overdraft only lasts a few seconds', [2, 2, -14, -2], 'Duration is not a defence in most regimes. This is a known breach knowingly released.')
      ]),
      // FX
      q('s-fx', 'epic-review', 'What hypothesis should the Automated FX Hedging epic test first?', [
        o('That Aurora’s treasury will route real hedges through the API if pricing and execution are reliable for one currency pair', [10, 6, 2, 2], 'Adoption is the riskiest assumption. One currency pair with a real client tests demand, pricing and the integration in one experiment.'),
        o('That the bank can build an API covering all 130 currency pairs and every product', [-4, -8, -2, -4], 'That tests your ability to build, not whether anyone will use it.'),
        o('That the sales team believes clients want it', [-4, 0, -2, 0], 'Internal opinion is not evidence. Only client behaviour validates a hypothesis.')
      ]),
      q('s-fx', 'pi-planning', 'Automated hedges must be checked against Aurora’s credit limit before execution, but the limits system responds in four seconds.', [
        o('Raise it as a program risk, plan an enabler for a fast limits cache with the credit team, and agree fail-safe behaviour', [4, 6, 10, 2], 'Naming the constraint and designing a safe fallback (reject if the limit is unknown) protects the bank while the enabler removes the bottleneck.'),
        o('Skip the limit check for trades under a threshold to hit latency targets', [4, 4, -14, -2], 'Unchecked automated trading is how a small bug becomes a large credit loss. Controls are part of the product.'),
        o('Accept four-second pricing', [-10, 0, 2, -2], 'In FX a four-second-old price is no price. The client will not adopt it and the hypothesis fails for the wrong reason.')
      ]),
      q('s-fx', 'system-demo', 'The demo runs well, then a simulated market spike triggers 300 hedges in a minute due to a rule misconfiguration on the client side.', [
        o('Add circuit breakers and client-configurable limits to the backlog as must-haves before go-live, and demo them next iteration', [6, 2, 12, 2], 'Resilience against runaway automation protects both client and bank. Finding it in a demo is a gift.'),
        o('Note that it was the client’s configuration error, not a bank defect', [-6, 0, -8, -2], 'Technically true and commercially useless. A regulator will ask why the bank’s system allowed it.'),
        o('Remove automation and require manual confirmation of every hedge', [-10, -2, 4, -2], 'Safe, but it removes the reason the product exists. Guardrails beat handbrakes.')
      ]),
      // Trade
      q('s-trade', 'epic-review', 'Issuing a letter of credit for Kestrel takes nine days. Where do you look first to shorten it?', [
        o('Map the value stream end to end and measure where the work waits — then attack the longest queue', [8, 10, 2, 4], 'Most lead time is waiting, not working. Value stream mapping shows whether the delay is in document checking, sanctions, or hand-offs between hubs.'),
        o('Build a modern client front end for applications', [2, -2, 0, 0], 'A beautiful front end on a nine-day back office is still a nine-day process.'),
        o('Ask each operations hub to work faster', [-2, -4, -4, -10], 'Local speed-ups rarely help when the delay is in the queues between steps — and pressure on document checkers raises error risk.')
      ]),
      q('s-trade', 'pi-planning', 'Operations staff in three hubs will use the new digital LC workflow, but none of them are part of the train.', [
        o('Bring operations representatives into PI Planning and the demos, and treat their readiness as part of the plan', [6, 6, 4, 8], 'The value stream includes the people who operate the solution. Planning with them prevents a technically finished product that nobody can run.'),
        o('Deliver the system and hand over a training pack at go-live', [-4, -6, -4, -6], 'A handover at the end is a hand grenade. Expect workarounds, errors and a rollback.'),
        o('Ask a business analyst to represent operations’ views', [0, 0, -2, -2], 'A proxy is better than nothing but filters out the detail that only people doing the work know.')
      ]),
      q('s-trade', 'system-demo', 'Sanctions screening of electronic documents returns 40% false positives in the demo, each needing manual review.', [
        o('Work with the financial-crime team to tune and test screening rules on real document samples, with measured thresholds', [6, 8, 8, 2], 'Tuning a control with its owners improves both flow and effectiveness — fewer false alerts means real ones get proper attention.'),
        o('Lower the screening sensitivity ourselves so fewer alerts are raised', [2, 4, -16, -2], 'Unilaterally weakening a sanctions control is among the most serious breaches a bank can commit.'),
        o('Hire more reviewers to clear the alerts', [-2, -4, 2, -4], 'It treats the symptom at permanent cost and leaves a nine-day process largely intact.')
      ]),
      // Digital channels
      q('s-digital', 'epic-review', 'The Unified Corporate Portal depends on every product portfolio exposing its services. How should the portfolio organise the work?', [
        o('Agree shared API standards and a platform team, and have each product train deliver its own journeys into the portal', [8, 8, 4, 6], 'A platform with clear standards lets product teams move independently while the client sees one experience. Ownership stays with the people who know the product.'),
        o('Create one central portal team that builds all journeys for every product', [-2, -10, -2, -6], 'The central team becomes the bottleneck for seven portfolios, and lacks each product’s domain knowledge.'),
        o('Let each product build its own section in its own way', [-6, 2, -4, 0], 'That reproduces today’s three channels inside one login.')
      ]),
      q('s-digital', 'pi-planning', 'Six thousand Orion users must move from three legacy channels. How do you plan the migration?', [
        o('Migrate in small cohorts starting with a friendly pilot group, with feature toggles and a way back', [8, 6, 8, 4], 'Small batches limit the blast radius and generate learning. Release on demand: separate deploying code from releasing it to users.'),
        o('One big-bang cut-over weekend so the legacy channels can be switched off quickly', [-4, -6, -12, -8], 'A big-bang migration of payment-approving users concentrates every risk on one weekend, with no way to learn first.'),
        o('Run all channels indefinitely and let users move when they like', [-2, -4, -4, -2], 'With no plan to retire legacy, the bank pays to run four channels and to secure all of them.')
      ]),
      q('s-digital', 'system-demo', 'Orion’s payment approvers try mobile approval in the demo. They say the security step takes so long they would go back to the old channel.', [
        o('Bring UX, security and the client together to redesign the step — strong authentication that is also quick — and test it with users', [10, 4, 6, 4], 'Security and usability are not opposites. Co-designing with the security team avoids trading one for the other.'),
        o('Remove the extra authentication step for mobile', [4, 2, -14, -2], 'Weakening authentication on payment approval is an open door for fraud.'),
        o('Explain that security requirements are non-negotiable and move on', [-10, 0, 2, -2], 'Users who abandon the channel are a failed outcome, however secure it is.')
      ]),
      // Data
      q('s-data', 'epic-review', 'Cash-flow forecasting needs data from eleven product systems. What is your first increment?', [
        o('Forecasts from two high-quality sources (accounts and payments) for a pilot client, with lineage built in from day one', [10, 6, 6, 2], 'A thin data product proves client value early, and building lineage in from the start is far cheaper than retrofitting it.'),
        o('Build the complete enterprise data lake first, then the insights', [-8, -10, 0, -6], 'Data platforms built ahead of a use case tend to fill with data nobody uses. Let real products pull the platform.'),
        o('Have data scientists build a model on extracts on their laptops', [2, 2, -14, 0], 'Client data on laptops with no lineage or consent trail fails every data-governance and privacy test.')
      ]),
      q('s-data', 'pi-planning', '"Available balance" is defined three different ways across source systems. Teams discover this during planning.', [
        o('Name a data owner, agree one definition with the product portfolios, and plan it as an enabler ahead of the feature', [6, 6, 8, 4], 'Shared definitions with a clear owner are part of the runway for every data product. Without them, forecasts are confidently wrong.'),
        o('Each team uses the definition from its own source', [-6, 2, -8, 0], 'The client gets a forecast that does not match their statement — and the first support call destroys trust in the product.'),
        o('Pause all work until an enterprise data dictionary is complete', [-6, -10, 2, -6], 'Boiling the ocean stops delivery. Define what this product needs now, and grow the dictionary incrementally.')
      ]),
      q('s-data', 'system-demo', 'Meridian’s CFO likes the forecast but asks: "Who else can see my data, and did I agree to this use?"', [
        o('Show the consent record and access controls in the product, and add client-facing transparency to the backlog', [8, 2, 12, 2], 'Trust is a feature. Demonstrable consent and access controls turn a compliance requirement into a selling point.'),
        o('Reassure them verbally that the bank takes privacy seriously', [-4, 0, -6, 0], 'A treasurer — and a regulator — will want evidence, not reassurance.'),
        o('Promise to check with legal after launch', [-6, 0, -12, -2], 'Launching a data product without a confirmed lawful basis is a serious regulatory exposure.')
      ]),
      // Commercial issuing
      q('s-issuing', 'epic-review', 'Virtual Cards for B2B depends on an external card processor that releases quarterly. How do you shape the epic?', [
        o('Bring the supplier into the value stream — shared roadmap, their people at PI Planning — and design an MVP around what they can deliver first', [8, 8, 4, 4], 'Suppliers are part of the system. Planning with them on a common cadence turns a constraint into a known quantity.'),
        o('Write a detailed contract change request and wait for their delivery', [-4, -10, 2, -4], 'Contract-first collaboration moves at the speed of procurement and hides integration risk until late.'),
        o('Start building an in-house processor to remove the dependency', [-4, -8, -6, -4], 'Building a card processor is a multi-year, heavily regulated undertaking that does nothing for Summit this year.')
      ]),
      q('s-issuing', 'pi-planning', 'Summit will create millions of single-use cards. The fraud team worries about volume; the client wants zero friction.', [
        o('Have fraud specialists plan with the teams: spend controls per card (supplier, amount, dates) designed in as features', [8, 6, 10, 4], 'Single-use cards locked to supplier, amount and date are themselves a strong fraud control. Designing with the fraud team gets safety and low friction.'),
        o('Launch without extra controls and monitor fraud after go-live', [4, 2, -14, -2], 'Fraud losses at this volume grow faster than you can react — and the scheme will hold the issuer liable.'),
        o('Require manual approval for every card created', [-12, -4, 4, -2], 'Manual approval of millions of cards defeats the entire proposition.')
      ]),
      q('s-issuing', 'system-demo', 'Card creation works in the demo, but the reconciliation file does not match Summit’s booking references, so their finance team cannot auto-match.', [
        o('Prioritise it: co-design the reconciliation data with Summit’s finance team and demo it with their real booking data', [12, 4, 2, 2], 'Automatic reconciliation is the client’s real job to be done. The card is only the means.'),
        o('Offer a spreadsheet template they can use to match manually', [-8, 0, 0, -2], 'A manual workaround at millions of transactions a year is a reason to choose another issuer.'),
        o('Defer it to a later phase — card creation was the PI objective', [-6, 0, 0, -2], 'Hitting the objective while missing the outcome is output thinking. Use the feedback to adjust the plan.')
      ])
    ]
  };
})();
