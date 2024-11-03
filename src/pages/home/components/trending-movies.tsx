import { TimeWindow } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/lib/api";

import MovieCard from "@/components/cards/movie-card";
import RowList from "@/components/row-list";

export default function TrendingMovies() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("day");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["trending-movies" + timeWindow],
    queryFn: () => api.getTrendingMovies(timeWindow),
    refetchOnWindowFocus: true,
  });

  return (
    <section aria-labelledby="trending">
      <div className="flex gap-4 items-center">
        <h2 id="trending">Trending</h2>
        <TrendingToggle timeWindow={timeWindow} setTimeWindow={setTimeWindow} />
      </div>
      <RowList
        key={timeWindow}
        items={data?.results}
        isLoading={isLoading}
        isError={isError}
        render={(movie) => <MovieCard movie={movie} />}
      />
    </section>
  );
}

type TrendingToggleProps = {
  timeWindow: TimeWindow;
  setTimeWindow: (timeWindow: TimeWindow) => void;
};

const TrendingToggle = ({ timeWindow, setTimeWindow }: TrendingToggleProps) => {
  return (
    <div className="relative inline-block py-[2px] mb-2 rounded-full bg-transparent">
      <div
        className={
          "absolute top-0 h-full rounded-full primary-gradient transition-transform left-0 duration-300 " +
          `${
            timeWindow === "week"
              ? "translate-x-[81.5px] w-[101.5px]"
              : "w-[81.5px]"
          }`
        }
      ></div>
      <button
        onClick={() => setTimeWindow("day")}
        className={
          "px-5 relative z-99 transition-colors text-sm font-semibold duration-300 dark:text-white " +
          `${timeWindow === "day" ? "text-white" : ""}`
        }
      >
        Today
      </button>
      <button
        onClick={() => setTimeWindow("week")}
        className={
          "px-5 relative z-99 transition-colors text-sm font-semibold duration-300 dark:text-white " +
          `${timeWindow === "week" ? "text-white" : ""}`
        }
      >
        This Week
      </button>
    </div>
  );
};
