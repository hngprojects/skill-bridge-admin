"use server";

import type { ApiEnvelope } from "@/types/api";
import type {
  CandidateDetail,
  TalentsPage,
  TalentsQueryParams,
} from "@/types/api/talents";
import { authApi } from "@/lib/api/clients";
import { unwrapData } from "./utils";

type Nested<T> = { status: string; data: T };

export async function getTalents(
  params: TalentsQueryParams = {},
): Promise<TalentsPage> {
  const res = await authApi.get<ApiEnvelope<Nested<TalentsPage>>>(
    "/admin/talents",
    { params },
  );
  return unwrapData(res).data;
}

export async function getCandidateDetail(id: string): Promise<CandidateDetail> {
  const res = await authApi.get<ApiEnvelope<Nested<CandidateDetail>>>(
    `/admin/talents/${id}`,
  );
  return unwrapData(res).data;
}
