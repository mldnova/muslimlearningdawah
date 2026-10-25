import type { Article, EventItem, SiteSettings } from "@/lib/content-types";

export const site = {
  name: "Muslim Learning & Da'wah",
  shortName: "MLD",
  tagline: "Educating youth, strengthening community, and calling to Allah with wisdom.",
  description:
    "Muslim Learning & Da'wah (MLD) hosts lectures, conferences, and community programs for youth and families across the DMV.",
  location: "Northern Virginia · DMV",
  url: "https://muslimlearningdawah.com",
} as const;

/** Starting values — admins can change these at /admin/settings */
export const defaultSettings: SiteSettings = {
  email: "muslimlearningdawah@gmail.com",
  instagram: "https://www.instagram.com/mldnova/",
  whatsappCommunity: "https://chat.whatsapp.com/", // Replace with your announcement group invite link
  goFundMe: "https://gofund.me/066023fc",
};

/**
 * Web3Forms access key (https://web3forms.com): emails each form submission to
 * muslimlearningdawah@gmail.com. It's a public key by design, so it can live in the code.
 */
export const forms = {
  accessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "e4eae5c3-17ab-4b38-a4fe-aa1320adb0e6",
} as const;

export const speakers = [
  {
    name: "Sh. Hamad As-Surayh",
    title: "Former judge & professor in Qassim",
    highlights: [
      "Memorized all six books of hadith with their chains",
      "Student of Shaykh Ibn Uthaymeen and Shaykh Abdullah Al-Bassam",
      "Currently a professor at the University of Minnesota",
    ],
  },
  {
    name: "Sh. Yasir Siddig",
    title: "Imam, Clear Lake Islamic Center",
    highlights: [
      "Master's in Hadith",
      "PhD candidate in Usool",
      "Founder of the Wisal Foundation charity",
    ],
  },
  {
    name: "Sh. Hassan Mohammad",
    title: "Founder, Tanzil Institute",
    highlights: [
      "Master's in Hadith",
      "Former imam of Prince George's Muslim Association (PGMA)",
    ],
  },
] as const;

/** Starting content — admins add and edit events at /admin */
export const seedEvents: EventItem[] = [
  {
    id: "weekly-qa-shaykh-hamad",
    title: "Weekly Q&A with Shaykh Hamad As-Surayh",
    description:
      "Bring your questions and benefit from Shaykh Hamad As-Surayh — former judge and professor in Qassim, and a student of Shaykh Ibn Uthaymeen. The time and Zoom code are shared each week on Instagram and WhatsApp.",
    date: "2025-09-02",
    repeatsWeekly: true,
    time: "Time shared weekly on IG & WhatsApp",
    location: "Online — Zoom",
    image: "/gallery/weekly-qa-shaykh-hamad.jpg",
  },
  {
    id: "suhba-sisterhood",
    title: "Suhba: The Building Blocks for Sisterhood & Community",
    description:
      "An evening of halaqah, sisterhood, and refreshments with The Digital Sisterhood — a precursor to the Sisters Farm Retreat. Presented by Madinah Initiative with The Muhsineen, NextGen Somalis of the DMV, and MLD.",
    date: "2026-10-23",
    time: "7:00 PM – 10:00 PM",
    location: "Hawa Center, 4401 Fair Lakes Ct, Fairfax, VA",
    image: "/gallery/suhba-flyer.jpg",
  },
  {
    id: "deceptions-shaytan-youth",
    title: "The Deceptions of Shaytan on the Youth",
    description:
      "How Shaytan tries to mislead Muslim youth — recognizing his traps and doubts, and practical ways to protect your iman. With Shaykh Ibrahim Al Hoori and Ustadh Rubeellion Mansoor, hosted with Iqra Learning Center.",
    date: "2026-10-17",
    time: "5:00 PM – 8:30 PM",
    location: "Iqra Learning Center, 5703 Edsall Rd, Alexandria, VA",
    image: "/gallery/deceptions-flyer.jpg",
  },
  {
    id: "salaams-sips",
    title: "Salaams & Sips",
    description:
      "An evening of sisterhood and connection — lattes and matcha from Dostie Cafe, meeting new sisters, and good conversation.",
    date: "2026-10-14",
    time: "4:00 PM – 5:30 PM",
    location: "Shared in the sisters' WhatsApp group",
    image: "/gallery/salaams-sips.jpg",
  },
  {
    id: "liberation-of-palestine",
    title: "Liberation of Palestine",
    description:
      "A night of reflection with Ustadh Rubeellion Mansoor on how Umar (RA) first opened Palestine for the Muslims. Food from Bawadi served after.",
    date: "2026-09-28",
    time: "4:00 PM – 6:00 PM",
    location: "JC Room G",
    image: "/gallery/palestine-night.jpg",
  },
  {
    id: "bbq-soccer-2026",
    title: "Annual Community BBQ & Soccer Tournament",
    description:
      "BBQ, a soccer match open to all skill levels, and a brief reminder from Shaykh Adam Hilow — with Imam Al-Kisai Institute.",
    date: "2026-09-20",
    time: "4:00 PM – 6:00 PM",
    location: "Van Dyke Park",
    image: "/gallery/bbq-soccer.jpg",
  },
];

export const donationPackages = [
  {
    id: "quran",
    title: "Box of Qurans",
    amount: 50,
    description:
      "Stock our da'wah tables with a box of Qurans to give out for free to anyone curious about Islam at campus and community events.",
    impact: "1 box of Qurans for our da'wah tables",
  },
  {
    id: "conference",
    title: "Conference Sponsor",
    amount: 250,
    description:
      "Sponsor venue, AV, or refreshments for our next youth lecture or conference.",
    impact: "Named sponsor on event materials",
  },
  {
    id: "general",
    title: "General Fund",
    amount: 100,
    description:
      "Flexible support for programs, speaker travel, sisters' events, and community outreach.",
    impact: "Where need is greatest",
  },
] as const;

/** Starting content — admins write articles at /admin/articles */
export const seedArticles: Article[] = [];

export const navItems = [
  { href: "/events", label: "Events" },
  { href: "/articles", label: "Articles & Media" },
  { href: "/suggest-event", label: "Suggest an Event" },
  { href: "/contact", label: "Contact" },
  { href: "/donate", label: "Donate" },
] as const;
