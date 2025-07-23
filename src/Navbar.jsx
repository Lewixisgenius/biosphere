function Navbar() {
  return (
    <nav className="bg-gray-950 text-white p-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold">🌿 Ekosistem Haritası</div>
      <div className="text-sm text-gray-400 hidden sm:block">
        Türlerin yaşadığı bölgeleri keşfedin
      </div>
    </nav>
  );
}

export default Navbar;
