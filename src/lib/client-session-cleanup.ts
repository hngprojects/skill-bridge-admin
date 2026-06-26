"use client";

import { useAdminUiStore } from "@/stores/admin-ui-store";

export function clearPersistedSessionState() {
  useAdminUiStore.getState().reset();
}
