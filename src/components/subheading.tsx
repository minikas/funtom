import { motion, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren } from "react";

import { Title } from "./title";

export const Subheading = ({
  children,
  scrollStart,
  scrollEnd,
}: PropsWithChildren<{
  scrollStart: number;
  scrollEnd: number;
}>) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [scrollStart, scrollEnd], [0, 1]);
  const scale = useTransform(scrollY, [scrollStart, scrollEnd], [0.8, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="sticky top-1/2 -translate-y-1/2 flex items-center gap-14 flex-col"
    >
      <div className="text-center text-main-foreground flex flex-col items-center gap-4">
        <Title small original>
          {children}
        </Title>
      </div>
    </motion.div>
  );
};
