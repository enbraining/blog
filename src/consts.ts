import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Donghak Kim",
  DESCRIPTION: "Donghak Kim's tech blog",
  EMAIL: "me@bricn.net",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "this is home.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "this is blog.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "this is projects.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/enbraining",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/enbraining",
  },
];
