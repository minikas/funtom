import { ComponentProps, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

interface LogoIconProps extends ComponentProps<"svg"> {
  fill?: string;
  eyeFill?: string;
}

export const LogoIcon = ({
  fill = "#B4A6F5",
  eyeFill = "#F5F2FF",
  ...props
}: LogoIconProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const eyeAnimation = async () => {
      await animate([
        [".eye-circle", { scale: 0 }, { duration: 0.3 }],
        [".eye-heart", { scale: 1 }, { duration: 0.3 }],
      ]);

      await animate([
        [".eye-heart", { x: -0.4 }, { duration: 0.2 }],
        [".eye-heart", { x: 0.4 }, { duration: 0.2 }],
        [".eye-heart", { x: -0.4 }, { duration: 0.2 }],
        [".eye-heart", { x: 0.4 }, { duration: 0.2 }],
        [".eye-heart", { x: 0 }, { duration: 0.2 }],
      ]);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await animate([
        [".eye-heart", { scale: 0 }, { duration: 0.3 }],
        [".eye-circle", { scale: 1 }, { duration: 0.3 }],
      ]);
    };

    const bodyAnimation = async () => {
      await animate(
        scope.current,
        { rotate: 4 },
        { delay: 0.5, duration: 0.2 }
      );
      await animate(scope.current, { rotate: -3 }, { duration: 0.3 });
      await animate(scope.current, { rotate: 2 }, { duration: 0.2 });
      await animate(scope.current, { rotate: 0 }, { duration: 0.3 });
    };

    animate(".eye-heart", { scale: 0 });

    const eyeInterval = setInterval(eyeAnimation, 3000);
    const wobbleInterval = setInterval(bodyAnimation, 3000);

    return () => {
      clearInterval(eyeInterval);
      clearInterval(wobbleInterval);
    };
  }, [animate, scope]);

  return (
    <svg
      ref={scope}
      viewBox="0 0 33 29"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27 18.5058C27 24.3048 20.9558 29.0058 13.5 29.0058C6.04416 29.0058 0 24.3048 0 18.5058C0 12.7068 6.04416 8.00582 13.5 8.00582C20.9558 8.00582 27 12.7068 27 18.5058Z"
        fill={fill}
      />
      <path
        d="M4.92101 19.5717C7.0874 21.2138 11.9994 18.3815 15.8923 13.2457C19.7851 8.10989 21.1847 2.61531 19.0183 0.973222C16.8519 -0.668866 11.9399 2.16336 8.04706 7.29918C4.1542 12.435 2.75462 17.9296 4.92101 19.5717Z"
        fill={fill}
      />
      <path
        d="M16.921 25.5717C19.0874 27.2138 23.9994 24.3815 27.8923 19.2457C31.7851 14.1099 33.1847 8.61531 31.0183 6.97322C28.8519 5.33113 23.9399 8.16336 20.0471 13.2992C16.1542 18.435 14.7546 23.9296 16.921 25.5717Z"
        fill={fill}
      />

      <motion.circle
        className="eye-circle"
        cx="4.5"
        cy="18.5059"
        r="2.5"
        fill={eyeFill}
      />
      <motion.circle
        className="eye-circle"
        cx="11.5"
        cy="17.5059"
        r="2.5"
        fill={eyeFill}
      />

      <motion.path
        className="eye-heart"
        d="M2 18.5059C2 16.5059 4.5 16.0059 4.5 18.0059C4.5 16.0059 7 16.5059 7 18.5059C7 20.5059 4.5 22.0059 4.5 22.0059C4.5 22.0059 2 20.5059 2 18.5059Z"
        fill={eyeFill}
      />
      <motion.path
        className="eye-heart"
        d="M9 17.5059C9 15.5059 11.5 15.0059 11.5 17.0059C11.5 15.0059 14 15.5059 14 17.5059C14 19.5059 11.5 21.0059 11.5 21.0059C11.5 21.0059 9 19.5059 9 17.5059Z"
        fill={eyeFill}
      />
    </svg>
  );
};
