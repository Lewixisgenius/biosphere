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
    "wikipedia_url": "https://wikipedia.org/wiki/Kızıl_tilki",
    "inaturalist_url": "https://www.inaturalist.org/taxa/42069-Vulpes-vulpes",
    "observed_on": "2024-01-15",
    "location_name": "Ankara, Türkiye",
    "threatStatus": "common",
    "isEndemic": false,
    "habitat": "Orman, çayır, şehir",
    "conservationStatus": "LC"
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
    "wikipedia_url": "https://wikipedia.org/wiki/Kızıl_şahin",
    "inaturalist_url": "https://www.inaturalist.org/taxa/5200-Buteo-rufinus",
    "observed_on": "2024-01-20",
    "location_name": "İstanbul, Türkiye",
    "threatStatus": "common",
    "isEndemic": false,
    "habitat": "Açık arazi, tepe, dağ",
    "conservationStatus": "LC"
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
    "wikipedia_url": "https://wikipedia.org/wiki/Anadolu_parsı",
    "inaturalist_url": "https://www.inaturalist.org/taxa/41963-Panthera-pardus",
    "observed_on": "2024-01-10",
    "location_name": "Antalya, Türkiye",
    "threatStatus": "threatened",
    "isEndemic": true,
    "habitat": "Dağlık orman",
    "conservationStatus": "CR"
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
    "wikipedia_url": "https://wikipedia.org/wiki/Van_kedisi",
    "inaturalist_url": "https://www.inaturalist.org/taxa/118552-Felis-catus",
    "observed_on": "2024-01-25",
    "location_name": "Van, Türkiye",
    "threatStatus": "common",
    "isEndemic": true,
    "habitat": "Van Gölü çevresi",
    "conservationStatus": "LC"
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
    "wikipedia_url": "https://wikipedia.org/wiki/Kırlangıç_kuyruğu",
    "inaturalist_url": "https://www.inaturalist.org/taxa/58553-Papilio-machaon",
    "observed_on": "2024-01-30",
    "location_name": "Bursa, Türkiye",
    "threatStatus": "common",
    "isEndemic": false,
    "habitat": "Çayır, bahçe",
    "conservationStatus": "LC"
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
          kingdom: item.taxon?.ancestors?.find(a => a.rank === 'kingdom')?.name || "Unknown",
          phylum: item.taxon?.ancestors?.find(a => a.rank === 'phylum')?.name || "Unknown",
          class: item.taxon?.ancestors?.find(a => a.rank === 'class')?.name || "Unknown",
          order: item.taxon?.ancestors?.find(a => a.rank === 'order')?.name || "Unknown",
          family: item.taxon?.ancestors?.find(a => a.rank === 'family')?.name || "Unknown",
          genus: item.taxon?.ancestors?.find(a => a.rank === 'genus')?.name || "Unknown",
          species: item.taxon?.name || "Unknown"
        },
        wikipedia_url: item.taxon?.wikipedia_url || null,
        inaturalist_url: `https://www.inaturalist.org/taxa/${item.taxon?.id}` || null,
        observed_on: item.observed_on || "Unknown Date",
        location_name: item.place_guess || "Unknown Location",
        threatStatus: "common",
        isEndemic: false,
        habitat: "Unknown",
        conservationStatus: "LC"
      }));
  } catch (error) {
    console.error("API Loading Error:", error);
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
        kingdom: item.ancestors?.find(a => a.rank === 'kingdom')?.name || "Unknown",
        phylum: item.ancestors?.find(a => a.rank === 'phylum')?.name || "Unknown",
        class: item.ancestors?.find(a => a.rank === 'class')?.name || "Unknown",
        order: item.ancestors?.find(a => a.rank === 'order')?.name || "Unknown",
        family: item.ancestors?.find(a => a.rank === 'family')?.name || "Unknown",
        genus: item.ancestors?.find(a => a.rank === 'genus')?.name || "Unknown",
        species: item.name || "Unknown"
      },
      wikipedia_url: item.wikipedia_url || null,
      inaturalist_url: `https://www.inaturalist.org/taxa/${item.id}` || null,
      observed_on: "Results",
      location_name: "Unknown",
      threatStatus: "common",
      isEndemic: false,
      habitat: "Unknown",
      conservationStatus: "LC"
    }));
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
};

// Get all species (combines mock and API data)
export const getAllSpecies = async () => {
  try {
    const apiData = await fetchSpeciesFromAPI();
    return [...mockSpeciesData, ...apiData];
  } catch (error) {
    console.error("Data Loading Error:", error);
    return mockSpeciesData;
  }
};

