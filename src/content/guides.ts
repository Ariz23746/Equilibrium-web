/**
 * Guides: helpful, search-friendly pages that Pinterest pins (and Google) link to.
 * Each guide has a free printable and ends with a gentle pointer to the app.
 * Add a guide by appending to GUIDES; the pages, metadata and index are generated from it.
 */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "tip"; text: string };

export interface GuideSection {
  heading: string;
  blocks: GuideBlock[];
}

export interface Guide {
  slug: string;
  /** H1 on the page */
  title: string;
  /** <title> and Pinterest/Google headline (keep under ~60 chars) */
  seoTitle: string;
  /** Meta description (keep under ~155 chars) */
  description: string;
  kicker: string;
  intro: string;
  readMinutes: number;
  updated: string;
  /** Vertical pin image in /public/pins, also used as the share image */
  pinImage: string;
  printable: { file: string; label: string; blurb: string };
  sections: GuideSection[];
  /** One concrete line showing how the app helps with this exact plan */
  appExample: string;
}

export const GUIDES: Guide[] = [
  {
    slug: "diwali-budget-planner",
    title: "Diwali Budget Planner: Celebrate Fully Without the November Regret",
    seoTitle: "Diwali Budget Planner 2026 (Free Printable)",
    description:
      "Plan Diwali spending on gifts, sweets, clothes, decor and sale shopping with one simple budget. Free printable Diwali budget sheet included.",
    kicker: "Festive budgeting",
    intro:
      "Diwali falls on Sunday, 8 November this year. Between gifts, sweets, new clothes, diyas, the puja and those festive sales, it is the easiest week of the year to spend a month's savings without noticing. A budget doesn't make Diwali smaller. It just means you still smile when the credit card bill arrives.",
    readMinutes: 5,
    updated: "2026-10-09",
    pinImage: "/pins/diwali-budget-planner-1.png",
    printable: {
      file: "/printables/diwali-budget-planner.pdf",
      label: "Download the Diwali budget sheet (PDF)",
      blurb: "One page: your total, eight categories, a gift list and a sale wishlist with a 24-hour rule.",
    },
    sections: [
      {
        heading: "Step 1: Pick one total before you shop for anything",
        blocks: [
          {
            type: "p",
            text: "Decide the single number you're happy to spend on the whole festival, from Dhanteras to Bhai Dooj. Base it on money you actually have: savings set aside for it, or a festive bonus you've already received. Not on next month's salary.",
          },
          {
            type: "tip",
            text: "If you get a Diwali bonus, try splitting it before you spend any of it: some for the festival, some for savings or a loan, some for something you'll enjoy after Diwali.",
          },
        ],
      },
      {
        heading: "Step 2: Split the total into categories",
        blocks: [
          {
            type: "p",
            text: "Most Diwali spending falls into the same eight buckets. Give each one a share of your total. Here's an example split you can adjust:",
          },
          {
            type: "table",
            head: ["Category", "Share of total", "What it covers"],
            rows: [
              ["Gifts", "25%", "Family, friends, colleagues, staff and helpers"],
              ["Sweets & food", "15%", "Mithai, dry fruits, festive meals, guests"],
              ["Clothes", "15%", "New outfits and accessories"],
              ["Home & decor", "10%", "Diyas, lights, rangoli, flowers, cleaning"],
              ["Puja", "5%", "Puja items, offerings, donations"],
              ["Travel", "10%", "Going home, tickets, fuel"],
              ["Sale buys", "15%", "That one planned purchase (phone, appliance, gold)"],
              ["Buffer", "5%", "Last-minute guests and forgotten gifts"],
            ],
            caption: "Example split. Your own percentages matter more than these.",
          },
        ],
      },
      {
        heading: "Step 3: Write the gift list with a number next to every name",
        blocks: [
          {
            type: "p",
            text: "Gifts are where budgets quietly break, because each one feels small. List everyone you'll give to, then put an amount next to each name before you buy anything. If the names add up to more than your gift budget, adjust the amounts now, not at the checkout.",
          },
          {
            type: "list",
            items: [
              "Group people into tiers (close family, extended family, friends, work) and give each tier one amount.",
              "Buy sweets and dry-fruit boxes in bulk for the long tail of people. It's kinder to the budget than ten different small gifts.",
              "Note the gifts you receive this year. It makes next year's list much easier.",
            ],
          },
        ],
      },
      {
        heading: "Step 4: Use a 24-hour rule for festive sales",
        blocks: [
          {
            type: "p",
            text: "Festive sales are designed to make unplanned purchases feel urgent. Keep a wishlist instead: if something isn't on the list, write it down and wait 24 hours. If you still want it tomorrow and it fits your sale-buys budget, buy it without guilt.",
          },
          {
            type: "tip",
            text: "No-cost EMI still costs you next month's budget. Count the full price against this month's plan, or skip it.",
          },
        ],
      },
      {
        heading: "Step 5: Log everything as you go, not after",
        blocks: [
          {
            type: "p",
            text: "The plan only works if you know where you stand on day three, not on day ten. Log each purchase the moment you pay, even the small ones like flowers and auto rides. Check your total each evening of the festival week.",
          },
        ],
      },
    ],
    appExample:
      "In Equilibrium, just type or say \"1500 sweets, 800 diyas, 2000 gift for Didi\" and all three are logged at once, so your festival total is always up to date.",
  },
  {
    slug: "no-spend-november-challenge",
    title: "No-Spend November: A 30-Day Challenge That Actually Sticks",
    seoTitle: "No-Spend November Challenge (Free 30-Day Tracker)",
    description:
      "Simple rules, what counts as essential, and how to survive the hard days. Free printable 30-day no-spend tracker included.",
    kicker: "30-day challenge",
    intro:
      "A no-spend month isn't about spending nothing. It's about spending only on what you decided in advance, for 30 days, so you can see how much of your usual spending was autopilot. November is a good month for it: it ends just before the holidays, so whatever you save has a job waiting.",
    readMinutes: 5,
    updated: "2026-10-09",
    pinImage: "/pins/no-spend-november-challenge-1.png",
    printable: {
      file: "/printables/no-spend-november-tracker.pdf",
      label: "Download the 30-day no-spend tracker (PDF)",
      blurb: "Your rules, your essentials list, and 30 boxes to tick off one day at a time.",
    },
    sections: [
      {
        heading: "Set your rules before 1 November",
        blocks: [
          {
            type: "p",
            text: "The challenge fails when the rules are vague. Write them down on day zero. Three lists are enough:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Essentials you will pay for: rent, bills, groceries, fuel or transport, medicine, EMIs.",
              "Things you won't buy this month: takeaway, eating out, new clothes, gadgets, impulse online orders.",
              "Your exceptions: a birthday dinner already planned, a gift you already promised. Decide them now so they don't become excuses later.",
            ],
          },
          {
            type: "tip",
            text: "Groceries are allowed, but make a list before you go. A no-spend month can quietly turn into an expensive snack month.",
          },
        ],
      },
      {
        heading: "Give the saved money a job",
        blocks: [
          {
            type: "p",
            text: "Before you start, decide where the money you don't spend will go: a holiday fund, an emergency fund, a debt payment. Move it there at the end of each week. Seeing the number grow is the best motivation you'll get.",
          },
        ],
      },
      {
        heading: "Track every day, even the zero days",
        blocks: [
          {
            type: "p",
            text: "Tick off each day you only spent on essentials. On days you did spend, write down what and why without judging yourself. Those notes are the real value of the month: they show your triggers (tired evenings, payday weekends, boredom scrolling).",
          },
        ],
      },
      {
        heading: "How to get through the hard days",
        blocks: [
          {
            type: "list",
            items: [
              "Delete saved card details from shopping and delivery apps for the month.",
              "Unsubscribe from sale emails, or at least mute them.",
              "Plan free plans: a walk, a home movie night, cooking something new, a library visit.",
              "Tell one friend. It's much easier to skip a dinner out when someone knows why.",
              "Slipped up? Log it and carry on. One spend doesn't end the challenge.",
            ],
          },
        ],
      },
      {
        heading: "What to do on 1 December",
        blocks: [
          {
            type: "p",
            text: "Add up what you spent compared with a normal month. Keep the one or two habits that felt easy, like cooking on weeknights or a waiting rule for online orders. That's what makes the challenge pay off long after November.",
          },
        ],
      },
    ],
    appExample:
      "Equilibrium's daily streak shows how many days in a row you've logged, and the spending calendar shows your quiet days at a glance. A ready-made no-spend tracker in your pocket.",
  },
  {
    slug: "christmas-gift-budget-planner",
    title: "How to Plan a Christmas Gift Budget (and Still Have Money in January)",
    seoTitle: "Christmas Gift Budget Planner (Free Printable)",
    description:
      "Set one Christmas total, split it by person, and remember the hidden costs. Free printable Christmas gift list and budget tracker included.",
    kicker: "Holiday budgeting",
    intro:
      "Christmas spending rarely goes wrong because of one big purchase. It goes wrong because of thirty reasonable ones, plus wrapping, shipping, food and travel that nobody planned for. The fix is simple: one total, a list with a number next to every name, and a running tally.",
    readMinutes: 5,
    updated: "2026-10-09",
    pinImage: "/pins/christmas-gift-budget-planner-1.png",
    printable: {
      file: "/printables/christmas-gift-budget-planner.pdf",
      label: "Download the Christmas gift budget planner (PDF)",
      blurb: "A gift list with budget and spent columns, plus a box for the extras everyone forgets.",
    },
    sections: [
      {
        heading: "Start with one total you can pay without borrowing",
        blocks: [
          {
            type: "p",
            text: "Pick the amount you can spend on the whole season from money you'll actually have by Christmas: savings, a 13th-month pay or holiday bonus, or what you can set aside from each paycheck between now and then. If it needs a credit card you can't clear in January, the number is too high.",
          },
          {
            type: "tip",
            text: "Starting in October? Divide your total by the paydays left before Christmas and set that amount aside each payday. Far less painful than one big hit in December.",
          },
        ],
      },
      {
        heading: "Split it: gifts vs. everything else",
        blocks: [
          {
            type: "p",
            text: "Gifts are only part of Christmas. Reserve a slice of your total for the rest first, then divide what's left between people.",
          },
          {
            type: "table",
            head: ["Part of Christmas", "Example share"],
            rows: [
              ["Gifts", "50%"],
              ["Food & get-togethers (Noche Buena, Christmas dinner, parties)", "20%"],
              ["Travel home", "10%"],
              ["Decorations & tree", "5%"],
              ["Wrapping, cards & shipping", "5%"],
              ["Outfits & extras", "5%"],
              ["Buffer", "5%"],
            ],
            caption: "Example only. Shift the shares to fit your family's Christmas.",
          },
        ],
      },
      {
        heading: "Give every name a number",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "List everyone you'll buy for: family, partner, friends, godchildren, colleagues, secret Santa.",
              "Put a budget next to each name before buying anything.",
              "If the list adds up to more than your gift budget, lower amounts or suggest a group gift now.",
              "When you buy, write the actual price next to the budget. Under budget? The difference goes to the buffer, not a bonus gift.",
            ],
          },
          {
            type: "tip",
            text: "For big families and offices, a secret-Santa or one-gift-per-family rule saves money and stress. Suggest it early in November, before people start buying.",
          },
        ],
      },
      {
        heading: "Watch the hidden costs",
        blocks: [
          {
            type: "p",
            text: "These are the costs that make December feel more expensive than it should: wrapping paper and gift bags, delivery fees, batteries, party contributions, extra groceries, last-minute 'just in case' gifts. Give them their own line in your plan so they don't steal from the gift budget.",
          },
        ],
      },
      {
        heading: "Check your tally every week",
        blocks: [
          {
            type: "p",
            text: "Once a week until Christmas, add up what you've spent against your total. A five-minute check on a Sunday is what keeps January calm.",
          },
        ],
      },
    ],
    appExample:
      "In Equilibrium, type or say \"gift for Mom 1500, wrapping 200\" as you buy, and your Christmas total stays up to date without a spreadsheet.",
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);

export const APP_STORE_URL = "https://apps.apple.com/us/app/equilibrium-budget-coach/id6778774923";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.arizkhan.equilibrium";
