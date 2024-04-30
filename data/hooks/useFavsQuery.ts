import { useQuery } from "@tanstack/react-query";
import { LocalDatabase } from '@/data/api/local-database';

export const useFavsQuery = function() {
  // Queries
  const query = useQuery({
    queryKey: [`favs`],
    queryFn: async () => {
      if (process.env.EXPO_PUBLIC_USE_LOCAL_DATA) {
        return await fetchFromLocal()
      }
      return await fetchFromServer()
    },
  });

  return query;
}

async function fetchFromServer() {
  const response = await fetch(`/favs`);
  return await response.json();
}

async function fetchFromLocal() {
  const db = new LocalDatabase();
  return await db.getFavorites();
}