import { site } from "@/lib/site";

// Home page. Empty until the hero design arrives. The h1 is here so the page has one.
export default function Home() {
  return (
    <div className="container" style={{ minHeight: "60vh" }}>
      <h1 className="visually-hidden">{site.name}</h1>
    </div>
  );
}
