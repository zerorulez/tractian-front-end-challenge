import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useStore from "../hooks/useStore";
import Tree from "./Tree";
import AssetDetails from "./AssetDetails";
import FilterButtons from "./FilterButtons";
import SearchInput from "./ui/SearchInput";

const FILTER_DELAY_MS = 500;

function Main() {
  const [textFilter, setTextFilter] = useState("");

  const selectedCompany = useStore((state) => state.selectedCompany);
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);

  const debouncedSetFilter = useDebouncedCallback(
    (value: string) => setFilter(value),
    FILTER_DELAY_MS
  );

  useEffect(() => {
    debouncedSetFilter(textFilter);
  }, [textFilter, debouncedSetFilter]);

  // hook to reset input value when filter is changed
  useEffect(() => {
    if (filter === "alert" || filter === "energy") {
      setTextFilter("");
    }
  }, [filter]);

  if (!selectedCompany?.id) return null;

  return (
    <main className="bg-light-gray h-[calc(100vh-48px)] p-2">
      <div className="bg-[#ffffff] rounded-[4px] p-4 border border-[#D8DFE6] h-[calc(100vh-64px)]">
        <header className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl text-gray-950">Ativos</h2>
            <p className="text-sm text-gray-600">
              / {selectedCompany.name as string} Unit
            </p>
          </div>
          <FilterButtons filter={filter} setFilter={setFilter} />
        </header>
        <div className="flex h-[calc(100vh-142.6px)] justify-between mt-3 gap-2">
          <div className="border border-gray-200 min-w-[479px] rounded-sm">
            <SearchInput
              textFilter={textFilter}
              setTextFilter={setTextFilter}
            />
            <div className="px-1 py-2 h-[calc(100vh-188.6px)] overflow-y-scroll">
              <Tree companyId={selectedCompany.id.toString()} />
            </div>
          </div>
          <div className="border border-gray-200 grow rounded-sm">
            <AssetDetails />
          </div>
        </div>
      </div>
    </main>
  );
}
export default Main;
