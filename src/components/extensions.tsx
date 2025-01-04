import Link from "next/link";
import { motion, useSpring } from "framer-motion";

import { Button } from "./ui/button";
import { Chrome } from "./icons/chrome";

export const Extensions = () => {
  const x = useSpring(0, { stiffness: 300, damping: 15 });
  const y = useSpring(0, { stiffness: 300, damping: 15 });

  return (
    <div className="text-center flex flex-col items-center gap-3 animate-[show_1s_linear]">
      <motion.div
        style={{
          x,
          y,
          cursor: "pointer",
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const originCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };

          const deltaX = (e.clientX - originCenter.x) / 5;
          const deltaY = (e.clientY - originCenter.y) / 3;

          x.set(deltaX);
          y.set(deltaY);
        }}
        onMouseLeave={() => {
          // Reset position with spring animation
          x.set(0);
          y.set(0);
        }}
        data-animate="none"
      >
        <Button
          asChild
          size="3xl"
          rounded
          variant="white"
          className="[&_svg]:size-14 pl-3 pr-5"
        >
          <span className="flex gap-2 text-[16.5px] font-medium">
            <Chrome className="w-40 h-40" />
            Download for Chrome
          </span>
        </Button>
      </motion.div>
      <p className="text-sm opacity-60 max-w-[200px] mx-auto font-semibold text-main-foreground">
        Also available on other browsers devices.
        <Link className="block underline" href="/">
          Discover more
        </Link>
      </p>
    </div>
  );
};
