import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Company {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  currency: string;
  locale: string;
}

interface CompanyState {
  currentCompany: Company | null;
  setCompany: (company: Company) => void;
  clearCompany: () => void;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      currentCompany: null,
      setCompany: (company) => set({ currentCompany: company }),
      clearCompany: () => set({ currentCompany: null }),
    }),
    { name: "company-storage" }
  )
);

export const useCurrentCompanyId = () => {
  const { currentCompany } = useCompanyStore();
  return currentCompany?.id || null;
};
