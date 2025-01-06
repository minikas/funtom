"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Children, PropsWithChildren, ReactNode } from "react";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

import { Subheading } from "./subheading";

import { cn } from "@/lib/utils";
import { useCards } from "@/hooks/useCards";

export const Card = ({
  title,
  subheading,
  icon,
  scrollStart,
  scrollEnd,
  cardsScrollStart,
  cardsScrollEnd,
  children,
}: PropsWithChildren<{
  title: string;
  subheading: string;
  icon: keyof typeof Icons;
  scrollStart: number;
  scrollEnd: number;
  cardsScrollStart: number;
  cardsScrollEnd: number;
}>) => {
  const { containerRef, canScrollLeft, canScrollRight, onMoveCard } =
    useCards();

  const IconComponent = Icons[icon] as LucideIcon;
  return (
    <div className="flex flex-col gap-28 last:mr-28 w-full">
      <div className="mt-[-50vh] h-[140vh]">
        <Subheading scrollStart={scrollStart} scrollEnd={scrollEnd}>
          {title}
        </Subheading>
      </div>

      <div className="flex flex-col gap-14 w-full">
        <div className="flex justify-between px-14 animate-[show_2.5s_linear]">
          <div className="bg-white rounded-full py-2 px-4 flex items-center gap-2">
            <IconComponent size={24} />
            <span className="text-main-foreground font-semibold text-lg">
              {subheading}
            </span>
          </div>
          <div className="bg-white rounded-full p-1 flex items-center gap-1">
            <motion.button
              className={cn(
                canScrollLeft ? "bg-main/50 hover:bg-main" : "bg-white/50",
                "rounded-full p-2 transition-all duration-300"
              )}
              onClick={() => canScrollLeft && onMoveCard("left")}
              whileTap={canScrollLeft ? { scale: 0.95 } : undefined}
              style={{ opacity: canScrollLeft ? 1 : 0.6 }}
              disabled={!canScrollLeft}
            >
              <Icons.ChevronLeft />
            </motion.button>
            <motion.button
              className={cn(
                canScrollRight ? "bg-main/50 hover:bg-main" : "bg-white/50",
                "rounded-full p-2 transition-all duration-300"
              )}
              onClick={() => canScrollRight && onMoveCard("right")}
              whileTap={canScrollRight ? { scale: 0.95 } : undefined}
              style={{ opacity: canScrollRight ? 1 : 0.6 }}
              disabled={!canScrollRight}
            >
              <Icons.ChevronRight color="black" />
            </motion.button>
          </div>
        </div>
        <div className="max-w-screen overflow-hidden">
          <motion.div
            className="flex gap-8 cursor-grab select-none lg:mr-14 mr-5 lg:py-10 py-5 "
            ref={containerRef}
            style={{ transform: "translateX(0)" }}
            viewport={{ once: true }}
          >
            {Children.map(children, (child, index) => (
              <AnimatedCard
                key={index}
                index={index}
                cardsScrollEnd={cardsScrollEnd}
                cardsScrollStart={cardsScrollStart}
              >
                {child}
              </AnimatedCard>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const AnimatedCard = ({
  children,
  cardsScrollStart,
  cardsScrollEnd,
  index,
}: {
  children: ReactNode;
  cardsScrollStart: number;
  cardsScrollEnd: number;
  index: number;
}) => {
  const { scrollY } = useScroll();
  const x = useTransform(
    scrollY,
    [cardsScrollStart, cardsScrollEnd],
    [window.innerWidth / 3 + -index * 440, 0]
  );

  return (
    <motion.div
      className="first:ml-14"
      style={{ x }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};
