// src/components/AssetTree.tsx

import React, { useState, useEffect } from "react";
import TreeNode from "./TreeNode";
import { Asset, Location, AssetTreeNode } from "../types";
import useFetch from "../hooks/useFetch";

interface AssetTreeProps {
  companyId: string;
}

const buildTree = (assets: Asset[], locations: Location[]): AssetTreeNode[] => {
  const assetMap: { [key: string]: AssetTreeNode } = {};

  assets.forEach((asset) => {
    assetMap[asset.id] = {
      ...asset,
      children: [],
    };
  });

  locations.forEach((location) => {
    assetMap[location.id] = {
      id: location.id,
      name: location.name,
      parentId: location.parentId,
      locationId: null,
      children: [],
    };
  });

  const tree: AssetTreeNode[] = [];

  assets.forEach((asset) => {
    if (asset.parentId) {
      const parent = assetMap[asset.parentId];
      if (parent) {
        parent.children.push(assetMap[asset.id]);
      }
    } else if (asset.locationId) {
      const location = assetMap[asset.locationId];
      if (location) {
        location.children.push(assetMap[asset.id]);
      }
    } else {
      tree.push(assetMap[asset.id]);
    }
  });

  locations.forEach((location) => {
    if (location.parentId) {
      const parent = assetMap[location.parentId];
      if (parent) {
        parent.children.push(assetMap[location.id]);
      }
    } else {
      tree.push(assetMap[location.id]);
    }
  });

  console.log(tree);

  return tree;
};

const Tree: React.FC<AssetTreeProps> = ({ companyId }) => {
  const [treeData, setTreeData] = useState<AssetTreeNode[]>([]);

  const { data: locations } = useFetch(`/companies/${companyId}/locations`);
  const { data: assets } = useFetch(`/companies/${companyId}/assets`);

  useEffect(() => {
    if (locations && locations.length && assets && assets.length) {
      setTreeData(buildTree(assets, locations));
    }
  }, [assets, locations]);

  return (
    <ul className="text-sm text-dark-blue">
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </ul>
  );
};

export default Tree;
