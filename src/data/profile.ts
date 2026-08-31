export interface ProfileLink {
  label: string;
  url: string;
  icon: "linkedin" | "github" | "orcid" | "email";
}

export const profile = {
  name: "Khaled Eissa",
  title: "AI/Software Engineer",
  summary:
    "Software Engineer with 2+ years of experience in AI, backend development, and cloud/MLOps, focused on building scalable and production-ready solutions, with a commitment to continuous learning and growth.",
};

export const links: ProfileLink[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/khaled-eissa-07765b233/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    url: "https://github.com/Khaledayman9",
    icon: "github",
  },
  {
    label: "ORCID",
    url: "https://www.orcid.org/0009-0003-4331-7024",
    icon: "orcid",
  },
  {
    label: "khaledayman012@gmail.com",
    url: "mailto:khaledayman012@gmail.com",
    icon: "email",
  },
];
