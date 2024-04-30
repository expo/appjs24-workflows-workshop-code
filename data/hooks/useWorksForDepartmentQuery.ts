import { useQuery, useQueryClient } from "@tanstack/react-query";
import { uniq } from "lodash";

const data = require("../api/cma_artwork.json");

export const useWorksForDepartmentQuery = function(department: string) {
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({
    queryKey: [`departments:${department}`],
    queryFn: async () => {
      return data.data.filter((item: any) => item.department === department);
    },
  });

  return query;
}