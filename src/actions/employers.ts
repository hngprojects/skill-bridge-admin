import type { EmployerDetail, EmployerListItem } from "@/types/api/employers";
import { getMockEmployerDetail, MOCK_EMPLOYERS } from "@/mocks/employers";

export async function getEmployers(): Promise<EmployerListItem[]> {
  return MOCK_EMPLOYERS;
}

export async function getEmployerDetail(id: string): Promise<EmployerDetail> {
  return getMockEmployerDetail(id);
}
