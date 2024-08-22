import useStore from "../hooks/useStore";
import Button from "./ui/Button";
import CriticalIcon from "./icons/Critical";
import ThunderIcon from "./icons/Thunder";
import Tree from "./Tree";
import AssetDetails from "./AssetDetails";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import SearchIcon from "./icons/Search";

function Main() {
  const [textFilter, setTextFilter] = useState("");

  const selectedCompany = useStore((state) => state.selectedCompany);
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setFilter(value);
    },
    // delay in ms
    1000
  );

  return (
    <main className="bg-light-gray h-[calc(100vh-48px)] p-2">
      {selectedCompany.id && (
        <div className="bg-[#ffffff] rounded-[4px] p-4 border border-[#D8DFE6] h-[calc(100vh-64px)]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-xl text-gray-950">Ativos</h2>
              <p className="text-sm text-gray-600">
                / {selectedCompany.name} Unit
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                label="Sensor de Energia"
                Icon={ThunderIcon}
                variant="outline"
                handleClick={() => setFilter("energy")}
                selected={filter == "energy"}
              />
              <Button
                label="Crítico"
                Icon={CriticalIcon}
                variant="outline"
                handleClick={() => setFilter("alert")}
                selected={filter == "alert"}
              />
            </div>
          </div>
          <div className="flex h-[calc(100vh-142.6px)] justify-between mt-3 gap-2">
            <div className="border border-gray-200 min-w-[479px] rounded-sm">
              <div className="flex border-b border-gray-200 ">
                <input
                  type="text"
                  name="filter"
                  id="filter"
                  placeholder="Buscar Ativo ou Local"
                  className="h-[45px] w-full p-3"
                  onChange={(e) => debounced(e.target.value)}
                />
                <div className="flex justify-center items-center min-w-[44px] h-[44px] top-[16px] right-[21px]">
                  <SearchIcon />
                </div>
              </div>
              <div className="px-1 py-2 h-[calc(100vh-188.6px)] overflow-y-scroll">
                <Tree companyId={selectedCompany.id} />
              </div>
            </div>
            <div className="border border-gray-200 grow rounded-sm">
              <AssetDetails />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Main;
