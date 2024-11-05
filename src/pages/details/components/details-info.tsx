import { Genre, MovieCrew, Video } from "@/types";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
// import TrailerModal from "./trailer-modal";

type Props = {
  poster: string;
  backdrop: string;
  title: string;
  vote: number;
  voteCount: number;
  release: string;
  genres: Genre[];
  overview: string;
  crew: MovieCrew[];
  trailer: Video | undefined;
};

export default function DetailsInfo(props: Props) {
  const voteText = `${props.vote.toFixed(1)} / ${props.voteCount} ${
    props.voteCount === 1 ? "Vote" : "Votes"
  }`;

  const feauturedCrew = props.crew
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-6 md:gap-10 lg:gap-20 md:flex-row pb-14">
      {props.poster ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${props.poster}`}
          alt={props.title}
          width={256}
          height={384}
          className="h-fit hidden md:block rounded"
        />
      ) : (
        <div className="md:grid w-[256px] h-[384px] hidden rounded bg-muted place-content-center">
          <img src="/no-image.svg" alt="" width={50} height={50} />
        </div>
      )}
      {props.backdrop ? (
        <img
          src={`https://image.tmdb.org/t/p/w1000_and_h450_multi_faces/${props.backdrop}`}
          width={1000}
          height={450}
          className="md:hidden rounded"
          alt=""
        />
      ) : (
        <div className="grid md:hidden rounded w-full aspect-[10/4.5] bg-muted place-content-center">
          <img src="/no-image.svg" alt="" width={50} height={50} />
        </div>
      )}

      <div>
        <h1>{props.title}</h1>
        <div className="flex gap-2 flex-wrap text-neutral-400 font-semibold text-sm mb-4">
          <span className="flex gap-1 items-center">
            <Star className="size-4 text-secondary-500 fill-current" />
            {voteText}
          </span>
          <span>•</span>
          <span>{new Date(props.release).toLocaleDateString()}</span>
          <span>•</span>
          <span>{props.genres.map((genre) => genre.name).join(", ")} </span>
        </div>

        <p className="max-w-3xl mb-2 text-sm leading-6 md:mb-4 text-balance">
          {props.overview}
        </p>

        <div className="mb-8">
          <h3 className="mb-2 font-semibold">Featured Crew</h3>
          <ul className="flex flex-wrap gap-6">
            {feauturedCrew.map((person, i) => (
              <li className="text-sm" key={i}>
                <Link
                  to={`/person/${person.id}`}
                  className="block hover:underline"
                >
                  {person.name}
                </Link>
                <span className="text-xs text-neutral-400">{person.job}</span>
              </li>
            ))}
          </ul>
        </div>

        {props.trailer && "TODO: Trailer modal"}
        {/* {trailer && <TrailerModal trailer={trailer} />} */}
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function DetailsInfoSkeletonShell() {
  return (
    <div className="flex flex-col gap-6 md:gap-10 lg:gap-20 md:flex-row pb-14">
      <Skeleton className="w-full aspect-[10/4.5] md:aspect-auto md:w-[256px] md:h-[384px] shrink-0" />

      <div className="w-full">
        <Skeleton className="h-9 mb-5 w-44" />
        <Skeleton className="h-5 mb-5 md:max-w-[50%]" />

        <Skeleton className="max-w-2xl h-52 md:h-20 mb-4 md:mb-5" />

        <Skeleton className="h-5 w-44 mb-3" />
        <div className="flex gap-4 mb-8">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>

        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
