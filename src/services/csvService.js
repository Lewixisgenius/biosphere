// services/csvService.js
import Papa from 'papaparse'; // papaparse kütüphanesini kullanıyoruz

// CSV dosyasını okuyup işleyen fonksiyon
export const getAllSpeciesFromCSV = async (filePath) => {
    return new Promise((resolve, reject) => {
        Papa.parse(filePath, {
            download: true, // Dosyayı indirir (public klasöründen)
            header: true, // İlk satırı başlık olarak kullanır
            dynamicTyping: true, // Sayısal verileri otomatik olarak sayıya dönüştürür
            complete: (results) => {
                // Veriyi haritada kullanmak için düzenle
                const speciesData = results.data.map((item, index) => ({
                    id: item.gbifID || index, // Eşsiz bir ID oluştur
                    name: item.species || "Bilinmiyor",
                    scientificName: item.scientificName || "Bilinmiyor",
                    location_name: item.locality || "",
                    isEndemic: false, // Örnek için sabit bir değer
                    location: [
                        item.decimalLatitude, 
                        item.decimalLongitude
                    ],
                    // Diğer verileri de ekleyebilirsiniz
                    ...item
                })).filter(species => species.location[0] && species.location[1]); // Geçerli koordinatları olmayanları filtrele
                
                resolve(speciesData);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
};

// Diğer fonksiyonlar (değişiklik yok)
export const filterSpecies = (speciesList, filters) => {
    // Filtreleme mantığınız burada
    return speciesList.filter(species => {
        const searchTermMatch = filters.searchTerm === '' ||
                                species.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                                species.scientificName.toLowerCase().includes(filters.searchTerm.toLowerCase());
        
        // Diğer filtreleme koşullarını ekleyebilirsiniz
        return searchTermMatch;
    });
};

export const submitObservation = async (observation) => {
    // Bu kısım, API'ye gözlem gönderme mantığına sahip olduğu için şimdilik boş bırakıldı veya örnek bir değer döndürüldü.
    return { success: true, message: "Observation submitted locally." };
};

export const exportToCSV = (data) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "filtered_species.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

export const exportToJSON = (data) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "filtered_species.json");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

export const generateShareableURL = (filters, selectedSpecies) => {
    const params = new URLSearchParams();
    if (filters.searchTerm) params.set('search', filters.searchTerm);
    if (selectedSpecies) params.set('speciesId', selectedSpecies.id);
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
};

export const parseSharedURL = () => {
    const params = new URLSearchParams(window.location.search);
    const filters = {};
    if (params.get('search')) filters.searchTerm = params.get('search');
    const selectedSpeciesId = params.get('speciesId');
    return { filters, selectedSpeciesId };
};