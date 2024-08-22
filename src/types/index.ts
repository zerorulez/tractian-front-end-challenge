export interface Company {
  id: string;
  name: string;
}
export interface Loc {
  id: string;
  name: string;
  parentId: string | null;
}

export interface Asset {
  id: string;
  name: string;
  parentId: string | null;
  locationId: string | null;
  sensorId?: string | null;
  sensorType?: "energy" | "vibration";
  status?: "operating" | "alert";
  gatewayId?: "string";
}

export interface AssetTreeNode extends Asset {
  children: AssetTreeNode[];
}

export interface StoreState {
  selectedCompany: Company;
  setSelectedCompany: (newCompany: Company) => void;
  selectedAsset: Asset;
  setSelectedAsset: (newAsset: Asset) => void;
  filter: string;
  setFilter: (newFilter: string) => void;
  treeData: AssetTreeNode[];
  isTreeLoading: boolean;
  setIsTreeLoading: (newLoading: boolean) => void;
  buildTree: (locations: Loc[], assets: Asset[]) => void;
}

export interface ButtonProps {
  className?: string;
  variant: "nav" | "outline";
  selected?: boolean;
  label: string;
  Icon?: React.FC;
  handleClick?: () => void;
}

export interface TreeNodeProps {
  node: AssetTreeNode;
}

export interface AssetTreeProps {
  companyId: string;
}
