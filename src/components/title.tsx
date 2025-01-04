import { PropsWithChildren, useMemo } from "react";
import { motion } from "framer-motion";

import { LogoIcon } from "./icons/logoIcon";

import { cn } from "@/lib/utils";

export const Title = ({
  children,
  small,
}: PropsWithChildren<{ small?: boolean }>) => {
  const words = useMemo(() => children?.toString().split(" "), [children]);

  return (
    <span className={cn("text-9xl font-semibold", small && "text-7xl")}>
      {words?.map((word, index) => {
        if (word === "*")
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 20 }}
              transition={{
                opacity: { duration: 0.3 },
                y: { delay: 0.1, duration: 1, type: "spring" },
              }}
              className="inline-block mr-5"
            >
              <LogoIcon
                fill={small ? "white" : "hsl(var(--main))"}
                eyeFill={small ? "hsl(var(--main))" : "#F5F2FF"}
                className="h-[130px] w-[130px]"
              />
            </motion.div>
          );

        if (word === "|") return <br key={index} />;
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: "50%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { delay: 0.4 + index * 0.05, duration: 0.1 },
              y: {
                delay: 0.4 + index * 0.05,
                duration: 0.2,
                type: "spring",
                stiffness: 100,
              },
            }}
            className="mr-4 inline-block"
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
};
