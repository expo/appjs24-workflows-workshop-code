import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LocalDatabase } from '@/data/api/local-database';

const data = require("../api/cma_artwork.json");

export const useFavStatusMutation = function () {
  const queryClient = useQueryClient();

  // Queries
  const query = useMutation({
    mutationFn: async (favStatus: { id: string; status: boolean }) => {
      const { id, status } = favStatus;
      if (process.env.EXPO_PUBLIC_USE_LOCAL_DATA) {
        return await postToLocal(id, status)
      }
      return await postToServer(id, status)
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData([`works:fav:${variables.id}`], variables.status);
      queryClient.invalidateQueries({ queryKey: ['favs'] })
    },
  });

  return query;
};

async function postToServer(id: string, status: boolean) {
  const response = await fetch(`/works/${id}/fav`, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    cache: "default",
    body: JSON.stringify({ status }),
  });
  return await response.json();
}

async function postToLocal(id: string, status: boolean) {
  const db = new LocalDatabase();
  return await db.setFavoriteStatus(id, status);
}
