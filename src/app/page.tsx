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
              cardsScrollStart={1800}
              cardsScrollEnd={2100}
            >
              {card.text}
            </GenericCard>
          ))}
        </Card>
        <Card
          title="Powerful * tools | made for everyone"
          subheading="Your web3 tools"
          icon="Globe"
          scrollStart={2900}
          scrollEnd={3100}
        >
          {toolsCardsInfo?.map((card, i) => (
            <GenericCard
              key={i}
              color={card.color}
              sources={card.sources}
              index={i}
              cardsScrollStart={3400}
              cardsScrollEnd={3800}
            >
              {card.text}
            </GenericCard>
          ))}
        </Card>
        <Card
          title="Controlled by you, | secured * by us"
          subheading="Your security"
          icon="Shield"
          scrollStart={4700}
          scrollEnd={5000}
        >
          {securityCardsInfo?.map((card, i) => (
            <GenericCard
              key={i}
              color={card.color}
              sources={card.sources}
              index={i}
              cardsScrollStart={5300}
              cardsScrollEnd={5700}
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
