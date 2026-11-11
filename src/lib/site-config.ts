import type { Article, EventItem, SiteSettings } from "@/lib/content-types";

export const site = {
  name: "Muslim Learning & Da'wah",
  shortName: "MLD",
  tagline: "Educating youth, strengthening community, and calling to Allah with wisdom.",
  description:
    "Muslim Learning & Da'wah (MLD) is based in the DMV and hosts lectures, conferences, and community programs for youth and families across the country.",
  location: "Based in the DMV · Programs across the country",
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

/** Shown on /speakers and previewed on the home page. `focus` is the CSS object-position that keeps the face in frame. */
export const speakers = [
  {
    name: "Sh. Hamad As-Surayh",
    title: "Former judge & professor in Qassim",
    photo: "/speakers/hamad-as-surayh.jpg",
    focus: "50% 25%",
    highlights: [
      "Memorized all six books of hadith with their chains",
      "Student of Shaykh Ibn Uthaymeen and Shaykh Abdullah Al-Bassam",
      "Currently a professor at the University of Minnesota",
    ],
  },
  {
    name: "Sh. Yasir Siddig",
    title: "Imam, Clear Lake Islamic Center",
    photo: "/speakers/yasir-siddig.jpg",
    focus: "50% 30%",
    highlights: [
      "Master's in Hadith",
      "PhD candidate in Usool",
      "Founder of the Wisal Foundation charity",
    ],
  },
  {
    name: "Sh. Hassan Mohammad",
    title: "Founder, Tanzil Institute",
    photo: "/speakers/hassan-mohamed.jpg",
    focus: "50% 30%",
    highlights: [
      "Master's in Hadith",
      "Former imam of Prince George's Muslim Association (PGMA)",
    ],
  },
  {
    name: "Sh. Ibrahim Ali",
    title: "Founder, Talibul Ilm Academy",
    photo: "/speakers/ibrahim-ali.jpg",
    focus: "50% 20%",
    highlights: [
      "Graduate of Imam Muhammad Ibn Saud University in Riyadh",
      "Student of Shaykh Abdul Mun'im",
      "Founder of Talibul Ilm Academy",
    ],
  },
  {
    name: "Ustadh Rubeellion Mansoor",
    title: "Founder of MLD",
    photo: "/speakers/rubeellion-mansoor.jpg",
    focus: "40% 25%",
    highlights: [
      "Founder of Muslim Learning & Da'wah",
      "Current student of shariah studies",
      "Studied under Shaykh Saleh As-Suhaymi and Shaykh Abdurrazzaq Al-Badr",
    ],
  },
] as const;

/** Starting content — admins add and edit events at /admin */
export const seedEvents: EventItem[] = [
  {
    id: "weekly-qa-shaykh-hamad",
    title: "Weekly Q&A with Shaykh Hamad As-Surayh",
    description:
      "Bring your questions and benefit from Shaykh Hamad As-Surayh — former judge and professor in Qassim, and a student of Shaykh Ibn Uthaymeen. Join live on Zoom every week at 2:30 PM Eastern.",
    date: "2025-09-02",
    repeatsWeekly: true,
    time: "2:30 PM ET",
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
    id: "bbq-soccer-2026",
    title: "Annual Community BBQ & Soccer Tournament",
    description:
      "BBQ, a soccer match open to all skill levels, and a brief reminder from Shaykh Adam Hilow — with Imam Al-Kisai Institute.",
    date: "2026-09-20",
    time: "4:00 PM – 6:00 PM",
    location: "Van Dyke Park",
    image: "/gallery/bbq-soccer.jpg",
  },
  {
    id: "dmv-tour-sadiq-yasin",
    title: "DMV Tour with Ustadh Sadiq Yasin",
    description:
      "Three nights across the DMV with Ustadh Sadiq Yasin — with Tanzil Seminary, Al-Madrasatu Ar-Rahmaniyyah, and Madinah Institute.\n\nJuly 27 · Life of Ibn Al-Qayyim — Hawa Center, Fairfax, VA (Maghrib to Isha)\nJuly 28 · Tazkiyatun Nafs — Muslim Community Center, Silver Spring, MD (7–10 PM)\nJuly 29 · The Honor of Islam and Remaining Firm Upon It — Dar Al-Hijrah, Falls Church, VA (Maghrib to Isha)",
    date: "2026-07-27",
    time: "July 27 – 29",
    location: "Fairfax, VA · Silver Spring, MD · Falls Church, VA",
    image: "/gallery/dmv-tour-sadiq-yasin.jpg",
  },
  {
    id: "tests-of-faith",
    title: "Tests of Faith with Shaykh Hamad As-Surayh",
    description:
      "A three-night program with Shaykh Hamad As-Surayh, with Madinah Institute, Baseerah Center, and the Hawa Center.\n\nFriday · Aim High: having high aspirations and goals in Islam (7–10 PM)\nSaturday · The Exoneration of A'isha: the story of the slander against A'isha (6–10 PM)\nSunday · Unwavering Faith: the trial and torture of Imam Ahmad (6–10 PM)",
    date: "2026-07-17",
    time: "July 17 – 19",
    location: "Hawa Center, 4401 Fair Lakes Ct, Fairfax, VA",
    image: "/gallery/tests-of-faith.jpg",
  },
  {
    id: "seerah-hassan-mohamed",
    title: "Seerah of Prophet Muhammad ﷺ",
    description: "A weekly study of the life of the Prophet ﷺ with Shaykh Hassan Mohamed, at the Hawa Center.",
    date: "2026-06-08",
    time: "Mondays from June 8 · After Maghrib",
    location: "Hawa Center, 4401 Fair Lakes Ct, Fairfax, VA",
    image: "/gallery/seerah-hassan-mohamed.jpg",
  },
  {
    id: "manners-student-teacher",
    title: "Manners of the Student & Teacher",
    description:
      "Adab al-Mu'allimeen wal-Muta'allimeen — a weekly class with Ustadh Rubeellion Mansoor on the manners of seeking and teaching knowledge, hosted with Iqra Learning Center.",
    date: "2026-06-06",
    time: "Saturdays, June 6 – July 3 · After Maghrib",
    location: "Iqra Learning Center, 5703 Edsall Rd, Alexandria, VA",
    image: "/gallery/manners-student-teacher.jpg",
  },
  {
    id: "legacy-of-the-sunnah",
    title: "The Legacy of the Sunnah",
    description:
      "A conference on the legacy of what the Prophet ﷺ and his companions left behind, with Shaykh Uthman Bin Farooq, Shaykh Karim Abu Zaid, Imam Soufiane Taydi, and Ustadh Rubeellion Mansoor.",
    date: "2026-05-15",
    time: "May 15 – 17",
    location: "Hawa Center, 4401 Fair Lakes Ct, Fairfax, VA",
    image: "/gallery/legacy-of-the-sunnah.jpg",
  },
];

/** Weekly Q&A Zoom details — shown at the bottom of the home page and on the Q&A event page */
export const weeklyQa = {
  eventId: "weekly-qa-shaykh-hamad",
  zoomUrl: "https://zoom.us/j/94392992654",
  meetingId: "943 9265 2654",
  rules: [
    "Camera and mic must be off",
    "DM your questions to the Zoom host in the chat",
    "Keep questions brief",
  ],
} as const;

/** Scrolling photo strip on the home and About pages (files in public/carousel) */
export const carouselPhotos = [
  { src: "/carousel/05.jpg", alt: "Shaykh Hamad As-Surayh speaking at a Madinah Institute program", width: 1150, height: 1800 },
  { src: "/carousel/02.jpg", alt: "A speaker addressing the audience at an MLD lecture", width: 1800, height: 1200 },
  { src: "/carousel/04.jpg", alt: "Brothers smiling together at a community gathering", width: 1206, height: 663 },
  { src: "/carousel/06.jpg", alt: "A teacher speaking with a microphone during a halaqah", width: 1280, height: 855 },
  { src: "/carousel/03.jpg", alt: "Attendees taking notes during a class", width: 1206, height: 674 },
  { src: "/carousel/08.jpg", alt: "A teacher seated at the MLD table during a class", width: 1280, height: 855 },
  { src: "/carousel/11.jpg", alt: "Shaykh Hamad As-Surayh delivering a lecture", width: 1440, height: 1800 },
  { src: "/carousel/07.jpg", alt: "An attendee listening during a lecture", width: 1280, height: 855 },
  { src: "/carousel/01.jpg", alt: "A shaykh listening during a program", width: 1200, height: 1800 },
  { src: "/carousel/09.jpg", alt: "A brother listening in the musalla", width: 1280, height: 855 },
  { src: "/carousel/10.jpg", alt: "Following along with the Quran on a tablet", width: 1280, height: 855 },
] as const;

/** About page and the home page's About section */
export const about = {
  mission:
    "Our mission is to spread authentic Islamic knowledge through conferences, lectures, intensive seminars and educational programs featuring the most respected scholars and teachers from around the nation.",
  focus: [
    {
      title: "Educational events",
      body: "Evening lectures, weekly classes, and multi-day conferences on iman, character, the seerah, and navigating modern challenges.",
    },
    {
      title: "Community building",
      body: "Brothers' halaqahs, sisters' programs, and community days that build lasting brotherhood and sisterhood.",
    },
    {
      title: "Da'wah & outreach",
      body: "Da'wah tables with free Qurans, new-Muslim support, and content that invites others to Islam.",
    },
    {
      title: "Da'wah training",
      body: "Preparing brothers and sisters to share Islam with knowledge, wisdom, and good character.",
    },
  ],
  story: [
    "What began seven years ago as a small group of college students in Fairfax, Virginia, with a shared passion for spreading Islamic knowledge has grown into an established nonprofit organization dedicated to educating, inspiring, and serving communities across the country.",
    "With Muslim Learning & Da'wah (MLD), our mission is to spread authentic Islamic knowledge through conferences, lectures, intensive seminars and educational programs featuring the most respected scholars and teachers from around the nation.",
    "Alongside these efforts, we organize da'wah tables both locally and nationwide, providing volunteers with the training, knowledge, and hands-on experience needed to invite others to Islam with wisdom, kindness, and good character.",
    "We invite you to explore our past events, meet our speakers, and join us in our mission to spread authentic Islamic knowledge and the beautiful teachings and manners of Islam.",
  ],
} as const;

/**
 * Event changes made in code. Once the team saves anything at /admin, the live site uses that saved
 * copy instead of `seedEvents`, so these are applied with the "Apply updates" button on /admin.
 * Bump `version` whenever the list changes so the button shows up again.
 */
export const eventUpdates = {
  version: "2026-11-10",
  /** Added, or merged into the saved event with the same id */
  upsert: seedEvents.filter((e) =>
    [
      "weekly-qa-shaykh-hamad",
      "dmv-tour-sadiq-yasin",
      "tests-of-faith",
      "seerah-hassan-mohamed",
      "manners-student-teacher",
      "legacy-of-the-sunnah",
    ].includes(e.id),
  ),
  /** GMU events and others the team took down */
  remove: ["liberation-of-palestine", "salaams-sips"],
};

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
    id: "minor-conference",
    title: "Minor Conference",
    amount: 500,
    description:
      "Sponsor a one-day program or da'wah training — venue, AV, refreshments, and materials.",
    impact: "Named sponsor on event materials",
  },
  {
    id: "major-conference",
    title: "Major Conference",
    amount: 1000,
    description:
      "Sponsor a multi-day conference with visiting scholars — speaker travel, venue, and hospitality.",
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
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/speakers", label: "Speakers" },
  { href: "/articles", label: "Articles & Media" },
  { href: "/collaborate", label: "Collaborate" },
  { href: "/contact", label: "Contact" },
  { href: "/donate", label: "Donate" },
] as const;
