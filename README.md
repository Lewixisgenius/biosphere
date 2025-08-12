# 🌍 Biosphere - Türkiye Biyosfer Haritası

Türkiye'deki canlı türlerini interaktif harita üzerinde görüntüleyen modern web uygulaması.

## ✨ Özellikler

### 🗺️ Harita Özellikleri
- **Full ekran harita** (Leaflet ile)
- **Tür marker'ları** - Her tür için konum işaretleyicisi
- **Otomatik zoom** - Seçilen türe otomatik yakınlaştırma
- **Koyu tema** - Göz yormayan karanlık arayüz

### 🔍 Arama Sistemi
- **Akıllı arama** - Minimum 2 harften sonra öneri listesi
- **Gerçek zamanlı sonuçlar** - iNaturalist API entegrasyonu
- **Hover efektleri** - Öneriler üzerinde gezinme
- **Otomatik zoom** - Seçilen türe haritada odaklanma

### 📱 Mobil Uyumluluk
- **Responsive tasarım** - Tüm cihazlarda mükemmel görünüm
- **Mobil optimizasyon** - Dokunmatik cihazlar için optimize edilmiş
- **Adaptif layout** - Ekran boyutuna göre otomatik düzenleme

### 🧾 Tür Kartları
- **Detaylı bilgiler** - Tür adı, latince adı, taksonomi
- **Görsel içerik** - Yüksek kaliteli tür fotoğrafları
- **Wikipedia entegrasyonu** - Otomatik özet çekme
- **Kaynak linkleri** - Wikipedia ve iNaturalist bağlantıları

## 🚀 Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar
```bash
# Projeyi klonlayın
git clone <repository-url>
cd biosphere

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Tarayıcıda açın
# http://localhost:5173
```

## 🏗️ Proje Yapısı

```
src/
├── components/
│   └── SpeciesCard.jsx      # Tür bilgi kartı bileşeni
├── pages/
│   └── Home.jsx            # Ana sayfa
├── services/
│   └── api.js              # API servisleri ve mock veri
├── App.jsx                 # Ana uygulama bileşeni
├── MapView.jsx             # Harita görünümü
├── SearchBar.jsx           # Arama çubuğu
└── main.jsx               # Uygulama giriş noktası
```

## 📊 Veri Yapısı

### Tür Verisi Örneği
```json
{
  "id": 1,
  "name": "Kızıl tilki",
  "scientificName": "Vulpes vulpes",
  "location": [39.9255, 32.8663],
  "image": "https://example.com/vulpes.jpg",
  "description": "Türkiye'de yaygın bir memeli...",
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
}
```

## 🔧 Teknolojiler

- **React 19** - Modern React hooks ve fonksiyonel bileşenler
- **Vite** - Hızlı geliştirme ve build aracı
- **Leaflet** - İnteraktif harita kütüphanesi
- **React Leaflet** - React için Leaflet wrapper'ı
- **iNaturalist API** - Gerçek zamanlı tür verileri
- **Wikipedia API** - Tür açıklamaları

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Arka plan**: `#121212` (Koyu gri)
- **Kart arka planı**: `#1e1e1e` (Orta gri)
- **Vurgu rengi**: `#4ea8de` (Mavi)
- **Metin**: `#eee` (Açık gri)

### Responsive Breakpoint'ler
- **Mobil**: ≤ 768px
- **Tablet**: 769px - 1024px
- **Desktop**: > 1024px

## 🔮 Gelecek Planları

### Kısa Vadeli
- [ ] Tür filtreleme sistemi
- [ ] Kategori bazlı görünüm
- [ ] Favori türler listesi
- [ ] Offline mod desteği

### Orta Vadeli
- [ ] iNaturalist gerçek zamanlı bağlantı
- [ ] Tür öneri sistemi (ML)
- [ ] Katmanlar: endemik, tehdit altında
- [ ] Çoklu dil desteği

### Uzun Vadeli
- [ ] Gözlem formu
- [ ] Kullanıcı katkı sistemi
- [ ] Admin kontrol paneli
- [ ] CSV çıktı sistemi

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Proje**: [GitHub Repository](https://github.com/username/biosphere)
- **E-posta**: your.email@example.com

---

**Not**: Bu uygulama eğitim amaçlı geliştirilmiştir ve gerçek veriler için iNaturalist API kullanmaktadır.
