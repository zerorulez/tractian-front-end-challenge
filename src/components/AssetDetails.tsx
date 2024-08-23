import useStore from "@/hooks/useStore"; // Import custom hook for state management
import InboxIcon from "./icons/Inbox"; // Import Inbox icon
import ReceiverIcon from "./icons/Receiver"; // Import Receiver icon
import SensorIcon from "./icons/Sensor"; // Import Sensor icon
import RenderIcon from "./RenderIcon"; // Import RenderIcon component
import { AssetTreeNode } from "@/types";

// Define the AssetDetails component
function AssetDetails() {
  // Access the selected asset from the store
  const selectedAsset = useStore((state) => state.selectedAsset);

  return (
    <div>
      {selectedAsset.name && (
        <div className="py-[14px] px-4 text-lg font-semibold border-b border-gray-200 flex items-center">
          <p>{selectedAsset.name}</p>
          <RenderIcon node={selectedAsset as AssetTreeNode} />
        </div>
      )}

      {selectedAsset.gatewayId && selectedAsset.sensorId && (
        <>
          <div className="flex p-6 gap-6">
            <div className="flex flex-col justify-center items-center bg-blue-50 text-blue-500 border border-blue-400 border-dashed rounded min-h-[226px] max-w-[336px] px-[80px] w-full text-sm cursor-pointer">
              <InboxIcon />
              <p className="text-center">Adicionar imagem do Ativo</p>
            </div>
            <div className="flex flex-col w-full justify-center gap-6">
              <div>
                <p className="font-semibold">Tipo de Equipamento</p>
                <p className="text-gray-500 mt-2">Motor Elétrico (Trifásico)</p>
              </div>
              <div className="border-b border-gray-200"></div>
              <div>
                <p className="font-semibold">Responsáveis</p>
                <div className="flex gap-2 mt-2">
                  <div className="flex bg-blue-500 rounded-full text-[#ffffff] w-6 h-6 justify-center items-center">
                    <p>M</p>
                  </div>
                  <p className="text-gray-500">Mecânica</p>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 mx-6"></div>
        </>
      )}

      <div className="grid grid-cols-2 p-6">
        {selectedAsset.sensorId && (
          <div>
            <p className="font-semibold">Sensor</p>
            <div className="flex gap-2 mt-2">
              <div className="text-blue-500">
                <SensorIcon />
              </div>
              <p className="text-gray-500">{selectedAsset.sensorId}</p>{" "}
            </div>
          </div>
        )}
        {selectedAsset.gatewayId && (
          <div>
            <p className="font-semibold">Receptor</p>
            <div className="flex gap-2 mt-2">
              <div className="text-blue-500">
                <ReceiverIcon />
              </div>
              <p className="text-gray-500">{selectedAsset.gatewayId}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssetDetails;
