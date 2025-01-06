"use client";

import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";

import { Logo } from "./icons/logo";

import { Button } from "@/components/ui/button";

export const Header = () => {
  const [state, setState] = useState(false);
  return (
    <header className="flex items-center justify-between px-10 py-5 animate-[show_2.5s_linear]">
      <div className="flex items-center gap-28">
        <Link href="/" className="w-40">
          <Logo fill="#3c315b" />
        </Link>
        <ul className="flex items-center gap-20 font-medium text-sm max-xl:hidden">
          <li>
            <Link href="/">Security</Link>
          </li>
          <li>
            <Link href="/">Learn</Link>
          </li>
          <li>
            <Link href="/">Explore</Link>
          </li>
          <li>
            <Link href="/">Support</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="main"
          size="xl"
          rounded
          className="font-semibold relative z-30"
        >
          Download
        </Button>
        <div className="relative xl:hidden">
          <button
            onClick={() => setState(!state)}
            className="relative z-40 h-12 w-12 rounded-full bg-white flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={state ? "close" : "menu"}
                initial={{ scale: 0.2 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.2 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                {state ? <X size={25} /> : <AlignJustify size={25} />}
              </motion.div>
            </AnimatePresence>
          </button>
          <AnimatePresence>
            {state && (
              <>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{
                    type: "spring",
                    duration: 0.3,
                    bounce: 0,
                    height: {
                      duration: 0.4,
                      ease: [0.32, 0.72, 0, 1],
                    },
                    opacity: {
                      duration: 0.25,
                    },
                  }}
                  className="bg-white rounded-3xl absolute top-14 right-0 z-50 min-w-[200px] origin-top overflow-hidden"
                >
                  <ul className="flex flex-col gap-7">
                    {data.map((e, i) => {
                      const IconComponent = Icons[
                        e.icon as keyof typeof Icons
                      ] as Icons.LucideIcon;
                      return (
                        <li
                          key={i}
                          className="text-[17px] font-medium px-6 first:pt-6 last:pb-6"
                        >
                          <Link href="/" className="flex items-center gap-2">
                            <IconComponent size={20} /> {e.title}
                          </Link>
                          {e.subItems && (
                            <ul className="flex flex-col gap-7 pt-5 opacity-90 ml-6">
                              {e.subItems.map((subItem, subIndex) => (
                                <li key={subIndex} className="text-[12px]">
                                  {subItem}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed top-0 left-0 h-screen w-screen bg-black/20 z-20"
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

const data = [
  {
    title: "Security",
    icon: "Shield",
  },
  {
    title: "Learn",
    icon: "Zap",
    subItems: ["Blog", "Crypto 101", "Guides", "Developers"],
  },
  {
    title: "Explore",
    icon: "Globe",
  },
  {
    title: "Support",
    icon: "MessageSquare",
  },
];
