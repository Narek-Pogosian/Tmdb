import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import SkeletonCard from "./cards/skeleton-card";

interface RowListProps<T> {
  render: (item: T) => React.ReactNode;
  items: T[] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  isPerson?: boolean;
  title?: string;
}

export default function RowList<T extends { id: number }>({
  render,
  items,
  isLoading,
  isError,
  title,
  isPerson,
}: RowListProps<T>) {
  if (isLoading) return Loading(title, isPerson);
  if (isError) return Error(title);
  if (!items?.length) return NoItems(title);

  return (
    <>
      {title && <h2>{title}</h2>}
      <SideScrollList key="list">
        {items.map((item) => (
          <li key={item.id} className="flex-shrink-0 w-48 max-md:snap-center">
            {render(item)}
          </li>
        ))}
      </SideScrollList>
    </>
  );
}

const Loading = (title?: string, isPerson?: boolean) => (
  <>
    {title && <Skeleton className="lg:h-8 h-7 mb-2 w-36" />}
    <SideScrollList key="loading">
      {Array.from({ length: 10 }, (_, i) => (
        <SkeletonCard
          key={i}
          className="flex-shrink-0 w-48"
          isPerson={isPerson}
        />
      ))}
    </SideScrollList>
  </>
);

const Error = (title?: string) => (
  <>
    {title && <h2>{title}</h2>}
    <ScrollListContainer>
      <p className="pt-10 font-semibold">Error</p>
    </ScrollListContainer>
  </>
);

const NoItems = (title?: string) => (
  <>
    {title && <h2>{title}</h2>}
    <ScrollListContainer>
      <p className="pt-10 font-semibold">Nothing to see here</p>
    </ScrollListContainer>
  </>
);

function ScrollListContainer({ children }: { children: React.ReactNode }) {
  return <div className="relative h-[352px] md:h-[368px]">{children}</div>;
}

function SideScrollList({ children }: { children: React.ReactNode }) {
  const [isAtEnd, setIsAtEnd] = useState(true);
  const [isAtStart, setIsAtStart] = useState(true);
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleScroll = ({ currentTarget }: React.UIEvent<HTMLUListElement>) => {
    const { scrollWidth, scrollLeft, clientWidth } = currentTarget;
    setIsAtEnd(scrollWidth - scrollLeft < clientWidth + 10);
    setIsAtStart(scrollLeft < 10);
  };

  useEffect(() => {
    if (listRef.current) {
      const { scrollWidth, clientWidth } = listRef.current;

      if (scrollWidth > clientWidth) {
        setIsAtEnd(false);
      }
    }
  }, []);

  const scroll = (direction: 1 | -1) =>
    listRef.current?.scrollBy({ left: direction * 230, behavior: "smooth" });

  return (
    <ScrollListContainer>
      <button
        className="bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-800 absolute -left-3 xl:-left-5 top-1/3 transform -translate-y-1/2 z-20 text-white size-9 inline-flex transition-opacity items-center justify-center rounded-full disabled:opacity-0"
        onClick={() => scroll(-1)}
        disabled={isAtStart}
      >
        <span className="sr-only">Left</span>
        <ArrowLeft className="size-5" />
      </button>
      <button
        className="bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-800 absolute -right-3 xl:-right-5 top-1/3 transform -translate-y-1/2 z-20 text-white size-9 inline-flex transition-opacity items-center justify-center rounded-full disabled:opacity-0"
        onClick={() => scroll(1)}
        disabled={isAtEnd}
      >
        <span className="sr-only">Right</span>
        <ArrowRight className="size-5" />
      </button>

      <ul
        className="gap-4 flex pb-2 pt-1 px-1 overflow-x-scroll scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-800 max-md:snap-x scrollbar"
        onScroll={handleScroll}
        ref={listRef}
      >
        {children}

        <div
          className={cn(
            "dark:md:w-28 opacity-100 transition-opacity duration-500 w-16 bg-gradient-to-r to-transparent from-neutral-100 dark:from-[#111113] h-[calc(100%-22px)] absolute top-0 -left-1 z-10 pointer-events-none",
            { "opacity-0": isAtStart }
          )}
        />
        <div
          className={cn(
            "dark:md:w-28 opacity-100 transition-opacity duration-500 w-16 bg-gradient-to-r from-transparent to-neutral-100 dark:to-[#111113] h-[calc(100%-22px)] absolute top-0 -right-1 z-10 pointer-events-none",
            { "opacity-0": isAtEnd }
          )}
        />
      </ul>
    </ScrollListContainer>
  );
}
