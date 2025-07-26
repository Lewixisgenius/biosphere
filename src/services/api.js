// Mock data for species
export const mockSpeciesData = [
  {
    "id": 1,
    "name": "Kızıl tilki",
    "scientificName": "Vulpes vulpes",
    "location": [39.9255, 32.8663],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Fox_-_British_Wildlife_Centre_%2817429406401%29.jpg/1200px-Fox_-_British_Wildlife_Centre_%2817429406401%29.jpg",
    "description": "Türkiye'de yaygın bir memeli türü. Ormanlık alanlarda, çayırlarda ve hatta şehirlerde bile görülebilir. Gececil bir hayvandır ve küçük memeliler, kuşlar ve böceklerle beslenir.",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Mammalia",
      "order": "Carnivora",
      "family": "Canidae",
      "genus": "Vulpes",
      "species": "Vulpes vulpes"
    },
    "wikipedia_url": "https://tr.wikipedia.org/wiki/Kızıl_tilki",
    "inaturalist_url": "https://www.inaturalist.org/taxa/42069-Vulpes-vulpes",
    "observed_on": "2024-01-15",
    "location_name": "Ankara, Türkiye"
  },
  {
    "id": 2,
    "name": "Kızıl şahin",
    "scientificName": "Buteo rufinus",
    "location": [41.0082, 28.9784],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Buteo_rufinus_-_Long-legged_Buzzard.jpg/1200px-Buteo_rufinus_-_Long-legged_Buzzard.jpg",
    "description": "Türkiye'nin en yaygın yırtıcı kuşlarından biri. Açık arazilerde, tepelerde ve dağlarda yaşar. Küçük memeliler, sürüngenler ve böceklerle beslenir.",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Aves",
      "order": "Accipitriformes",
      "family": "Accipitridae",
      "genus": "Buteo",
      "species": "Buteo rufinus"
    },
    "wikipedia_url": "https://tr.wikipedia.org/wiki/Kızıl_şahin",
    "inaturalist_url": "https://www.inaturalist.org/taxa/5200-Buteo-rufinus",
    "observed_on": "2024-01-20",
    "location_name": "İstanbul, Türkiye"
  },
  {
    "id": 3,
    "name": "Anadolu parsı",
    "scientificName": "Panthera pardus tulliana",
    "location": [36.8969, 30.7133],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.jpg/1200px-Grosser_Panda.jpg",
    "description": "Türkiye'nin en nadir memeli türlerinden biri. Dağlık ve ormanlık alanlarda yaşar. Tehdit altında olan bu tür koruma altındadır.",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Mammalia",
      "order": "Carnivora",
      "family": "Felidae",
      "genus": "Panthera",
      "species": "Panthera pardus"
    },
    "wikipedia_url": "https://tr.wikipedia.org/wiki/Anadolu_parsı",
    "inaturalist_url": "https://www.inaturalist.org/taxa/41963-Panthera-pardus",
    "observed_on": "2024-01-10",
    "location_name": "Antalya, Türkiye"
  },
  {
    "id": 4,
    "name": "Van kedisi",
    "scientificName": "Felis catus",
    "location": [38.4891, 43.4089],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "description": "Van Gölü çevresinde yaşayan, beyaz tüylü ve farklı renkte gözlere sahip olabilen yerli kedi ırkı. Türkiye'nin en ünlü kedi türlerinden biridir.",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Chordata",
      "class": "Mammalia",
      "order": "Carnivora",
      "family": "Felidae",
      "genus": "Felis",
      "species": "Felis catus"
    },
    "wikipedia_url": "https://tr.wikipedia.org/wiki/Van_kedisi",
    "inaturalist_url": "https://www.inaturalist.org/taxa/118552-Felis-catus",
    "observed_on": "2024-01-25",
    "location_name": "Van, Türkiye"
  },
  {
    "id": 5,
    "name": "Kelebek",
    "scientificName": "Papilio machaon",
    "location": [40.1885, 29.0610],
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Papilio_machaon_%28mounted%29.jpg/1200px-Papilio_machaon_%28mounted%29.jpg",
    "description": "Türkiye'de yaygın olarak görülen büyük kelebek türü. Çayırlarda ve bahçelerde uçarken görülebilir. Larvaları havuç familyası bitkilerle beslenir.",
    "taxonomy": {
      "kingdom": "Animalia",
      "phylum": "Arthropoda",
      "class": "Insecta",
      "order": "Lepidoptera",
      "family": "Papilionidae",
      "genus": "Papilio",
      "species": "Papilio machaon"
    },
    "wikipedia_url": "https://tr.wikipedia.org/wiki/Kırlangıç_kuyruğu",
    "inaturalist_url": "https://www.inaturalist.org/taxa/58553-Papilio-machaon",
    "observed_on": "2024-01-30",
    "location_name": "Bursa, Türkiye"
  }
];

