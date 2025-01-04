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
  const isInView = useInView(ref, { amount: 0.2 });

  useEffect(() => {
    if (isInView) document.body.style.backgroundColor = "hsl(var(--main))";
    else document.body.style.backgroundColor = "";
  }, [isInView]);

  return (
    <motion.footer
      ref={ref}
      className="flex items-center gap-14 flex-col px-10 py-16"
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
  <div className="flex gap-2 bg-white rounded-3xl w-full p-14">
    <div className="flex-1 flex flex-col justify-between">
      <LogoIcon className="w-16 h-16" />
      <p className="text-sm font-medium opacity-50">© Funtom 2024.</p>
    </div>
    <div className="flex flex-col gap-12 flex-[2]">
      <div className="flex flex-col gap-4 bg-foreground/5 rounded-xl p-8">
        <input
          placeholder="Enter your email"
          className="text-6xl font-medium text-secondary bg-transparent w-full outline-none text-black placeholder:text-black/50"
        />
        <div className="flex gap-20 items-center">
          <p className="text-md font-medium">
            Sign up for our newsletter and join the growing tom community.
          </p>
          <Button rounded size="xl" variant="mainForeground">
            Sign up
          </Button>
        </div>
      </div>
      <div className="flex gap-24">
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
    <span className="font-semibold opacity-50">{children}</span>
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
      <span className="font-semibold opacity-50">{children}</span>
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
