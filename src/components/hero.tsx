"use client";

import Link from "next/link";
import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { Chrome } from "./icons/chrome";
import { LogoIcon } from "./icons/logoIcon";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        scrub: 1,
      },
      opacity: 0,
      scale: 0.8,
    });
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <div
        ref={heroRef}
        className="sticky top-0 flex items-center gap-14 flex-col px-10 py-16"
      >
        <div className="text-center text-main-foreground flex flex-col items-center gap-4">
          <p className="text-xl font-semibold opacity-75 animate-[show_1.5s_linear]">
            The crypto wallet that&apos;ll take you places
          </p>
          <Title>Your * trusted companion</Title>
        </div>
        <Extensions />
      </div>
      <Video />
    </section>
  );
};

const Video = () => {
  return (
    <div className="relative flex animate-[show_1.5s_linear] max-w-3xl mx-auto -mt-56">
      <video autoPlay loop muted playsInline className="block w-[480px] h-full">
        <source
          src="https://cdn.sanity.io/files/3nm6d03a/production/86be57f4a08711b67a14aa345905ad9a84bf44da.webm#t=0.1"
          type="video/webm"
        />
        <source
          src="https://cdn.sanity.io/files/3nm6d03a/production/36085bc56da2e00839726f735620e994dc6a60c5.mp4#t=0.1"
          type='video/mp4; codecs="hvc1"'
        />
      </video>
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
    <p className="text-sm opacity-60 max-w-[200px] mx-auto font-semibold text-main-foreground">
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
