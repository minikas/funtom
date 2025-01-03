"use client";

import Link from "next/link";
import { PropsWithChildren, useMemo } from "react";
import { motion } from "framer-motion";

import { Chrome } from "./icons/chrome";
import { LogoIcon } from "./icons/logoIcon";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="flex items-center gap-14 flex-col px-10 py-16">
      <div className="text-center text-main-foreground flex flex-col items-center gap-4">
        <p className="text-xl font-semibold opacity-75 animate-[show_1.5s_linear]">
          The crypto wallet that&apos;ll take you places
        </p>
        <Title>Your * trusted companion</Title>
      </div>
      <Extensions />
    </div>
  );
};

const Extensions = () => (
  <div className="text-center flex flex-col items-center gap-3 animate-[show_1.5s_linear]">
    <Button
      asChild
      size="3xl"
      rounded
      variant="white"
      className="[&_svg]:size-14 pl-3 pr-5"
    >
      <span className="flex gap-2 text-lg">
        <Chrome className=" w-40 h-40" />
        Download for Chrome
      </span>
    </Button>
    <p className="text-xs opacity-60 max-w-[200px] mx-auto font-semibold text-main-foreground">
      Also available on other browsers devices.
      <Link className="block" href="/">
        Discover more
      </Link>
    </p>
  </div>
);

const Title = ({ children }: PropsWithChildren) => {
  const words = useMemo(() => children?.toString().split(" "), [children]);

  return (
    <span className="text-9xl font-semibold">
      {words?.map((word, index) => {
        if (word === "*")
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 20 }}
              transition={{
                opacity: { duration: 0.3 },
                y: { delay: 0.1, duration: 1, type: "spring" },
              }}
              className="inline-block mr-5"
            >
              <LogoIcon className="h-[130px] w-[130px]" />
            </motion.div>
          );

        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: "50%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { delay: 0.4 + index * 0.05, duration: 0.1 },
              y: {
                delay: 0.4 + index * 0.05,
                duration: 0.2,
                type: "spring",
                stiffness: 100,
              },
            }}
            className="mr-4 inline-block"
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
};
