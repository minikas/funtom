"use client";

import { useRef, useEffect, PropsWithChildren } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

import { Extensions } from "./extensions";
import { Title } from "./title";
import { LogoIcon } from "./icons/logoIcon";
import { Button } from "./ui/button";

import * as Icons from "@/components/icons";
export const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) document.body.style.backgroundColor = "hsl(var(--main))";
    else document.body.style.backgroundColor = "hsl(var(--background))";
  }, [isInView]);

  return (
    <motion.footer
      ref={ref}
      className="flex lg:flex-col items-center gap-14 flex-col lg:px-10 px-0 py-16"
    >
      <div className="text-center text-main-foreground flex flex-col items-center gap-4">
        <p className="text-xl font-semibold opacity-75 animate-[show_1.5s_linear]">
          Trusted by more than 7 million people
        </p>
        <Title small>Download * Funtom | to get started</Title>
      </div>
      <Extensions />
      <BottomLinks />
    </motion.footer>
  );
};

const BottomLinks = () => (
  <div className="flex max-xl:flex-col-reverse gap-2 bg-white rounded-3xl w-full lg:p-14 p-5">
    <div className="flex-1 flex xl:flex-col xl:items-start items-center justify-between">
      <LogoIcon className="w-16 h-16" />
      <p className="text-sm font-medium opacity-50">© Funtom 2024.</p>
    </div>
    <div className="flex flex-col gap-12 flex-[2] flex-wrap">
      <div className="flex flex-col gap-4 bg-foreground/5 rounded-xl p-8">
        <input
          placeholder="Enter your email"
          className="max-xl:text-4xl text-6xl font-medium bg-transparent w-full outline-none text-black placeholder:text-black/50"
        />
        <div className="flex lg:gap-20 gap-2 items-center justify-between">
          <p className="lg:text-md text-sm font-medium">
            Sign up for our newsletter and join the growing tom community.
          </p>
          <Button rounded size="xl" variant="mainForeground">
            Sign up
          </Button>
        </div>
      </div>
      <div className="flex gap-24 flex-wrap justify-between">
        <List items={["Download", "Security", "Support", "Feature Requests"]}>
          Company
        </List>
        <List items={["Explore", "Learn", "Blog", "Docs", "Taxes"]}>
          Resources
        </List>
        <List
          items={[
            "About",
            "Terms",
            "Privacy",
            "Status",
            "Careers",
            "Press Kit",
          ]}
        >
          Company
        </List>
        <SocialList
          items={[
            "Twitter",
            "LinkedIn",
            "Instagram",
            "Youtube",
            "Reddit",
            "Podcast",
          ]}
        >
          Socials
        </SocialList>
      </div>
    </div>
  </div>
);

const List = ({ items, children }: PropsWithChildren<{ items: string[] }>) => (
  <div className="flex flex-col gap-4">
    <span className="font-medium opacity-50 text-sm">{children}</span>
    <ul className="flex flex-col gap-4">
      {items.map((e, i) => (
        <li key={i} className="text-[14px] font-medium">
          <Link href="/">{e}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialList = ({
  items,
  children,
}: PropsWithChildren<{ items: string[] }>) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-medium opacity-50 text-sm">{children}</span>
      <ul className="flex flex-col gap-4">
        {items.map((e, i) => {
          const IconCompnent = Icons[e as keyof typeof Icons];
          return (
            <li key={i} className="text-[14px] font-medium">
              <Link href="/" className="flex items-center gap-2">
                <IconCompnent className="w-3.5 h-3.5" />
                {e}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
