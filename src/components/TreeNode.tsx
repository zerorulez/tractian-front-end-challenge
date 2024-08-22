import React from "react";
import { AssetTreeNode } from "../types";
import LocationIcon from "./icons/Location";
import AssetIcon from "./icons/Asset";
import ComponentIcon from "./icons/Component";
import ChevronIcon from "./icons/Chevron";
import clsx from "clsx";
import useStore from "../hooks/useStore";
import RenderIcon from "./RenderIcon";

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
    <li className={clsx("flex flex-col gap-1")}>
      <div
        className={clsx(
          node.children && node.children.length == 0 && "ml-[24px]",
          selectedAsset.id === node.id && "bg-blue-500 text-[#ffffff]",
          "group flex items-center min-h-[26px] cursor-pointer hover:bg-blue-500 hover:text-[#ffffff] relative"
        )}
        onClick={() => setSelectedAsset(node)}
      >
        {node.children && node.children.length > 0 && <ChevronIcon />}
        {/* {node.parentId && !node.children.length && (
          <div className="relative left-[-21px] bottom-4 before:w-[18px] before:h-4 before:border-b before:border-l before:border-gray-200 before:absolute"></div>
        )} */}
        <div
          className={clsx(
            selectedAsset.id === node.id && "bg-blue-500 !text-[#ffffff]",
            "pl-1 text-blue-500 group-hover:text-[#ffffff]"
          )}
        >
          {renderIcon(node)}
        </div>
        <span className="pl-1">{node.name}</span>
        <RenderIcon node={node} />
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="ml-4 relative before:content-[''] before:border-l before:border-gray-200 before:absolute before:top-0 before:left-[-4px] before:h-full">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
