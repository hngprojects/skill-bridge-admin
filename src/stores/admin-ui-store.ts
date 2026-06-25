import { create } from "zustand";

type AdminUiStore = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  reset: () => void;
};

const initialState = {
  sidebarOpen: true,
};

export const useAdminUiStore = create<AdminUiStore>((set) => ({
  ...initialState,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  reset: () => set(initialState),
}));