// Filter species based on criteria
export const filterSpecies = (speciesList, filters) => {
  return speciesList.filter(species => {
    // Category filter
    if (filters.category !== 'all' && species.taxonomy?.class !== filters.category) {
      return false;
    }

    // Region filter
    if (filters.region !== 'all' && !species.location_name?.includes(filters.region)) {
      return false;
    }

    // Threat status filter
    if (filters.threatStatus !== 'all') {
      if (filters.threatStatus === 'endemic' && !species.isEndemic) {
        return false;
      }
      if (filters.threatStatus === 'threatened' && species.threatStatus !== 'threatened') {
        return false;
      }
      if (filters.threatStatus === 'common' && species.threatStatus !== 'common') {
        return false;
      }
    }

    // Text search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesName = species.name?.toLowerCase().includes(searchLower);
      const matchesScientific = species.scientificName?.toLowerCase().includes(searchLower);
      const matchesDescription = species.description?.toLowerCase().includes(searchLower);
      
      if (!matchesName && !matchesScientific && !matchesDescription) {
        return false;
      }
    }

    // Special filters
    if (filters.showEndemic && !species.isEndemic) {
      return false;
    }

    if (filters.showThreatened && species.threatStatus !== 'threatened') {
      return false;
    }

    return true;
  });
};

// Export data functions
export const exportToCSV = (speciesList) => {
  const headers = [
    'ID', 'Name', 'Scientific Name', 'Latitude', 'Longitude', 
    'Location', 'Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species',
    'Threat Status', 'Endemic', 'Habitat', 'Conservation Status', 'Observation Date'
  ];

  const csvContent = [
    headers.join(','),
    ...speciesList.map(species => [
      species.id,
      `"${species.name}"`,
      `"${species.scientificName}"`,
      species.location?.[0] || '',
      species.location?.[1] || '',
      `"${species.location_name}"`,
      species.taxonomy?.kingdom || '',
      species.taxonomy?.phylum || '',
      species.taxonomy?.class || '',
      species.taxonomy?.order || '',
      species.taxonomy?.family || '',
      species.taxonomy?.genus || '',
      species.taxonomy?.species || '',
      species.threatStatus || '',
      species.isEndemic ? 'Yes' : 'No',
      `"${species.habitat}"`,
      species.conservationStatus || '',
      species.observed_on || ''
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `biosphere_species_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (speciesList) => {
  const dataStr = JSON.stringify(speciesList, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `biosphere_species_${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Observation submission
export const submitObservation = async (observation) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would send to your backend
    console.log('Observation submitted:', observation);
    
    return {
      success: true,
      id: Date.now(),
      message: 'Observation successfully sent'
    };
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error');
  }
};

// Get species statistics
export const getSpeciesStats = (speciesList) => {
  const stats = {
    total: speciesList.length,
    byClass: {},
    byThreatStatus: {},
    endemic: 0,
    threatened: 0,
    common: 0
  };

  speciesList.forEach(species => {
    // By class
    const className = species.taxonomy?.class || 'Unknown';
    stats.byClass[className] = (stats.byClass[className] || 0) + 1;

    // By threat status
    const threatStatus = species.threatStatus || 'unknown';
    stats.byThreatStatus[threatStatus] = (stats.byThreatStatus[threatStatus] || 0) + 1;

    // Count endemic and threatened
    if (species.isEndemic) stats.endemic++;
    if (species.threatStatus === 'threatened') stats.threatened++;
    if (species.threatStatus === 'common') stats.common++;
  });

  return stats;
};

// Share data via URL
export const generateShareableURL = (filters, selectedSpecies) => {
  const params = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '' && value !== false) {
        params.append(key, value);
      }
    });
  }
  
  if (selectedSpecies) {
    params.append('species', selectedSpecies.id);
  }
  
  const baseURL = window.location.origin + window.location.pathname;
  return params.toString() ? `${baseURL}?${params.toString()}` : baseURL;
};

// Parse shared URL parameters
export const parseSharedURL = () => {
  const params = new URLSearchParams(window.location.search);
  const filters = {};
  let selectedSpeciesId = null;
  
  params.forEach((value, key) => {
    if (key === 'species') {
      selectedSpeciesId = parseInt(value);
    } else {
      filters[key] = value;
    }
  });
  
  return { filters, selectedSpeciesId };
};

