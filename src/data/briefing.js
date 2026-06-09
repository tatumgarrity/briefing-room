export const briefing = {
  lastUpdated: "2026-06-09T06:00:00Z",

  header: {
    greeting: "Good morning, Tatum.",
    date: "Monday, June 9",
    narrative: "The week is load-bearing, but today has a little room in it. Your first real obligation is at 11, which means the morning belongs to you. I'd spend it on the deck — one good hour before the calendar starts pulling. There are two people worth reaching out to, and neither will take long.",
    note: "First meeting at 11.",
  },

  innerCircle: {
    title: "Inner Circle",
    people: [
      {
        name: "Mom",
        status: "She mentioned wanting to call this week. You haven't talked in 11 days.",
        nudge: true,
      },
      {
        name: "Kieran",
        status: "Sent you something on Thursday — you haven't replied yet.",
        nudge: true,
      },
      {
        name: "Alex",
        status: "All good. Last connected 3 days ago.",
        nudge: false,
      },
    ],
  },

  work: {
    title: "Work",
    focus: "Closing the Q2 pipeline review deck before Thursday.",
    open: [
      "Deck first draft — due Thursday",
      "Sync with Jordan re: partnership ask",
    ],
    waiting: [
      "Marcus hasn't responded to the intro email (sent Monday)",
    ],
    context: "The Thursday deadline is load-bearing. Everything else can wait.",
  },

  pressureTest: {
    title: "PressureTest",
    status: "Running on port 5173",
    recentActivity: "Slate automation fired at 5:44am. 3 matchups queued for tonight.",
    openThreads: [
      "ESPN WNBA stats endpoint needs a real test against live data",
      "Confidence adjustment logic — not tested under edge cases yet",
    ],
    nextMilestone: "Live odds integration",
  },

  focus: {
    title: "Focus",
    today: "The deck is the only thing that matters this week. Everything else is optional.",
    energy: "Low energy forecast — caffeine early, protect morning hours.",
    reminder: "You said last week you wanted to be done by 3pm each day. That still possible?",
  },
};
