import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LocalDatabase } from '@/data/api/local-database';

const data = require("../api/cma_artwork.json");

export const useFavStatusMutation = function () {
  const queryClient = useQueryClient();

  // Queries
  const query = useMutation({
    mutationFn: async (favStatus: { id: string; status: boolean }) => {
      const { id, status } = favStatus;
      return await postToLocal(id, status)
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData([`works:fav:${variables.id}`], variables.status);
      queryClient.invalidateQueries({ queryKey: ['favs'] })
    },
  });

  return query;
};

async function postToLocal(id: string, status: boolean) {
  const db = new LocalDatabase();
  return await db.setFavoriteStatus(id, status);
}
