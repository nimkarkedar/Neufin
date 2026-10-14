import { Hero } from "@/components/home/Hero";
import styles from "./page.module.css";

// Home page. The hero holds the page's h1.
export default function Home() {
  return (
    <>
      <Hero />
      <div className={styles.upcoming} aria-hidden="true" />
    </>
  );
}
