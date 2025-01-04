import { Header } from "../components/header";

import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-montserrat)]">
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
