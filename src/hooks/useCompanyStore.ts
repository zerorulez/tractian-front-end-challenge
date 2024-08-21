import { create } from "zustand";

const useCompanyStore = create((set) => ({
  selectedCompany: {},
  setSelectedCompany: (newCompany: object) =>
    set({ selectedCompany: newCompany }),
}));

export default useCompanyStore;
