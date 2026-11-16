/* Deep-dive learning questions: used only in the "Learn a role or event" mode, never in missions.
   Three per event and two per role; the mode also draws on the shared and role-specific
   questions defined elsewhere. Loaded after data.js.
   Row format: [event, prompt, [answer, [value, flow, risk, team], feedback] x3]. */
(function () {
  const D = window.AS_DEFAULTS;
  const push = (id, event, roles, r) => D.questions.push({
    id, scenario: '*', event, levels: [], roles, mode: 'learn', type: 'single', prompt: r[0],
    options: r.slice(1).map(o => ({ text: o[0], impact: { v: o[1][0], f: o[1][1], r: o[1][2], m: o[1][3] }, feedback: o[2] }))
  });
  const event = (id, rows) => rows.forEach((r, n) => push('l-ev-' + id + '-' + (n + 1), id, [], r));
  const role = (id, rows) => rows.forEach((r, n) => push('l-ro-' + id + '-' + (n + 1), r[0], [id], r.slice(1)));

  /* ═════════════ Events ═════════════ */
  event('strategy', [
    ["What should a Strategy & OKR Alignment session produce?",
      ["A small set of strategic themes with measurable key results that portfolios can use to make trade-offs", [8, 6, 2, 4], "Themes give direction and key results make it testable. Together they let people closer to the client decide well without asking permission."],
      ["A detailed list of projects with owners and delivery dates", [-4, -6, 0, -4], "That is a plan, made at the moment leaders know least. It leaves no room for the portfolios to find better answers."],
      ["An inspiring vision statement", [-2, -2, 0, 0], "A vision helps, but without measures nobody can tell whether the organisation is getting closer to it."]],
    ["A proposed key result reads: \"Launch the new client portal by the third quarter.\" What is wrong with it?",
      ["It describes an output. Rewrite it as an outcome, such as \"60% of active clients use the portal weekly by the third quarter\"", [10, 4, 0, 2], "A launch can happen on time and change nothing. An outcome measure tells you whether clients actually benefited."],
      ["Nothing — it is clear and has a date", [-6, 0, 0, 0], "Clear and dated, but it measures delivery. Teams can hit it and still fail the objective."],
      ["It is too specific; make it \"improve the digital experience\"", [-4, -2, 0, -2], "Vaguer is worse. Nobody can tell whether it has been achieved."]],
    ["The market shifts sharply six months after the themes were set. What should happen?",
      ["Review the themes at the regular quarterly checkpoint and change them where the evidence calls for it", [8, 6, 2, 4], "Strategy is reviewed on a cadence so that it can respond to facts without lurching."],
      ["Hold the themes until the annual cycle so that teams have stability", [-8, -2, 0, -2], "Stability of direction is valuable, but not when the direction is now wrong."],
      ["Change direction whenever an executive has a new idea", [-4, -10, 0, -10], "Constant redirection means nothing gets finished, and teams stop believing any priority will last."]]
  ]);
  event('epic-review', [
    ["What makes a piece of work an epic, as opposed to a feature?",
      ["It is large enough to need analysis and a lean business case, and usually spans several trains or Planning Intervals", [4, 8, 2, 2], "Epics are significant investments, so they get portfolio-level scrutiny. Features fit within one train and one PI."],
      ["A senior person asked for it", [-2, -6, 0, -2], "Seniority of the requester says nothing about size or about the level of analysis needed."],
      ["It will take more than two weeks", [-2, -6, 0, 0], "By that definition almost everything is an epic, and the portfolio drowns in small items."]],
    ["An epic has been in the \"Analysing\" column of the portfolio Kanban for nine months. What does that tell you?",
      ["Analysis has no time-box or WIP limit. Do just enough to decide on an MVP, then learn from building it", [6, 10, 2, 4], "Analysis has diminishing returns. The real answers come from testing a small increment with clients."],
      ["The epic is complex and deserves thorough analysis", [-4, -10, 0, -4], "Nine months of analysis is nine months of cost of delay, and the assumptions are still untested."],
      ["The Analysing column should be removed", [-2, 2, -6, 0], "Then epics start with no understanding of cost, risk or regulatory impact."]],
    ["Who decides whether an epic goes ahead?",
      ["The portfolio leadership, with the Epic Owner, Business Owners and architects, using the lean business case and an open ranking", [6, 6, 4, 4], "A go decision commits scarce capacity across trains, so it is made by those accountable for the whole portfolio, on shared evidence."],
      ["The Epic Owner, as the person who knows it best", [-2, -2, -4, 0], "The Epic Owner is the advocate. Advocates should not approve their own cases."],
      ["Technology, depending on available capacity", [-6, 0, 0, -2], "Capacity is an input. Whether the investment is worth making is a business decision."]]
  ]);
  event('pre-pi', [
    ["What is Pre-PI Planning for?",
      ["Aligning the trains and suppliers on vision, top priorities, capacity and key dependencies, as input to each train's PI Planning", [4, 10, 2, 4], "It sets up the trains to plan well. The planning itself is still done by the teams, in PI Planning."],
      ["Producing a finished PI plan for the teams to follow", [-4, -6, 0, -10], "Plans handed down are not owned by the people who must deliver them."],
      ["Reviewing the status of the last PI", [-2, -4, 0, 0], "Looking back is the job of Inspect & Adapt. This event looks forward."]],
    ["Who needs to be in Pre-PI Planning?",
      ["The Solution Train Engineer, Solution Management and architects, with each train's RTE and Product Management, and key suppliers", [4, 8, 2, 4], "These are the people who can align priorities and capacity across trains. Suppliers are included because their work must integrate too."],
      ["Senior managers only", [-4, -6, 0, -4], "They can set intent, but they do not hold the knowledge of each train's backlog and capacity."],
      ["Every member of every team", [-2, -6, 0, -2], "That is PI Planning. Doing it here doubles the cost and delivers less."]],
    ["A supplier works to fixed contract milestones and does not plan in Planning Intervals. How do you handle it?",
      ["Bring them into Pre-PI Planning, agree integration points for each PI, and move the contract towards incremental delivery over time", [4, 8, 4, 4], "You cannot integrate frequently with a supplier who delivers rarely. Shared planning is the first step; the contract can follow."],
      ["Manage them through the contract and its milestones", [-2, -8, -2, -2], "You will learn about integration problems at the milestone, when they are most expensive."],
      ["Leave them out of the planning", [-4, -10, -4, -2], "Their component becomes the unplanned dependency that surprises every train."]]
  ]);
  event('pi-planning', [
    ["What are the two main outputs of PI Planning?",
      ["Committed PI objectives for each team, with business value assigned, and a program board showing features, dependencies and milestones", [6, 10, 2, 6], "The objectives are the commitment; the board makes the plan and its dependencies visible to everyone."],
      ["A task-level plan for each person for the next ten weeks", [-2, -8, 0, -8], "That level of detail is false precision. Teams plan iterations in detail one at a time."],
      ["A signed-off requirements document", [-4, -6, 0, -4], "PI Planning produces a shared plan and a commitment, not a specification."]],
    ["At the end of PI Planning the train \"ROAMs\" its risks. What does that mean?",
      ["Each program risk is discussed openly and classed as Resolved, Owned, Accepted or Mitigated, in front of the whole train", [2, 8, 8, 6], "Every risk leaves the room with a clear status and, where needed, a named owner. Doing it in the open builds trust."],
      ["Risks are logged in a register for the project office to review later", [-2, -6, -6, -2], "A register nobody has discussed is a list. The value is in the conversation and the ownership."],
      ["Only risks that already have a solution are raised", [-2, -6, -8, -6], "The risks without solutions are the ones leaders most need to hear."]],
    ["What is an \"uncommitted objective\"?",
      ["Work the team plans and intends to do but, because of real uncertainty, does not count in its commitment", [4, 10, 2, 6], "It keeps the commitment reliable while being honest about stretch goals. It is not a way to hide spare capacity."],
      ["A wish-list item the team does not expect to work on", [-2, -4, 0, -2], "Uncommitted objectives are planned and worked on. They are just not promised."],
      ["Hidden buffer that the business should not be told about", [-4, -6, -2, -6], "Uncommitted objectives are visible to everyone. Hidden buffers destroy trust in plans."]]
  ]);
  event('refinement', [
    ["Who should take part in backlog refinement, and when?",
      ["The whole team with the Product Owner, regularly, looking one or two iterations ahead", [4, 8, 2, 6], "The people who will build the work need to shape it. A little time often keeps the backlog ready without big meetings."],
      ["The Product Owner and analyst, who then hand finished stories to the team", [-2, -6, 0, -6], "The team loses the understanding that comes from the conversation, and finds the gaps mid-iteration."],
      ["Everyone, in one long session at the start of the PI", [-2, -8, 0, -4], "Stories refined months ahead are stale by the time they are built."]],
    ["A story reads: \"As a user, I want the system to be fast.\" Is it ready?",
      ["No. Make it specific, small and testable — who, doing what, with a measurable response time", [6, 6, 4, 2], "A ready story can be estimated and tested. \"Fast\" means something different to everyone."],
      ["Yes — the team can interpret it sensibly", [-4, -6, -2, -2], "Each person will interpret it differently, and nobody can say when it is done."],
      ["No — performance requirements cannot be written as stories", [-4, -2, -4, 0], "They can, as measurable acceptance criteria or as constraints that apply across stories."]],
    ["Estimating a story, two team members say 3 points and one says 13. What next?",
      ["Ask the people at the extremes to explain their thinking, then estimate again", [2, 8, 4, 6], "A wide gap means someone knows something the others do not. The discussion matters more than the number."],
      ["Take the average and move on", [-2, -6, -2, -2], "The average hides the disagreement, and the hidden risk with it."],
      ["Use the most senior developer's estimate", [-2, -2, -2, -8], "Estimates by seniority teach the rest of the team to stop thinking."]]
  ]);
  event('iteration-planning', [
    ["What should the team have at the end of iteration planning?",
      ["An iteration goal and a backlog of stories it believes it can finish, based on its real capacity", [4, 10, 2, 6], "The goal gives purpose and flexibility; the capacity-based backlog makes the commitment credible."],
      ["Every story assigned to a named person with hours estimated", [-2, -4, 0, -8], "Individual assignment creates silos. The team commits together and decides daily who does what."],
      ["A schedule showing each story's start and end date", [-2, -6, 0, -4], "A two-week schedule is detail that will be wrong by the second day."]],
    ["Who decides how much work the team takes into an iteration?",
      ["The team decides how much; the Product Owner decides the order of priority", [2, 10, 2, 10], "Only the people doing the work can judge what fits. Separating \"how much\" from \"in what order\" keeps both honest."],
      ["The Product Owner, who knows what the business needs", [-2, -8, 0, -10], "The Product Owner owns priority. Capacity belongs to the team."],
      ["The Scrum Master, using last iteration's velocity plus a stretch", [-2, -8, 0, -8], "Velocity is a guide for the team. It is not a quota set by someone else."]],
    ["Halfway through the iteration the Product Owner wants to add an urgent story. What should happen?",
      ["Discuss it with the team: swap it for unstarted work of similar size, if the iteration goal still holds, and do it openly", [6, 6, 0, 6], "Agility allows change. The discipline is making the trade-off visible instead of just adding work."],
      ["Add it — urgent means urgent", [0, -8, -2, -8], "Adding without removing breaks the commitment and teaches the team that plans are not real."],
      ["Refuse — the iteration is locked", [-6, 2, 0, -2], "Rigid refusal ignores real change. The plan serves the goal."]]
  ]);
  event('daily', [
    ["What is the daily stand-up for?",
      ["The team plans its day around the iteration goal and raises anything in the way", [2, 10, 2, 8], "It is a short planning meeting by the team, for the team."],
      ["The Scrum Master collects status from each person", [-2, -4, 0, -6], "When people report to one person, they stop talking to each other."],
      ["The manager hands out the day's tasks", [-2, -6, 0, -10], "The team organises its own work. Daily task assignment removes that."]],
    ["A stakeholder joins the stand-up and starts questioning individuals about their work. What should happen?",
      ["Observers are welcome to listen; questions wait for a conversation straight afterwards", [2, 8, 0, 8], "The fifteen minutes belong to the team. Stakeholders still get their answers, just not in that slot."],
      ["Let the stakeholder ask — they are entitled to know", [-2, -6, 0, -8], "The stand-up becomes a status meeting and people start reporting defensively."],
      ["Ban stakeholders from stand-ups", [-2, 0, 0, -2], "Openness is valuable. The problem is the questioning, not the presence."]],
    ["The team is spread across time zones and cannot find a daily slot that suits everyone. What do you do?",
      ["Use whatever overlap exists, even briefly, and add a written update — keeping the purpose of a daily shared plan", [2, 8, 0, 6], "The form can change. What must survive is a daily moment when the team synchronises."],
      ["Drop the stand-up", [-2, -8, -2, -6], "Without a daily sync, blockers sit for days."],
      ["Let each location hold its own stand-up", [-2, -6, 0, -4], "Two half-teams optimise separately and are surprised at integration."]]
  ]);
  event('art-sync', [
    ["What is the ART Sync?",
      ["A regular meeting that combines the Coach Sync (progress and impediments) and the PO Sync (scope and priority) to keep the train aligned between PI Plannings", [4, 10, 2, 4], "It is the train's own heartbeat between planning events — the place to see whether the PI plan is still on track."],
      ["A weekly steering committee for executives", [-2, -6, 0, -6], "It is a working meeting for the people running the train, not a governance forum."],
      ["A replacement for the teams' daily stand-ups", [-2, -8, 0, -4], "It works at a different level. Teams still need their own daily sync."]],
    ["The ART Sync regularly turns into ninety minutes of problem solving. What should the RTE do?",
      ["Keep it to its time-box: identify the problems, then solve them afterwards with only the people needed", [2, 8, 0, 6], "Most attendees are not needed for most problems. Identifying in the meeting and solving outside respects everyone's time."],
      ["Let it run — the problems need solving", [-2, -6, 0, -6], "People stop attending a meeting that wastes their time, and the alignment is lost."],
      ["Cancel it and rely on email", [-4, -8, -2, -2], "Dependencies and risks then surface late and in fragments."]],
    ["What should the train look at in an ART Sync?",
      ["Progress against PI objectives, the dependencies on the program board, risks and impediments", [4, 10, 4, 2], "These show whether the plan made in PI Planning still holds and where help is needed."],
      ["How fully each person is utilised", [-2, -6, 0, -8], "Utilisation measures busyness. High utilisation actually slows flow."],
      ["The status of every story in every team", [-2, -6, 0, -4], "That detail belongs to the teams. The train needs the picture at the level of objectives and features."]]
  ]);
  event('iteration-review', [
    ["What is the iteration review for?",
      ["Showing the working increment to stakeholders, getting their feedback and adjusting the backlog", [8, 6, 2, 4], "It is a working session to inspect the product and adapt what comes next."],
      ["Getting formal sign-off for the work", [-2, -4, 0, -2], "Acceptance happens story by story with the Product Owner. The review is for feedback."],
      ["Showing that the team has been busy", [-4, -4, 0, -4], "Activity is not the point. Working, valuable software is."]],
    ["Who should present at the iteration review?",
      ["The team members who built the work, showing it running", [4, 4, 0, 8], "Hearing feedback directly connects the team to its users, and working software cannot be faked."],
      ["The Product Owner, with slides summarising progress", [-4, -2, 0, -4], "Slides describe. Stakeholders cannot respond to what they cannot see working."],
      ["The Scrum Master, reporting velocity", [-4, -2, 0, -4], "Velocity is the team's planning tool. It tells stakeholders nothing about value."]],
    ["Stakeholders have stopped coming to your reviews. What do you do?",
      ["Find out why — timing, relevance, format — and adapt; if necessary take the demo to them", [8, 4, 0, 4], "No audience means no feedback. The cause is usually something the team can fix."],
      ["Stop holding reviews", [-8, -4, -2, -4], "The team then builds without any outside check until release."],
      ["Send a recording after each iteration", [-4, 0, 0, -2], "Better than nothing, but a recording is one-way. You lose the conversation."]]
  ]);
  event('retro', [
    ["What is the iteration retrospective for?",
      ["The team looks at how it worked and chooses one or two improvements to make next iteration", [2, 8, 2, 8], "Small, regular improvement by the team itself is what makes it get better over time."],
      ["Working out who was responsible for what went wrong", [-2, -4, 0, -12], "Blame ends honesty. The retrospective looks at the system of work."],
      ["Celebrating what went well", [0, -2, 0, 2], "Recognition matters, but a retrospective with no improvement changes nothing."]],
    ["Should the team's line manager attend the retrospective?",
      ["Not by default. It is the team's space; the team can invite others for specific topics", [0, 4, 0, 10], "People speak freely only when it feels safe. Managers can get the outcomes without being in the room."],
      ["Yes, always — they need to hear the problems first-hand", [-2, -4, 0, -10], "With a manager present, the real problems tend to go unsaid."],
      ["Yes, and they should run it", [-2, -4, 0, -12], "A manager-run retrospective becomes a performance review."]],
    ["The same retrospective format every iteration has gone stale. What helps?",
      ["Vary the format, bring data on how work flowed, rotate the facilitator, and start by checking the last actions", [2, 8, 0, 8], "Fresh formats bring fresh insight, and starting with previous actions proves that the meeting leads to change."],
      ["Skip a few retrospectives until there is more to discuss", [-2, -6, 0, -6], "A stale format is a reason to change the format, not to stop improving."],
      ["Make the meeting longer", [0, -2, 0, -4], "More time in the same format gives more of the same."]]
  ]);
  event('system-demo', [
    ["How does the system demo differ from a team's iteration review?",
      ["It shows the integrated work of all teams on the train, in a production-like environment, to Business Owners and stakeholders", [8, 8, 4, 4], "Each team's work passing separately proves little. The system demo shows whether it works together."],
      ["It is the same thing, only longer", [-2, -4, -2, 0], "A sequence of separate team demos hides integration problems."],
      ["It is a presentation summarising the teams' reviews", [-4, -6, -4, -2], "A summary cannot be tested. The demo must be the running system."]],
    ["Who presents at the system demo?",
      ["Product Management and Product Owners show features end to end, with the teams' support and the RTE facilitating", [6, 4, 0, 4], "Features are shown the way a client would meet them, by the people who own what they are for."],
      ["Each developer walks through their code", [-4, -4, 0, -2], "Stakeholders need to see what the system does for clients, not how it is written."],
      ["The RTE narrates a slide deck", [-4, -4, -2, -2], "Slides are not a measure of progress."]],
    ["Your system demos have grown to three hours, showing every story. What do you change?",
      ["Focus on features and end-to-end flows, keep it to about an hour, and capture feedback as you go", [6, 6, 0, 6], "Stakeholders will attend something short and meaningful. Story-level detail belongs in team reviews."],
      ["Hold the demo once per PI instead", [-6, -8, -4, -2], "Less frequent demos mean later discovery of integration problems."],
      ["Keep it — everything deserves to be shown", [-2, -4, 0, -6], "Attendance will fall until the people whose feedback you need have stopped coming."]]
  ]);
  event('solution-demo', [
    ["What is the solution demo for?",
      ["Showing the integrated result of all trains and suppliers to clients and senior stakeholders, once per PI", [10, 6, 4, 4], "It is the main point at which a large solution is evaluated as a whole, by the people it is for."],
      ["Internal quality sign-off before release", [-2, -2, 0, 0], "Quality is built in throughout. The demo is for evaluation and feedback."],
      ["A marketing launch event", [-2, -2, -2, 0], "It shows real progress, limitations included. Polish is not the purpose."]],
    ["How should the trains prepare for a solution demo?",
      ["By integrating continuously through the PI, so that the demo comes from an environment that already works", [4, 10, 6, 4], "If integration is routine, the demo needs little special preparation and shows the truth."],
      ["By assembling a special demo environment in the final week", [-2, -8, -6, -6], "A hand-built environment hides integration problems and costs a week of everyone's time."],
      ["By preparing video mock-ups of the intended solution", [-6, -4, -6, -2], "Stakeholders will make decisions on something that does not exist."]],
    ["What should happen after the solution demo?",
      ["The feedback goes into the solution backlog and the next Pre-PI Planning, and informs investment decisions", [10, 6, 2, 4], "A demo is only worth holding if what is learned changes what happens next."],
      ["Minutes are circulated and filed", [-4, -2, 0, -2], "Feedback that is recorded but not acted on teaches stakeholders to stop giving it."],
      ["The teams celebrate and start the next PI", [-2, 0, 0, 2], "Celebration is deserved. Skipping the learning wastes the event."]]
  ]);
  event('portfolio-sync', [
    ["What belongs on the agenda of a Portfolio Sync?",
      ["Epic progress through the portfolio Kanban, cross-value-stream dependencies, spend against guardrails and impediments", [4, 8, 4, 2], "It is the operational check on how the portfolio's work is flowing."],
      ["Approval of each team's stories for the next iteration", [-4, -10, 0, -8], "Far too detailed. That decision belongs to teams and their Product Owners."],
      ["Individual performance reviews", [-2, -2, 0, -8], "The portfolio looks at flow and outcomes, not at individuals."]],
    ["How does the Portfolio Sync differ from the Strategic Portfolio Review?",
      ["The sync is operational — how implementation is going. The strategic review asks whether the portfolio is investing in the right things", [4, 6, 2, 2], "Keeping the two questions apart stops operational detail crowding out strategy."],
      ["They are the same meeting under two names", [-2, -4, 0, 0], "Combining them usually means the strategic question never gets asked."],
      ["The sync is for technology and the strategic review is for the business", [-4, -4, 0, -4], "Both need business and technology together."]],
    ["What are lean budget guardrails?",
      ["Agreed rules — the mix of investment horizons, capacity for enablers, approval thresholds for large items, Business Owner involvement — within which value streams decide for themselves", [6, 8, 6, 4], "Guardrails give leaders control of the things that matter without approving every decision."],
      ["A freeze on spending above a set amount", [-4, -6, 0, -4], "A freeze stops spending. Guardrails guide it."],
      ["Line-by-line approval of each value stream's budget", [-4, -10, 0, -6], "That is the project-approval model lean budgets are designed to replace."]]
  ]);
  event('inspect-adapt', [
    ["What are the three parts of an Inspect & Adapt event?",
      ["The PI system demo, a review of quantitative and qualitative measures, and a problem-solving workshop", [4, 8, 2, 6], "See what was built, look at the numbers, then fix the biggest systemic problem."],
      ["A retrospective, a celebration and a planning session", [-2, -4, 0, 0], "It includes reflection, but it is structured around evidence and root-cause analysis."],
      ["An audit, a sign-off and a release", [-4, -4, 0, -4], "It is the train's own improvement event, not a governance gate."]],
    ["How is a train's predictability measured?",
      ["By comparing the business value actually achieved with the value planned, across teams — a healthy train typically lands between 80% and 100%", [6, 10, 2, 4], "The measure rewards realistic plans. A train that always scores above 100% is probably under-committing."],
      ["By comparing each team's velocity", [-2, -6, 0, -8], "Velocity is local to a team and not comparable. Comparing it leads to inflated estimates."],
      ["By counting production defects", [-2, -2, 2, -2], "A useful quality measure, but it says nothing about whether plans are reliable."]],
    ["What happens in the problem-solving workshop?",
      ["Agree the problem, analyse root causes, pick the biggest one, brainstorm solutions and put improvement items into the next PI", [4, 10, 4, 8], "The structure stops people jumping to solutions, and the backlog items make the improvement real."],
      ["The train votes on which team caused the most problems", [-2, -4, 0, -14], "Blame ends the honesty the workshop depends on."],
      ["Teams list their complaints for management to resolve", [-2, -4, 0, -6], "Handing problems upward removes the train's ownership of its own improvement."]]
  ]);
  event('qbr', [
    ["What is a Strategic Portfolio Review for?",
      ["Checking the portfolio against strategy — where the money is going, what outcomes value streams are achieving — and adjusting funding", [10, 6, 4, 2], "It is where leaders decide whether to persevere, change or stop, on evidence."],
      ["Reviewing the red-amber-green status of every project", [-4, -4, 0, -4], "Status reviews look at activity. This review looks at outcomes and investment."],
      ["Approving next year's budget", [-4, -6, 0, -2], "Funding is adjusted quarterly, in small steps. An annual event is too slow."]],
    ["The review shows that 100% of investment goes to today's core business. Is that a problem?",
      ["Yes. A healthy portfolio balances today's business with emerging and exploratory work, and retires what is declining", [10, 2, 4, 2], "All-in on the present starves the future. The investment-horizon view exists to make this visible."],
      ["No — the core business is where the revenue is", [-8, 0, -2, 0], "It is, until it is not. By then there is nothing ready to replace it."],
      ["Yes — move most of the investment to ambitious new ventures", [-4, -6, -8, -4], "Swinging to the other extreme neglects the clients and systems that pay for everything."]],
    ["Leaders at the review never stop anything. Every initiative continues. What needs to change?",
      ["Make stopping a normal outcome: set criteria in advance, value what was learned, and redeploy the people", [8, 8, 2, 6], "If nothing can be stopped, nothing new can start. Clear criteria take the politics out of it."],
      ["Keep everything going at reduced funding", [-6, -8, 0, -6], "Many under-funded initiatives finish slowly or not at all."],
      ["Stop initiatives quietly, without announcing it", [-2, -2, -4, -10], "Teams deserve to know why. Silent cancellations destroy trust."]]
  ]);

  /* ═════════════ Roles (first item is the event the question is set in) ═════════════ */
  role('sm', [
    ['daily', "A new team member asks you: \"So are you our manager?\"",
      ["No — I coach the team and look after how we work. I do not assign tasks or appraise people", [0, 6, 0, 10], "The Scrum Master leads by serving. Being clear about that keeps the team's ownership of its work intact."],
      ["Yes, in effect", [-2, -4, 0, -10], "If the team sees you as its manager, it will wait for instructions and tell you what you want to hear."],
      ["Not exactly, but I do report on how each of you is doing", [-2, -2, 0, -12], "A Scrum Master who reports on individuals cannot be trusted with the team's problems."]],
    ['art-sync', "New joiners wait three weeks for a working laptop and system access. The team cannot fix it.",
      ["Take it to the Coach Sync and the RTE with the cost made visible, and follow it through", [2, 10, 2, 6], "Impediments beyond the team are yours to escalate. Putting a cost on it gets attention."],
      ["Tell the team it is how the bank works", [-2, -8, 0, -6], "Accepting it guarantees it never changes."],
      ["Lend new joiners someone else's login until theirs arrives", [0, 4, -16, -2], "Shared credentials are a serious security breach in any bank."]]
  ]);
  role('po', [
    ['iteration-planning', "You are Product Owner for three teams, and each complains that you are rarely available.",
      ["Raise it: either reduce the number of teams you serve or delegate clear authority, because a team needs an available Product Owner", [6, 8, 0, 8], "An absent Product Owner means waiting, guessing and rework. It is a structural problem to solve."],
      ["Ask the teams to make reasonable assumptions when you are away", [-4, -6, -2, -4], "Assumptions get built in, and you discover them at the review."],
      ["Ask an analyst on each team to decide informally", [-2, -2, -2, -4], "Without clear authority, their decisions can be overturned and nobody knows who is accountable."]],
    ['pi-planning', "A new team member asks how your role relates to the Product Manager's.",
      ["The Product Manager owns the train's features and roadmap; I own this team's backlog and stories, and we work closely together", [6, 6, 0, 4], "Two levels of the same job: the Product Manager faces the market and the train, the Product Owner faces the team."],
      ["The Product Manager is my boss and tells me what to build", [-2, -2, 0, -4], "The Product Owner has real authority over the team backlog. It is a partnership."],
      ["There is no real connection", [-6, -6, 0, -2], "A team backlog disconnected from the train's features delivers work that adds up to nothing."]]
  ]);
  role('dev', [
    ['refinement', "You are asked to estimate a story you do not really understand.",
      ["Ask questions until you do, and if the unknown is technical, propose a short time-boxed investigation", [4, 8, 4, 4], "An honest \"I do not know yet\" is more useful than a number. A time-boxed spike turns the unknown into knowledge."],
      ["Give a large number to be safe", [-2, -4, 0, -2], "A padded guess hides the uncertainty instead of resolving it."],
      ["Give a small number so that the Product Owner is happy", [-2, -8, -2, -4], "A number chosen to please becomes a commitment you cannot keep."]],
    ['retro', "You think the team's code-review practice is slowing everything down.",
      ["Bring the data and a proposal to the retrospective, and suggest trying it as an experiment", [2, 8, 2, 8], "The retrospective is where the team changes how it works. An experiment is easy to agree to and easy to reverse."],
      ["Complain about it to a colleague", [-2, -4, 0, -6], "The frustration spreads and nothing changes."],
      ["Stop asking for reviews on your own changes", [0, 2, -12, -6], "You have removed a quality and security control without telling anyone."]]
  ]);
  role('qa', [
    ['daily', "Developers call you \"the tester\" and hand you everything in the last two days of the iteration.",
      ["Propose that quality is the whole team's job: pair on tests, write tests before code, and put it in the Definition of Done", [4, 8, 6, 6], "Quality engineering means helping the team build quality in. Testing at the end can only find problems."],
      ["Accept it and work late at the end of each iteration", [-2, -6, -4, -8], "You become the bottleneck, and corners get cut under time pressure."],
      ["Refuse to test anything handed over late", [-2, -4, -2, -8], "It makes the point and damages the relationships you need to change the practice."]],
    ['pi-planning', "The team's draft PI plan has no capacity for performance or security testing.",
      ["Raise it in planning and get test automation and non-functional testing into the plan as enablers", [2, 6, 10, 4], "If it is not in the plan, it will not happen. PI Planning is the moment to make that work visible."],
      ["Plan to fit it in at the end of the PI", [-2, -6, -8, -4], "The end of the PI is when there is least time and most pressure."],
      ["Say nothing — it is not what the Business Owners are asking for", [-2, -2, -12, -4], "They are not asking because they assume it is being done."]]
  ]);
  role('ba', [
    ['iteration-planning', "The Product Owner is away, and the team asks you to decide the priorities for the iteration.",
      ["Help with analysis and options, and get the Product Owner's decision or their explicit delegation", [4, 6, 0, 4], "You can prepare the decision. Priority is the Product Owner's accountability unless they hand it to you."],
      ["Decide — someone has to", [-2, 2, 0, -4], "The team moves, but on an order the Product Owner may reverse."],
      ["Say it is not your job", [-4, -6, 0, -4], "Technically right, and it leaves the team stuck."]],
    ['iteration-review', "A feature matches its story exactly, but operations says their process changed last month.",
      ["Treat it as a lesson: stay closer to operations, check the process regularly, and update the backlog", [6, 4, 2, 4], "Requirements have a shelf life. Regular contact with the people doing the work is how you notice change."],
      ["Point out that operations should have told the team", [-4, -2, 0, -6], "Possibly true, and it does nothing to fix the feature or the gap in communication."],
      ["Point out that the story was agreed and signed off", [-6, -2, 0, -4], "A signed-off story that no longer fits the work has no value."]]
  ]);
  role('ux', [
    ['pi-planning', "You are the only UX designer for four teams, and in PI Planning each wants you full time.",
      ["Make your capacity visible, prioritise with Product Management, and invest in a design system so that teams can do more themselves", [6, 8, 0, 4], "A shared specialist is a constraint. Visible capacity and reusable patterns are how you stop being the bottleneck."],
      ["Promise each team what it asks for", [-2, -10, 0, -8], "You have committed four times your capacity. All four plans now depend on something that cannot happen."],
      ["Work with the team you get on with best", [-4, -4, 0, -6], "Allocation by preference leaves the most important work to chance."]],
    ['daily', "You find that developers changed your design because of a technical constraint and did not tell you.",
      ["Talk to them, understand the constraint, agree an adjustment together, and pair earlier next time", [4, 6, 0, 8], "They solved a real problem. Working together sooner gets a better answer than either of you alone."],
      ["Insist that they rebuild it to the design", [-2, -6, 0, -8], "Rework for its own sake, and next time they will tell you even less."],
      ["Let it go", [-4, 0, 0, -2], "The inconsistency stays, and so does the habit of not talking."]]
  ]);
  role('rte', [
    ['system-demo', "Business Owners have stopped attending the system demo.",
      ["Find out why, make the demo meaningful in business terms, keep it on a fixed cadence, and explain what their absence costs", [8, 6, 0, 4], "Without Business Owners there is no business feedback. The RTE owns the health of the train's events."],
      ["Carry on without them", [-6, -2, -2, -4], "The train keeps building with nobody confirming it is building the right thing."],
      ["Cancel the demos until they can attend", [-6, -8, -2, -4], "The teams lose their integration checkpoint as well."]],
    ['inspect-adapt', "What is your part in the Inspect & Adapt event?",
      ["Facilitate the event and the problem-solving workshop, and make sure the improvement items reach the next PI's backlog", [4, 10, 2, 8], "You create the conditions for the train to solve its own problems, and you make sure the result is acted on."],
      ["Present the solutions you have already decided on", [-2, -4, 0, -10], "Improvements imposed on the train are not owned by it."],
      ["Score each team's performance", [-2, -4, 0, -12], "Scoring teams turns a learning event into an appraisal."]]
  ]);
  role('pm', [
    ['art-sync', "Product Owners bring scope questions to the PO Sync that you cannot answer without talking to clients.",
      ["Get the insight quickly — calls, usage data — and decide within days so that teams are not blocked", [8, 8, 0, 4], "Knowing the client is your job, and speed of decision is part of it. A good answer this week beats a perfect one next month."],
      ["Give your best guess so that the teams can continue", [-4, 2, -2, -2], "Sometimes necessary, but a habit of guessing means building on opinion."],
      ["Defer the questions to the next PI", [-6, -8, 0, -4], "The teams either wait or guess for you."]],
    ['inspect-adapt', "The train delivered every planned feature this PI, yet the business outcomes have not moved.",
      ["Go back to each feature's benefit hypothesis, measure outcomes instead of output, and adjust the roadmap", [10, 4, 0, 2], "Delivery is only the means. If outcomes do not move, the hypotheses were wrong or incomplete."],
      ["Celebrate — the train delivered everything", [-6, 0, 0, 2], "A train can be perfectly predictable at delivering things nobody needs."],
      ["Conclude that sales is not promoting the features", [-4, 0, 0, -4], "Possible, but assuming it avoids examining your own choices."]]
  ]);
  role('sa', [
    ['art-sync', "A team asks you to design their component for them.",
      ["Work with them: set the guardrails, coach, and let the team own the design", [2, 6, 4, 8], "Architecture at this level guides. Teams that own their designs maintain them better."],
      ["Design it for them", [0, 2, 2, -6], "Faster this once, and the team becomes dependent on you for every decision."],
      ["Tell them design is their job", [-2, -4, -2, -4], "They asked for help. Refusing leaves a risk unaddressed."]],
    ['system-demo', "The system demo shows that response times collapse under realistic load.",
      ["Make the performance requirements explicit, test them continuously, and put the enabling work in the backlog", [4, 6, 10, 4], "Non-functional qualities need the same visibility and testing as features, or they are discovered in production."],
      ["Note it as something to tune before go-live", [-2, -6, -8, -2], "Performance problems found late are usually design problems."],
      ["Ask which team wrote the slow code", [-2, -2, 0, -10], "Performance is a property of the whole system. Start there."]]
  ]);
  role('bo', [
    ['pi-planning', "What is a Business Owner expected to do at PI Planning?",
      ["Give the business context, be available to teams, review draft plans, assign business value to objectives and accept the final plans", [8, 8, 2, 8], "The Business Owner is an active participant throughout. Their presence is one of the strongest predictors of a good PI."],
      ["Attend the opening and leave the teams to plan", [-6, -6, 0, -6], "Teams then make trade-offs without the person accountable for the outcome."],
      ["Approve each team's stories one by one", [-2, -8, 0, -8], "Far too detailed. Your level is objectives and business value."]],
    ['art-sync', "Mid-PI you hear that one of the committed objectives is at risk.",
      ["Thank the team for the early warning, help decide the trade-off, and clear whatever you can", [6, 8, 2, 10], "How you react to bad news decides how early you hear it next time."],
      ["Insist on a recovery plan to hit the original commitment", [-2, -6, -2, -10], "Pressure does not change capacity. It changes what people tell you."],
      ["Wait and see how the PI ends", [-4, -8, -2, -2], "Your options shrink with every iteration you wait."]]
  ]);
  role('ste', [
    ['pi-planning', "The trains in your value stream hold PI Planning at the same time. What do you do during it?",
      ["Move between the trains, facilitating cross-train dependencies and solution-level risks, and keep the RTEs in sync", [4, 10, 4, 4], "The dependencies between trains are where large solutions fail. That gap is your responsibility."],
      ["Stay with the train that has the most problems", [-2, -4, -2, 0], "The other trains make plans that depend on each other with nobody connecting them."],
      ["Wait for each RTE's summary afterwards", [-4, -8, -4, -2], "By then the plans are committed and the conflicts are built in."]],
    ['epic-review', "A supplier insists on delivering one large release per quarter.",
      ["Negotiate smaller, more frequent deliveries with joint integration, and show them the cost of integrating late", [4, 10, 6, 4], "Large infrequent drops mean large infrequent surprises. Most suppliers respond to evidence of what it costs."],
      ["Accept it — that is how they work", [-2, -8, -4, -2], "The whole value stream's rhythm is then set by its slowest supplier."],
      ["Start replacing the supplier", [-4, -8, -4, -4], "A drastic step before the simpler conversation has been tried."]]
  ]);
  role('solm', [
    ['system-demo', "A train's Product Manager asks you to decide the priority of stories within one team.",
      ["Stay at capability level: give the intent and priorities, and leave decisions below that to Product Management and Product Owners", [4, 8, 0, 8], "Each level decides what it is closest to. Reaching down two levels slows everything and undermines the people there."],
      ["Decide — you have the broadest view", [-2, -6, 0, -8], "Every team will start bringing you their decisions."],
      ["Decline to discuss it", [-4, -4, 0, -4], "They may need your intent to make the decision themselves."]],
    ['inspect-adapt', "Your solution roadmap shows fixed dates eighteen months out, and stakeholders treat them as promises.",
      ["Show the near term as committed and the longer term as a forecast of decreasing certainty, and say so clearly", [8, 8, 2, 4], "A roadmap is a forecast. Honest communication of confidence protects trust when things change."],
      ["Keep the fixed dates — they reassure people", [-4, -6, -2, -4], "They reassure until the first one is missed."],
      ["Stop publishing a roadmap", [-6, -4, 0, -2], "Clients and other value streams need to know where you are heading."]]
  ]);
  role('sola', [
    ['epic-review', "An epic needs architectural input before the go decision. How much analysis is enough?",
      ["Enough to understand feasibility, the main risks, the enablers needed and a cost range — then learn the rest through the MVP", [4, 8, 6, 4], "The aim is a good decision, not a finished design. Building a small increment answers what analysis cannot."],
      ["A complete solution design", [-2, -10, 2, -4], "Months of design for something that may be stopped or reshaped after the MVP."],
      ["None — the architecture will emerge", [-2, 2, -10, -2], "Some decisions are too costly to reverse to leave entirely to emergence."]],
    ['solution-demo', "The solution demo reveals that two trains have each built a version of the same service.",
      ["Surface it, agree a single owner and a plan to converge, and tighten the architecture sync across trains", [4, 8, 6, 4], "Duplication is the symptom; the missing conversation between trains is the cause."],
      ["Leave it — both work", [-2, -6, -6, 0], "Two services to secure, maintain and keep consistent, indefinitely."],
      ["Order both to be rewritten as one", [-4, -8, 0, -8], "A mandated rewrite ignores what each train has learned and the work already in flight."]]
  ]);
  role('eo', [
    ['strategy', "You have an idea that could become an epic. What is the first step?",
      ["Write a short epic hypothesis — the problem, the expected outcome and leading indicators — and enter it in the portfolio funnel", [6, 8, 2, 2], "A hypothesis statement is cheap to write and easy to discuss. It lets the portfolio decide whether analysis is worthwhile."],
      ["Build a detailed sixty-slide business case", [-2, -8, 0, -2], "A heavy investment before anyone has agreed the idea deserves analysis."],
      ["Win over a senior executive in private", [-4, -4, -2, -4], "Lobbying bypasses the comparison with other ideas that the portfolio needs."]],
    ['pi-planning', "Your epic is approved and its features are in the trains' PI Planning. What is your role there?",
      ["Be available to explain the intent and the MVP, and help Product Management shape features — without dictating the teams' plans", [6, 8, 0, 6], "You carry the knowledge of why. The trains own how and when."],
      ["Direct the teams' work on the epic", [-2, -6, 0, -8], "The Epic Owner has no authority over teams. That belongs to the train."],
      ["Stay away — your part is done", [-6, -4, 0, -2], "Intent gets lost in hand-offs. Your presence prevents that."]]
  ]);
  role('lpm', [
    ['qbr', "How should the portfolio's performance be shown at the strategic review?",
      ["A few outcome measures for each value stream, with flow, predictability and the split of investment by horizon", [10, 6, 2, 2], "A small balanced set shows whether the portfolio is achieving its strategy and where to act."],
      ["A full set of metrics for every project", [-4, -6, 0, -4], "Hundreds of numbers hide the few that matter."],
      ["Budget against actual spend", [-6, 0, 0, -2], "Spending to plan says nothing about whether the spending achieved anything."]],
    ['solution-demo', "Members of the portfolio leadership rarely see the products they fund.",
      ["Attend solution demos regularly, so that funding decisions rest on evidence you have seen", [8, 4, 2, 6], "A demo tells you in an hour what reports cannot. It also shows teams that leaders care about the product."],
      ["Rely on the written reports", [-6, -2, -2, -4], "Reports are filtered. Decisions made on them alone are a step removed from reality."],
      ["Send a delegate every time", [-2, 0, 0, -2], "Sometimes necessary, but the people who decide funding should see what it buys."]]
  ]);
  role('ea', [
    ['pi-planning', "Should the Enterprise Architect attend a train's PI Planning?",
      ["Yes, selectively: share the architectural direction, listen for runway needs and cross-train issues, and support the System Architects", [2, 6, 6, 6], "Direction is better understood in person, and you learn what teams actually need from the platforms."],
      ["No — it is too detailed for the role", [-2, -4, -4, -2], "Architecture set at a distance drifts away from what teams experience."],
      ["Yes — to approve each team's design", [-2, -8, 2, -8], "Design approval at PI Planning turns you into a gate and takes ownership from teams."]],
    ['qbr', "Teams have started using AI coding assistants, and there is no guidance.",
      ["Work quickly with risk and security to provide guardrails and an approved way to use them, so that teams can experiment safely", [4, 6, 10, 6], "People adopt useful tools with or without permission. A safe, supported route is the best control."],
      ["Ban them until a full policy has been written", [-4, -6, 2, -8], "Use continues unseen, which is the worst position for managing risk."],
      ["Leave teams to use their judgement", [0, 2, -12, 0], "Source code and client data may be leaving the bank with nobody aware of it."]]
  ]);
  role('coach', [
    ['retro', "A Scrum Master asks you to run their retrospective — again.",
      ["Facilitate it together this time, coach them, and hand it over; your job is to build their capability", [2, 6, 0, 8], "A coach who keeps doing the work creates dependence. Success is when they no longer need you."],
      ["Keep running it — you do it well", [0, 0, 0, -6], "The team gets good retrospectives until you leave."],
      ["Decline; it is their responsibility", [-2, -2, 0, -4], "They asked because they are struggling. Refusing does not teach them."]],
    ['strategy', "Leaders want agile \"rolled out\" to all 3,000 staff by the end of the year.",
      ["Start with one value stream where leaders are engaged, train those leaders first, learn, and then scale", [6, 8, 2, 8], "Change spreads from visible success. Leaders who understand it are the difference between new habits and new labels."],
      ["Schedule training for all 3,000 as quickly as possible", [-2, -6, 0, -8], "Mass training with no change in how leaders lead produces cynicism."],
      ["Tell them it cannot be done", [-4, -2, 0, -2], "The ambition is useful. Redirect it into something that can work."]]
  ]);
  role('risk', [
    ['epic-review', "You are asked for a view on an epic's lean business case.",
      ["Give a proportionate early view of the main risks and regulatory constraints, and what the MVP must include to stay within appetite", [6, 8, 12, 4], "Early, proportionate input shapes the idea while it is cheap to change. That is worth more than a late veto."],
      ["Ask for the full documentation set before commenting", [-4, -10, 2, -6], "Full documentation for an idea that may not proceed is waste, and delays the decision."],
      ["Approve it without reading closely — it is only an MVP", [0, 2, -14, -2], "An MVP with real clients carries real regulatory risk."]],
    ['art-sync', "Mid-PI, a new regulatory interpretation is issued that affects two teams' work.",
      ["Bring it to the ART Sync promptly with a clear requirement and date, and help the teams assess the impact", [4, 8, 12, 4], "The train can only re-plan around what it knows. A clear requirement and deadline lets it make a proper trade-off."],
      ["Email the policy document to the teams", [-2, -4, -4, -4], "A forwarded document is not a requirement. Teams will interpret it differently or not at all."],
      ["Wait for the next audit cycle to raise it", [0, 2, -16, -2], "The teams build non-compliant features in the meantime."]]
  ]);
  role('sponsor', [
    ['epic-review', "What does sponsoring an initiative involve, week to week?",
      ["Staying engaged: attending key demos, removing enterprise-level impediments, protecting the funding and people, and holding it to its outcomes", [8, 8, 2, 8], "Sponsorship is active. Much of an initiative's success depends on blockers only a senior person can remove."],
      ["Signing the business case and reviewing progress once a year", [-6, -6, -2, -6], "By the annual review, the problems you could have removed have done their damage."],
      ["Directing the teams' daily work", [-2, -8, 0, -10], "That is micromanagement, and it removes the teams' ability to respond to what they learn."]],
    ['inspect-adapt', "Inspect & Adapt identifies an impediment that only you can fix: procurement takes nine months.",
      ["Own it — work with your peers to change the policy, and report back to the train on progress", [6, 10, 2, 10], "When a leader takes on a systemic impediment and reports back, teams learn that raising problems works."],
      ["Ask the train to work with procurement directly", [-2, -6, 0, -8], "The train has no authority over procurement. That is why it was escalated."],
      ["Note it for a future discussion", [-4, -8, 0, -8], "An impediment noted and not acted on teaches the train to stop raising them."]]
  ]);
  role('head', [
    ['solution-demo', "You are invited to a solution demo and asked to bring a client.",
      ["Attend, bring real users from the client, encourage frank feedback and follow up on what is promised", [10, 4, 2, 6], "You hold the relationship. Bringing real users gives the teams the feedback that matters most."],
      ["Send a junior colleague", [-4, -2, 0, -4], "It signals to the client and the teams that the event is not important."],
      ["Use the session to pitch the client other products", [-6, -2, -2, -4], "The client came to give feedback. Turning it into a sales meeting wastes their goodwill."]],
    ['pi-planning', "You are asked to give the business context at the opening of PI Planning.",
      ["Describe what clients and the market are doing, the strategic priorities and why the work matters — then stay and listen", [8, 6, 0, 10], "People commit to work they understand the reason for. Staying to listen shows the context goes both ways."],
      ["Decline — it is a technology event", [-6, -4, 0, -6], "PI Planning is a business event. Without business context the teams plan in the dark."],
      ["Present the sales targets and insist they are met", [-2, -6, 0, -10], "Targets without context are pressure, and pressure distorts planning."]]
  ]);
  role('cio', [
    ['solution-demo', "As CIO at a solution demo, what should you be looking for?",
      ["Evidence that the solution is integrated, of good quality and operable — and what enabling work the teams need you to back", [6, 6, 10, 6], "Your questions about pipelines, resilience and technical debt show that these matter as much as features."],
      ["How polished the screens look", [-4, 0, -2, -2], "Polish says little about whether the solution can be run and changed safely."],
      ["Which teams are behind schedule", [-2, -2, 0, -10], "Using a demo to find who is late ensures future demos hide it."]],
    ['inspect-adapt', "Several trains name test environments as their biggest impediment, PI after PI.",
      ["Fund self-service environments as a strategic enabler, with an owner and measures", [4, 10, 6, 8], "An impediment shared by many trains is an enterprise problem. Platform investment removes it for everyone."],
      ["Ask the trains to share the existing environments more considerately", [-2, -6, 0, -6], "The constraint is capacity and provisioning time. Courtesy does not change that."],
      ["Buy more servers", [0, 0, 0, -2], "More hardware with the same slow manual provisioning leaves the queue in place."]]
  ]);
  role('cro', [
    ['solution-demo', "You are invited to the solution demo of a new product.",
      ["Attend, or send an empowered delegate: see the controls working and ask your questions early", [4, 4, 12, 6], "Seeing controls operate is strong assurance, and questions asked now are cheap to answer."],
      ["Decline, to preserve the independence of the risk function", [-2, -4, -4, -4], "Independence means forming your own judgement, not avoiding the evidence."],
      ["Attend in order to stop the product", [-6, -6, 2, -10], "Arriving with the conclusion already reached closes off the conversation that could have made it safe."]],
    ['inspect-adapt', "A train asks to replace a manual sign-off that you own with an automated check.",
      ["Engage: define what the control must achieve, agree automated evidence that is at least as strong, and verify it with a pilot", [4, 10, 12, 6], "A control is defined by its objective. Automated checks are often stronger and always more consistent — once verified."],
      ["Refuse — a person must sign", [-4, -8, 2, -6], "A signature is one way to meet the objective. Insisting on the method protects the queue."],
      ["Agree and hand it over without checking", [0, 6, -14, -2], "You remain accountable for the control. Unverified automation is an assumption."]]
  ]);
})();
