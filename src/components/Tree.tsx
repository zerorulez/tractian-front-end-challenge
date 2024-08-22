import React, { useEffect } from "react";
import TreeNode from "./TreeNode";
import useStore from "../hooks/useStore";

interface AssetTreeProps {
  companyId: string;
}

const Tree: React.FC<AssetTreeProps> = ({ companyId }) => {
  const treeData = useStore((state) => state.treeData);
  const buildTree = useStore((state) => state.buildTree);
  const filter = useStore((state) => state.filter);
  const isTreeLoading = useStore((state) => state.isTreeLoading);
  const setIsTreeLoading = useStore((state) => state.setIsTreeLoading);

  useEffect(() => {
    setIsTreeLoading(true);
    const loadData = async () => {
      const locations = await fetchLocations(companyId);
      const assets = await fetchAssets(companyId);
      if (locations && assets) {
        buildTree(locations, assets);
        setIsTreeLoading(false);
      }
    };
    loadData();
  }, [companyId, filter]);

  const fetchLocations = async (companyId) => {
    try {
      const response = await fetch(
        `https://fake-api.tractian.com/companies/${companyId}/locations`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const fetchAssets = async (companyId) => {
    try {
      const response = await fetch(
        `https://fake-api.tractian.com/companies/${companyId}/assets`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      {isTreeLoading && <div className="pl-4">Carregando...</div>}
      {!isTreeLoading && treeData && (
        <ul className="text-sm text-dark-blue">
          {treeData.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Tree;
