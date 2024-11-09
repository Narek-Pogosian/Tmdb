import { useShowDescriptiveGrid } from "@/hooks/use-show-descriptive-grid";
import { Toggle } from "@/components/ui/toggle";
import { Grid } from "lucide-react";
import SortSelect from "./sort-select";

type DiscoverLayoutProps = {
  children: React.ReactNode;
};

function DiscoverLayout({ children }: DiscoverLayoutProps) {
  const { toggleDescriptiveGrid, showDescriptiveGrid } =
    useShowDescriptiveGrid();

  return (
    <div className="flex flex-col gap-8 xl:flex-row">
      <div className="w-full xl:w-fit xl:sticky top-[92px] h-fit">Filters</div>
      <div className="w-full">
        <div className="flex gap-4 mb-4">
          <SortSelect />
          <Toggle
            aria-label="Toggle grid"
            variant="outline"
            pressed={!showDescriptiveGrid}
            onPressedChange={toggleDescriptiveGrid}
          >
            <Grid />
          </Toggle>
        </div>
        {children}
      </div>
    </div>
  );
}

export default DiscoverLayout;
