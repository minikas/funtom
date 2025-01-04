"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren } from "react";

import { Title } from "./title";
import { ChevronLeft, ChevronRight, Wallet } from "lucide-react";

export const Card = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [700, 1000], [0, 1]);
  const scale = useTransform(scrollY, [700, 1000], [0.8, 1]);

  return (
    <div className="flex flex-col gap-28">
      <div className="mt-[-50vh] h-[140vh]">
        <motion.div
          style={{ opacity, scale }}
          className="sticky top-1/2 -translate-y-1/2 flex items-center gap-14 flex-col"
        >
          <div className="text-center text-main-foreground flex flex-col items-center gap-4">
            <Title small original>
              {title}
            </Title>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-14 w-full">
        <div className="flex justify-between px-14">
          <div className="bg-white rounded-full py-2 px-4 flex items-center gap-2">
            <Wallet size={24} />
            <span className="text-main-foreground font-semibold text-lg">
              Your Wallet
            </span>
          </div>
          <div className="bg-white rounded-full p-1 flex items-center gap-1">
            <button className="bg-white/50 rounded-full p-2 hover:bg-white transition-all duration-300">
              <ChevronLeft />
            </button>
            <button className="bg-main/50 rounded-full p-2 hover:bg-main transition-all duration-300">
              <ChevronRight color="black" />
            </button>
          </div>
        </div>
        <div className="flex gap-8 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
