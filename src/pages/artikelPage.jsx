import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import { Helmet } from 'react-helmet'; // Tambahkan ini

const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID_ARTIKEL;
const apiKey = import.meta.env.VITE_API_KEY;

export default function ArtikelPage() {
    const { nama } = useParams();
    const [artikel, setArtikel] = useState(null);
    const [current, setCurrent] = useState(0);
    const [imgSrcList, setImgSrcList] = useState([]);

    useEffect(() => {
        const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Form Responses 1?key=${apiKey}`;
        axios.get(spreadsheetUrl).then((response) => {
            const rows = response.data.values.slice(1);
            const parsedData = rows.map((row) => {
                const [timestamp, namaPenulis, judulBerita, gambarKontent, kontenBerita, kategori] = row;
                const date = timestamp ? timestamp.split(' ')[0] : '';
                const images = gambarKontent
                    ? gambarKontent.split(',').map(img => img.trim())
                    : [];
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
            const found = parsedData.find(a => a.slug === nama);
            setArtikel(found);
        });
    }, [nama]);

    useEffect(() => {
        if (!artikel || !artikel.images) {
            setImgSrcList([]);
            return;
        }
        // Ambil semua gambar (maksimal 5)
        const fetchImages = async () => {
            const promises = artikel.images.slice(0, 5).map(async (img) => {
                const match = img && img.match(/id=([a-zA-Z0-9_-]+)/);
                if (match) {
                    const fileId = match[1];
                    try {
                        const res = await axios.get(
                            `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`,
                            { responseType: 'blob', timeout: 3000 }
                        );
                        return URL.createObjectURL(res.data);
                    } catch {
                        return null;
                    }
                }
                return img;
            });
            const results = await Promise.all(promises);
            setImgSrcList(results.filter(Boolean));
        };
        fetchImages();
    }, [artikel]);

    if (!artikel) {
        return <div className="text-center py-10">Artikel tidak ditemukan.</div>;
    }

    const nextImage = () => setCurrent((current + 1) % imgSrcList.length);
    const prevImage = () => setCurrent((current - 1 + imgSrcList.length) % imgSrcList.length);

    return (
        <>
            <Helmet>
                <title>{artikel?.title ? artikel.title + " | Kampung Ramiki" : "Artikel | Kampung Ramiki"}</title>
                <meta name="description" content={artikel?.content?.slice(0, 150) || "Artikel Kampung Ramiki"} />
                <meta name="keywords" content={`Kampung Ramiki, Artikel, ${artikel?.title || ""}, ${artikel?.namaPenulis || ""}`} />
                <meta property="og:title" content={artikel?.title || "Artikel Kampung Ramiki"} />
                <meta property="og:description" content={artikel?.content?.slice(0, 150) || "Artikel Kampung Ramiki"} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={artikel?.images?.[0] || ""} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": artikel?.title,
                        "image": artikel?.images?.[0] || "",
                        "datePublished": artikel?.date,
                        "author": {
                            "@type": "Person",
                            "name": artikel?.namaPenulis
                        },
                        "description": artikel?.content?.slice(0, 150) || ""
                    })}
                </script>
            </Helmet>
            <div className="flex justify-center py-8 bg-gray-50 min-h-screen">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6">
                    {/* Carousel */}
                    <div className="relative flex justify-center items-center mb-6 min-h-80">
                        {imgSrcList.length === 0 ? (
                            <span className="loading loading-infinity loading-lg text-primary"></span>
                        ) : (
                            <>
                                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10" aria-label="Sebelumnya">
                                    <FaChevronLeft className="text-2xl" />
                                </button>
                                <img
                                    src={imgSrcList[current]}
                                    alt={`Galeri ${current + 1}`}
                                    className="rounded-lg object-cover w-full max-h-80"
                                />
                                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10" aria-label="Selanjutnya">
                                    <FaChevronRight className="text-2xl" />
                                </button>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                    {imgSrcList.map((_, idx) => (
                                        <span
                                            key={idx}
                                            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-blue-500' : 'bg-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{artikel.title}</h1>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {artikel.kategori && (
                            <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold">
                                {artikel.kategori}
                            </span>
                        )}
                        <span className="text-gray-500 text-sm flex items-center gap-2">
                            {artikel.date}
                            <span className="mx-1">•</span>
                            By {artikel.namaPenulis}
                        </span>
                    </div>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {artikel.content}
                    </div>
                </div>
            </div>
        </>
    );
}
