import type {
  AdminAccountStatus,
  ManagedAdminAccount,
} from "@/types/api/admin-management";
import type { AdminRole } from "@/types/api/auth";

export let MOCK_ADMIN_ACCOUNTS: ManagedAdminAccount[] = [
  {
    id: "mock-super-admin",
    name: "Super Admin",
    email: "super@skillbridge.test",
    role: "super_admin",
    last_login: "2026-06-27T09:30:00.000Z",
    status: "active",
  },
  {
    id: "mock-admin",
    name: "Platform Admin",
    email: "admin@skillbridge.test",
    role: "admin",
    last_login: "2026-06-26T16:12:00.000Z",
    status: "active",
  },
  {
    id: "mock-reviewer",
    name: "Question Reviewer",
    email: "reviewer@skillbridge.test",
    role: "reviewer",
    last_login: "2026-06-25T13:45:00.000Z",
    status: "active",
  },
  {
    id: "mock-pending-admin",
    name: "Pending Admin",
    email: "pending@skillbridge.test",
    role: "admin",
    last_login: null,
    status: "pending_setup",
  },
  {
    id: "mock-deactivated-admin",
    name: "Deactivated Admin",
    email: "deactivated@skillbridge.test",
    role: "admin",
    last_login: "2026-05-30T10:18:00.000Z",
    status: "deactivated",
  },
];

export function addMockAdmin(email: string): ManagedAdminAccount {
  const newAdmin: ManagedAdminAccount = {
    id: `mock-admin-${Date.now()}`,
    name: "Pending Admin",
    email,
    role: "admin",
    last_login: null,
    status: "pending_setup",
  };

  MOCK_ADMIN_ACCOUNTS = [newAdmin, ...MOCK_ADMIN_ACCOUNTS];

  return newAdmin;
}

export function updateMockAdminEmail(id: string, email: string) {
  MOCK_ADMIN_ACCOUNTS = MOCK_ADMIN_ACCOUNTS.map((admin) =>
    admin.id === id ? { ...admin, email } : admin,
  );
}

export function updateMockAdminRole(id: string, role: AdminRole) {
  MOCK_ADMIN_ACCOUNTS = MOCK_ADMIN_ACCOUNTS.map((admin) =>
    admin.id === id ? { ...admin, role } : admin,
  );
}

export function updateMockAdminStatus(id: string, status: AdminAccountStatus) {
  MOCK_ADMIN_ACCOUNTS = MOCK_ADMIN_ACCOUNTS.map((admin) =>
    admin.id === id ? { ...admin, status } : admin,
  );
}
