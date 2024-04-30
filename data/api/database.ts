/* used by Expo Router API Routes */

import storage from "node-persist";
import { keys } from "lodash";

const artwork = require("@/data/api/cma_artwork.json");

class Database {
  async initIfNeeded() {
    await storage.init({
      dir: "./storage",
      expiredInterval: 0,
    });
  }

  async getFavorites() {
    await this.initIfNeeded();
    const favs = (await storage.getItem("favs")) || {};
    return keys(favs).filter(favsKey => favs[favsKey]).map((id) => ({
      id,
      image: artwork.data.find((item: any) => item.id == id).images.web.url,
    }));
  }

  async getFavoriteStatus(id: string) {
    await this.initIfNeeded();
    const favs = (await storage.getItem("favs")) || {};
    return !!favs[id];
  }

  async setFavoriteStatus(id: string, fav: boolean) {
    await this.initIfNeeded();
    const favs = (await storage.getItem("favs")) || {};
    favs[id] = fav;
    await storage.setItem("favs", favs);
  }
}

export { Database }