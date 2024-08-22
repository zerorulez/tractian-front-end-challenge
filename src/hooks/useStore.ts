import { create } from "zustand";
import { AssetTreeNode } from "../types";

const useStore = create((set) => ({
  selectedCompany: {},
  setSelectedCompany: (newCompany: object) =>
    set({ selectedCompany: newCompany }),
  selectedAsset: {},
  setSelectedAsset: (newAsset: object) => set({ selectedAsset: newAsset }),
  filter: "",
  setFilter: (newFilter: "") =>
    set((state) => {
      if (state.filter === newFilter) {
        return { filter: "" };
      }
      return { filter: newFilter };
    }),
  treeData: [],
  isTreeLoading: false,
  setIsTreeLoading: (newLoading: object) => set({ isTreeLoading: newLoading }),
  buildTree: (locations, assets) =>
    set((state) => {
      // Mapeia os ativos e locais
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

      // Monta a árvore
      const tree: AssetTreeNode[] = [];

      // Adiciona filhos para ativos e locais
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

      assets.forEach((asset) => addToTree(assetMap[asset.id]));
      locations.forEach((location) => addToTree(assetMap[location.id]));

      // Filtra a árvore
      function filterTree(
        node: AssetTreeNode,
        searchString: string
      ): AssetTreeNode | null {
        if (
          JSON.stringify(node)
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          node.children.some(
            (child) => filterTree(child, searchString) !== null
          )
        ) {
          return {
            ...node,
            children: node.children
              .map((child) => filterTree(child, searchString))
              .filter((child) => child !== null) as AssetTreeNode[],
          };
        }
        return null;
      }

      const filteredTree = tree
        .map((node) => filterTree(node, state.filter))
        .filter((node) => node !== null) as AssetTreeNode[];

      console.log("treeData", filteredTree);

      return { treeData: filteredTree };
    }),
}));

export default useStore;
