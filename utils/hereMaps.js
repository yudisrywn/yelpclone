const ExpressError = require("./ExpressError");
const baseUrl = "https://geocode.search.hereapi.com/v1";
const apiKey = "cKKA1D0ftrVJs4QkN-6rCiVWIOiCgsvi3UEVAjhWqAs";

const geocode = async (address) => {
  const url = `${baseUrl}/geocode?q=${address}&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.items || !data.items[0]) {
      throw new ExpressError(
        `Alamat "${address}" tidak ditemukan oleh HERE Maps`,
        400
      );
    }
    const lat = data.items[0].position.lat;
    const lng = data.items[0].position.lng;
    return { lat, lng };
  } catch (err) {
    throw new ExpressError(err.message, 500);
  }
};

const geometry = async (address) => {
  try {
    const position = await geocode(address);
    return {
      type: "Point",
      coordinates: [position.lng, position.lat],
    };
  } catch (err) {
    throw new ExpressError(err.message, 500);
  }
};

module.exports = {
  geocode,
  geometry,
};
