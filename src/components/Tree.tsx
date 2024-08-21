// src/components/AssetTree.tsx

import React, { useState, useEffect } from "react";
import TreeNode from "./TreeNode";
import { Asset, Location, AssetTreeNode } from "../types";
import useFetch from "../hooks/useFetch";
import useStore from "../hooks/useStore";

interface AssetTreeProps {
  companyId: string;
}

const Tree: React.FC<AssetTreeProps> = ({ companyId }) => {
  const { data: locations } = useFetch(`/companies/${companyId}/locations`);
  const { data: assets } = useFetch(`/companies/${companyId}/assets`);

  const setLocations = useStore((state) => state.setLocations);
  const setAssets = useStore((state) => state.setAssets);
  const treeData = useStore((state) => state.treeData);
  const buildTree = useStore((state) => state.buildTree);
  const selectedFilter = useStore((state) => state.selectedFilter);

  useEffect(() => {
    setLocations(locations);
    setAssets(assets);
    if (locations && locations.length && assets && assets.length) {
      buildTree();
    }
  }, [assets, locations, selectedFilter]);

  return (
    <ul className="text-sm text-dark-blue">
      {treeData &&
        treeData.map((node) => <TreeNode key={node.id} node={node} />)}
    </ul>
  );
};

export default Tree;
