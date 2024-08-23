import React from "react";
import { AssetTreeNode, TreeNodeProps } from "@/types";
import LocationIcon from "./icons/Location";
import AssetIcon from "./icons/Asset";
import ComponentIcon from "./icons/Component";
import ChevronIcon from "./icons/Chevron";
import clsx from "clsx";
import useStore from "@/hooks/useStore";
import RenderIcon from "./RenderIcon";

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  const selectedAsset = useStore((state) => state.selectedAsset);
  const setSelectedAsset = useStore((state) => state.setSelectedAsset);

  const renderIcon = (node: AssetTreeNode) => {
    if (node.sensorType !== undefined) {
      return node.sensorType === null ? <AssetIcon /> : <ComponentIcon />;
    }
    return <LocationIcon />;
  };

  const isSelected = selectedAsset.id === node.id;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <li className={clsx("flex flex-col gap-1")}>
      <div
        className={clsx(
          node.children && node.children.length == 0 && "ml-[24px]",
          isSelected && "bg-blue-500 text-[#ffffff]",
          "group flex items-center min-h-[26px] cursor-pointer hover:bg-blue-500 hover:text-[#ffffff] relative"
        )}
        onClick={() => setSelectedAsset(node)}
      >
        {hasChildren && <ChevronIcon />}
        <div
          className={clsx(
            isSelected && "bg-blue-500 !text-[#ffffff]",
            "pl-1 text-blue-500 group-hover:text-[#ffffff]"
          )}
        >
          {renderIcon(node)}
        </div>
        <span className="pl-1">{node.name}</span>
        <RenderIcon node={node} />
      </div>
      {/* {hasChildren && (
        <ul className="ml-4 relative before:content-[''] before:border-l before:border-gray-200 before:absolute before:top-0 before:left-[-4px] before:h-full">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )} */}
    </li>
  );
};

export default TreeNode;
