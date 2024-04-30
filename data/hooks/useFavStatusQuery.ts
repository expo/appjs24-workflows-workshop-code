import { useQuery } from "@tanstack/react-query";
import { LocalDatabase } from '@/data/api/local-database';

const data = require("../api/cma_artwork.json");

export const useFavStatusQuery = function(id: string) {
  // Queries
  const query = useQuery({
    queryKey: [`works:fav:${id}`],
    queryFn: async () => {
      if (process.env.EXPO_PUBLIC_USE_LOCAL_DATA) {
         return await fetchFromLocal(id)
      }
      return await fetchFromServer(id)
    },
  });

  return query;
}

async function fetchFromServer(id: string) {
  const response = await fetch(`/works/${id}/fav`);
  return await response.json();
}

async function fetchFromLocal(id: string) {
  const db = new LocalDatabase();
  return await db.getFavoriteStatus(id);
}