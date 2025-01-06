"use client";

import { useEffect, useRef, useState } from "react";

export const useCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const container = containerRef.current;
    if (!container) return;

    const currentX = getComputedStyle(container).transform;
    const matrix = currentX.match(/^matrix\((.+)\)$/);
    const translateX = matrix ? parseFloat(matrix[1].split(", ")[4]) : 0;

    const maxScroll = -(container.scrollWidth - container.clientWidth);

    setCanScrollLeft(translateX < -1);
    setCanScrollRight(translateX > maxScroll);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial check
    requestAnimationFrame(checkScrollability);

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

      requestAnimationFrame(checkScrollability);
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
      container.removeEventListener("touchstart", onMouseDown);
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

    requestAnimationFrame(checkScrollability);

    container.addEventListener(
      "transitionend",
      () => requestAnimationFrame(checkScrollability),
      { once: true }
    );
  };
  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    onMoveCard,
  };
};
