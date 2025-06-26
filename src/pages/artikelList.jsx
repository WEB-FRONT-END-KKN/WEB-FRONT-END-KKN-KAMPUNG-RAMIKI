import React, { useEffect, useState } from 'react';
import ArtikelCard from '../components/card/artikelCard';
import axios from 'axios';
import { Link } from "react-router-dom";

const spreadsheetId = '10oEozEsvF41EpVQEcZaaFOsOSc6YRwiPl_HHKPxrqgI';
const apiKey = 'AIzaSyCcHVF-YTiEhhfZUDsN8o-95EqAuKSyM9E';

export default function ArtikelList() {
  const [artikelData, setArtikelData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center py-10">Memuat artikel...</div>;
  }

  return (
    <div className="w-4/5 mx-auto py-8">
      {artikelData.map((item) => (
        <Link to={`/artikel/${item.slug}`} key={item.slug}>
          <ArtikelCard
            image={item.images[0]}
            title={item.title}
            excerpt={item.content?.slice(0, 80) + '...'}
            date={item.date}
            author={item.namaPenulis}
          />
        </Link>
      ))}
    </div>
  );
}
