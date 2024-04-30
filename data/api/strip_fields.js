const jsonfile = require('jsonfile');
const _ = require('lodash');

const limitPerDepartment = 20;

const artworkResponse = jsonfile.readFileSync("./data/api/cma_artwork.json");

artworkResponse.data.forEach((artwork) => {
  artwork.exhibitions = undefined;
  artwork.legacy = [];
  artwork.provenance = [];
  artwork.citations = [];
  artwork.alternate_images = [];
  artwork.images  = { web: artwork.images.web };
  artwork.tombstore = undefined,
  artwork.external_resources = undefined;
  artwork.inscriptions = undefined;
  artwork.dimensions = undefined;
  artwork.measurements = undefined;
  artwork.collapse_artists = undefined;
  artwork.on_loan = undefined;
  artwork.recently_acquired = undefined;
  artwork.record_type = undefined;
  artwork.conservation_statement = undefined;
  artwork.is_nazi_era_provenance = undefined;
  artwork.impression = undefined;
  artwork.alternate_titles = undefined;
});

if (limitPerDepartment) {
  artworkByDepartment = _.groupBy(artworkResponse.data, 'department');
  artworkResponse.data = [];
  for (const department in artworkByDepartment) {
    artworkResponse.data = artworkResponse.data.concat(artworkByDepartment[department].slice(0, limitPerDepartment));
  }
}

jsonfile.writeFileSync("./data/api/cma_artwork.json", artworkResponse, { spaces: 2 });