import { create } from "zustand";

import type { AdminUiStore } from "@/types/stores/admin-ui-store";

const initialState = {
  sidebarOpen: true,
};

export const useAdminUiStore = create<AdminUiStore>((set) => ({
  ...initialState,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  reset: () => set(initialState),
}));
