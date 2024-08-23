import React, { useEffect } from "react";
import TreeNode from "./TreeNode";
import useStore from "@/hooks/useStore";
import { Asset, AssetTreeProps, Loc } from "@/types";
import Spinner from "./ui/Spinner";

const Tree: React.FC<AssetTreeProps> = ({ companyId }) => {
  const treeData = useStore((state) => state.treeData);
  const buildTree = useStore((state) => state.buildTree);
  const filter = useStore((state) => state.filter);
  const isTreeLoading = useStore((state) => state.isTreeLoading);
  const setIsTreeLoading = useStore((state) => state.setIsTreeLoading);

  useEffect(() => {
    const loadData = async () => {
      setIsTreeLoading(true);

      try {
        const [locations, assets] = await Promise.all([
          fetchLocations(companyId),
          fetchAssets(companyId),
        ]);

        if (locations && assets) {
          buildTree(locations, assets);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsTreeLoading(false);
      }
    };

    loadData();
  }, [companyId, filter, buildTree, setIsTreeLoading]);

  const fetchLocations = async (
    companyId: string
  ): Promise<Loc[] | undefined> => {
    try {
      const response = await fetch(
        `https://fake-api.tractian.com/companies/${companyId}/locations`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const fetchAssets = async (
    companyId: string
  ): Promise<Asset[] | undefined> => {
    try {
      const response = await fetch(
        `https://fake-api.tractian.com/companies/${companyId}/assets`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      {isTreeLoading && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
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
