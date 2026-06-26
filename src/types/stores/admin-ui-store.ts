export type AdminUiStore = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  reset: () => void;
};

export type AdminUiState = Pick<AdminUiStore, "sidebarOpen">;
