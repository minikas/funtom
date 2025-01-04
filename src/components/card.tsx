"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Wallet } from "lucide-react";

import { Title } from "./title";

export const Card = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [700, 1000], [0, 1]);
  const scale = useTransform(scrollY, [700, 1000], [0.8, 1]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMouseDown = false;
    let startX = 0;
    let currentX = 0;

    const getTranslateX = (element: HTMLElement): number => {
      const transformValue = getComputedStyle(element).transform;
      const matrix = transformValue.match(/^matrix\((.+)\)$/);
      if (!matrix) return 0;
      const matrixValues = matrix[1].split(", ");
      return parseFloat(matrixValues[4]) || 0;
    };

    const updateTransform = (x: number, withTransition = false) => {
      const maxScroll = -(container.scrollWidth - container.clientWidth);
      let boundedX = Math.min(0, Math.max(maxScroll, x));

      container.style.transform = `translateX(${boundedX}px)`;
      if (withTransition) {
        container.style.transition = "transform 0.3s ease-out";
      } else {
        container.style.transition = "none";
      }
    };

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isMouseDown = true;
      startX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
      currentX = getTranslateX(container);
      container.style.cursor = "grabbing";
    };

    const onMouseUp = () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      container.style.cursor = "grab";
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown) return;
      e.preventDefault();

      const pageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
      const deltaX = pageX - startX;
      const newX = currentX + deltaX;

      updateTransform(newX);
    };

    const onMouseLeave = () => {
      if (isMouseDown) {
        isMouseDown = false;
        container.style.cursor = "grab";
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("touchstart", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onMouseMove, { passive: false });
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("touchstart", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const onMoveCard = (type: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const currentX = getComputedStyle(container).transform;
    const matrix = currentX.match(/^matrix\((.+)\)$/);
    const translateX = matrix ? parseFloat(matrix[1].split(", ")[4]) : 0;

    const cardWidth = container.firstElementChild?.clientWidth || 0;
    const gap = 32;
    const scrollAmount = type === "left" ? cardWidth + gap : -(cardWidth + gap);

    const maxScroll = -(container.scrollWidth - container.clientWidth);
    const newX = Math.min(0, Math.max(maxScroll, translateX + scrollAmount));

    container.style.transform = `translateX(${newX}px)`;
    container.style.transition = "transform 0.3s ease-out";
  };

  return (
    <div className="flex flex-col gap-28 last:mr-28">
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
            <motion.button
              className="bg-white/50 rounded-full p-2 hover:bg-white transition-all duration-300"
              onClick={() => onMoveCard("left")}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft />
            </motion.button>
            <motion.button
              className="bg-main/50 rounded-full p-2 hover:bg-main transition-all duration-300"
              onClick={() => onMoveCard("right")}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight color="black" />
            </motion.button>
          </div>
        </div>
        <div
          className="flex gap-8 cursor-grab select-none"
          ref={containerRef}
          style={{ transform: "translateX(0)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
