import { useQuery, useQueryClient } from "@tanstack/react-query";

const data = require("../api/cma_artwork.json");

export const useWorkByIdQuery = function(id: string) {
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({
    queryKey: [`works:${id}`],
    queryFn: async () => {
      return data.data.find((item: any) => item.id == id);
    },
  });

  return query;
}