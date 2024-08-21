import { create } from "zustand";

const useCompanyStore = create((set) => ({
  selectedCompany: {},
  updateSelectedCompany: (newCompany: object) =>
    set({ selectedCompany: newCompany }),
}));

export default useCompanyStore;
