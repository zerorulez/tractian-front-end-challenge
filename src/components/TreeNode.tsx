import React from "react";
import { AssetTreeNode } from "../types";
import LocationIcon from "./icons/Location";
import AssetIcon from "./icons/Asset";
import ComponentIcon from "./icons/Component";
import ChevronIcon from "./icons/Chevron";
import clsx from "clsx";
import useStore from "../hooks/useStore";
import BoltIcon from "./icons/Bolt";

interface TreeNodeProps {
  node: AssetTreeNode;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  const selectedAsset = useStore((state) => state.selectedAsset);
  const setSelectedAsset = useStore((state) => state.setSelectedAsset);

  const renderIcon = (node: AssetTreeNode) => {
    if (node.sensorType) {
      return <ComponentIcon />;
    } else if (node.sensorType === null) {
      return <AssetIcon />;
    } else {
      return <LocationIcon />;
    }
  };

  return (
    <li className="flex flex-col gap-1">
      <div
        className={clsx(
          node.children.length == 0 && "ml-[24px]",
          selectedAsset.id === node.id && "bg-blue-500 text-[#ffffff]",
          "group flex items-center min-h-[26px] cursor-pointer hover:bg-blue-500 hover:text-[#ffffff]"
        )}
        onClick={() => setSelectedAsset(node)}
      >
        {node.children.length > 0 && <ChevronIcon />}
        <div
          className={clsx(
            selectedAsset.id === node.id && "bg-blue-500 !text-[#ffffff]",
            "pl-1 text-blue-500 group-hover:text-[#ffffff]"
          )}
        >
          {renderIcon(node)}
        </div>
        <span className="pl-1">{node.name}</span>
        {node.status === "operating" && node.sensorType === "vibration" && (
          <div className="w-2 h-2 bg-green-500 rounded-full ml-1" />
        )}
        {node.status === "alert" && node.sensorType === "vibration" && (
          <div className="w-2 h-2 bg-red-500 rounded-full ml-1" />
        )}
        {node.status === "operating" && node.sensorType === "energy" && (
          <div className="text-green-500">
            <BoltIcon />
          </div>
        )}
        {node.status === "alert" && node.sensorType === "energy" && (
          <div className="text-red-500">
            <BoltIcon />
          </div>
        )}
      </div>
      {node.children.length > 0 && (
        <ul className="ml-4 border-l border-gray-200">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
