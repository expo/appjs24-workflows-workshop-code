/* for bypassing API Routes and just saving data inside your app's local storage */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { keys } from "lodash";

const storage = {
  async getItem(key: string) {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  async setItem(key: string, value: any) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  },
};

const artwork = require("@/data/api/cma_artwork.json");

class LocalDatabase {
  async getFavorites() {
    const favs = (await storage.getItem("favs")) || {};
    return keys(favs).filter(favsKey => favs[favsKey]).map((id) => ({
      id,
      image: artwork.data.find((item: any) => item.id == id).images.web.url,
    }));
  }

  async getFavoriteStatus(id: string) {
    const favs = (await storage.getItem("favs")) || {};
    return !!favs[id];
  }

  async setFavoriteStatus(id: string, fav: boolean) {
    const favs = (await storage.getItem("favs")) || {};
    favs[id] = fav;
    await storage.setItem("favs", favs);
  }
}

export { LocalDatabase }