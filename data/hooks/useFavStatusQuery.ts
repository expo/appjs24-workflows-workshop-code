import { useQuery } from "@tanstack/react-query";
import { LocalDatabase } from '@/data/api/local-database';

const data = require("../api/cma_artwork.json");

export const useFavStatusQuery = function(id: string) {
  // Queries
  const query = useQuery({
    queryKey: [`works:fav:${id}`],
    queryFn: async () => {
      return await fetchFromLocal(id)
    },
  });

  return query;
}

async function fetchFromLocal(id: string) {
  const db = new LocalDatabase();
  return await db.getFavoriteStatus(id);
}