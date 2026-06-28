import { useQuery } from "@tanstack/react-query";

import { getTickets } from "@/actions/support";
import { supportKeys } from "./keys";

export function useTickets() {
  return useQuery({
    queryKey: supportKeys.tickets(),
    queryFn: () => getTickets(),
  });
}
