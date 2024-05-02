import { useQuery } from "@tanstack/react-query";
import { LocalDatabase } from '@/data/api/local-database';

export const useFavsQuery = function() {
  // Queries
  const query = useQuery({
    queryKey: [`favs`],
    queryFn: async () => {
      return await fetchFromLocal()
    },
  });

  return query;
}

async function fetchFromLocal() {
  const db = new LocalDatabase();
  return await db.getFavorites();
}