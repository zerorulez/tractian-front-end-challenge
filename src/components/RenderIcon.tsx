import React from "react";
import BoltIcon from "./icons/Bolt";
import { TreeNodeProps } from "../types";

const RenderIcon: React.FC<TreeNodeProps> = ({ node }) => {
  if (node.status === "operating" && node.sensorType === "vibration") {
    return <div className="w-2 h-2 bg-green-500 rounded-full ml-1" />;
  } else if (node.status === "alert" && node.sensorType === "vibration") {
    return <div className="w-2 h-2 bg-red-500 rounded-full ml-1" />;
  } else if (node.status === "operating" && node.sensorType === "energy") {
    return (
      <div className="text-green-500">
        <BoltIcon />
      </div>
    );
  } else if (node.status === "alert" && node.sensorType === "energy") {
    return (
      <div className="text-red-500">
        <BoltIcon />
      </div>
    );
  }
  return null;
};

export default RenderIcon;
