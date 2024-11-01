import MovieCard from "@/components/cards/movie-card";
import RowList from "@/components/row-list";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.getTrendingMovies("week"),
  });

  return (
    <div>
      <RowList
        title="Trending Movies"
        items={data?.results}
        isLoading={isLoading}
        isError={isError}
        render={(movie) => <MovieCard movie={movie} />}
      />
    </div>
  );
}

export default HomePage;
