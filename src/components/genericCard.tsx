"use client";

import { PropsWithChildren, useRef } from "react";
import { motion, useAnimate } from "framer-motion";

import { cn } from "@/lib/utils";

type Source = {
  src: string;
  type: string;
};

export const GenericCard = ({
  children,
  color,
  sources,
}: PropsWithChildren<{
  color: keyof typeof data;
  sources: Source[];
}>) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scope, animate] = useAnimate();
  const animatedRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  const handleMouseEnter = async (e: React.MouseEvent) => {
    // Allow new animations more frequently by removing the animation lock
    // Only block if animation is currently in progress
    if (scope.current && scope.current.style.transform !== "none") return;

    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
      } catch (error) {
        // Handle any play() interruption errors silently
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

    // Normalize the movement vector and multiply by maxMove
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

  return (
    <motion.div
      ref={scope}
      initial={{ x: 0, y: 0 }}
      className={cn(
        data[color],
        "flex flex-col gap-14 rounded-3xl min-w-[450px] h-full justify-between shadow-[0_8px_24px_-1px_rgba(0,0,0,0.1)]"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className="text-3xl font-medium p-10">{children}</p>
      <div className="max-h-96 w-full flex justify-center items-end">
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
