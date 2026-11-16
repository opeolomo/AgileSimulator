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
      ["A prioritised list of the projects each portfolio will deliver, with named owners, budgets and target dates", [-4, -6, 0, -4], "That is a plan, made at the moment leaders know least. It leaves no room for the portfolios to find better answers."],
      ["An agreed vision statement and set of values that every portfolio can communicate to its teams", [-2, -2, 0, 0], "A vision helps, but without measures nobody can tell whether the organisation is getting closer to it."]],
    ["A proposed key result reads: \"Launch the new client portal by the third quarter.\" What is wrong with it?",
      ["It describes an output. Rewrite it as an outcome, such as \"60% of active clients use the portal weekly by the third quarter\"", [10, 4, 0, 2], "A launch can happen on time and change nothing. An outcome measure tells you whether clients actually benefited."],
      ["Nothing — it is specific, measurable and time-bound, which is what a good key result should be", [-6, 0, 0, 0], "Clear and dated, but it measures delivery. Teams can hit it and still fail the objective."],
      ["The date makes it too rigid; a looser result such as \"improve the digital experience\" leaves room to adapt", [-4, -2, 0, -2], "Vaguer is worse. Nobody can tell whether it has been achieved."]],
    ["The market shifts sharply six months after the themes were set. What should happen?",
      ["Review the themes at the regular quarterly checkpoint and change them where the evidence calls for it", [8, 6, 2, 4], "Strategy is reviewed on a cadence so that it can respond to facts without lurching."],
      ["Keep the themes fixed until the annual cycle, so that teams have a stable direction to plan against", [-8, -2, 0, -2], "Stability of direction is valuable, but not when the direction is now wrong."],
      ["Revise the themes straight away whenever a senior leader sees a significant new development", [-4, -10, 0, -10], "Constant redirection means nothing gets finished, and teams stop believing any priority will last."]]
  ]);
  event('epic-review', [
    ["What makes a piece of work an epic, as opposed to a feature?",
      ["It is large enough to need analysis and a lean business case, and usually spans several trains or Planning Intervals", [4, 8, 2, 2], "Epics are significant investments, so they get portfolio-level scrutiny. Features fit within one train and one PI."],
      ["It has been sponsored by a senior executive and carries visibility at ExCo level", [-2, -6, 0, -2], "Seniority of the requester says nothing about size or about the level of analysis needed."],
      ["It is too big for a single iteration and so needs more than one team's backlog to deliver", [-2, -6, 0, 0], "By that definition almost everything is an epic, and the portfolio drowns in small items."]],
    ["An epic has been in the \"Analysing\" column of the portfolio Kanban for nine months. What does that tell you?",
      ["Analysis has no time-box or WIP limit. Do just enough to decide on an MVP, then learn from building it", [6, 10, 2, 4], "Analysis has diminishing returns. The real answers come from testing a small increment with clients."],
      ["The epic is complex and high-risk, so it is right for it to be analysed thoroughly before any commitment", [-4, -10, 0, -4], "Nine months of analysis is nine months of cost of delay, and the assumptions are still untested."],
      ["The Analysing step adds delay without adding value, and epics should move directly to implementation", [-2, 2, -6, 0], "Then epics start with no understanding of cost, risk or regulatory impact."]],
    ["Who decides whether an epic goes ahead?",
      ["The portfolio leadership, with the Epic Owner, Business Owners and architects, using the lean business case and an open ranking", [6, 6, 4, 4], "A go decision commits scarce capacity across trains, so it is made by those accountable for the whole portfolio, on shared evidence."],
      ["The Epic Owner, who has done the analysis and understands the business case better than anyone", [-2, -2, -4, 0], "The Epic Owner is the advocate. Advocates should not approve their own cases."],
      ["The technology leadership, based on whether the trains have the capacity and skills to deliver it", [-6, 0, 0, -2], "Capacity is an input. Whether the investment is worth making is a business decision."]]
  ]);
  event('pre-pi', [
    ["What is Pre-PI Planning for?",
      ["Aligning the trains and suppliers on vision, top priorities, capacity and key dependencies, as input to each train's PI Planning", [4, 10, 2, 4], "It sets up the trains to plan well. The planning itself is still done by the teams, in PI Planning."],
      ["Producing an agreed plan for the PI, which the trains then walk their teams through at PI Planning", [-4, -6, 0, -10], "Plans handed down are not owned by the people who must deliver them."],
      ["Reviewing what each train delivered in the last PI and agreeing the lessons to carry forward", [-2, -4, 0, 0], "Looking back is the job of Inspect & Adapt. This event looks forward."]],
    ["Who needs to be in Pre-PI Planning?",
      ["The Solution Train Engineer, Solution Management and architects, with each train's RTE and Product Management, and key suppliers", [4, 8, 2, 4], "These are the people who can align priorities and capacity across trains. Suppliers are included because their work must integrate too."],
      ["The senior leaders of the value stream and the business sponsors, who then brief their trains", [-4, -6, 0, -4], "They can set intent, but they do not hold the knowledge of each train's backlog and capacity."],
      ["Every team from every train, so that all the detailed planning can be done together in one event", [-2, -6, 0, -2], "That is PI Planning. Doing it here doubles the cost and delivers less."]],
    ["A supplier works to fixed contract milestones and does not plan in Planning Intervals. How do you handle it?",
      ["Bring them into Pre-PI Planning, agree integration points for each PI, and move the contract towards incremental delivery over time", [4, 8, 4, 4], "You cannot integrate frequently with a supplier who delivers rarely. Shared planning is the first step; the contract can follow."],
      ["Manage them through the contract, tracking each milestone closely and escalating any slippage", [-2, -8, -2, -2], "You will learn about integration problems at the milestone, when they are most expensive."],
      ["Plan the trains' work independently of the supplier, and integrate the supplier's deliverables into the solution when each contractual milestone arrives", [-4, -10, -4, -2], "Their component becomes the unplanned dependency that surprises every train."]]
  ]);
  event('pi-planning', [
    ["What are the two main outputs of PI Planning?",
      ["Committed PI objectives for each team, with business value assigned, and a program board showing features, dependencies and milestones", [6, 10, 2, 6], "The objectives are the commitment; the board makes the plan and its dependencies visible to everyone."],
      ["A detailed plan showing each person's tasks for every iteration of the PI, and a resource schedule", [-2, -8, 0, -8], "That level of detail is false precision. Teams plan iterations in detail one at a time."],
      ["A requirements baseline for the PI's features, reviewed and signed off by the Business Owners", [-4, -6, 0, -4], "PI Planning produces a shared plan and a commitment, not a specification."]],
    ["At the end of PI Planning the train \"ROAMs\" its risks. What does that mean?",
      ["Each program risk is discussed openly and classed as Resolved, Owned, Accepted or Mitigated, in front of the whole train", [2, 8, 8, 6], "Every risk leaves the room with a clear status and, where needed, a named owner. Doing it in the open builds trust."],
      ["Each risk is recorded in a register with a rating, for the programme office to review and assign afterwards", [-2, -6, -6, -2], "A register nobody has discussed is a list. The value is in the conversation and the ownership."],
      ["Teams raise the risks for which they have a mitigation plan, so that leaders can approve each one", [-2, -6, -8, -6], "The risks without solutions are the ones leaders most need to hear."]],
    ["What is an \"uncommitted objective\"?",
      ["Work the team plans and intends to do but, because of real uncertainty, does not count in its commitment", [4, 10, 2, 6], "It keeps the commitment reliable while being honest about stretch goals. It is not a way to hide spare capacity."],
      ["A lower-priority item that the team will pick up only if it finishes everything else early", [-2, -4, 0, -2], "Uncommitted objectives are planned and worked on. They are just not promised."],
      ["Contingency that the team builds into its plan to protect its commitments, kept within the team", [-4, -6, -2, -6], "Uncommitted objectives are visible to everyone. Hidden buffers destroy trust in plans."]]
  ]);
  event('refinement', [
    ["Who should take part in backlog refinement, and when?",
      ["The whole team with the Product Owner, regularly, looking one or two iterations ahead", [4, 8, 2, 6], "The people who will build the work need to shape it. A little time often keeps the backlog ready without big meetings."],
      ["The Product Owner and business analyst, who prepare stories fully and hand them to the team when ready", [-2, -6, 0, -6], "The team loses the understanding that comes from the conversation, and finds the gaps mid-iteration."],
      ["The whole train, in a single thorough session at the start of the PI that covers every story", [-2, -8, 0, -4], "Stories refined months ahead are stale by the time they are built."]],
    ["A story reads: \"As a user, I want the system to be fast.\" Is it ready?",
      ["No. Make it specific, small and testable — who, doing what, with a measurable response time", [6, 6, 4, 2], "A ready story can be estimated and tested. \"Fast\" means something different to everyone."],
      ["Yes — it states a clear user need, and the team can agree what \"fast\" means while building it", [-4, -6, -2, -2], "Each person will interpret it differently, and nobody can say when it is done."],
      ["No — performance is a non-functional requirement, which belongs in a separate specification and not in a story", [-4, -2, -4, 0], "They can, as measurable acceptance criteria or as constraints that apply across stories."]],
    ["Estimating a story, two team members say 3 points and one says 13. What next?",
      ["Ask the people at the extremes to explain their thinking, then estimate again", [2, 8, 4, 6], "A wide gap means someone knows something the others do not. The discussion matters more than the number."],
      ["Take the middle value of the three estimates, record it and move on to keep the session efficient", [-2, -6, -2, -2], "The average hides the disagreement, and the hidden risk with it."],
      ["Go with the estimate of the most experienced developer, who is best placed to judge", [-2, -2, -2, -8], "Estimates by seniority teach the rest of the team to stop thinking."]]
  ]);
  event('iteration-planning', [
    ["What should the team have at the end of iteration planning?",
      ["An iteration goal and a backlog of stories it believes it can finish, based on its real capacity", [4, 10, 2, 6], "The goal gives purpose and flexibility; the capacity-based backlog makes the commitment credible."],
      ["Every story broken into tasks, each assigned to a named person with an estimate in hours", [-2, -4, 0, -8], "Individual assignment creates silos. The team commits together and decides daily who does what."],
      ["A day-by-day schedule showing when each story will start and finish during the iteration", [-2, -6, 0, -4], "A two-week schedule is detail that will be wrong by the second day."]],
    ["Who decides how much work the team takes into an iteration?",
      ["The team decides how much; the Product Owner decides the order of priority", [2, 10, 2, 10], "Only the people doing the work can judge what fits. Separating \"how much\" from \"in what order\" keeps both honest."],
      ["The Product Owner, who knows what the business needs delivered by the end of the iteration", [-2, -8, 0, -10], "The Product Owner owns priority. Capacity belongs to the team."],
      ["The Scrum Master, using the team's recent velocity with a modest stretch to encourage improvement", [-2, -8, 0, -8], "Velocity is a guide for the team. It is not a quota set by someone else."]],
    ["Halfway through the iteration the Product Owner wants to add an urgent story. What should happen?",
      ["Discuss it with the team: swap it for unstarted work of similar size, if the iteration goal still holds, and do it openly", [6, 6, 0, 6], "Agility allows change. The discipline is making the trade-off visible instead of just adding work."],
      ["Add it to the iteration straight away, since responding quickly to urgent needs is the point of agility", [0, -8, -2, -8], "Adding without removing breaks the commitment and teaches the team that plans are not real."],
      ["Decline, and place it at the top of the backlog for the next iteration, to protect the team's focus", [-6, 2, 0, -2], "Rigid refusal ignores real change. The plan serves the goal."]]
  ]);
  event('daily', [
    ["What is the daily stand-up for?",
      ["The team plans its day around the iteration goal and raises anything in the way", [2, 10, 2, 8], "It is a short planning meeting by the team, for the team."],
      ["Each team member reports progress to the Scrum Master, who tracks it against the plan", [-2, -4, 0, -6], "When people report to one person, they stop talking to each other."],
      ["The team lead reviews yesterday's work and allocates tasks for the day ahead", [-2, -6, 0, -10], "The team organises its own work. Daily task assignment removes that."]],
    ["A stakeholder joins the stand-up and starts questioning individuals about their work. What should happen?",
      ["Observers are welcome to listen; questions wait for a conversation straight afterwards", [2, 8, 0, 8], "The fifteen minutes belong to the team. Stakeholders still get their answers, just not in that slot."],
      ["Let the stakeholder ask their questions, since transparency with stakeholders is an agile value", [-2, -6, 0, -8], "The stand-up becomes a status meeting and people start reporting defensively."],
      ["Make stand-ups a closed meeting for team members only from now on", [-2, 0, 0, -2], "Openness is valuable. The problem is the questioning, not the presence."]],
    ["The team is spread across time zones and cannot find a daily slot that suits everyone. What do you do?",
      ["Use whatever overlap exists, even briefly, and add a written update — keeping the purpose of a daily shared plan", [2, 8, 0, 6], "The form can change. What must survive is a daily moment when the team synchronises."],
      ["Replace the stand-up with a weekly team meeting that everyone can attend", [-2, -8, -2, -6], "Without a daily sync, blockers sit for days."],
      ["Hold a separate stand-up in each location at a convenient local time, with the Scrum Master passing on anything important between them", [-2, -6, 0, -4], "Two half-teams optimise separately and are surprised at integration."]]
  ]);
  event('art-sync', [
    ["What is the ART Sync?",
      ["A regular meeting that combines the Coach Sync (progress and impediments) and the PO Sync (scope and priority) to keep the train aligned between PI Plannings", [4, 10, 2, 4], "It is the train's own heartbeat between planning events — the place to see whether the PI plan is still on track."],
      ["A weekly governance meeting in which the train's senior leaders and Business Owners review each team's status report and approve any changes to scope", [-2, -6, 0, -6], "It is a working meeting for the people running the train, not a governance forum."],
      ["A combined stand-up for all the teams on the train, held in place of their separate daily ones", [-2, -8, 0, -4], "It works at a different level. Teams still need their own daily sync."]],
    ["The ART Sync regularly turns into ninety minutes of problem solving. What should the RTE do?",
      ["Keep it to its time-box: identify the problems, then solve them afterwards with only the people needed", [2, 8, 0, 6], "Most attendees are not needed for most problems. Identifying in the meeting and solving outside respects everyone's time."],
      ["Let it run, since having everyone in the room is the most efficient way to solve the problems", [-2, -6, 0, -6], "People stop attending a meeting that wastes their time, and the alignment is lost."],
      ["Replace the meeting with a written update from each team, and deal with problems one to one", [-4, -8, -2, -2], "Dependencies and risks then surface late and in fragments."]],
    ["What should the train look at in an ART Sync?",
      ["Progress against PI objectives, the dependencies on the program board, risks and impediments", [4, 10, 4, 2], "These show whether the plan made in PI Planning still holds and where help is needed."],
      ["Each team's capacity utilisation, to make sure that everyone on the train is fully allocated", [-2, -6, 0, -8], "Utilisation measures busyness. High utilisation actually slows flow."],
      ["The status of every story in every team, so that nothing is missed across the train", [-2, -6, 0, -4], "That detail belongs to the teams. The train needs the picture at the level of objectives and features."]]
  ]);
  event('iteration-review', [
    ["What is the iteration review for?",
      ["Showing the working increment to stakeholders, getting their feedback and adjusting the backlog", [8, 6, 2, 4], "It is a working session to inspect the product and adapt what comes next."],
      ["Obtaining formal stakeholder sign-off that the iteration's stories are complete", [-2, -4, 0, -2], "Acceptance happens story by story with the Product Owner. The review is for feedback."],
      ["Reporting to stakeholders on the work completed and the velocity the team achieved", [-4, -4, 0, -4], "Activity is not the point. Working, valuable software is."]],
    ["Who should present at the iteration review?",
      ["The team members who built the work, showing it running", [4, 4, 0, 8], "Hearing feedback directly connects the team to its users, and working software cannot be faked."],
      ["The Product Owner, using a short presentation that summarises what was delivered", [-4, -2, 0, -4], "Slides describe. Stakeholders cannot respond to what they cannot see working."],
      ["The Scrum Master, covering the completed stories, velocity and burndown for the iteration", [-4, -2, 0, -4], "Velocity is the team's planning tool. It tells stakeholders nothing about value."]],
    ["Stakeholders have stopped coming to your reviews. What do you do?",
      ["Find out why — timing, relevance, format — and adapt; if necessary take the demo to them", [8, 4, 0, 4], "No audience means no feedback. The cause is usually something the team can fix."],
      ["Hold reviews only at the end of each PI, when there is more to show", [-8, -4, -2, -4], "The team then builds without any outside check until release."],
      ["Record each review and send stakeholders the link, so that they can watch when convenient", [-4, 0, 0, -2], "Better than nothing, but a recording is one-way. You lose the conversation."]]
  ]);
  event('retro', [
    ["What is the iteration retrospective for?",
      ["The team looks at how it worked and chooses one or two improvements to make next iteration", [2, 8, 2, 8], "Small, regular improvement by the team itself is what makes it get better over time."],
      ["Reviewing what went wrong in the iteration and establishing who needs to do what differently", [-2, -4, 0, -12], "Blame ends honesty. The retrospective looks at the system of work."],
      ["Recognising the team's achievements, to keep morale and motivation high", [0, -2, 0, 2], "Recognition matters, but a retrospective with no improvement changes nothing."]],
    ["Should the team's line manager attend the retrospective?",
      ["Not by default. It is the team's space; the team can invite others for specific topics", [0, 4, 0, 10], "People speak freely only when it feels safe. Managers can get the outcomes without being in the room."],
      ["Yes, every time — hearing the problems at first hand lets them remove obstacles faster", [-2, -4, 0, -10], "With a manager present, the real problems tend to go unsaid."],
      ["Yes, and as the person accountable for the team they are best placed to facilitate it", [-2, -4, 0, -12], "A manager-run retrospective becomes a performance review."]],
    ["The same retrospective format every iteration has gone stale. What helps?",
      ["Vary the format, bring data on how work flowed, rotate the facilitator, and start by checking the last actions", [2, 8, 0, 8], "Fresh formats bring fresh insight, and starting with previous actions proves that the meeting leads to change."],
      ["Hold retrospectives every second or third iteration, so that there is more to discuss each time", [-2, -6, 0, -6], "A stale format is a reason to change the format, not to stop improving."],
      ["Extend the meeting to two hours, so that issues can be explored in more depth", [0, -2, 0, -4], "More time in the same format gives more of the same."]]
  ]);
  event('system-demo', [
    ["How does the system demo differ from a team's iteration review?",
      ["It shows the integrated work of all teams on the train, in a production-like environment, to Business Owners and stakeholders", [8, 8, 4, 4], "Each team's work passing separately proves little. The system demo shows whether it works together."],
      ["It follows the same format, with each team presenting its iteration review in turn to a wider audience", [-2, -4, -2, 0], "A sequence of separate team demos hides integration problems."],
      ["It is a consolidated presentation in which the RTE summarises the results of the teams' reviews", [-4, -6, -4, -2], "A summary cannot be tested. The demo must be the running system."]],
    ["Who presents at the system demo?",
      ["Product Management and Product Owners show features end to end, with the teams' support and the RTE facilitating", [6, 4, 0, 4], "Features are shown the way a client would meet them, by the people who own what they are for."],
      ["A developer from each team, walking through what they built and how it works", [-4, -4, 0, -2], "Stakeholders need to see what the system does for clients, not how it is written."],
      ["The RTE, with a presentation covering each team's progress against its PI objectives", [-4, -4, -2, -2], "Slides are not a measure of progress."]],
    ["Your system demos have grown to three hours, showing every story. What do you change?",
      ["Focus on features and end-to-end flows, keep it to about an hour, and capture feedback as you go", [6, 6, 0, 6], "Stakeholders will attend something short and meaningful. Story-level detail belongs in team reviews."],
      ["Move to a single, more polished demo at the end of each PI", [-6, -8, -4, -2], "Less frequent demos mean later discovery of integration problems."],
      ["Keep the format, since every team deserves to have its work seen by stakeholders", [-2, -4, 0, -6], "Attendance will fall until the people whose feedback you need have stopped coming."]]
  ]);
  event('solution-demo', [
    ["What is the solution demo for?",
      ["Showing the integrated result of all trains and suppliers to clients and senior stakeholders, once per PI", [10, 6, 4, 4], "It is the main point at which a large solution is evaluated as a whole, by the people it is for."],
      ["Confirming that the solution has passed quality assurance and is ready to be released", [-2, -2, 0, 0], "Quality is built in throughout. The demo is for evaluation and feedback."],
      ["Presenting the finished solution to the market and to prospective clients", [-2, -2, -2, 0], "It shows real progress, limitations included. Polish is not the purpose."]],
    ["How should the trains prepare for a solution demo?",
      ["By integrating continuously through the PI, so that the demo comes from an environment that already works", [4, 10, 6, 4], "If integration is routine, the demo needs little special preparation and shows the truth."],
      ["By setting up a dedicated demo environment in the final week and rehearsing the scenarios", [-2, -8, -6, -6], "A hand-built environment hides integration problems and costs a week of everyone's time."],
      ["By preparing recorded walkthroughs of the intended solution, to avoid technical problems on the day", [-6, -4, -6, -2], "Stakeholders will make decisions on something that does not exist."]],
    ["What should happen after the solution demo?",
      ["The feedback goes into the solution backlog and the next Pre-PI Planning, and informs investment decisions", [10, 6, 2, 4], "A demo is only worth holding if what is learned changes what happens next."],
      ["The feedback is recorded in the minutes and circulated to everyone who attended", [-4, -2, 0, -2], "Feedback that is recorded but not acted on teaches stakeholders to stop giving it."],
      ["The teams take a well-earned break and then start planning the next PI", [-2, 0, 0, 2], "Celebration is deserved. Skipping the learning wastes the event."]]
  ]);
  event('portfolio-sync', [
    ["What belongs on the agenda of a Portfolio Sync?",
      ["Epic progress through the portfolio Kanban, cross-value-stream dependencies, spend against guardrails and impediments", [4, 8, 4, 2], "It is the operational check on how the portfolio's work is flowing."],
      ["Review and approval of the features and stories each train plans for the coming iteration", [-4, -10, 0, -8], "Far too detailed. That decision belongs to teams and their Product Owners."],
      ["Assessment of how each Epic Owner and value stream lead is performing", [-2, -2, 0, -8], "The portfolio looks at flow and outcomes, not at individuals."]],
    ["How does the Portfolio Sync differ from the Strategic Portfolio Review?",
      ["The sync is operational — how implementation is going. The strategic review asks whether the portfolio is investing in the right things", [4, 6, 2, 2], "Keeping the two questions apart stops operational detail crowding out strategy."],
      ["They cover the same ground and the same attendees; the strategic review is simply a longer, quarterly version of the monthly sync", [-2, -4, 0, 0], "Combining them usually means the strategic question never gets asked."],
      ["The sync covers technology delivery and the strategic review covers business performance", [-4, -4, 0, -4], "Both need business and technology together."]],
    ["What are lean budget guardrails?",
      ["Agreed rules — the mix of investment horizons, capacity for enablers, approval thresholds for large items, Business Owner involvement — within which value streams decide for themselves", [6, 8, 6, 4], "Guardrails give leaders control of the things that matter without approving every decision."],
      ["Spending limits above which a value stream must stop and seek fresh approval", [-4, -6, 0, -4], "A freeze stops spending. Guardrails guide it."],
      ["A detailed budget for each value stream, broken down by initiative and cost type, which is approved line by line at the start of the year and tracked monthly", [-4, -10, 0, -6], "That is the project-approval model lean budgets are designed to replace."]]
  ]);
  event('inspect-adapt', [
    ["What are the three parts of an Inspect & Adapt event?",
      ["The PI system demo, a review of quantitative and qualitative measures, and a problem-solving workshop", [4, 8, 2, 6], "See what was built, look at the numbers, then fix the biggest systemic problem."],
      ["A retrospective for the whole train, a review of lessons learned, and the planning of the next PI", [-2, -4, 0, 0], "It includes reflection, but it is structured around evidence and root-cause analysis."],
      ["A quality audit, formal acceptance by the Business Owners, and release approval", [-4, -4, 0, -4], "It is the train's own improvement event, not a governance gate."]],
    ["How is a train's predictability measured?",
      ["By comparing the business value actually achieved with the value planned, across teams — a healthy train typically lands between 80% and 100%", [6, 10, 2, 4], "The measure rewards realistic plans. A train that always scores above 100% is probably under-committing."],
      ["By comparing the velocity each team achieved with the velocity it planned, averaged over the iterations of the PI, and ranking the teams", [-2, -6, 0, -8], "Velocity is local to a team and not comparable. Comparing it leads to inflated estimates."],
      ["By tracking the number of defects that reached production during the PI", [-2, -2, 2, -2], "A useful quality measure, but it says nothing about whether plans are reliable."]],
    ["What happens in the problem-solving workshop?",
      ["Agree the problem, analyse root causes, pick the biggest one, brainstorm solutions and put improvement items into the next PI", [4, 10, 4, 8], "The structure stops people jumping to solutions, and the backlog items make the improvement real."],
      ["The train reviews each missed objective in turn, identifies which team was responsible for it, and agrees a corrective action with that team", [-2, -4, 0, -14], "Blame ends the honesty the workshop depends on."],
      ["Each team presents its top issues, and management takes them away to resolve", [-2, -4, 0, -6], "Handing problems upward removes the train's ownership of its own improvement."]]
  ]);
  event('qbr', [
    ["What is a Strategic Portfolio Review for?",
      ["Checking the portfolio against strategy — where the money is going, what outcomes value streams are achieving — and adjusting funding", [10, 6, 4, 2], "It is where leaders decide whether to persevere, change or stop, on evidence."],
      ["Reviewing the status, milestones and budget position of each initiative in the portfolio, and agreeing recovery actions for any that are behind", [-4, -4, 0, -4], "Status reviews look at activity. This review looks at outcomes and investment."],
      ["Agreeing and approving the portfolio's budget and project list for the coming year", [-4, -6, 0, -2], "Funding is adjusted quarterly, in small steps. An annual event is too slow."]],
    ["The review shows that 100% of investment goes to today's core business. Is that a problem?",
      ["Yes. A healthy portfolio balances today's business with emerging and exploratory work, and retires what is declining", [10, 2, 4, 2], "All-in on the present starves the future. The investment-horizon view exists to make this visible."],
      ["No — the core business generates the revenue, so that is where investment earns the surest return", [-8, 0, -2, 0], "It is, until it is not. By then there is nothing ready to replace it."],
      ["Yes — most of the investment should move to new ventures, where the future growth will come from", [-4, -6, -8, -4], "Swinging to the other extreme neglects the clients and systems that pay for everything."]],
    ["Leaders at the review never stop anything. Every initiative continues. What needs to change?",
      ["Make stopping a normal outcome: set criteria in advance, value what was learned, and redeploy the people", [8, 8, 2, 6], "If nothing can be stopped, nothing new can start. Clear criteria take the politics out of it."],
      ["Keep every initiative going, but reduce each one's funding so that new work can also be started", [-6, -8, 0, -6], "Many under-funded initiatives finish slowly or not at all."],
      ["Let weaker initiatives lapse by not renewing their funding, without making an announcement", [-2, -2, -4, -10], "Teams deserve to know why. Silent cancellations destroy trust."]]
  ]);

  /* ═════════════ Roles (first item is the event the question is set in) ═════════════ */
  role('sm', [
    ['daily', "A new team member asks you: \"So are you our manager?\"",
      ["No — I coach the team and look after how we work. I do not assign tasks or appraise people", [0, 6, 0, 10], "The Scrum Master leads by serving. Being clear about that keeps the team's ownership of its work intact."],
      ["In practice, yes — I make sure the work gets done and the team delivers what it has committed to", [-2, -4, 0, -10], "If the team sees you as its manager, it will wait for instructions and tell you what you want to hear."],
      ["Not formally, though I do keep your line manager informed of how each of you is getting on", [-2, -2, 0, -12], "A Scrum Master who reports on individuals cannot be trusted with the team's problems."]],
    ['art-sync', "New joiners wait three weeks for a working laptop and system access. The team cannot fix it.",
      ["Take it to the Coach Sync and the RTE with the cost made visible, and follow it through", [2, 10, 2, 6], "Impediments beyond the team are yours to escalate. Putting a cost on it gets attention."],
      ["Explain to the team that onboarding takes this long across the bank, and plan new joiners' first weeks around it", [-2, -8, 0, -6], "Accepting it guarantees it never changes."],
      ["Arrange for new joiners to use a colleague's login for their first weeks, so that they can be productive", [0, 4, -16, -2], "Shared credentials are a serious security breach in any bank."]]
  ]);
  role('po', [
    ['iteration-planning', "You are Product Owner for three teams, and each complains that you are rarely available.",
      ["Raise it: either reduce the number of teams you serve or delegate clear authority, because a team needs an available Product Owner", [6, 8, 0, 8], "An absent Product Owner means waiting, guessing and rework. It is a structural problem to solve."],
      ["Ask each team to make reasonable assumptions when you are unavailable, and review them at the iteration review", [-4, -6, -2, -4], "Assumptions get built in, and you discover them at the review."],
      ["Ask the business analyst on each team to make day-to-day decisions informally on your behalf", [-2, -2, -2, -4], "Without clear authority, their decisions can be overturned and nobody knows who is accountable."]],
    ['pi-planning', "A new team member asks how your role relates to the Product Manager's.",
      ["The Product Manager owns the train's features and roadmap; I own this team's backlog and stories, and we work closely together", [6, 6, 0, 4], "Two levels of the same job: the Product Manager faces the market and the train, the Product Owner faces the team."],
      ["The Product Manager sets the requirements and I pass them on to the team as stories to deliver", [-2, -2, 0, -4], "The Product Owner has real authority over the team backlog. It is a partnership."],
      ["They are separate roles: the Product Manager deals with the market and I deal with the team, independently", [-6, -6, 0, -2], "A team backlog disconnected from the train's features delivers work that adds up to nothing."]]
  ]);
  role('dev', [
    ['refinement', "You are asked to estimate a story you do not really understand.",
      ["Ask questions until you do, and if the unknown is technical, propose a short time-boxed investigation", [4, 8, 4, 4], "An honest \"I do not know yet\" is more useful than a number. A time-boxed spike turns the unknown into knowledge."],
      ["Give a deliberately high estimate, so that the team is covered whatever the story turns out to involve", [-2, -4, 0, -2], "A padded guess hides the uncertainty instead of resolving it."],
      ["Give an estimate in line with similar-sounding stories, so that planning is not held up", [-2, -8, -2, -4], "A number chosen to please becomes a commitment you cannot keep."]],
    ['retro', "You think the team's code-review practice is slowing everything down.",
      ["Bring the data and a proposal to the retrospective, and suggest trying it as an experiment", [2, 8, 2, 8], "The retrospective is where the team changes how it works. An experiment is easy to agree to and easy to reverse."],
      ["Raise your concerns informally with a couple of colleagues, to see whether they feel the same way", [-2, -4, 0, -6], "The frustration spreads and nothing changes."],
      ["Merge your own smaller changes without review for now, to show that it speeds things up", [0, 2, -12, -6], "You have removed a quality and security control without telling anyone."]]
  ]);
  role('qa', [
    ['daily', "Developers call you \"the tester\" and hand you everything in the last two days of the iteration.",
      ["Propose that quality is the whole team's job: pair on tests, write tests before code, and put it in the Definition of Done", [4, 8, 6, 6], "Quality engineering means helping the team build quality in. Testing at the end can only find problems."],
      ["Accept that testing comes last, and put in extra hours at the end of each iteration to get through it", [-2, -6, -4, -8], "You become the bottleneck, and corners get cut under time pressure."],
      ["Tell the developers that anything handed over in the last two days will not be tested until the next iteration", [-2, -4, -2, -8], "It makes the point and damages the relationships you need to change the practice."]],
    ['pi-planning', "The team's draft PI plan has no capacity for performance or security testing.",
      ["Raise it in planning and get test automation and non-functional testing into the plan as enablers", [2, 6, 10, 4], "If it is not in the plan, it will not happen. PI Planning is the moment to make that work visible."],
      ["Plan the performance and security testing for the Innovation & Planning iteration at the end of the PI", [-2, -6, -8, -4], "The end of the PI is when there is least time and most pressure."],
      ["Leave the plan as it is, since the Business Owners have prioritised features and have not asked for it", [-2, -2, -12, -4], "They are not asking because they assume it is being done."]]
  ]);
  role('ba', [
    ['iteration-planning', "The Product Owner is away, and the team asks you to decide the priorities for the iteration.",
      ["Help with analysis and options, and get the Product Owner's decision or their explicit delegation", [4, 6, 0, 4], "You can prepare the decision. Priority is the Product Owner's accountability unless they hand it to you."],
      ["Set the priorities yourself, based on your understanding of what the Product Owner would want", [-2, 2, 0, -4], "The team moves, but on an order the Product Owner may reverse."],
      ["Explain that prioritisation is the Product Owner's role, and that the team will need to wait for their return", [-4, -6, 0, -4], "Technically right, and it leaves the team stuck."]],
    ['iteration-review', "A feature matches its story exactly, but operations says their process changed last month.",
      ["Treat it as a lesson: stay closer to operations, check the process regularly, and update the backlog", [6, 4, 2, 4], "Requirements have a shelf life. Regular contact with the people doing the work is how you notice change."],
      ["Point out that operations changed its process without informing the team, and ask them to raise a change", [-4, -2, 0, -6], "Possibly true, and it does nothing to fix the feature or the gap in communication."],
      ["Point out that the story was reviewed and agreed by operations before the work began", [-6, -2, 0, -4], "A signed-off story that no longer fits the work has no value."]]
  ]);
  role('ux', [
    ['pi-planning', "You are the only UX designer for four teams, and in PI Planning each wants you full time.",
      ["Make your capacity visible, prioritise with Product Management, and invest in a design system so that teams can do more themselves", [6, 8, 0, 4], "A shared specialist is a constraint. Visible capacity and reusable patterns are how you stop being the bottleneck."],
      ["Agree to support all four teams as they have asked, and work out how to manage the load during the PI", [-2, -10, 0, -8], "You have committed four times your capacity. All four plans now depend on something that cannot happen."],
      ["Commit to the team whose feature you consider most interesting, and ask the others to cope without you", [-4, -4, 0, -6], "Allocation by preference leaves the most important work to chance."]],
    ['daily', "You find that developers changed your design because of a technical constraint and did not tell you.",
      ["Talk to them, understand the constraint, agree an adjustment together, and pair earlier next time", [4, 6, 0, 8], "They solved a real problem. Working together sooner gets a better answer than either of you alone."],
      ["Ask the developers to rework it to match the approved design, since the design was tested with users", [-2, -6, 0, -8], "Rework for its own sake, and next time they will tell you even less."],
      ["Let it stand, since the feature works and the difference is unlikely to matter to most users", [-4, 0, 0, -2], "The inconsistency stays, and so does the habit of not talking."]]
  ]);
  role('rte', [
    ['system-demo', "Business Owners have stopped attending the system demo.",
      ["Find out why, make the demo meaningful in business terms, keep it on a fixed cadence, and explain what their absence costs", [8, 6, 0, 4], "Without Business Owners there is no business feedback. The RTE owns the health of the train's events."],
      ["Continue the demos for the teams' own benefit, record them, and send Business Owners a written summary and the recording afterwards", [-6, -2, -2, -4], "The train keeps building with nobody confirming it is building the right thing."],
      ["Suspend the demos until the Business Owners are able to commit to attending again", [-6, -8, -2, -4], "The teams lose their integration checkpoint as well."]],
    ['inspect-adapt', "What is your part in the Inspect & Adapt event?",
      ["Facilitate the event and the problem-solving workshop, and make sure the improvement items reach the next PI's backlog", [4, 10, 2, 8], "You create the conditions for the train to solve its own problems, and you make sure the result is acted on."],
      ["Analyse the PI's problems in advance and present the improvements the train should adopt", [-2, -4, 0, -10], "Improvements imposed on the train are not owned by it."],
      ["Assess each team's performance against its objectives and share the results", [-2, -4, 0, -12], "Scoring teams turns a learning event into an appraisal."]]
  ]);
  role('pm', [
    ['art-sync', "Product Owners bring scope questions to the PO Sync that you cannot answer without talking to clients.",
      ["Get the insight quickly — calls, usage data — and decide within days so that teams are not blocked", [8, 8, 0, 4], "Knowing the client is your job, and speed of decision is part of it. A good answer this week beats a perfect one next month."],
      ["Give your best judgement on each question, so that the teams are not held up waiting", [-4, 2, -2, -2], "Sometimes necessary, but a habit of guessing means building on opinion."],
      ["Record the questions and settle them properly in the preparation for the next PI", [-6, -8, 0, -4], "The teams either wait or guess for you."]],
    ['inspect-adapt', "The train delivered every planned feature this PI, yet the business outcomes have not moved.",
      ["Go back to each feature's benefit hypothesis, measure outcomes instead of output, and adjust the roadmap", [10, 4, 0, 2], "Delivery is only the means. If outcomes do not move, the hypotheses were wrong or incomplete."],
      ["Recognise the train's achievement — delivering every planned feature is a strong result", [-6, 0, 0, 2], "A train can be perfectly predictable at delivering things nobody needs."],
      ["Raise with the head of sales that the new features are not being promoted to clients", [-4, 0, 0, -4], "Possible, but assuming it avoids examining your own choices."]]
  ]);
  role('sa', [
    ['art-sync', "A team asks you to design their component for them.",
      ["Work with them: set the guardrails, coach, and let the team own the design", [2, 6, 4, 8], "Architecture at this level guides. Teams that own their designs maintain them better."],
      ["Produce the design for them, since you have the experience and it will be quicker and more consistent", [0, 2, 2, -6], "Faster this once, and the team becomes dependent on you for every decision."],
      ["Explain that component design belongs to the team, and point them to the architecture standards", [-2, -4, -2, -4], "They asked for help. Refusing leaves a risk unaddressed."]],
    ['system-demo', "The system demo shows that response times collapse under realistic load.",
      ["Make the performance requirements explicit, test them continuously, and put the enabling work in the backlog", [4, 6, 10, 4], "Non-functional qualities need the same visibility and testing as features, or they are discovered in production."],
      ["Record it as a performance-tuning task to be completed before go-live", [-2, -6, -8, -2], "Performance problems found late are usually design problems."],
      ["Identify which team's component is causing the slowdown and ask them to fix it", [-2, -2, 0, -10], "Performance is a property of the whole system. Start there."]]
  ]);
  role('bo', [
    ['pi-planning', "What is a Business Owner expected to do at PI Planning?",
      ["Give the business context, be available to teams, review draft plans, assign business value to objectives and accept the final plans", [8, 8, 2, 8], "The Business Owner is an active participant throughout. Their presence is one of the strongest predictors of a good PI."],
      ["Present the business context at the opening, then leave the teams to plan and return for the final read-out", [-6, -6, 0, -6], "Teams then make trade-offs without the person accountable for the outcome."],
      ["Review and approve each team's stories, to make sure the plan reflects business priorities", [-2, -8, 0, -8], "Far too detailed. Your level is objectives and business value."]],
    ['art-sync', "Mid-PI you hear that one of the committed objectives is at risk.",
      ["Thank the team for the early warning, help decide the trade-off, and clear whatever you can", [6, 8, 2, 10], "How you react to bad news decides how early you hear it next time."],
      ["Ask the team for a recovery plan that shows how the original commitment will still be met", [-2, -6, -2, -10], "Pressure does not change capacity. It changes what people tell you."],
      ["Give the team space to resolve it, and review the position at the end of the PI", [-4, -8, -2, -2], "Your options shrink with every iteration you wait."]]
  ]);
  role('ste', [
    ['pi-planning', "The trains in your value stream hold PI Planning at the same time. What do you do during it?",
      ["Move between the trains, facilitating cross-train dependencies and solution-level risks, and keep the RTEs in sync", [4, 10, 4, 4], "The dependencies between trains are where large solutions fail. That gap is your responsibility."],
      ["Base yourself with the train that has the most difficult plan, where your help counts most", [-2, -4, -2, 0], "The other trains make plans that depend on each other with nobody connecting them."],
      ["Leave the RTEs to run their events, and review their summaries once planning is complete", [-4, -8, -4, -2], "By then the plans are committed and the conflicts are built in."]],
    ['epic-review', "A supplier insists on delivering one large release per quarter.",
      ["Negotiate smaller, more frequent deliveries with joint integration, and show them the cost of integrating late", [4, 10, 6, 4], "Large infrequent drops mean large infrequent surprises. Most suppliers respond to evidence of what it costs."],
      ["Accept the quarterly cycle as the supplier's way of working, and plan the trains' integration around it", [-2, -8, -4, -2], "The whole value stream's rhythm is then set by its slowest supplier."],
      ["Begin the process of replacing them with a supplier that can deliver more frequently", [-4, -8, -4, -4], "A drastic step before the simpler conversation has been tried."]]
  ]);
  role('solm', [
    ['system-demo', "A train's Product Manager asks you to decide the priority of stories within one team.",
      ["Stay at capability level: give the intent and priorities, and leave decisions below that to Product Management and Product Owners", [4, 8, 0, 8], "Each level decides what it is closest to. Reaching down two levels slows everything and undermines the people there."],
      ["Make the decision, since you have the broadest view of what the solution needs", [-2, -6, 0, -8], "Every team will start bringing you their decisions."],
      ["Explain that story priorities are not your concern, and leave the Product Manager to sort it out", [-4, -4, 0, -4], "They may need your intent to make the decision themselves."]],
    ['inspect-adapt', "Your solution roadmap shows fixed dates eighteen months out, and stakeholders treat them as promises.",
      ["Show the near term as committed and the longer term as a forecast of decreasing certainty, and say so clearly", [8, 8, 2, 4], "A roadmap is a forecast. Honest communication of confidence protects trust when things change."],
      ["Keep the fixed dates, since they give clients and stakeholders the certainty they need to plan", [-4, -6, -2, -4], "They reassure until the first one is missed."],
      ["Stop publishing a roadmap beyond the current PI, to avoid setting expectations that may change", [-6, -4, 0, -2], "Clients and other value streams need to know where you are heading."]]
  ]);
  role('sola', [
    ['epic-review', "An epic needs architectural input before the go decision. How much analysis is enough?",
      ["Enough to understand feasibility, the main risks, the enablers needed and a cost range — then learn the rest through the MVP", [4, 8, 6, 4], "The aim is a good decision, not a finished design. Building a small increment answers what analysis cannot."],
      ["A complete solution design, so that the decision is taken with full knowledge of what will be built", [-2, -10, 2, -4], "Months of design for something that may be stopped or reshaped after the MVP."],
      ["Very little; the architecture should emerge from the teams' work once the epic is under way", [-2, 2, -10, -2], "Some decisions are too costly to reverse to leave entirely to emergence."]],
    ['solution-demo', "The solution demo reveals that two trains have each built a version of the same service.",
      ["Surface it, agree a single owner and a plan to converge, and tighten the architecture sync across trains", [4, 8, 6, 4], "Duplication is the symptom; the missing conversation between trains is the cause."],
      ["Leave both in place, since each works and serves its own train's needs", [-2, -6, -6, 0], "Two services to secure, maintain and keep consistent, indefinitely."],
      ["Instruct both trains to retire their versions and replace them with a single new shared service built to a common design", [-4, -8, 0, -8], "A mandated rewrite ignores what each train has learned and the work already in flight."]]
  ]);
  role('eo', [
    ['strategy', "You have an idea that could become an epic. What is the first step?",
      ["Write a short epic hypothesis — the problem, the expected outcome and leading indicators — and enter it in the portfolio funnel", [6, 8, 2, 2], "A hypothesis statement is cheap to write and easy to discuss. It lets the portfolio decide whether analysis is worthwhile."],
      ["Prepare a full business case with detailed financials, so that the idea is taken seriously", [-2, -8, 0, -2], "A heavy investment before anyone has agreed the idea deserves analysis."],
      ["Secure the backing of a senior executive first, so that the idea has a sponsor when it is raised", [-4, -4, -2, -4], "Lobbying bypasses the comparison with other ideas that the portfolio needs."]],
    ['pi-planning', "Your epic is approved and its features are in the trains' PI Planning. What is your role there?",
      ["Be available to explain the intent and the MVP, and help Product Management shape features — without dictating the teams' plans", [6, 8, 0, 6], "You carry the knowledge of why. The trains own how and when."],
      ["Coordinate the teams' work on the epic's features across the trains, to make sure that they are delivered as the business case intended", [-2, -6, 0, -8], "The Epic Owner has no authority over teams. That belongs to the train."],
      ["Step back now that the epic is approved, and let the trains take it from here", [-6, -4, 0, -2], "Intent gets lost in hand-offs. Your presence prevents that."]]
  ]);
  role('lpm', [
    ['qbr', "How should the portfolio's performance be shown at the strategic review?",
      ["A few outcome measures for each value stream, with flow, predictability and the split of investment by horizon", [10, 6, 2, 2], "A small balanced set shows whether the portfolio is achieving its strategy and where to act."],
      ["A comprehensive dashboard of delivery metrics for every initiative in the portfolio, so that nothing is hidden from the leadership", [-4, -6, 0, -4], "Hundreds of numbers hide the few that matter."],
      ["Actual spend against budget for each value stream, with variances explained", [-6, 0, 0, -2], "Spending to plan says nothing about whether the spending achieved anything."]],
    ['solution-demo', "Members of the portfolio leadership rarely see the products they fund.",
      ["Attend solution demos regularly, so that funding decisions rest on evidence you have seen", [8, 4, 2, 6], "A demo tells you in an hour what reports cannot. It also shows teams that leaders care about the product."],
      ["Rely on the portfolio reports and dashboards, which summarise progress across all value streams", [-6, -2, -2, -4], "Reports are filtered. Decisions made on them alone are a step removed from reality."],
      ["Nominate a delegate to attend the demos and report back to the leadership", [-2, 0, 0, -2], "Sometimes necessary, but the people who decide funding should see what it buys."]]
  ]);
  role('ea', [
    ['pi-planning', "Should the Enterprise Architect attend a train's PI Planning?",
      ["Yes, selectively: share the architectural direction, listen for runway needs and cross-train issues, and support the System Architects", [2, 6, 6, 6], "Direction is better understood in person, and you learn what teams actually need from the platforms."],
      ["No — PI Planning is a team-level event, and the Enterprise Architect works at portfolio level", [-2, -4, -4, -2], "Architecture set at a distance drifts away from what teams experience."],
      ["Yes — to review and approve each team's technical design before it commits", [-2, -8, 2, -8], "Design approval at PI Planning turns you into a gate and takes ownership from teams."]],
    ['qbr', "Teams have started using AI coding assistants, and there is no guidance.",
      ["Work quickly with risk and security to provide guardrails and an approved way to use them, so that teams can experiment safely", [4, 6, 10, 6], "People adopt useful tools with or without permission. A safe, supported route is the best control."],
      ["Prohibit their use across the bank until a full policy has been written, reviewed by legal and security, and formally approved", [-4, -6, 2, -8], "Use continues unseen, which is the worst position for managing risk."],
      ["Leave it to the teams' professional judgement, since they understand the tools", [0, 2, -12, 0], "Source code and client data may be leaving the bank with nobody aware of it."]]
  ]);
  role('coach', [
    ['retro', "A Scrum Master asks you to run their retrospective — again.",
      ["Facilitate it together this time, coach them, and hand it over; your job is to build their capability", [2, 6, 0, 8], "A coach who keeps doing the work creates dependence. Success is when they no longer need you."],
      ["Run it again, since the team benefits from an experienced facilitator", [0, 0, 0, -6], "The team gets good retrospectives until you leave."],
      ["Decline, explaining that facilitating the team's retrospectives is the Scrum Master's own responsibility and not a coach's", [-2, -2, 0, -4], "They asked because they are struggling. Refusing does not teach them."]],
    ['strategy', "Leaders want agile \"rolled out\" to all 3,000 staff by the end of the year.",
      ["Start with one value stream where leaders are engaged, train those leaders first, learn, and then scale", [6, 8, 2, 8], "Change spreads from visible success. Leaders who understand it are the difference between new habits and new labels."],
      ["Arrange a training programme that takes all 3,000 staff through agile fundamentals by year end", [-2, -6, 0, -8], "Mass training with no change in how leaders lead produces cynicism."],
      ["Explain that a transformation of this size cannot be done in a year, and propose three", [-4, -2, 0, -2], "The ambition is useful. Redirect it into something that can work."]]
  ]);
  role('risk', [
    ['epic-review', "You are asked for a view on an epic's lean business case.",
      ["Give a proportionate early view of the main risks and regulatory constraints, and what the MVP must include to stay within appetite", [6, 8, 12, 4], "Early, proportionate input shapes the idea while it is cheap to change. That is worth more than a late veto."],
      ["Ask for the complete documentation set and the detailed design, so that your view rests on a full understanding of what is proposed", [-4, -10, 2, -6], "Full documentation for an idea that may not proceed is waste, and delays the decision."],
      ["Give it a light-touch approval, since an MVP is limited in scope by definition", [0, 2, -14, -2], "An MVP with real clients carries real regulatory risk."]],
    ['art-sync', "Mid-PI, a new regulatory interpretation is issued that affects two teams' work.",
      ["Bring it to the ART Sync promptly with a clear requirement and date, and help the teams assess the impact", [4, 8, 12, 4], "The train can only re-plan around what it knows. A clear requirement and deadline lets it make a proper trade-off."],
      ["Circulate the regulator's document to the two affected teams straight away, so that they can read it and assess the impact themselves", [-2, -4, -4, -4], "A forwarded document is not a requirement. Teams will interpret it differently or not at all."],
      ["Record it for inclusion in the next scheduled compliance review", [0, 2, -16, -2], "The teams build non-compliant features in the meantime."]]
  ]);
  role('sponsor', [
    ['epic-review', "What does sponsoring an initiative involve, week to week?",
      ["Staying engaged: attending key demos, removing enterprise-level impediments, protecting the funding and people, and holding it to its outcomes", [8, 8, 2, 8], "Sponsorship is active. Much of an initiative's success depends on blockers only a senior person can remove."],
      ["Approving the business case and the funding, then reviewing progress against the plan at the quarterly and annual checkpoints", [-6, -6, -2, -6], "By the annual review, the problems you could have removed have done their damage."],
      ["Staying close to the teams and steering their day-to-day priorities", [-2, -8, 0, -10], "That is micromanagement, and it removes the teams' ability to respond to what they learn."]],
    ['inspect-adapt', "Inspect & Adapt identifies an impediment that only you can fix: procurement takes nine months.",
      ["Own it — work with your peers to change the policy, and report back to the train on progress", [6, 10, 2, 10], "When a leader takes on a systemic impediment and reports back, teams learn that raising problems works."],
      ["Ask the RTE to take it up with the head of procurement directly", [-2, -6, 0, -8], "The train has no authority over procurement. That is why it was escalated."],
      ["Add it to the agenda for a future leadership discussion on ways of working, where it can be considered with other issues", [-4, -8, 0, -8], "An impediment noted and not acted on teaches the train to stop raising them."]]
  ]);
  role('head', [
    ['solution-demo', "You are invited to a solution demo and asked to bring a client.",
      ["Attend, bring real users from the client, encourage frank feedback and follow up on what is promised", [10, 4, 2, 6], "You hold the relationship. Bringing real users gives the teams the feedback that matters most."],
      ["Send the relationship manager in your place, as they know the client's day-to-day needs", [-4, -2, 0, -4], "It signals to the client and the teams that the event is not important."],
      ["Use the occasion to brief the client on other products that may interest them", [-6, -2, -2, -4], "The client came to give feedback. Turning it into a sales meeting wastes their goodwill."]],
    ['pi-planning', "You are asked to give the business context at the opening of PI Planning.",
      ["Describe what clients and the market are doing, the strategic priorities and why the work matters — then stay and listen", [8, 6, 0, 10], "People commit to work they understand the reason for. Staying to listen shows the context goes both ways."],
      ["Suggest that a technology leader gives it, since PI Planning is a delivery event", [-6, -4, 0, -6], "PI Planning is a business event. Without business context the teams plan in the dark."],
      ["Present this year's revenue targets for the corporate bank, and what each train must deliver, and by when, to meet them", [-2, -6, 0, -10], "Targets without context are pressure, and pressure distorts planning."]]
  ]);
  role('cio', [
    ['solution-demo', "As CIO at a solution demo, what should you be looking for?",
      ["Evidence that the solution is integrated, of good quality and operable — and what enabling work the teams need you to back", [6, 6, 10, 6], "Your questions about pipelines, resilience and technical debt show that these matter as much as features."],
      ["The quality, polish and consistency of the user interface, since that is what clients see first and will judge the bank on", [-4, 0, -2, -2], "Polish says little about whether the solution can be run and changed safely."],
      ["Which trains are behind plan, so that you can follow up with their leaders", [-2, -2, 0, -10], "Using a demo to find who is late ensures future demos hide it."]],
    ['inspect-adapt', "Several trains name test environments as their biggest impediment, PI after PI.",
      ["Fund self-service environments as a strategic enabler, with an owner and measures", [4, 10, 6, 8], "An impediment shared by many trains is an enterprise problem. Platform investment removes it for everyone."],
      ["Ask the trains to agree a booking rota, so that the existing environments are shared fairly", [-2, -6, 0, -6], "The constraint is capacity and provisioning time. Courtesy does not change that."],
      ["Approve the purchase of more servers to increase the number of environments", [0, 0, 0, -2], "More hardware with the same slow manual provisioning leaves the queue in place."]]
  ]);
  role('cro', [
    ['solution-demo', "You are invited to the solution demo of a new product.",
      ["Attend, or send an empowered delegate: see the controls working and ask your questions early", [4, 4, 12, 6], "Seeing controls operate is strong assurance, and questions asked now are cheap to answer."],
      ["Decline, so that the risk function's later review remains fully independent", [-2, -4, -4, -4], "Independence means forming your own judgement, not avoiding the evidence."],
      ["Attend with the aim of identifying grounds on which the product should be stopped", [-6, -6, 2, -10], "Arriving with the conclusion already reached closes off the conversation that could have made it safe."]],
    ['inspect-adapt', "A train asks to replace a manual sign-off that you own with an automated check.",
      ["Engage: define what the control must achieve, agree automated evidence that is at least as strong, and verify it with a pilot", [4, 10, 12, 6], "A control is defined by its objective. Automated checks are often stronger and always more consistent — once verified."],
      ["Decline, on the basis that accountability for a control requires a named person's signature, which an automated check cannot provide", [-4, -8, 2, -6], "A signature is one way to meet the objective. Insisting on the method protects the queue."],
      ["Agree, and transfer the control to the train as part of its pipeline", [0, 6, -14, -2], "You remain accountable for the control. Unverified automation is an assumption."]]
  ]);
})();
