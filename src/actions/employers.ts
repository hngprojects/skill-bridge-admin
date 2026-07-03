"use server";

import type {
  EmployerDetail,
  EmployersPage,
  EmployersQueryParams,
  GetEmployerDetailResponse,
  GetEmployersResponse,
} from "@/types/api/employers";
import { authApi } from "@/lib/api/clients";
import { unwrapData } from "./utils";

export async function getEmployers(
  params: EmployersQueryParams = {},
): Promise<EmployersPage> {
  const res = await authApi.get<GetEmployersResponse>("/admin/employers", {
    params,
  });

  return unwrapData(res).data;
}

export async function getEmployerDetail(id: string): Promise<EmployerDetail> {
  const res = await authApi.get<GetEmployerDetailResponse>(
    `/admin/employers/${id}`,
  );

  return unwrapData(res).data;
}
