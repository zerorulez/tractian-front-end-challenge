import { create } from "zustand";
import { Asset, AssetTreeNode, Company, StoreState, Loc } from "@/types";

// Create the Zustand store with the defined state and functions
const useStore = create<StoreState>((set) => ({
  // Initial state for the selected company
  selectedCompany: {} as Company,
  setSelectedCompany: (newCompany) => set({ selectedCompany: newCompany }),

  // Initial state for the selected asset
  selectedAsset: {} as Asset,
  setSelectedAsset: (newAsset) => set({ selectedAsset: newAsset }),

  // Initial state for the filter string
  filter: "",
  setFilter: (newFilter) =>
    set((state) => ({
      filter: state.filter === newFilter ? "" : newFilter,
    })),

  // Initial state for the tree data
  treeData: [],

  // Function to build the tree from locations and assets
  buildTree: (locations, assets) =>
    set((state) => {
      // Map assets and locations to an object where the key is the ID
      const assetMap: Record<string, AssetTreeNode> = {};

      // Add assets to the map
      assets.forEach((asset: Asset) => {
        assetMap[asset.id] = {
          ...asset,
          children: [],
        };
      });

      // Add locations to the map
      locations.forEach((location: Loc) => {
        assetMap[location.id] = {
          id: location.id,
          name: location.name,
          parentId: location.parentId,
          locationId: null,
          children: [],
        };
      });

      // Initialize the tree that will be returned
      const tree: AssetTreeNode[] = [];

      // Add a node to the tree based on its parentId or locationId
      const addToTree = (node: AssetTreeNode) => {
        if (node.parentId) {
          const parent = assetMap[node.parentId];
          if (parent) {
            parent.children.push(node);
          }
        } else if (node.locationId) {
          const location = assetMap[node.locationId];
          if (location) {
            location.children.push(node);
          }
        } else {
          tree.push(node);
        }
      };

      // Add all assets and locations to the tree
      assets.forEach((asset: Asset) => addToTree(assetMap[asset.id]));
      locations.forEach((location: Loc) => addToTree(assetMap[location.id]));

      // Recursive function to filter the tree based on the search string
      const filterTree = (
        node: AssetTreeNode,
        searchString: string
      ): AssetTreeNode | null => {
        // Check if the node or any of its children match the filter
        const matchesFilter =
          JSON.stringify(node)
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          node.children.some(
            (child) => filterTree(child, searchString) !== null
          );

        if (matchesFilter) {
          return {
            ...node,
            children: node.children
              .map((child) => filterTree(child, searchString))
              .filter((child) => child !== null) as AssetTreeNode[],
          };
        }
        return null;
      };

      // Filter the tree based on the filter string in the state
      if (state.filter !== "") {
        const filteredTree = tree
          .map((node) => filterTree(node, state.filter))
          .filter((node): node is AssetTreeNode => node !== null);

        return { treeData: filteredTree };
      }

      return { treeData: tree };
    }),
}));

export default useStore;
