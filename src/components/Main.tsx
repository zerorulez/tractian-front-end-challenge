import useStore from "../hooks/useCompanyStore";
import Button from "./ui/Button";
import CriticalIcon from "./icons/Critical";
import ThunderIcon from "./icons/Thunder";
import Tree from "./Tree";

function Main() {
  const selectedCompany = useStore((state) => state.selectedCompany);

  return (
    <main className="bg-light-gray min-h-[calc(100vh-48px)] p-2">
      {selectedCompany.id && (
        <div className="bg-[#ffffff] rounded-[4px] p-4 border border-[#D8DFE6] min-h-[calc(100vh-56px)]">
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
              />
              <Button
                label="Crítico"
                Icon={CriticalIcon}
                variant="outline"
                selected
              />
            </div>
          </div>
          <div className="flex justify-between mt-3 gap-2">
            <div className="border border-gray-200 min-w-[479px] rounded-sm px-1 py-2">
              <Tree companyId={selectedCompany.id} />
            </div>
            <div className="border border-gray-200 grow rounded-sm">
              Componente
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Main;
