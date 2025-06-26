import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

const spreadsheetId = '10oEozEsvF41EpVQEcZaaFOsOSc6YRwiPl_HHKPxrqgI';
const apiKey = 'AIzaSyCcHVF-YTiEhhfZUDsN8o-95EqAuKSyM9E';

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
                const [timestamp, namaPenulis, judulBerita, gambarKontent, kontenBerita] = row;
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
                        console.log("Response from Google Drive:", res);
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
                <div className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                    {artikel.date}
                    <span className="mx-1">•</span>
                    By {artikel.namaPenulis}
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {artikel.content}
                </div>
            </div>
        </div>
    );
}
