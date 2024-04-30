# Art Thing 2
A demo of Expo Router v3 with API Routes using the Cleveland Museum of Art Open Access API

App concept: you download this thing before visiting the museum to preview the art you'll see there and "fav" the works you would like to scope out when you visit.
## Stuff it does
- Lists departments inside the museum
- List all the works on display at the museum / where the API returns a photo for each department.
- Reads and writes "favorite" works.
- Shows all your favorited works on the "Favorites" tab.
- Shows directions and hours for the museum. If you visit the museum, let me know and I'll try to join you!
## Stuff inside
- The works of art themselves are pulled from the [Cleveland Museum of Art Open Access API](https://openaccess-api.clevelandart.org/), retrieved using TanStack query. You could use the API directly, but for reliability's sake, it's pulling from local files
- The favorites functionality is done with Expo Router API routes. Look for the +api files, one to get/ set claps for individual works, and another to read them all back for the Favorites tab. It's all going to a local data store (really just a text file) to keep things simple and self-contained.
- Styling via Nativewind v4
## How to run
1. Run `npm install`
2. Run `npx expo start`

## Other fun stuff
### Local data mode
I'm using this app as a bit of a sandbox to demo other features, some of which require making a standalone build, and I don't really want to deploy the simple above API _yet_ (it would need stuff like... user segmentation and security, y'know!). So, I wanted a 100% offline version. You can turn that by setting the environment variable `EXPO_PUBLIC_USE_LOCAL_DATA=true`.

See the **data/hooks** folder for how the switching works. One cool thing about Tanstack Query is that you can quite easily use anything for the backing store- it doesn't have to be a server API. So, nothing changes with the screens or the data hooks interface itself, it's all internal to the Tanstack Query calls. Even invalidating data and forcing refresh of other screens works just fine.

To run in local data mode, run `npm start-local`.

## Pulling the data
The data from the artwork API is pulled locally in order to make this into a workable mostly-offline workshop demo, and work around CORS issues prior to introducing API routes (using an API route as a proxy would also work around the curiously-intermittant CORS issues with this API).

The request I use is `https://openaccess-api.clevelandart.org/api/artworks?has_image=1&currently_on_view=1`, which gets works with online images that are currently on display at the museum.

I think then run `npm strip-unused-fields-from-api-data` to remove unused fields and optionally limit the artwork to a smaller number. This is done in order to make live reloading for testing more quickly. The API itself also has the ability to limit fields, but I get "Internal Server Error" when I list the `description` field specifically in the API.

If I was really embedding the artwork into the app, I would treat the JSON files as assets, so they wouldn't get bundled. They would load quite quickly in this case, even with zero filtering. If I was really using the API online, it wouldn't be difficult to transition to this- simply replace the offline access in the **hooks** with fetch requests.

The same data is also provided in a Github repo (https://github.com/ClevelandMuseumArt/openaccess), so I think they're generally OK with it being used in this way.

## Keith's contact info
[Bird app](https://twitter.com/llamaluvr)
[LinkedIn](https://www.linkedin.com/in/keith-kurak/)
[Discord](https://chat.expo.dev)

