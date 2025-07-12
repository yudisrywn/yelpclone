const mongoose = require("mongoose");
const Place = require("../models/place");
const { geometry } = require("../utils/hereMaps");

mongoose
  .connect("mongodb://127.0.0.1/yelpclone")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

async function seedPlaces() {
  const places = [
    {
      title: "Pantai Kuta",
      price: 0,
      description:
        "Pantai yang terkenal di Bali dengan pemandangan sunset yang indah",
      location: "Pantai Kuta, Kuta, Badung Regency, Bali, Indonesia",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kawah Putih",
      price: 0,
      description:
        "Kawah vulkanik dengan danau berwarna putih di Bandung, Jawa Barat",
      location: "Kawah Putih, Ciwidey, West Java",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Malioboro",
      price: 0,
      description:
        "Jalan utama di Yogyakarta dengan berbagai toko dan kuliner khas",
      location: "Malioboro, Yogyakarta City, Special Region of Yogyakarta",
      image: "https://source.unsplash.com/collection/880012/1280x720",
    },
    {
      title: "Pantai Tanjung Aan",
      price: 10000,
      description:
        "Pantai dengan pasir berwarna putih dan air laut yang jernih di Lombok, Nusa Tenggara Barat",
      location: "Pantai Tanjung Aan, Lombok, West Nusa Tenggara",
      image: "https://source.unsplash.com/collection/880012/1280x720",
    },
    {
      title: "Candi Prambanan",
      price: 25000,
      description:
        "Candi Hindu terbesar di Indonesia yang terletak di Yogyakarta",
      location: "Candi Prambanan, Sleman, Special Region of Yogyakarta",
      image: "https://source.unsplash.com/collection/880012/1280x720",
    },
    {
      title: "Pantai Sanur",
      price: 0,
      description:
        "Pantai di Bali yang cocok untuk berenang dan melihat matahari terbit",
      location: "Pantai Sanur, Denpasar, Bali",
      image: "https://source.unsplash.com/collection/880012/1280x720",
    },
    {
      title: "Pulau Weh",
      price: 0,
      description:
        "Pulau yang terletak di ujung barat Indonesia dengan keindahan bawah laut yang luar biasa",
      location: "Pulau Weh, Sabang, Aceh",
      image: "https://source.unsplash.com/collection/880012/1280x720",
    },
    {
      title: "Gunung Merbabu",
      price: 50000,
      description:
        "Gunung yang terletak di Jawa Tengah dengan pemandangan matahari terbit yang indah",
      location: "Gunung Merbabu, Central Java, Indonesia",
      image: "https://source.unsplash.com/collection/880012/1280x720",
    },
    {
      title: "Tanjung Lesung",
      price: 100000,
      description:
        "Kawasan wisata pantai di Banten yang cocok untuk bersantai dan berenang",
      location: "Tanjung Lesung, Pandeglang, Banten",
      image: "https://source.unsplash.com/collection/880012/1280x720",
    },
  ];

  try {
    const newPlace = await Promise.all(
      places.map(async (place) => {
        let geoData = await geometry(place.location);
        if (!geoData) {
          geoData = { type: "Point", coordinates: [116.32883, -8.90952] };
        }
        return {
          ...place,
          author: "686b646e1abbefc68db76a4b",
          images: {
            url: "public\\images\\image-1752245071540-764287881.jpg",
            filename: "image-1752245071540-764287881.jpg",
          },
          geometry: geoData,
        };
      })
    );

    await Place.deleteMany({});
    await Place.insertMany(newPlace);
    console.log("Data berhasil disimpan");
  } catch (err) {
    console.log("Terjadi kesalahan saat menyimpan data:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedPlaces();
