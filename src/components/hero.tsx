"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { Title } from "./title";
import { Extensions } from "./extensions";

export const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);

  return (
    <section className="flex flex-col gap-5">
      <motion.div
        style={{ opacity, scale }}
        className="sticky top-0 flex items-center gap-14 flex-col px-10 py-16"
      >
        <div className="text-center text-main-foreground flex flex-col items-center gap-4">
          <p className="text-xl font-semibold opacity-75 animate-[show_1.5s_linear]">
            The crypto wallet that&apos;ll take you places
          </p>
          <Title>Your * trusted | companion</Title>
        </div>
        <Extensions />
      </motion.div>
      <Video />
    </section>
  );
};

const Video = () => {
  return (
    <div className="relative flex animate-[show_1.5s_linear] max-w-3xl mx-auto -mt-56 z-50">
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
