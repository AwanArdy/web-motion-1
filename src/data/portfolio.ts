import angularIcon from "../assets/angular.svg";
import dockerIcon from "../assets/docker.svg";
import graphqlIcon from "../assets/graphql.svg";
import nestjsIcon from "../assets/nest.svg";
import nodejsIcon from "../assets/nodejs.svg";
import postgresqlIcon from "../assets/postgresql.svg";
import pythonIcon from "../assets/python.svg";
import reactIcon from "../assets/react.svg";
import redisIcon from "../assets/redis.svg";
import sqliteIcon from "../assets/sqlite.svg";
import tailwindIcon from "../assets/tailwind.svg";
import typescriptIcon from "../assets/ts.svg";

export interface Skill {
  name: string;
  icon: typeof reactIcon;
  category: "Frontend" | "Backend" | "DevOps";
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export const site = {
  name: "Muhammad Awan Ardy Firmansyah",
  initials: "AA.",
  role: "Fullstack Web Developer",
  location: "Palu, ID",
  email: "muhammadawan46@gmail.com",
  github: "https://github.com/AwanArdy",
  githubLabel: "github.com/AwanArdy",
  experienceYears: "2+ Years",
  status: "Open to Work",
  title: "Awan Ardy — Fullstack Web Developer",
  description:
    "Portfolio profesional Muhammad Awan Ardy Firmansyah — Fullstack Web Developer yang berfokus pada pengembangan aplikasi web modern, performa tinggi, dan struktur kode yang rapi.",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const aboutCard = [
  { label: "Name", value: site.name },
  { label: "Role", value: "Fullstack Dev" },
  { label: "Location", value: site.location },
  { label: "Experience", value: site.experienceYears },
  { label: "Status", value: site.status },
];

export const marqueeItems = [
  "React",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "TypeScript",
  "Python",
  "AngularJS",
  "SQLite",
  "GraphQL",
  "Redis",
  "FastAPI",
];

export const skills: Skill[] = [
  { name: "React", icon: reactIcon, category: "Frontend" },
  { name: "TypeScript", icon: typescriptIcon, category: "Frontend" },
  { name: "Tailwind CSS", icon: tailwindIcon, category: "Frontend" },
  { name: "AngularJS", icon: angularIcon, category: "Frontend" },
  { name: "Node.js", icon: nodejsIcon, category: "Backend" },
  { name: "Python / FastAPI", icon: pythonIcon, category: "Backend" },
  { name: "PostgreSQL", icon: postgresqlIcon, category: "Backend" },
  { name: "SQLite", icon: sqliteIcon, category: "Backend" },
  { name: "Docker", icon: dockerIcon, category: "DevOps" },
  { name: "NestJS", icon: nestjsIcon, category: "Backend" },
  { name: "Redis", icon: redisIcon, category: "Backend" },
  { name: "GraphQL", icon: graphqlIcon, category: "Backend" },
];

export const experience: ExperienceItem[] = [
  {
    role: "Freelance Fullstack Developer",
    company: "Independent",
    period: "2026 — Now",
    desc: "Merancang dan membangun sistem Headless CMS kustom menggunakan Node.js, Express, TypeScript, dan SQLite. Menangani modul autentikasi internal serta integrasi Cloudinary untuk pipeline pemrosesan aset media.",
  },
  {
    role: "Freelance Frontend Engineer",
    company: "Independent",
    period: "2025 — 2026",
    desc: "Mengembangkan antarmuka web e-commerce berbasis Vite, TypeScript, dan Zustand. Membangun fitur pencarian instan, filter katalog multi-kriteria, serta integrasi alur checkout dan payment gateway.",
  },
  {
    role: "Freelance Software Developer",
    company: "Independent",
    period: "2025",
    desc: "Membangun aplikasi Terminal User Interface (TUI) interaktif dengan Ink dan TypeScript untuk memantau kesehatan storage drive, mem-parsing data JSON dari smartctl, dan menampilkan metrik diagnostik secara rapi.",
  },
];
