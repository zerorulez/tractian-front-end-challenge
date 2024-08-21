export interface Location {
  id: string;
  name: string;
  parentId: string | null;
}

export interface Asset {
  id: string;
  name: string;
  parentId: string | null;
  locationId: string | null;
  sensorType?: "energy" | "vibration";
  status?: "operating" | "alert";
}

export interface AssetTreeNode extends Asset {
  children: AssetTreeNode[];
}
