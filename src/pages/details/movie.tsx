import { api } from "@/lib/api";
import { removeDuplicates } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import RowList from "@/components/row-list";
import PersonCard from "@/components/cards/person-card";
import ErrorPage from "./components/error-page";

import DetailsInfo, {
  DetailsInfoSkeletonShell,
} from "./components/details-info";

function MovieDetails() {
  const { id } = useParams();

  const {
    data: movie,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => api.getMovieDetails(id),
    select: (data) => ({
      ...data,
      videos: data.videos.results.filter((video) => video.type === "Trailer"),
      credits: {
        ...data.credits,
        cast: removeDuplicates(data.credits.cast).sort(
          (a, b) => b.popularity - a.popularity
        ),
      },
    }),
  });

  if (error) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return (
      <>
        <DetailsInfoSkeletonShell />
        <section>
          <h2>Cast</h2>
          <RowList isLoading items={[]} isPerson render={() => <></>} />
        </section>
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <DetailsInfo
          crew={movie.credits.crew}
          genres={movie.genres}
          poster={movie.poster_path}
          backdrop={movie.backdrop_path}
          overview={movie.overview}
          release={movie.release_date}
          title={movie.title}
          trailer={movie.videos[0]}
          vote={movie.vote_average}
          voteCount={movie.vote_count}
        />
        <section aria-describedby="cast">
          <h2 id="cast">Cast</h2>
          <RowList
            items={movie?.credits.cast}
            isPerson
            render={(person) => (
              <PersonCard
                id={person.id}
                image={person.profile_path}
                name={person.name}
                character={person.character}
              />
            )}
          />
        </section>
      </>
    );
  }
}

export default MovieDetails;