// Real API functions
export const fetchSpeciesFromAPI = async () => {
  try {
    const response = await fetch(
      "https://api.inaturalist.org/v1/observations?per_page=100&geo=true"
    );
    const data = await response.json();
    
    return data.results
      .filter((item) => item.geojson && item.geojson.coordinates)
      .map((item) => ({
        id: item.id,
        name: item.species_guess || "Unknown Species",
        scientificName: item.taxon?.name || "Unknown Scientific Name",
        location: [item.geojson.coordinates[1], item.geojson.coordinates[0]],
        image: item.photos?.[0]?.url.replace("square", "medium") || null,
        description: item.description || null,
        taxonomy: {
          kingdom: item.taxon?.ancestors?.find(a => a.rank === 'kingdom')?.name || "null",
          phylum: item.taxon?.ancestors?.find(a => a.rank === 'phylum')?.name || "null",
          class: item.taxon?.ancestors?.find(a => a.rank === 'class')?.name || "null",
          order: item.taxon?.ancestors?.find(a => a.rank === 'order')?.name || "null",
          family: item.taxon?.ancestors?.find(a => a.rank === 'family')?.name || "null",
          genus: item.taxon?.ancestors?.find(a => a.rank === 'genus')?.name || "null",
          species: item.taxon?.name || "null"
        },
        wikipedia_url: item.taxon?.wikipedia_url || null,
        inaturalist_url: `https://www.inaturalist.org/taxa/${item.taxon?.id}` || null,
        observed_on: item.observed_on || "null",
        location_name: item.place_guess || "null"
      }));
  } catch (error) {
    console.error("API'den veri çekme hatası:", error);
    return mockSpeciesData; // Fallback to mock data
  }
};

export const searchSpecies = async (query) => {
  if (query.length < 2) return [];
  
  try {
    const response = await fetch(
      `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(query)}&per_page=8`
    );
    const data = await response.json();
    
    return data.results.map(item => ({
      id: item.id,
      name: item.preferred_common_name || item.name,
      scientificName: item.name,
      location: item.default_observation?.geojson?.coordinates ? 
        [item.default_observation.geojson.coordinates[1], item.default_observation.geojson.coordinates[0]] : 
        null,
      image: item.default_photo?.medium_url || null,
      taxonomy: {
        kingdom: item.ancestors?.find(a => a.rank === 'kingdom')?.name || "null",
        phylum: item.ancestors?.find(a => a.rank === 'phylum')?.name || "null",
        class: item.ancestors?.find(a => a.rank === 'class')?.name || "null",
        order: item.ancestors?.find(a => a.rank === 'order')?.name || "null",
        family: item.ancestors?.find(a => a.rank === 'family')?.name || "null",
        genus: item.ancestors?.find(a => a.rank === 'genus')?.name || "null",
        species: item.name || "null"
      },
      wikipedia_url: item.wikipedia_url || null,
      inaturalist_url: `https://www.inaturalist.org/taxa/${item.id}` || null,
      observed_on: "Results",
      location_name: "null"
    }));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

// Get all species (combines mock and API data)
export const getAllSpecies = async () => {
  try {
    const apiData = await fetchSpeciesFromAPI();
    return [...mockSpeciesData, ...apiData];
  } catch (error) {
    console.error("data error:", error);
    return mockSpeciesData;
  }
};
