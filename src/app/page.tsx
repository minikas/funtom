"use client";

import { Header } from "../components/header";

import { Card } from "@/components/card";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { GenericCard } from "@/components/genericCard";
import { walletCardsInfo } from "@/static/walletCardsInfo";
import { toolsCardsInfo } from "@/static/toolsCardsInfo";
import { securityCardsInfo } from "@/static/securityCardsInfo";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-montserrat)]">
      <Header />
      <main className="mb-24">
        <Hero />
        <Card
          title="Keep everything | in * one place"
          subheading="Your wallet"
          icon="Wallet"
          scrollStart={700}
          scrollEnd={1000}
        >
          {walletCardsInfo?.map((card, i) => (
            <GenericCard
              key={i}
              color={card.color}
              sources={card.sources}
              index={i}
              cardsScrollStart={2000}
              cardsScrollEnd={2300}
            >
              {card.text}
            </GenericCard>
          ))}
        </Card>
        <Card
          title="Powerful * tools | made for everyone"
          subheading="Your web3 tools"
          icon="Globe"
          scrollStart={2700}
          scrollEnd={3000}
        >
          {toolsCardsInfo?.map((card, i) => (
            <GenericCard
              key={i}
              color={card.color}
              sources={card.sources}
              index={i}
              cardsScrollStart={3700}
              cardsScrollEnd={4000}
            >
              {card.text}
            </GenericCard>
          ))}
        </Card>
        <Card
          title="Controlled by you, | secured * by us"
          subheading="Your security"
          icon="Shield"
          scrollStart={4500}
          scrollEnd={4900}
        >
          {securityCardsInfo?.map((card, i) => (
            <GenericCard
              key={i}
              color={card.color}
              sources={card.sources}
              index={i}
              cardsScrollStart={5400}
              cardsScrollEnd={5800}
            >
              {card.text}
            </GenericCard>
          ))}
        </Card>
      </main>
      <Footer />
    </div>
  );
}
