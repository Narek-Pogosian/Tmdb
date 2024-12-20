import { EmptyMessage, EndMessage, ErrorMessage } from "./components/messages";
import { useShowDescriptiveGrid } from "@/hooks/use-show-descriptive-grid";
import { useGetInfiniteQuery } from "@/hooks/use-get-infinite";
import { List, SkeletonList } from "./components/lists";
import { api } from "@/lib/api";

import DescriptiveCard from "@/components/cards/descriptive-card";
import DiscoverLayout from "./components/discover-layout";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./components/loader";
import TvCard from "@/components/cards/tv-card";

function TvShows() {
  return (
    <DiscoverLayout>
      <TvContent />
    </DiscoverLayout>
  );
}

export default TvShows;

function TvContent() {
  const { showDescriptiveGrid } = useShowDescriptiveGrid();
  const { result, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetInfiniteQuery({
      queryKey: "tvShows",
      queryFn: api.getTvShows,
    });

  if (isLoading) {
    return <SkeletonList />;
  }

  if (result.length === 0) {
    return <EmptyMessage mediaType="tv" />;
  }

  return (
    <InfiniteScroll
      next={fetchNextPage}
      dataLength={result.length}
      hasMore={hasNextPage}
      loader={!isError && <Loader />}
      endMessage={result.length > 20 && <EndMessage />}
    >
      <List
        items={result}
        render={(tv) =>
          showDescriptiveGrid ? (
            <DescriptiveCard
              image={tv.poster_path}
              overview={tv.overview}
              title={tv.name}
              vote={tv.vote_average}
              voteCount={tv.vote_count}
              href={`/tv/${tv.id}`}
              backdrop={tv.backdrop_path}
            />
          ) : (
            <TvCard tvShow={tv} />
          )
        }
      />
      <ErrorMessage isError={isError} />
    </InfiniteScroll>
  );
}
