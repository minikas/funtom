"use client";

import {
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useAnimate, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

type Source = {
  src: string;
  type: string;
};

export const GenericCard = ({
  children,
  color,
  sources,
  cardsScrollStart,
  cardsScrollEnd,
  index,
}: PropsWithChildren<{
  color: keyof typeof data;
  sources: Source[];
  cardsScrollStart: number;
  cardsScrollEnd: number;
  index: number;
}>) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scope, animate] = useAnimate();
  const animatedRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  const handleMouseEnter = async (e: MouseEvent) => {
    if (scope.current && scope.current.style.transform !== "none") return;

    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
      } catch (error) {
        console.debug("Video play interrupted:", error);
      }
    }

    const maxMove = 15;
    const currentMousePos = { x: e.clientX, y: e.clientY };

    // Calculate movement direction based on mouse velocity
    const moveX = currentMousePos.x - lastMousePosRef.current.x;
    const moveY = currentMousePos.y - lastMousePosRef.current.y;

    lastMousePosRef.current = currentMousePos;

    // Only animate if there's significant mouse movement
    if (Math.abs(moveX) < 2 && Math.abs(moveY) < 2) return;

    const magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
    const normalizedX = magnitude ? (moveX / magnitude) * maxMove : 0;
    const normalizedY = magnitude ? (moveY / magnitude) * maxMove : 0;

    await animate(scope.current, {
      x: normalizedX,
      y: normalizedY,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
        mass: 0.8,
        duration: 0.3,
      },
    });

    animate(scope.current, {
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
        mass: 0.8,
        duration: 0.3,
      },
    });
  };

  const handleMouseLeave = () => {
    animatedRef.current = false;

    if (videoRef.current) {
      videoRef.current.pause();
    }

    animate(scope.current, {
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 1,
      },
    });
  };

  const { scrollY } = useScroll();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window?.innerWidth ?? 0);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const x = useTransform(
    scrollY,
    [cardsScrollStart, cardsScrollEnd],
    [windowWidth / 3 + -index * 440, 0]
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
      <motion.div
        ref={scope}
        initial={{ x: 0, y: 0 }}
        className={cn(
          data[color],
          "flex flex-col gap-14 rounded-3xl min-w-[320px] lg:min-w-[380px] 2xl:min-w-[450px] h-full justify-between shadow-[0_8px_24px_-1px_rgba(0,0,0,0.1)]"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className="lg:text-3xl text-2xl font-medium p-10 z-10">{children}</p>
        <div className="2xl:max-h-96 max-h-64 w-full flex justify-center items-end">
          <video
            ref={videoRef}
            playsInline
            loop
            muted
            preload="metadata"
            className="w-full rounded-xl"
          >
            {sources.map((e, i) => (
              <source key={i} src={e.src} type={e.type} />
            ))}
          </video>
        </div>
      </motion.div>
    </motion.div>
  );
};

const data = {
  purple: "bg-[#ab9ff2]",
  dark: "bg-[#3c315b] text-white",
  orange: "bg-[#ffdadc]",
  yellow: "bg-[#ffffc4]",
  gray: "bg-[#EDE6E2]",
  "yellow-dark": "bg-[#FFD13F]",
  green: "bg-[#2EC08B]",
  blue: "bg-[#4A87F2]",
  white: "bg-white",
};
