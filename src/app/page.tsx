import { Header } from "../components/header";

import { Card } from "@/components/card";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { GenericCard } from "@/components/genericCard";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-montserrat)]">
      <Header />
      <main className="mb-80">
        <Hero />
        <Card title="Keep everything | in * one place">
          <GenericCard color="purple">
            Multiple chains, one wallet. No more switching.
          </GenericCard>
          <GenericCard color="dark">
            Seamslessly access the largest NFT marketplaces.
          </GenericCard>
          <GenericCard color="orange">
            Showcase your NFT collection.
          </GenericCard>
          <GenericCard color="yellow">
            Monitor activity with transaction history and notifications.
          </GenericCard>
          <GenericCard color="gray">
            No Limits on tokens, balances or transactions.
          </GenericCard>
        </Card>
        {/* <Card title="Powerful * tools | made for everyone" />
        <Card title="Controlled by you, | secured * by us" /> */}
      </main>
      <Footer />
    </div>
  );
}
