import { create } from "zustand";
import { AssetTreeNode } from "../types";

const useStore = create((set) => ({
  selectedCompany: {},
  setSelectedCompany: (newCompany: object) =>
    set({ selectedCompany: newCompany }),
  selectedAsset: {},
  setSelectedAsset: (newAsset: object) => set({ selectedAsset: newAsset }),
  locations: [],
  setLocations: (newLocations: []) => set({ locations: newLocations }),
  assets: [],
  setAssets: (newAssets: []) => set({ assets: newAssets }),
  selectedFilter: "",
  setSelectedFilter: (newFilter: "") =>
    set((state) => {
      if (state.selectedFilter === newFilter) {
        return { selectedFilter: "" };
      }
      return { selectedFilter: newFilter };
    }),
  treeData: [],
  buildTree: () =>
    set((state) => {
      const assetMap: { [key: string]: AssetTreeNode } = {};

      state.assets.forEach((asset) => {
        assetMap[asset.id] = {
          ...asset,
          children: [],
        };
      });

      state.locations.forEach((location) => {
        assetMap[location.id] = {
          id: location.id,
          name: location.name,
          parentId: location.parentId,
          locationId: null,
          children: [],
        };
      });

      const tree: AssetTreeNode[] = [];

      state.assets.forEach((asset) => {
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

      state.locations.forEach((location) => {
        if (location.parentId) {
          const parent = assetMap[location.parentId];
          if (parent) {
            parent.children.push(assetMap[location.id]);
          }
        } else {
          tree.push(assetMap[location.id]);
        }
      });

      function filterTree(
        node: AssetTreeNode,
        searchString: string
      ): AssetTreeNode | null {
        if (JSON.stringify(node).includes(searchString.toLowerCase())) {
          // Se o nó contém a string, mantenha-o e filtre seus filhos
          const filteredChildren = node.children
            .map((child) => filterTree(child, searchString))
            .filter((child) => child !== null) as AssetTreeNode[];
          return { ...node, children: filteredChildren };
        }

        // Se o nó não contém a string, não o mantenha
        return null;
      }

      const filteredTree = tree
        .map((node) => filterTree(node, state.selectedFilter))
        .filter((node) => node !== null) as AssetTreeNode[];

      return { treeData: filteredTree };
    }),
}));

export default useStore;
