import React from "react";
import { AssetTreeNode } from "../types";
import LocationIcon from "./icons/Location";
import AssetIcon from "./icons/Asset";
import ComponentIcon from "./icons/Component";

interface TreeNodeProps {
  node: AssetTreeNode;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  const renderIcon = (node: AssetTreeNode) => {
    if (node.sensorType) {
      return <ComponentIcon />;
    } else if (node.locationId || node.parentId) {
      return <AssetIcon />;
    } else {
      return <LocationIcon />;
    }
  };

  return (
    <li>
      <div className="flex items-center gap-1">
        <div className="text-blue-500">{renderIcon(node)}</div>
        <span>{node.name}</span>
      </div>
      {node.children.length > 0 && (
        <ul className="pl-4">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
