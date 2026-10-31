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

// `bio` and `funFact` show in the team member's dialog on About (Kedar, 2026-10-31, from the
// current site's team pop-ups; emoji dropped, typos fixed).
export type Person = { name: string; role: string; photo?: StaticImageData; focus?: string; linkedin?: string; bio?: string; funFact?: string };

// TODO: Hemant Dave's and Gaurav Chauhan's LinkedIn links; Pratik Mitra's bio and fun fact; a larger photo of Hemant (192px)
// and Nikita (328px), which are soft on a card.
export const team: Person[] = [
  { name: "Rahool Gadkari", role: "Co-founder", photo: rahool, focus: "50% 30%", linkedin: "https://www.linkedin.com/in/rahoolgadkari", bio: "Rahool leads Corporate Sales, Product, Engineering and Investor Relations at Neufin Energy. He was previously Director of Product at Jupiter, leading consumer products. Rahool has spent time in the US working at healthcare marketplace Zocdoc and semiconductor company Broadcom. He was also an early PM at Practo. He holds an MBA from Northwestern University's Kellogg School of Management, an MS from the University of Minnesota, Twin Cities and a BE from the Army Institute of Technology, Pune.", funFact: "Rahool is a proficient squash player and a self-proclaimed chef." },
  { name: "Rushil Noronha", role: "Co-founder", photo: rushil, focus: "50% 30%", linkedin: "https://www.linkedin.com/in/rushilnoronha", bio: "Rushil leads Sales, Operations, Marketing and HR at Neufin Energy. Selling is what Rushil enjoys the most, and he put these skills to good use as the founding member of P&G's e-commerce and Direct-to-Consumer businesses. He steered the business to profitability, and in his last role prior to Neufin was Director, e-Commerce & e-DTC. Rushil holds a PGDM from the Indian Institute of Management, Calcutta (IIM-C) and a BE from the Army Institute of Technology, Pune.", funFact: "Rushil is a fantasy fiction buff and a dog-lover. He's actively involved in pet rescue and care in the Mumbai region." },
  { name: "Abhinav Nahata", role: "Product", photo: abhinav, focus: "50% 30%", linkedin: "https://www.linkedin.com/in/abhinav-nahata-60082a196", bio: "Abhinav looks after Product at Neufin Energy. He started his career with neobank Jupiter, working on savings and lending products. He holds a BTech in Aerospace Engineering from IIT Madras.", funFact: "Abhinav can bench press 100 kgs and on most nights dreams of pushing 150 kgs. He also hopes to be a coffee snob one fine day." },
  { name: "Nikita Pawar", role: "Business development", photo: nikita, focus: "50% 30%", linkedin: "https://www.linkedin.com/in/nikita-pawar-52b724165", bio: "Nikita works on Business Development at Neufin Energy. She has worked at leading IPP Fourth Partner Energy where she helped close a number of Open Access and DRE deals. She is an electronics engineer from Maharashtra Institute of Technology, Pune and holds an MBA from the Indo-German Training Centre, Mumbai.", funFact: "Nikita volunteers at NGOs to teach underprivileged children on weekends. She balances the good karma earned by cracking bad jokes and hating on people who don't laugh at them." },
  { name: "Preetam Raj", role: "Engineering", photo: preetam, focus: "50% 40%", linkedin: "https://www.linkedin.com/in/raj-preetam", bio: "Preetam ships our amazing products as a full-stack developer. He graduated from IIT Mandi with a major in Mechanical Engineering and a minor in Computer Science. Preetam started his career at Neufin and has contributed to building and maintaining key features of the platform.", funFact: "Preetam loves to cook and makes a mean chicken curry. The team hopes that one day they will get to taste said curry." },
  { name: "Pratik Mitra", role: "Business operations", photo: pratik, focus: "45% 30%", linkedin: "https://www.linkedin.com/in/pratik-mitra-450a69257/" },
  { name: "Hemant Dave", role: "Regulations and hardware", photo: hemant, focus: "50% 30%", bio: "Hemant leads regulatory affairs, DISCOM liaising and hardware sales. He's spent close to two decades in various roles at Torrent DISCOM, Ahmedabad. He holds an Executive Masters in Energy Policy & Regulation from IIT Gandhinagar and a B.Tech in Electrical Engineering from Nirma Institute of Technology.", funFact: "Hemant is an entrepreneur at heart, having founded his first venture in e-commerce well before Flipkart existed. He successfully ran and sold a speciality e-commerce store focused on kites." },
  { name: "Gaurav Chauhan", role: "Business development", photo: gaurav, focus: "55% 50%", bio: "Gaurav leads North India business development. He brings with him rich experience across leading power trading companies, including Kreate Energy, Manikaran Power Limited, and Arunachal Pradesh Power Corporation. He has extensive experience in the Commercial & Industrial (C&I) power segment, where he has worked with clients and successfully facilitated their transition to Open Access and Group Captive power procurement models. Gaurav is a Mechanical Engineer from Galgotias College of Engineering and Technology, Greater Noida, and holds an MBA in Power Management from UPES, Dehradun.", funFact: "Gaurav loves a great story (telling more than listening) and is especially forthcoming over tea or coffee." },
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
