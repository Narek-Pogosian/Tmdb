import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";

type Props = { biography: string };

const Biography = ({ biography }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [truncated, setTruncated] = useState(true);

  return (
    <p
      className={`text-sm leading-6 relative max-w-2xl ${
        truncated ? "line-clamp-5" : ""
      }`}
    >
      {biography}

      {truncated &&
        (isDesktop ? biography.length > 550 : biography.length > 200) && (
          <button
            className="absolute text-primary-600 font-semibold dark:text-primary-400 bottom-0 right-0 pl-28 bg-gradient-to-r from-transparent via-neutral-100 to-neutral-100 dark:via-[#111113] dark:to-[#111113] text-secondary hover:underline"
            onClick={() => setTruncated(false)}
          >
            Read more
          </button>
        )}
    </p>
  );
};

export default Biography;
