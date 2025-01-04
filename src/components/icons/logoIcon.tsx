import { ComponentProps } from "react";
import { motion } from "framer-motion";

interface LogoIconProps extends ComponentProps<typeof motion.svg> {
  fill?: string;
  eyeFill?: string;
}

export const LogoIcon = ({
  fill = "#B4A6F5",
  eyeFill = "#F5F2FF",
  ...props
}: LogoIconProps) => {
  return (
    <motion.svg
      viewBox="0 0 105 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover="hover"
      {...props}
    >
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.1138 66.613C36.1715 75.719 26.2139 87.243 12.9641 87.243C6.70049 87.243 0.67769 84.665 0.67749 73.464C0.67699 44.9369 39.6235 0.777028 75.76 0.776428C96.317 0.776028 104.509 15.0389 104.509 31.2361C104.509 52.0264 91.018 75.799 77.608 75.799C73.352 75.799 71.264 73.462 71.264 69.756C71.264 68.789 71.424 67.741 71.746 66.613C67.168 74.429 58.335 81.683 50.0638 81.683C44.0411 81.683 40.9898 77.895 40.9897 72.576C40.9897 70.642 41.3912 68.628 42.1138 66.613Z"
        fill={fill}
        initial={{ translateX: 0 }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.g>
        <motion.path
          d="M68.936 22.7103C65.665 22.7161 63.435 25.4952 63.442 29.4598C63.449 33.4244 65.689 36.275 68.96 36.2693C72.152 36.2636 74.381 33.4052 74.374 29.4405C74.367 25.4759 72.128 22.7047 68.936 22.7103Z"
          fill={eyeFill}
          initial={{ translateX: 0 }}
          variants={{
            hover: {
              translateX: -8,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
          }}
        />
        <motion.path
          d="M86.287 22.6914C83.016 22.6972 80.786 25.4763 80.793 29.4409C80.8 33.4055 83.039 36.2561 86.311 36.2504C89.503 36.2448 91.732 33.3863 91.725 29.4216C91.718 25.457 89.479 22.6858 86.287 22.6914Z"
          fill={eyeFill}
          initial={{ translateX: 0 }}
          variants={{
            hover: {
              translateX: -8,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
          }}
        />
      </motion.g>
    </motion.svg>
  );
};
