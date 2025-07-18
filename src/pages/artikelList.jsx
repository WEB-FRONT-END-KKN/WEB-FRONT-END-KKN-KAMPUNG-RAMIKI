import React, { useEffect, useState } from 'react';
import ArtikelCard from '../components/card/artikelCard';
import axios from 'axios';
import { Link } from "react-router-dom";

const spreadsheetId = '10oEozEsvF41EpVQEcZaaFOsOSc6YRwiPl_HHKPxrqgI';
const apiKey = 'AIzaSyCcHVF-YTiEhhfZUDsN8o-95EqAuKSyM9E';

export default function ArtikelList() {
  const [artikelData, setArtikelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('terbaru');
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Form Responses 1?key=${apiKey}`;

    axios.get(spreadsheetUrl).then((response) => {
      const rows = response.data.values.slice(1); // Hapus header
      const parsedData = rows.map((row) => {
        const [timestamp, namaPenulis, judulBerita, gambarKontent, kontenBerita] = row;
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
        };
      });

      setArtikelData(parsedData);
    }).finally(() => setLoading(false));
  }, []);

  // Filter dan sort
  const filtered = artikelData.filter(item =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.content?.toLowerCase().includes(search.toLowerCase()) ||
    item.namaPenulis?.toLowerCase().includes(search.toLowerCase())
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
      {/* Search & Sort */}
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
