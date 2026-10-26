// Neufin's team and angel investors, from the current site (neufin.energy/about) and the
// photos Neufin sent (Kedar's Website folder, 2026-10-26). Photos are in src/assets/photos.
import type { StaticImageData } from "next/image";
import abhinav from "@/assets/photos/team/abhinav-nahata.jpg";
import gaurav from "@/assets/photos/team/gaurav-chauhan.jpg";
import hemant from "@/assets/photos/team/hemant-dave.jpg";
import nikita from "@/assets/photos/team/nikita-pawar.jpg";
import pratik from "@/assets/photos/team/pratik-mitra.jpg";
import preetam from "@/assets/photos/team/preetam-raj.jpg";
import rahool from "@/assets/photos/team/rahool-gadkari.jpg";
import rushil from "@/assets/photos/team/rushil-noronha.jpg";
import premanshu from "@/assets/photos/angels/premanshu-singh.jpg";
import puneet from "@/assets/photos/angels/puneet-deora.jpg";
import rohit from "@/assets/photos/angels/rohit-parakh.jpg";
import vaibhav from "@/assets/photos/angels/vaibhav-domkundwar.jpg";
import varun from "@/assets/photos/angels/varun-vohra.jpg";

export type Person = { name: string; role: string; photo?: StaticImageData; focus?: string; linkedin?: string };

// TODO: Hemant Dave's and Gaurav Chauhan's LinkedIn links; a larger photo of Hemant (192px)
// and Nikita (328px), which are soft on a card.
export const team: Person[] = [
  { name: "Rahool Gadkari", role: "Co-founder", photo: rahool, focus: "50% 30%", linkedin: "https://www.linkedin.com/in/rahoolgadkari" },
  { name: "Rushil Noronha", role: "Co-founder", photo: rushil, focus: "50% 30%", linkedin: "https://www.linkedin.com/in/rushilnoronha" },
  { name: "Abhinav Nahata", role: "Product", photo: abhinav, focus: "50% 30%", linkedin: "https://www.linkedin.com/in/abhinav-nahata-60082a196" },
  { name: "Nikita Pawar", role: "Business development", photo: nikita, focus: "50% 30%", linkedin: "https://www.linkedin.com/in/nikita-pawar-52b724165" },
  { name: "Preetam Raj", role: "Engineering", photo: preetam, focus: "50% 40%", linkedin: "https://www.linkedin.com/in/raj-preetam" },
  { name: "Pratik Mitra", role: "Business operations", photo: pratik, focus: "45% 30%", linkedin: "https://www.linkedin.com/in/pratik-mitra-450a69257/" },
  { name: "Hemant Dave", role: "Regulations and hardware", photo: hemant, focus: "50% 30%" },
  { name: "Gaurav Chauhan", role: "Business development", photo: gaurav, focus: "55% 50%" },
];

// Angels by name and company, as on the current site. Five sent photos; the rest show
// their initials. TODO: Neufin to confirm each line (Sarthak Misra's company especially).
export const angels: Person[] = [
  { name: "Vaibhav Domkundwar", role: "Better Capital", photo: vaibhav },
  { name: "Lalit Keshre", role: "Founder, Groww" },
  { name: "Shashank ND", role: "Founder, Practo" },
  { name: "Jiten Gupta", role: "Founder, Jupiter" },
  { name: "Ashish Goel", role: "Ex-founder, Urban Ladder" },
  { name: "Muthu Murugappan", role: "CEO, EID Parry" },
  { name: "Arun Venkatachalam", role: "Cholamandalam Finance" },
  { name: "Ramesh Mangaleswaran", role: "Partner, McKinsey & Company" },
  { name: "Sumer Juneja", role: "Partner, SoftBank" },
  { name: "Sarthak Misra", role: "Partner, SoftBank" },
  { name: "Premanshu Singh", role: "Flipkart, Super Money", photo: premanshu },
  { name: "Varun Vohra", role: "Vaaree", photo: varun },
  { name: "Rohit Parakh", role: "Touchstone", photo: rohit },
  { name: "Puneet Deora", role: "Deoras Group", photo: puneet },
];
