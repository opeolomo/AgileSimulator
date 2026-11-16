/* Role-specific questions: three per role, shown only to that role. Loaded after data.js.
   Row format: [event, prompt, [answer, [value, flow, risk, team], feedback] x3]. */
(function () {
  const D = window.AS_DEFAULTS;
  const add = (role, rows) => rows.forEach((r, n) => D.questions.push({
    id: 'r-' + role + '-' + (n + 1), scenario: '*', event: r[0], levels: [], roles: [role], type: 'single', prompt: r[1],
    options: r.slice(2).map(o => ({ text: o[0], impact: { v: o[1][0], f: o[1][1], r: o[1][2], m: o[1][3] }, feedback: o[2] }))
  }));

  /* ═════════════ Team ═════════════ */
  add('sm', [
    ['pi-planning', "Your team's draft plan is loaded to 110% of capacity in every iteration, and the Product Owner is pushing to add one more story.",
      ["Make the capacity numbers visible and facilitate the trade-off between the Product Owner and the team, keeping some buffer", [2, 10, 2, 8], "Your job is to make the facts visible and help the team and Product Owner decide. A plan with no slack fails at the first surprise."],
      ["Support the Product Owner's request, since the story is small and the business case for including it is strong", [0, -10, -2, -10], "An overloaded plan is a plan to miss. You have also taught the team that capacity is negotiable under pressure."],
      ["Take two lower-priority stories out of the plan yourself, so that the load comes back within capacity", [-2, 4, 0, -6], "The numbers improve, but scope is the Product Owner's call and the plan is the team's. Deciding for them removes their ownership."]],
    ['iteration-planning', "A senior manager joins iteration planning and starts assigning stories to people by name.",
      ["Thank them for coming, explain that the team pulls its own work, and offer to talk afterwards about what they need from the team", [2, 6, 0, 10], "You protect self-organisation without making an enemy. Managers who assign work usually have an unmet need for visibility — find it."],
      ["Let the manager continue, since they know people's strengths and it speeds up the planning", [-2, -4, 0, -10], "The team stops owning its plan, and people start waiting to be told."],
      ["Politely ask the manager to step out, explaining that iteration planning is a team-only event and that you will send a summary afterwards", [0, 0, 0, -4], "It protects the team today and damages a relationship the team needs."]],
    ['retro', "The team is silent in retrospectives. One confident voice says everything is fine and the meeting ends early.",
      ["Change the format — silent writing, anonymous input — and follow up one to one to find out what is making people hold back", [2, 6, 2, 10], "Silence is information. Different formats lower the cost of speaking, and private conversations reveal the cause."],
      ["Take the team at its word, record that there is nothing to improve and give people the time back", [-2, -6, -2, -6], "A team with nothing to improve is almost always a team that does not feel safe saying so."],
      ["Go round the room and ask each person in turn to name at least one thing that could have gone better in the iteration", [-2, 0, 0, -8], "Putting people on the spot raises the pressure that caused the silence."]]
  ]);
  add('po', [
    ['pi-planning', "A Business Owner asks you to commit your team to a feature that the team has just told you does not fit.",
      ["Be honest about capacity and offer options: a smaller slice now, or the full feature as an uncommitted objective", [6, 8, 0, 8], "Options turn a refusal into a decision the Business Owner can make. Your credibility rests on commitments that hold."],
      ["Commit to the feature on the team's behalf, trusting that they will find a way once it is a firm priority", [-2, -10, -2, -12], "You have spent the team's trust and created a promise that will probably break."],
      ["Explain that the team has no capacity for it this PI, and move the discussion on to the next item", [-6, 2, 0, 0], "The plan is protected, but the Business Owner's need is unexplored. There is usually a slice that helps."]],
    ['refinement', "Two stakeholders give you conflicting priorities for the next iteration, and each says theirs is urgent.",
      ["Bring them together with the facts on value and urgency, make the call, and explain it openly", [8, 6, 0, 4], "Ordering the backlog is your decision. Making it openly, on evidence, is what gets it accepted."],
      ["Split the iteration between the two requests, so that both stakeholders see progress on their priority", [-4, -8, 0, -4], "Two half-finished things deliver nothing to either stakeholder."],
      ["Put both options to the team and let them choose the one they think is more valuable", [-4, -2, 0, -4], "You have handed your accountability to people who lack the business context."]],
    ['iteration-review', "A stakeholder asks you to accept a story that misses one acceptance criterion, \"because the client is waiting\".",
      ["Decline to accept it; if the finished part is valuable alone, split the story and release that part", [6, 4, 6, 4], "Done means done. Splitting gets real value to the client without pretending the rest is finished."],
      ["Accept the story, since it is nearly complete and the client's need is real and urgent", [0, -6, -8, -4], "The Definition of Done now has an exception, and the missing criterion becomes a production defect."],
      ["Accept it with a recorded note that the missing criterion will be completed in the next iteration", [0, -6, -6, -2], "Hidden unfinished work inflates velocity and tends never to be picked up."]]
  ]);
  add('dev', [
    ['iteration-planning', "A story you are about to take touches a module with no automated tests.",
      ["Say so in planning and include the test coverage in the estimate, so that the cost is visible", [2, 6, 8, 4], "Making technical debt visible lets the Product Owner weigh it. Changing untested code that moves client money is a real risk."],
      ["Add a few points to your estimate to cover writing the tests, without raising it as a separate concern", [0, -2, 2, -2], "The work gets done, but hidden padding erodes trust in estimates and keeps the debt invisible."],
      ["Take the story as estimated and rely on careful manual testing, since adding tests would double the effort", [0, 2, -12, -4], "The risk has not gone; it has moved to production."]],
    ['daily', "You have been stuck on the same problem for a day and a half.",
      ["Say so at the stand-up and ask someone to pair with you", [2, 10, 2, 6], "Asking early is a strength. A second pair of eyes usually costs minutes and saves days."],
      ["Report it as in progress and give it one more day, since you feel you are close to a solution", [-2, -8, 0, -4], "The board says progress; the reality is a blocked story nobody knows about."],
      ["Pick up another story for now and come back to the problem later with a fresh mind", [-2, -6, 0, -2], "Work in process goes up and the hard problem is still waiting."]],
    ['system-demo', "The evening before the system demo, you find that your change breaks another team's feature in the integrated environment.",
      ["Tell both teams and the RTE now, then fix it or switch your change off, and say what happened", [2, 6, 6, 8], "Integration problems are normal; hiding them is the failure. Early notice gives everyone options."],
      ["Leave it for tonight and raise it straight after the demo, when the teams have more time to deal with it", [-4, -6, -8, -8], "If it shows in the demo, trust is damaged. If it does not, it reaches production."],
      ["Roll back the other team's change in the integrated environment so that the demo runs cleanly", [-2, -6, -4, -10], "You have fixed your problem by breaking someone else's work without telling them."]]
  ]);
  add('qa', [
    ['refinement', "A story has no acceptance criteria. The developer says what is needed is obvious.",
      ["Ask for concrete examples and write the criteria together with the Product Owner and developer before the story counts as ready", [6, 6, 6, 4], "A short three-way conversation — business, build, test — finds the misunderstandings while they are free to fix."],
      ["Let the build go ahead and test what is delivered against your own understanding of the requirement", [-4, -6, -4, -2], "Without criteria, nobody can say whether it is right, and you become the person who delivers bad news late."],
      ["Write a full set of test cases yourself once the build is complete, and use them as the criteria", [-2, -4, 0, -2], "Tests written afterwards confirm what was built, not what was needed."]],
    ['iteration-planning', "The team plans to test all stories in the last three days of the iteration.",
      ["Propose testing inside each story, automating as you go, and finishing stories one at a time", [2, 10, 6, 4], "A mini-waterfall inside the iteration puts all the risk at the end. Finishing stories one by one gives steady, real progress."],
      ["Go along with the plan, since the team has worked this way for a long time and usually finishes", [-2, -8, -4, -4], "Expect a crunch at the end, carried-over stories and quality compromises."],
      ["Ask for an extra tester to help cover the peak in the last three days of each iteration", [0, -2, 0, -2], "More people at the bottleneck treats the symptom. The batching remains."]],
    ['iteration-review', "An hour before the review you find a defect in a story about payment limits.",
      ["Flag it: the story is not done, show it honestly, and fix it next", [2, 4, 10, 6], "A limit that does not hold is a control failure. Saying so in the review is your role working as intended."],
      ["Suggest the demo follows the main path, which works, and fix the defect before the next review", [-4, -4, -10, -6], "Stakeholders leave believing a control works when it does not."],
      ["Log the defect with a high priority and mark the story as done, since the main function works", [-2, -6, -8, -4], "\"Done with known defects\" is not done, least of all for payment limits."]]
  ]);
  add('ba', [
    ['pi-planning', "The team asks you to explain a feature, and you realise you do not understand its intended benefit either.",
      ["Say so, and fetch Product Management or the Business Owner to clarify it there and then", [6, 6, 2, 6], "PI Planning puts the right people in one room for this. Admitting the gap saves the team planning on a guess."],
      ["Give the team your best interpretation of the feature, so that planning can continue without delay", [-6, -6, -2, -4], "The team now builds to your guess, with confidence."],
      ["Ask the team to plan the feature as written, and clarify the benefit with Product Management afterwards", [-4, -6, 0, -4], "Planning something nobody understands produces estimates and objectives that mean nothing."]],
    ['refinement', "Operations sends you a 40-page requirements document for {initiative}.",
      ["Work with the Product Owner to draw out the outcomes, map the journey and slice it into small stories with examples", [8, 8, 2, 4], "The document is input, not backlog. Mapping the journey shows what is essential and what can wait."],
      ["Turn each requirement in the document into a story, so that nothing operations asked for is lost", [-2, -8, 0, -4], "You get two hundred stories, with no sense of which ones deliver value first."],
      ["Share the document with the developers so that they can read the requirements at first hand", [-6, -6, -2, -6], "Analysis has been skipped and the team is left to interpret forty pages alone."]],
    ['daily', "A story is blocked on a regulatory interpretation, and compliance has not replied for three days.",
      ["Raise it as an impediment and arrange a short session between the team and a compliance contact", [2, 8, 8, 4], "Three days of waiting on an email is a queue. A fifteen-minute conversation usually settles it."],
      ["Proceed on the more lenient reading for now, and adjust if compliance comes back with a stricter one", [0, 4, -14, -2], "Guessing at regulation in your own favour is how breaches begin."],
      ["Send compliance a reminder and keep the story on hold until they reply", [-2, -8, 0, -2], "The blocker stays invisible and the story quietly slips."]]
  ]);
  add('ux', [
    ['refinement', "The team wants to start building a new journey before anyone has tested it with users.",
      ["Offer a quick prototype test with three to five real client users this week, feeding the results straight into the stories", [10, 4, 2, 4], "A handful of users finds most of the big problems. Light, fast research fits the team's rhythm."],
      ["Ask for six weeks of user research to be completed before the build starts, to avoid costly rework", [0, -10, 0, -6], "The team will learn to route around UX."],
      ["Let the team build the journey now, and refine the design once real usage data is available", [-6, -4, 0, -2], "Rework after build is the expensive way to learn what a prototype shows in a day."]],
    ['iteration-review', "A senior stakeholder dislikes the design and wants it changed to their own preference.",
      ["Share what the user tests showed and offer to test both options with clients", [8, 2, 0, 4], "Evidence turns a contest of opinions into a question that can be answered."],
      ["Make the change as requested, since the stakeholder is accountable for the product's success", [-6, 0, 0, -6], "The product is now designed for the most senior person in the room."],
      ["Explain the design principles and accessibility standards behind the current design", [-2, 0, 0, -2], "Principles are your language. Evidence from clients is theirs."]],
    ['system-demo', "At the system demo you notice that two teams have built the same function with different interaction patterns.",
      ["Raise it, agree one pattern with both teams through the design system, and get the alignment onto the backlog", [6, 6, 2, 4], "Consistency across teams is something only a cross-team view can protect. The system demo is where it shows."],
      ["Leave both versions as they are, since each works and was tested by its own team", [-6, -2, -2, 0], "Clients must learn two ways of doing one thing, and the divergence spreads."],
      ["Change your own team's version to match the other team's, so that the two are consistent", [0, -2, 0, -2], "That may fix this case, but the pattern is not agreed and the next team will invent a third."]]
  ]);

  /* ═════════════ Team of Teams ═════════════ */
  add('rte', [
    ['pre-pi', "Two weeks before PI Planning, half the teams say they cannot attend in person, and they sit in three time zones.",
      ["Redesign the event for a distributed train — shared core hours, strong facilitation, good tooling — and keep the whole train planning together", [4, 8, 2, 8], "The value of PI Planning is everyone planning together, not the room. A well-run distributed event keeps that."],
      ["Hold PI Planning for the teams that can attend, and run a second session for the others the week after", [-4, -10, -2, -4], "Dependencies between the two groups will be discovered after both have committed."],
      ["Ask each team to prepare its plan separately and send it in, then consolidate them into one train plan", [-6, -10, -2, -8], "Merged documents are not a shared plan. Nothing has been negotiated."]],
    ['pi-planning', "At the day-one management review, leaders respond to the teams' problems by insisting that all the scope must still be delivered.",
      ["Steer the review towards decisions leaders can make — scope, people, dependencies — and take the adjustments back to the teams on day two", [4, 10, 2, 10], "The management review exists to adjust the plan so it becomes achievable. Your facilitation keeps it there."],
      ["Let the leaders' discussion run its course, since they are accountable for the outcome", [-2, -8, -2, -10], "Day two starts with the same problems and less belief that raising them helps."],
      ["Present the teams' issues in more measured terms and group them into themes, so that the review stays constructive and leaders are not put on the defensive", [-4, -10, -4, -8], "Leaders cannot solve problems you have hidden from them."]],
    ['art-sync', "One Scrum Master reports \"all green\" every week, but the system demo keeps showing otherwise.",
      ["Coach them privately, go and see the team's work, and use flow data to make the real position visible", [2, 8, 4, 8], "Persistent green usually means reporting bad news feels unsafe. Private coaching and visible data address both."],
      ["Ask them to explain the gap in the next ART Sync, so that the other Scrum Masters can learn from it", [-2, 0, 0, -10], "Public exposure teaches every Scrum Master to manage what they report."],
      ["Leave the reports as they are and rely on the system demo to show the real position", [-2, -8, -2, -2], "The train keeps learning about problems an iteration late."]]
  ]);
  add('pm', [
    ['pre-pi', "Sales has promised {client} a feature by a fixed date without consulting you.",
      ["Talk to sales and the client to understand the need, give an honest forecast from the roadmap, and agree how future commitments will be made", [8, 6, 2, 4], "The need behind a promise is often smaller than the promise. Fixing the process stops it recurring."],
      ["Accept the date as a commitment already made to the client, make the feature the train's top priority, and ask the teams to plan the rest around it", [0, -10, -2, -10], "The train's plan now belongs to whoever promised last."],
      ["Tell sales that the feature is not on the roadmap and cannot be accommodated this year", [-8, 2, 0, 0], "The roadmap is protected and a client with a real need is left hanging."]],
    ['pi-planning', "You present fifteen features, all marked priority one. The teams ask which matter most.",
      ["Rank them by cost of delay against size, and explain the reasoning to the train", [8, 10, 0, 6], "If everything is top priority, the teams choose for you. A visible ranking is the most useful thing you bring to PI Planning."],
      ["Explain that all fifteen are needed for the client deadline, so they must all remain priority one", [-4, -10, 0, -6], "Fifteen equal priorities means none."],
      ["Let each team choose from the fifteen according to what best fits its skills and capacity", [-4, -4, 0, 0], "Teams will optimise for what is feasible locally, not for client value."]],
    ['system-demo', "A new feature demos well, but usage data shows that almost nobody uses the one you shipped last PI.",
      ["Go back to its benefit hypothesis, talk to clients, and be ready to change or retire it", [10, 4, 0, 2], "Shipping is not the outcome. Features nobody uses still cost money to run and maintain."],
      ["Continue with the roadmap, since the earlier feature was delivered to the agreed specification", [-8, 0, 0, -2], "Delivery against a plan nobody is benefiting from is waste."],
      ["Ask marketing and the relationship managers to promote the feature more actively to clients", [-2, 0, 0, 0], "Sometimes awareness is the problem, but you do not know that yet."]]
  ]);
  add('sa', [
    ['pre-pi', "The teams want to rewrite the payments gateway. The business wants features.",
      ["Make the case in business terms and propose incremental replacement inside an agreed capacity allocation", [4, 8, 8, 6], "Replacing a system piece by piece delivers value and reduces risk as it goes. A capacity allocation makes the trade-off explicit."],
      ["Dedicate the whole of the next PI to the rewrite, so that it is done properly in one go", [-10, -6, -4, -2], "A PI with no client value, and a big-bang cut-over at the end."],
      ["Defer all refactoring until the deadline has passed, and deal with the gateway afterwards", [2, -6, -10, -8], "The runway runs out, and each feature costs more than the last."]],
    ['pi-planning', "One team's plan uses a shortcut that bypasses the agreed API gateway.",
      ["Go and talk to them, understand why, and either solve it within the guardrail or improve the guardrail", [2, 6, 8, 6], "A team working around a standard is telling you something about the standard."],
      ["Tell the team the plan is not acceptable and must be reworked to use the gateway", [-2, -6, 4, -8], "The control holds, the cause stays unknown, and the next workaround will be better hidden."],
      ["Allow it for this PI as a time-limited exception, to be corrected in the next", [0, 2, -10, -2], "Security and monitoring at the gateway are bypassed, and \"this once\" becomes a pattern."]],
    ['inspect-adapt', "Several production incidents trace back to a shared component that no team owns.",
      ["Propose clear ownership, invest runway in the component and add monitoring", [4, 8, 8, 4], "Shared code without an owner decays. Ownership and observability are the lasting fix."],
      ["Move all shared components under the central architecture group, which then makes every change", [-2, -6, 2, -6], "A central group becomes a bottleneck, far from the teams who know the code."],
      ["Trace who made the most recent change to the component and review their work", [-2, -2, 0, -10], "The cause is the gap in ownership. Blame fixes nothing and silences the next person."]]
  ]);
  add('bo', [
    ['pi-planning', "You are assigning business value to PI objectives. One team's main objective is resilience work that clients will never see.",
      ["Discuss it with the team and value the risk reduction honestly — in a bank, resilience is business value", [4, 4, 10, 8], "Business value includes avoiding outages and regulatory findings. A fair score tells teams this work counts."],
      ["Score it 1 out of 10, since business value should reflect what clients can see and will pay for", [-2, -4, -10, -8], "Teams learn that enabler work is not valued, and stop proposing it until something breaks."],
      ["Leave it unscored, on the basis that business value does not apply to technical work", [-2, -2, -4, -4], "An unscored objective drops out of the predictability measure, and out of sight."]],
    ['system-demo', "Your diary means you will miss most system demos this PI.",
      ["Protect the time; where that is impossible, send an empowered delegate and give your feedback promptly", [8, 4, 2, 6], "The demo is your most direct view of the investment. Your presence also shows the teams that their work matters."],
      ["Rely on the written PI status report and the RTE's summary to keep up with progress", [-6, -2, -2, -4], "A report tells you what someone chose to write."],
      ["Ask for the demos to be rescheduled around your diary, or skipped when you cannot attend", [-6, -8, 0, -6], "The train's cadence should not depend on one diary."]],
    ['inspect-adapt', "A team achieved about 60% of its planned value. You are scoring the actual business value.",
      ["Score it honestly with the team and talk through the causes without blame", [4, 6, 2, 8], "The score is a learning tool. Honest numbers and a blameless conversation are what improve the next PI."],
      ["Score them firmly below what they achieved, to make clear that missing commitments has consequences", [-2, -4, 0, -12], "The message received is: plan less, and report less."],
      ["Score them close to full marks, recognising how hard the team worked under difficult conditions", [-2, -6, -2, -2], "The predictability measure is now meaningless, and the team knows it."]]
  ]);

  /* ═════════════ Value Stream ═════════════ */
  add('ste', [
    ['pre-pi', "The trains in your value stream run on different cadences — one on ten-week PIs, another on twelve.",
      ["Work with the RTEs to align the cadence and synchronise planning", [4, 10, 2, 4], "Without a shared cadence, trains can never plan or integrate together. Alignment is the foundation of everything else."],
      ["Keep both cadences and manage the differences through a detailed cross-train integration schedule", [-2, -6, 0, -4], "You are now maintaining a plan to compensate for a structural problem."],
      ["Leave each train on the cadence that suits it, and coordinate dependencies case by case", [-4, -8, -2, 0], "Dependencies between the trains will always land at the wrong moment for one of them."]],
    ['solution-demo', "A supplier's component is not ready to integrate in time for the solution demo.",
      ["Demo what is integrated, show the gap openly, and agree more frequent integration with the supplier", [4, 8, 4, 4], "The gap is the most important information in the demo. Frequent integration makes it smaller next time."],
      ["Use a simulated version of the supplier's component, so that stakeholders see the complete flow", [-6, -6, -10, -6], "Stakeholders will make decisions on a solution that does not exist."],
      ["Demo without the supplier, and leave their component out of solution demos until it is stable", [-4, -6, -2, -4], "The integration risk is still there, with less visibility."]],
    ['inspect-adapt', "Every train's own metrics are improving, yet end-to-end lead time for clients is not.",
      ["Measure and show flow end to end, and choose the bottleneck to work on together", [8, 10, 2, 6], "Local improvement away from the bottleneck does not speed the whole. Only an end-to-end view shows where to act."],
      ["Ask every train to raise its velocity by 10%, so that the improvement adds up end to end", [-2, -6, -2, -8], "More output upstream of a bottleneck just builds a bigger queue."],
      ["Publish a comparison of the trains' metrics, to encourage the slower ones to catch up", [-4, -4, 0, -10], "Trains compete instead of cooperating, and start gaming the numbers."]]
  ]);
  add('solm', [
    ['epic-review', "You are asked to break the {initiative} epic into capabilities for the trains.",
      ["Slice by client outcome, each slice crossing trains and valuable on its own, with the MVP first", [10, 8, 2, 4], "Outcome slices can be released and learned from one at a time."],
      ["Split it by system, with one capability for each train to deliver within its own platform", [-4, -8, 0, 0], "Nothing works until every train has finished its part."],
      ["Split it by phase — analysis, build, test and rollout — with a capability for each", [-6, -10, 0, -4], "That is a waterfall plan with agile labels. Feedback arrives at the end."]],
    ['pre-pi', "Three large clients want different things next PI, and {client} is the most insistent.",
      ["Weigh the requests by cost of delay and strategic fit, and look for a common need underneath them", [10, 6, 0, 4], "Requests that look different often share a root. Solving that serves all three."],
      ["Prioritise the most insistent client, since they are the one most likely to leave", [-4, -2, 0, -4], "The roadmap follows volume, and the other two clients notice."],
      ["Give each of the three clients a third of next PI's capacity, so that all see progress", [-4, -6, 0, 0], "Three thin slices, none enough to matter to anyone."]],
    ['solution-demo', "Compliance tells you that one capability cannot launch in one of the target countries.",
      ["Release where it is permitted, switch it off for that market, and work on the gap", [8, 6, 8, 2], "Market-level toggles let most clients benefit while the exception is resolved properly."],
      ["Hold the release until every country has been cleared, so that all clients get it together", [-8, -8, 2, -4], "Every client waits for the slowest jurisdiction."],
      ["Launch in every country as planned and work with compliance to resolve the gap afterwards", [2, 2, -16, -2], "Knowingly launching a non-compliant product in a regulated market is not a risk to take."]]
  ]);
  add('sola', [
    ['pre-pi', "Two trains propose incompatible data models for the same client entity.",
      ["Facilitate a shared, minimal contract with both System Architects, designed to evolve", [4, 8, 6, 6], "A small agreed contract lets both trains move. Agreeing it together means both will keep to it."],
      ["Choose the stronger of the two models and ask the other train to adopt it", [0, 2, 2, -8], "Quick, but you may have chosen without knowing the losing train's constraints."],
      ["Let both trains proceed and build a translation layer between the two models afterwards", [-2, -6, -8, -2], "\"Later\" arrives as a permanent layer and two versions of the client's data."]],
    ['pi-planning', "A capability must be available 99.99% of the time. None of the teams has planned anything for it.",
      ["Make it an explicit constraint on the backlog, and plan the enablers and tests that prove it", [4, 6, 10, 4], "Non-functional requirements shape the design. If they are not planned, they are not delivered."],
      ["Record it as a requirement to be addressed in the hardening work before go-live", [-2, -6, -10, -2], "Availability cannot be added at the end. It is designed in or it is absent."],
      ["Pass it to operations, who run the production platform and manage availability", [-4, -2, -12, -6], "Operations cannot run at four nines something that was not built for it."]],
    ['system-demo', "The integrated demo runs in an environment that looks nothing like production.",
      ["Press for a production-like staging environment, security controls included, as architectural runway", [2, 8, 10, 4], "A demo in an unrealistic environment proves little. Production-like staging is where integration and security problems are found cheaply."],
      ["Accept the current environment, given how costly a production-like one would be to build and run", [-2, -6, -8, -2], "The cost is paid anyway, as incidents after release."],
      ["Plan the full verification for the production release, behind a feature toggle", [-4, -4, -14, -4], "Testing in production with corporate clients' money is not verification."]]
  ]);

  /* ═════════════ Portfolio ═════════════ */
  add('eo', [
    ['epic-review', "Your business case for {initiative} rests on a revenue estimate from one enthusiastic relationship manager.",
      ["Present it as an assumption, define an MVP and leading indicators that test it, and gather more evidence from client interviews", [8, 6, 4, 4], "Calling an assumption an assumption is what makes it testable. It also makes you more credible."],
      ["Present the estimate as the revenue forecast, citing the relationship manager's knowledge of the client", [-4, -2, -6, -2], "The portfolio makes a funding decision on one person's optimism."],
      ["Raise the estimate modestly to reflect likely demand from other clients in the same sector, which strengthens the case without being unreasonable", [-6, -4, -10, -6], "The epic is approved on a number that will be missed, and your next case will be doubted."]],
    ['portfolio-sync', "Your epic's MVP is complete and the data is ambiguous. You personally believe in the idea.",
      ["Present all the data, including what does not help your case, and recommend a time-boxed further test with clear criteria — or a pivot", [8, 6, 4, 6], "Your role is to give the portfolio the truth. An honest, bounded next step keeps the idea alive on its merits."],
      ["Lead with the encouraging results and make a strong case for continuing, as the epic's advocate", [-4, -4, -6, -4], "Advocacy with selected data turns governance into a sales pitch."],
      ["Ask for the full funding now, on the basis that the MVP was too small to be conclusive and only a rollout at scale will give a clear answer", [-4, -6, -4, -2], "Scaling an unproven hypothesis makes the eventual answer more expensive."]],
    ['qbr', "Your epic has succeeded, and you are asked to stay on indefinitely as its \"project manager\".",
      ["Hand the work into the value stream's backlog as features, and step back — the Epic Owner role ends when the epic does", [4, 8, 0, 6], "Epics are temporary. Ongoing work belongs to the long-lived teams that own the product."],
      ["Stay on to manage the work through delivery, since you understand the epic, its business case and its stakeholders better than anyone else", [-2, -6, 0, -4], "A parallel line of management appears alongside Product Management and the RTE."],
      ["Set up a steering committee to oversee the work now that it is moving into delivery", [-2, -8, 0, -6], "More governance on top of a value stream that already has its own."]]
  ]);
  add('lpm', [
    ['strategy', "Finance insists on detailed annual project budgets by cost centre.",
      ["Work with finance to pilot value-stream budgets with guardrails, showing that transparency gives them control", [6, 10, 4, 6], "Finance is a partner in this change. A pilot with strong transparency addresses their real concern — control of spend."],
      ["Comply and map each value stream's work into annual project budgets, to keep finance on side", [-4, -10, 0, -6], "Project accounting reintroduces the approval queues and the moving of people that lean budgeting removes."],
      ["Proceed with lean budgets and reconcile them to finance's cost centres at year end", [0, 2, -10, -4], "Bypassing the finance function is a governance failure in a bank, and will be reversed."]],
    ['epic-review', "A senior executive demands that their favourite epic skips the portfolio Kanban.",
      ["Apply the same lightweight process, quickly: a fast analysis and an open ranking against the other epics", [6, 8, 2, 6], "The process should be fast enough that nobody needs to bypass it. If the epic is as good as claimed, the ranking will show it."],
      ["Allow the epic to go straight to implementation, given the executive's seniority and conviction", [-4, -8, -2, -8], "The Kanban now applies only to people without influence."],
      ["Insist the epic goes through every step of the standard process, however long that takes", [-4, -6, 0, -2], "Using process as a barrier confirms the executive's view that it is bureaucracy."]],
    ['portfolio-sync', "Every value stream is asking for more people. The total budget is flat.",
      ["Use the portfolio's view of flow and outcomes to rebalance, deciding together with the value stream leads", [8, 6, 2, 6], "Allocation is the portfolio's core decision. Making it jointly, on evidence, produces a result people accept."],
      ["Give every value stream the same proportion of what it asked for, so that the outcome is even-handed", [-6, -2, 0, -4], "Fair-looking, and blind to where the value is."],
      ["Fund the requests in the order they were submitted, until the budget is used up", [-6, -4, 0, -4], "Speed of asking is not a measure of value."]]
  ]);
  add('ea', [
    ['strategy', "Each value stream is choosing its own cloud provider and tools.",
      ["Agree a few enterprise guardrails with the value stream architects, and offer a well-supported standard platform that is easier to use than going alone", [4, 8, 8, 6], "A paved road that teams choose to use beats a mandate. A few guardrails cover the real risks."],
      ["Mandate a single cloud provider and toolset, with every technology decision approved centrally", [-2, -10, 2, -8], "Central approval of every choice turns architecture into a queue."],
      ["Let each value stream choose the provider and tools that work best for its needs, and set up a community to share good practice between them", [0, 2, -10, 0], "Security, skills and cost fragment across every combination of tools."]],
    ['epic-review', "An epic proposes buying a vendor package that overlaps with a platform the bank already runs.",
      ["Analyse it with the Epic Owner — fit, total cost, integration, exit — and present the options", [6, 6, 6, 4], "Your value is the cross-portfolio view. Options with costs let the portfolio decide knowingly."],
      ["Reject the proposal, since the bank already owns a platform that provides the capability", [-4, -4, 0, -6], "Perhaps right, but an unexplained veto invites workarounds."],
      ["Approve it, since the business understands its own needs and the vendor is well regarded", [0, 2, -8, -2], "Two overlapping platforms, doubled running costs, and nobody weighed it."]],
    ['portfolio-sync', "The core banking platform reaches end of support in three years. Nobody is funding its replacement.",
      ["Make the risk visible as an enabler epic, with a business case in risk terms and an incremental path", [4, 6, 12, 4], "Enabler epics give technology risk a place in the same funding conversation as features."],
      ["Raise it again nearer the end-of-support date, when the urgency will make funding easier to secure", [-4, -6, -14, -4], "A forced core migration is the most expensive and dangerous kind."],
      ["Start an informal effort with a few interested engineers, to make progress while funding is found", [-2, -4, -6, -2], "Well-meant, unfunded and invisible — it cannot be adequate for a core platform."]]
  ]);
  add('coach', [
    ['pi-planning', "It is a new train's first PI Planning. The leaders want to skip team breakouts and present a plan they prepared earlier.",
      ["Coach the leaders beforehand on why teams must build their own plans, and keep the breakouts", [4, 8, 2, 10], "Commitment comes from planning, not from being presented to. The conversation with leaders has to happen before the event."],
      ["Go along with the leaders' approach for this first event, and introduce breakouts at the next one", [-4, -8, -2, -10], "The train's first experience of agile is a plan handed down."],
      ["Explain to the room, when the plan is presented, why this is not how PI Planning should work", [-2, 0, 0, -8], "You may win the point and lose the people whose support the change depends on."]],
    ['system-demo', "Teams hold every agile event faithfully, yet the demos show very little working software.",
      ["Go and see the work, coach on purpose and practice — small stories, frequent integration — and take systemic impediments to the leaders", [6, 10, 2, 6], "Events without outcomes mean the mechanics were adopted without the purpose. The fix is in the work and the system around it."],
      ["Arrange further training on agile practices for all the teams, and add a mid-iteration checkpoint event so that progress can be inspected more often", [-2, -6, 0, -6], "More ritual on top of ritual."],
      ["Report to the leaders that the teams are at a low level of agile maturity", [-2, -2, 0, -10], "A label explains nothing and makes the teams defensive."]],
    ['inspect-adapt', "Leaders ask you for a maturity score for each team, so that they can rank them.",
      ["Steer them towards outcome and flow measures, and keep self-assessment as a tool for teams to improve", [4, 6, 2, 10], "Assessments used for ranking stop being honest. Used by the teams themselves, they drive improvement."],
      ["Produce the scores and the ranking, so that leaders can direct support to the weakest teams", [-2, -4, 0, -12], "Teams will optimise the score, and stop telling you the truth."],
      ["Decline, explaining that agile teams should not be measured", [-2, -4, 0, -2], "Leaders have a legitimate need to know whether the investment is working. Offer them a better measure."]]
  ]);
  add('risk', [
    ['pi-planning', "The teams invite you to PI Planning. Your manager says risk should stay independent and review at the end.",
      ["Attend and advise early while keeping your independent challenge — independence is about judgement, not distance", [4, 8, 12, 6], "Early advice prevents the problems a late review can only reject. Your right to challenge is unchanged by being in the room."],
      ["Stay away from planning and review the completed work at the end, to keep your independence clear", [-4, -10, 2, -4], "You will find the same issues when they are most expensive to fix, and be seen as the blocker."],
      ["Attend, and sign off each team's plan as it is drawn up, so that risk approval is given early", [0, 2, -12, -2], "That is the loss of independence your manager feared. Advice is not approval."]],
    ['system-demo', "At the demo you see that a new feature stores client data in a location that has not been assessed.",
      ["Raise it there, work with the team on a privacy assessment this iteration, and get the check into their Definition of Done", [2, 4, 14, 6], "Raised in the open and solved together, it becomes a habit for the team instead of a finding against them."],
      ["Make a careful note of what you saw and raise it as a formal finding in next month's risk report, through the proper channel", [-2, -6, 4, -10], "The control is enforced and the relationship is spent. Teams will stop inviting you."],
      ["Let it pass for now, since it is a demo environment and not production", [0, 0, -14, -2], "What is in the demo is on its way to production."]],
    ['inspect-adapt', "Teams say that risk assessments take six weeks and hold up every release.",
      ["Design risk-tiered assessments with the teams: templates, self-service for low-risk changes, and a measured turnaround time", [4, 10, 8, 8], "Proportionate assessment puts your attention where the risk is. Measuring turnaround shows you take their problem seriously."],
      ["Explain that six weeks reflects the thoroughness that a regulated bank requires", [-4, -8, 2, -6], "Much of the six weeks is waiting. Defending the queue protects no one."],
      ["Exempt teams working in an agile way from formal assessments, relying on their built-in controls", [0, 4, -16, -2], "Faster and uncontrolled. The first incident ends the experiment for everybody."]]
  ]);

  /* ═════════════ ExCo ═════════════ */
  add('sponsor', [
    ['strategy', "{initiative} needs people from three divisions, and their heads are reluctant to release them.",
      ["Use your seat at ExCo to settle it: agree the enterprise priority and adjust the divisions' targets to match", [6, 8, 2, 6], "This is the kind of impediment only a sponsor can remove. Changing the targets removes the reason for the resistance."],
      ["Ask the train to start with whoever it can borrow, and build the case for more as it shows results", [-4, -10, 0, -8], "The initiative starts under-resourced, and its sponsor has shown the limits of their support."],
      ["Name the reluctant division heads at ExCo, so that the lack of cooperation is on record", [-2, -2, 0, -8], "They are following the incentives they were given."]],
    ['solution-demo', "The solution demo shows less progress than you expected. The teams and the client are in the room.",
      ["Ask curious questions, thank the teams for showing the real position, and follow up on the impediments you can remove", [6, 6, 2, 10], "How a sponsor reacts to an honest demo decides whether the next one is honest."],
      ["Make your disappointment clear, so that the teams understand the urgency", [-4, -6, -2, -12], "Next time you will see a better demo and learn less."],
      ["Step back from attending the demos for now, and ask for a written progress update each month so that you can track it more objectively", [-6, -4, -2, -6], "You lose the most direct view of your own investment."]],
    ['qbr', "Your ExCo colleagues ask for a red-amber-green status and a milestone plan for {initiative}.",
      ["Offer outcome measures, forecast ranges and an invitation to the next demo, and explain why these tell them more", [8, 6, 2, 4], "You meet their need for assurance with better information, and model a different way of governing."],
      ["Ask the RTE to produce a status report and milestone chart in the format ExCo is used to", [-2, -4, 0, -4], "It keeps the peace, at the cost of teams maintaining a fiction alongside the real plan."],
      ["Explain that agile initiatives are not run to milestones and do not report in that way", [-6, -2, -4, -4], "Leaders are entitled to know how an investment is going."]]
  ]);
  add('head', [
    ['strategy', "Relationship managers are rewarded on product sales volumes, while the value streams are measured on client outcomes.",
      ["Realign incentives towards client outcomes and share of wallet, starting with a pilot", [10, 4, 2, 6], "People do what they are paid for. Until incentives match the strategy, the two will pull against each other."],
      ["Keep the product sales targets, since they are what delivers this year's revenue plan", [-6, -2, -4, -4], "RMs keep making promises that the value streams did not plan for."],
      ["Remove individual targets altogether, so that nothing conflicts with the value streams", [-2, -2, 0, 0], "The conflict goes, and so does the direction."]],
    ['epic-review', "{client} threatens to move its business unless the bank builds a bespoke feature for it.",
      ["Understand the need behind the demand, test whether a general solution would serve other clients too, and decide openly on the economics", [10, 4, 2, 4], "A threat is a signal of an unmet need. A general solution may turn one client's demand into a product."],
      ["Instruct the portfolio to build the feature, given the size of the relationship at stake", [0, -10, -2, -8], "One client now sets the portfolio's priorities, and others will learn the method."],
      ["Hold the line that the bank builds products for all its clients and not bespoke features for one, and accept that they may leave", [-10, 0, 0, -2], "A principle applied without finding out what the client needed."]],
    ['qbr', "Client satisfaction for {initiative} is up, but revenue is flat this quarter. The CFO proposes cutting the investment.",
      ["Set out the leading and lagging indicators, and agree a time-boxed checkpoint with specific revenue signals to look for", [8, 4, 2, 4], "Satisfaction usually leads revenue. A dated checkpoint with clear signals respects the CFO's concern."],
      ["Agree to the cut, since revenue is the measure that ultimately matters", [-10, -2, 0, -6], "The investment is stopped just before the evidence could arrive."],
      ["Defend the investment by sharing what several clients have said about it in recent meetings, and ask for another year", [-2, 0, 0, 0], "Stories are persuasive for a meeting. They are not a basis for the next one."]]
  ]);
  add('cio', [
    ['strategy', "Eighty per cent of the technology budget goes on running existing systems. The business wants more change.",
      ["Fund automation and platform work explicitly to bring running costs down, and measure the shift", [4, 8, 8, 6], "The ratio is a result of manual operations and ageing systems. Investing in the cause frees capacity for good."],
      ["Shift budget from maintenance to change, accepting somewhat more operational risk for a period", [2, 2, -14, -6], "Features this year, outages next."],
      ["Outsource the running of existing systems to a lower-cost provider, to release budget for change", [-2, -4, -6, -6], "The cost moves, and the knowledge and control move with it."]],
    ['epic-review', "A business epic needs weekly releases. Your release process is quarterly.",
      ["Sponsor continuous delivery as a strategic enabler: pipeline, test automation, and a change policy designed together with risk", [8, 10, 6, 6], "Release capability decides how fast the bank can learn. It is worth funding as an investment."],
      ["Explain that quarterly releases are the bank's standard, for reasons of stability and control", [-10, -6, 0, -4], "The business will find a supplier whose standard is different."],
      ["Grant this epic weekly releases, with a dedicated team handling the release steps manually", [2, -4, -8, -10], "Weekly heroics exhaust people and raise the error rate."]],
    ['qbr', "Last month's major outage was traced to a manual change. The board wants a six-month change freeze.",
      ["Show that small automated changes are safer than large manual ones, and offer a short, targeted stabilisation with a plan", [4, 8, 10, 6], "A freeze builds up a large risky batch for the day it ends. The safer path is smaller changes and less manual work."],
      ["Agree to the six-month freeze, to give the platform a period of stability", [-10, -10, -4, -6], "Six months of fixes, security patches and features will be released together at the end."],
      ["Assure the board that the engineer responsible has been dealt with, that the team has been retrained and that it will not happen again", [-4, -2, -8, -12], "The process allowed a manual error to reach production. Blaming a person leaves that process in place."]]
  ]);
  add('cro', [
    ['strategy', "ExCo is debating whether agile ways of working weaken control.",
      ["Argue that built-in controls and transparency strengthen risk management, set out the non-negotiables clearly, and embed risk partners with the teams", [4, 8, 14, 6], "Frequent demos, small changes and automated evidence give more assurance than periodic gates. Clear non-negotiables tell teams where the lines are."],
      ["Require the traditional stage-gate approvals for all agile work as well, so that the bank's established control points are maintained throughout", [-4, -10, 2, -6], "The gates recreate the delays, and assurance still arrives late."],
      ["Exempt agile teams from the standard policies, relying on their transparency instead", [0, 4, -16, -2], "Policy applies to the outcome, however the work is organised."]],
    ['epic-review', "A new-product epic arrives with no risk assessment, \"because it is only an MVP\".",
      ["Ask for a proportionate early assessment, shape the MVP to stay inside risk appetite, and assign a risk partner to the epic", [6, 6, 12, 4], "An MVP with real clients carries real risk. Proportionate assessment keeps it quick, and limiting scope keeps it safe."],
      ["Hold the epic at the gate until a full risk assessment has been completed, documented and approved by the risk committee", [-6, -10, 4, -6], "A full assessment of an idea that may be dropped is waste, and teams learn to avoid you."],
      ["Let it proceed, since an MVP is small and can be assessed before it scales", [2, 2, -14, -2], "Small pilots are where many large incidents began."]],
    ['qbr', "Internal audit finds that teams evidence their controls inconsistently.",
      ["Sponsor automated control evidence in the delivery pipelines, with common standards agreed with the CIO", [2, 8, 14, 6], "Evidence produced automatically by the pipeline is consistent, complete and free to the teams."],
      ["Require a signed control checklist for every release, reviewed by the risk function", [-4, -10, 4, -8], "Consistency on paper, at the price of speed — and checklists are signed without being read."],
      ["Accept the finding as a reasonable trade-off for faster delivery, and monitor it", [0, 0, -14, -2], "Repeat audit findings on control evidence end in regulatory attention."]]
  ]);
})();
