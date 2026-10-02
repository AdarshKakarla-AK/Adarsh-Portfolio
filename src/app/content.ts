export const LINKS = {
  github: "https://github.com/AdarshKakarla-AK",
  linkedin: "https://www.linkedin.com/in/adarsh-kakarla-7a83a2411",
  instagram: "https://www.instagram.com/adarsh_vlogs.in?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  email: "mailto:Adarshkakarla@gmail.com",
  resume: "/Adarsh_Kakarla_Resume.pdf",
  younique: "https://www.instagram.com/studio_younique_boutique?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  myflavours: "https://www.instagram.com/myflavours89/?utm_source=ig_web_button_share_sheet",
};

export type Project = {
  no: string; title: string; kind: string; status: string;
  concept: string; role: string; stack: string[];
  points: string[]; link?: string; accent?: boolean;
};

export const PROJECTS: Project[] = [
  {
    no: "01", title: "EduExam AI", kind: "AI · CLASSROOM ASSESSMENT ASSISTANT",
    status: "Currently building", concept: "An AI assistant designed around Indian school assessment — turning portions into questions, rubrics and feedback.",
    role: "Design + Build · Lyzr AI",
    stack: ["Lyzr AI", "Python", "LLM workflows", "Next.js UI"],
    points: ["Problem: teachers spend hours writing balanced question papers", "Concept: portion → blueprint → questions → marking scheme", "How it works: structured AI workflow with human review step", "Learned: prompt design, evaluation, keeping AI output checkable"],
    accent: true,
  },
  {
    no: "02", title: "NextGen-Fitness", kind: "TYPESCRIPT · WEB APP",
    status: "Built · learning project", concept: "A fitness web app — programs, tracking UI and a clean TypeScript codebase.",
    role: "Design + Code", stack: ["TypeScript", "Next.js", "Tailwind"],
    points: ["App shell with program + tracking views", "Typed data layer, reusable components"],
    link: "https://github.com/AdarshKakarla-AK",
  },
  {
    no: "03", title: "Driving School Website", kind: "TYPESCRIPT · CLIENT-STYLE TRIAL",
    status: "Trial build", concept: "A local-business website trial — courses, pricing, enquiry flow.",
    role: "Design + Code", stack: ["TypeScript", "Next.js"],
    points: ["Service + pricing + contact/enquiry sections", "Built to learn real client constraints"],
  },
  {
    no: "04", title: "Admin Dashboard", kind: "JAVASCRIPT · RESPONSIVE DASHBOARD",
    status: "Built · UI experiment", concept: "Responsive data dashboard — tables, charts, sidebar system.",
    role: "Front-end", stack: ["JavaScript", "CSS", "Charts"],
    points: ["Responsive layout + data views", "Reusable card/table patterns"],
  },
  {
    no: "05", title: "Resume Webpage Templates", kind: "HTML · REUSABLE TEMPLATES",
    status: "Shipped · reusable", concept: "Clean HTML resume/portfolio templates anyone can fork and restyle.",
    role: "Design + Code", stack: ["HTML", "CSS"],
    points: ["Print-friendly, semantic HTML", "Multiple layout variants"],
  },
];

export const TIMELINE = [
  { year: "2021+", title: "Creative school projects", text: "Planetarium models, class projects. First taste of making things people look at." },
  { year: "School", title: "Class rep · Sports · Stage", text: "Class representative, volleyball, public speaking. Learned to organise people, not just work." },
  { year: "2024", title: "School complete → camera on", text: "Videography, editing, short experiments. Content becomes a daily habit." },
  { year: "2024–26", title: "PCMC · Lead · Experiment", text: "Leadership roles, technical team work, events, client-style content trials." },
  { year: "2026", title: "Atria · CSE · Bengaluru", text: "B.E. Computer Science. C, Java, Python, DSA, ML — foundation mode, seriously." },
  { year: "2026", title: "Freelance social + GitHub", text: "MyFlavours + Studio Younique content. First GitHub builds ship in public." },
  { year: "Now", title: "EduExam AI", text: "AI classroom assistant on Lyzr AI. The build that ties learning → product." },
];

export const PIPELINE = ["LEARN", "EXPERIMENT", "BUILD", "CREATE", "SHIP", "REPEAT"];
