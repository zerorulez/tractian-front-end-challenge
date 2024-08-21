import useStore from "../hooks/useStore";

function AssetDetails() {
  const selectedAsset = useStore((state) => state.selectedAsset);

  return <>{selectedAsset.name}</>;
}

export default AssetDetails;
