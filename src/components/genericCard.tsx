"use client";

import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export const GenericCard = ({
  children,
  color,
}: PropsWithChildren<{
  color: "purple" | "dark" | "orange" | "yellow" | "gray";
}>) => {
  const data = {
    purple: {
      className: "bg-[#ab9ff2]",
      sources: [
        {
          src: "https://cdn.sanity.io/files/3nm6d03a/production/326e94141dfe4241a8f8ac6ece1f6d1e19f66d33.mp4#t=0.1",
          type: "video/mp4; codecs='hvc1'",
        },
        {
          src: "https://cdn.sanity.io/files/3nm6d03a/production/1899070b6094700924d635fff944add871716d35.webm#t=0.1",
          type: "video/webm",
        },
      ],
    },
    dark: {
      className: "bg-[#3c315b] text-white",
      sources: [
        {
          src: "https://cdn.sanity.io/files/3nm6d03a/production/40b685574f04ca5f5ed3710c27b21a6bce89ae2b.mp4#t=0.1",
          type: "video/mp4; codecs='hvc1'",
        },
        {
          src: "https://cdn.sanity.io/files/3nm6d03a/production/3732552b82b3787b8d64921d3ea29a780ebe28ba.webm#t=0.1",
          type: "video/webm",
        },
      ],
    },
    orange: {
      className: "bg-[#ffdadc]",
      sources: [
        {
          src: "https://cdn.sanity.io/files/3nm6d03a/production/00ab4bb6e7bf6182f95839b5bf416a8a4c6e7819.mp4#t=0.1",
          type: "video/mp4; codecs='hvc1'",
        },
        {
          src: "https://cdn.sanity.io/files/3nm6d03a/production/284feb2572b3aaca8545e290aa5634797afe1965.webm#t=0.1",
          type: "video/webm",
        },
      ],
    },
    yellow: {
      className: "bg-[#ffffc4]",
      sources: [
        {
          src: "https://cdn.sanity.io/files/3nm6d03a/production/141534abd58f8ec33efa988ac4eeb1b603316c52.mp4#t=0.1",
          type: "video/mp4; codecs='hvc1'",
        },
        {
          src: "https://cdn.sanity.io/files/3nm6d03a/production/cc6ffeec0a634ec9a5e5d5173352969acdf34f44.webm#t=0.1",
          type: "video/webm",
        },
      ],
    },
    gray: {
      className: "bg-[#EDE6E2]",
      sources: [
        {
          src: "https://cdn.sanity.io/files/3nm6d03a/production/70b6b4b4ba889027ed30fe8f7b384cfcc6d0a994.mp4#t=0.1",
          type: "video/mp4; codecs='hvc1'",
        },
        {
          src: "https://cdn.sanity.io/files/3nm6d03a/production/44d6053a16210a136f874d87e13f6cb6d2323d48.webm#t=0.1",
          type: "video/webm",
        },
      ],
    },
  };

  return (
    <div
      className={cn(
        data[color].className,
        "flex flex-col gap-14 rounded-2xl min-w-[370px] first:ml-14 justify-between"
      )}
    >
      <p className="text-2xl font-semibold p-10">{children}</p>
      <div className="max-h-72 w-full flex justify-center items-end">
        <video
          playsInline
          loop
          preload="metadata"
          className="w-full rounded-xl"
        >
          {data[color].sources.map((e, i) => (
            <source key={i} src={e.src} type={e.type} />
          ))}
        </video>
      </div>
    </div>
  );
};
