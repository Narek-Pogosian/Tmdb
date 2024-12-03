import { useShowDescriptiveGrid } from "@/hooks/use-show-descriptive-grid";
import { Toggle } from "@/components/ui/toggle";
import { LayoutGrid } from "lucide-react";
import SortSelect from "./sort-select";
import Filters from "./filters";
import ScrollTopButton from "./scroll-top-button";

type DiscoverLayoutProps = {
  children: React.ReactNode;
};

export default function DiscoverLayout({ children }: DiscoverLayoutProps) {
  return (
    <div className="flex flex-col gap-8 xl:flex-row">
      <div className="w-full xl:w-fit h-fit">
        <Filters />
      </div>
      <div className="w-full relative">
        <div className="flex gap-2 mb-4">
          <SortSelect />
          <DescriptiveGridToggle />
        </div>
        {children}
        <ScrollTopButton />
      </div>
    </div>
  );
}

function DescriptiveGridToggle() {
  const { toggleDescriptiveGrid, showDescriptiveGrid } =
    useShowDescriptiveGrid();

  return (
    <Toggle
      aria-label="Toggle grid"
      variant="outline"
      pressed={!showDescriptiveGrid}
      onPressedChange={toggleDescriptiveGrid}
    >
      <LayoutGrid className="size-5" strokeWidth={1.25} />
    </Toggle>
  );
}
