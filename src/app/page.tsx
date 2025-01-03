import { Header } from "../components/header";

import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-montserrat)]">
      <Header />
      <div>
        <Hero />
      </div>
    </div>
  );
}
