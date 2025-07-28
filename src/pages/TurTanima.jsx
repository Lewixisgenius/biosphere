import { useState } from "react";

export default function TurTanima() {
  const [file, setFile] = useState(null);
  const [sonuc, setSonuc] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Lütfen bir resim seçin.");

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/tanit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setSonuc(data.results || []);
    } catch (err) {
      alert("Hata: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📷 Görüntüden Tür Tanıma</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="block"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Tanı
        </button>
      </form>

      {loading && <p className="mt-4">İşleniyor...</p>}

      <div className="mt-6 space-y-4">
        {sonuc.slice(0, 5).map((result, i) => (
          <div key={i} className="p-4 border rounded shadow">
            <h3 className="font-semibold">
              {i + 1}. {result.species.scientificName} (
              {(result.score * 100).toFixed(2)}%)
            </h3>
            <p>
              <strong>Familya:</strong>{" "}
              {result.species.family?.scientificName || "Bilinmiyor"}
            </p>
            <p>
              <strong>Cins:</strong>{" "}
              {result.species.genus?.scientificName || "Bilinmiyor"}
            </p>
            <p>
              <strong>Yerel İsimler:</strong>{" "}
              {result.species.commonNames?.join(", ") || "Yok"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
