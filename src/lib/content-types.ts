/** Content that admins can edit from /admin. Safe to import from client components. */

export type EventItem = {
  id: string;
  title: string;
  description: string;
  /** YYYY-MM-DD. Upcoming vs past is worked out from this automatically. */
  date: string;
  /** Repeats every week on the same weekday as `date` (always listed as upcoming) */
  repeatsWeekly?: boolean;
  time?: string;
  location: string;
  image?: string;
  registrationUrl?: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  /** YYYY-MM-DD, used to show newest photos first */
  date: string;
};

export type Article = {
  id: string;
  /** URL name: /articles/<slug> */
  slug: string;
  title: string;
  summary: string;
  /** Simple formatting: blank line = new paragraph, "## " heading, "- " bullet, **bold**, [text](link) */
  body: string;
  author?: string;
  /** YYYY-MM-DD */
  date: string;
  cover?: string;
  videoUrl?: string;
  published: boolean;
};

export type SiteSettings = {
  email: string;
  instagram: string;
  whatsappCommunity: string;
  goFundMe: string;
};

export type SiteContent = {
  events: EventItem[];
  gallery: GalleryItem[];
  articles: Article[];
  settings: SiteSettings;
};

/** A message sent through one of the website forms; shown in /admin/inbox. */
export type Submission = {
  id: string;
  kind: SubmissionKind;
  /** ISO timestamp */
  receivedAt: string;
  fields: Record<string, string>;
};

export const submissionKinds = {
  contact: "Contact message",
  "event-request": "Event request",
  "article-submission": "Article / video submission",
  "sisters-group": "Sisters' WhatsApp group request",
} as const;

export type SubmissionKind = keyof typeof submissionKinds;
