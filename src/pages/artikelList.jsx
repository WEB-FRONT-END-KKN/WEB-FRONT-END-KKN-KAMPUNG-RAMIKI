import React, { useEffect, useState } from 'react';
import ArtikelCard from '../components/card/artikelCard';
// import process from 'dotenv'
import axios from 'axios';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID_ARTIKEL;
const apiKey = import.meta.env.VITE_API_KEY;


export default function ArtikelList() {
  const [artikelData, setArtikelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('terbaru');
  const [visibleCount, setVisibleCount] = useState(10);
  const [category, setCategory] = useState('semua');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Form Responses 1?key=${apiKey}`;

    axios.get(spreadsheetUrl).then((response) => {
      const rows = response.data.values.slice(1); // Hapus header
      const parsedData = rows.map((row) => {
        const [timestamp, namaPenulis, judulBerita, gambarKontent, kontenBerita, kategori] = row;
        const date = timestamp ? timestamp.split(' ')[0] : '';
        const images = gambarKontent
          ? gambarKontent.split(',').map(img => img.trim())
          : [];
        // Buat slug dari judul
        const slug = judulBerita
          ? judulBerita.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          : '';
        return {
          date,
          namaPenulis,
          title: judulBerita,
          images,
          content: kontenBerita,
          slug,
          kategori: kategori || 'Tanpa Kategori'
        };
      });

      setArtikelData(parsedData);

      // Ambil kategori unik
      const kategoriSet = new Set(parsedData.map(item => item.kategori).filter(Boolean));
      setCategories(['semua', ...Array.from(kategoriSet)]);
    }).finally(() => setLoading(false));
  }, []);

  // Filter dan sort
  const filtered = artikelData.filter(item =>
    (category === 'semua' || item.kategori === category) &&
    (
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.content?.toLowerCase().includes(search.toLowerCase()) ||
      item.namaPenulis?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'terlama') {
      return new Date(a.date) - new Date(b.date);
    }
    if (sort === 'terbaru') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sort === 'a-z') {
      return a.title.localeCompare(b.title);
    }
    if (sort === 'z-a') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const visibleArtikel = sorted.slice(0, visibleCount);

  if (loading) {
    return <div className="text-center py-10">Memuat artikel...</div>;
  }

  return (
    <div className="w-4/5 mx-auto py-8">
      <Helmet>
        <title>Daftar Artikel Kampung Ramiki | UMKM & Koperasi</title>
        <meta name="description" content="Kumpulan artikel terbaru tentang UMKM, koperasi, potensi lokal, dan kegiatan KKN di Kampung Ramiki, Teluk Wondama, Papua Barat." />
        <meta name="keywords" content="Artikel, Kampung Ramiki, UMKM, Koperasi, Teluk Wondama, Papua Barat, KKN, Berita, Potensi Lokal" />
        <meta property="og:title" content="Daftar Artikel Kampung Ramiki" />
        <meta property="og:description" content="Kumpulan artikel terbaru tentang UMKM, koperasi, potensi lokal, dan kegiatan KKN di Kampung Ramiki, Teluk Wondama, Papua Barat." />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Search & Sort & Category */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Cari artikel..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/2"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="terbaru">Terbaru</option>
          <option value="terlama">Terlama</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          {categories.map((cat, idx) => (
            <option value={cat} key={idx}>
              {cat === 'semua' ? 'Semua Kategori' : `Kategori: ${cat}`}
            </option>
          ))}
        </select>
      </div>
      {/* Artikel List */}
      {visibleArtikel.map((item) => (
        <Link to={`/artikel/${item.slug}`} key={item.slug}>
          <ArtikelCard
            image={item.images[0]}
            title={item.title}
            excerpt={item.content?.length > 80 ? item.content.slice(0, 80) + '...' : item.content}
            date={item.date}
            author={item.namaPenulis}
            kategori={item.kategori} // Tambahkan ini
          />
        </Link>
      ))}
      {/* Lihat lebih banyak */}
      {visibleCount < sorted.length && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
            onClick={() => setVisibleCount(visibleCount + 10)}
          >
            Lihat Lebih Banyak
          </button>
        </div>
      )}
    </div>
  );
}
