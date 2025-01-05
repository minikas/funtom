"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Children, PropsWithChildren } from "react";
import { ChevronLeft, ChevronRight, Wallet } from "lucide-react";

import { Subheading } from "./subheading";

import { cn } from "@/lib/utils";
import { useCards } from "@/hooks/useCards";

export const Card = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  const { containerRef, canScrollLeft, canScrollRight, onMoveCard } =
    useCards();

  return (
    <div className="flex flex-col gap-28 last:mr-28 w-full">
      <div className="mt-[-50vh] h-[140vh]">
        <Subheading>{title}</Subheading>
      </div>

      <div className="flex flex-col gap-14 w-full">
        <div className="flex justify-between px-14 animate-[show_2.5s_linear]">
          <div className="bg-white rounded-full py-2 px-4 flex items-center gap-2">
            <Wallet size={24} />
            <span className="text-main-foreground font-semibold text-lg">
              Your Wallet
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
              <ChevronLeft />
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
              <ChevronRight color="black" />
            </motion.button>
          </div>
        </div>
        <div className="max-w-screen overflow-hidden">
          <motion.div
            className="flex gap-8 cursor-grab select-none mr-14 py-10 "
            ref={containerRef}
            style={{ transform: "translateX(0)" }}
            viewport={{ once: true }}
          >
            {Children.map(children, (child, index) => (
              <AnimatedCard key={index} index={index}>
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
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const { scrollY } = useScroll();
  const x = useTransform(
    scrollY,
    [2000, 2300],
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
