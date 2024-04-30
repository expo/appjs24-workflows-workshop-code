import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { Database } from '@/data/api/database';

export async function GET(request: ExpoRequest) {
  // read the query string
  const params = request.expoUrl.searchParams;
  const id = params.get("id")!;
  // read the favorites status from our database
  const database = new Database();
  const favStatus = await database.getFavoriteStatus(id);
  // make a json response
  return ExpoResponse.json(favStatus);
}

export async function POST(request: ExpoRequest) {
  // read the query string for ID
  const params = request.expoUrl.searchParams;
  const id = params.get("id")!;
  // read the body for the payload
  const body = await request.json();
  const status = body.status;
  // write the updated status to our database
  const database = new Database();
  await database.setFavoriteStatus(id, status);
  // make a json response
  return ExpoResponse.json(status);
}