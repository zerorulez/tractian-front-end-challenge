import React, { useEffect, useState, useTransition } from "react";
import TreeNode from "./TreeNode";
import useStore from "@/hooks/useStore";
import { Asset, AssetTreeNode, AssetTreeProps, Loc } from "@/types";
import Spinner from "./ui/Spinner";

const Tree: React.FC<AssetTreeProps> = ({ companyId }) => {
  const [data, setData] = useState<AssetTreeNode[]>([]);

  const [isPending, startTransition] = useTransition();

  const treeData = useStore((state) => state.treeData);
  const buildTree = useStore((state) => state.buildTree);
  const filter = useStore((state) => state.filter);

  useEffect(() => {
    const loadData = async () => {
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
      }
    };

    loadData();
  }, [companyId, filter, buildTree]);

  useEffect(() => {
    startTransition(() => setData(treeData));
  }, [treeData]);

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
      {isPending && (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      )}
      {!isPending && (
        <ul className="text-sm text-dark-blue">
          {data.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Tree;
