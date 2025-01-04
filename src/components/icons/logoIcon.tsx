import { ComponentProps } from "react";

interface LogoIconProps extends ComponentProps<"svg"> {
  fill?: string;
  eyeFill?: string;
}

export const LogoIcon = ({
  fill = "#B4A6F5",
  eyeFill = "#F5F2FF",
  ...props
}: LogoIconProps) => {
  return (
    <svg viewBox="0 0 33 29" xmlns="http://www.w3.org/2000/svg" {...props}>
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
      <circle
        cx="2.5"
        cy="2.5"
        r="2.5"
        transform="matrix(1 0 0 -1 2 21.0059)"
        fill={eyeFill}
      />
      <circle cx="11.5" cy="17.5059" r="2.5" fill={eyeFill} />
    </svg>
  );
};
