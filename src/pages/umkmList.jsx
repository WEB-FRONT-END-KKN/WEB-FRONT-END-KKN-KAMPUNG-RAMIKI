
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import UmkmCard from '../components/card/umkmCard';

// Helper function untuk mengambil URL gambar dari Google Drive
const getGoogleDriveImageUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    const fileIdMatch = url.match(/id=([^&]+)/);
    if (!fileIdMatch || !fileIdMatch[1]) return url;
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/uc?id=${fileId}`;
};

export default function UmkmList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('terbaru');
    const [visibleCount, setVisibleCount] = useState(9); // Tampilkan 9 produk awal
    const observer = useRef();

    useEffect(() => {
        const SPREADSHEET_ID = '12EGp8r-dF8FQujkSFip5HxlDazz1VJSfq8Uaki-zlqc';
        const API_KEY = 'AIzaSyCcHVF-YTiEhhfZUDsN8o-95EqAuKSyM9E';
        const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Form Responses 1?key=${API_KEY}`;

        const fetchAndProcessData = async () => {
            try {
                const response = await axios.get(spreadsheetUrl);
                const rows = response.data.values.slice(1);
                const dataPromises = rows.map(async (row) => {
                    const [
                        timestamp, sellerName, sellerImageRaw, whatsapp, _facebook,
                        title, description, _category, imageRaw, _imagesRaw
                    ] = row;

                    const sellerImage = getGoogleDriveImageUrl(sellerImageRaw);
                    const image = getGoogleDriveImageUrl(imageRaw);

                    if (sellerName && title && image) {
                        return {
                            timestamp, sellerName, sellerImage, whatsapp, title, description, image,
                        };
                    }
                    return null;
                });

                const parsedData = (await Promise.all(dataPromises)).filter(Boolean);
                setProducts(parsedData);

            } catch (err) {
                setError("Gagal memuat data produk. " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAndProcessData();
    }, []);

    // Filter dan sort
    const filtered = products.filter(item =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.sellerName?.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
        if (sort === 'terlama') {
            return new Date(a.timestamp) - new Date(b.timestamp);
        }
        if (sort === 'terbaru') {
            return new Date(b.timestamp) - new Date(a.timestamp);
        }
        if (sort === 'a-z') {
            return a.title.localeCompare(b.title);
        }
        if (sort === 'z-a') {
            return b.title.localeCompare(a.title);
        }
        return 0;
    });

    const visibleProducts = sorted.slice(0, visibleCount);

    const lastProductElementRef = (node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && visibleCount < sorted.length) {
                setVisibleCount(prevVisibleCount => prevVisibleCount + 6); // Tambah 6 produk
            }
        });
        if (node) observer.current.observe(node);
    };

    if (loading) {
        return <div className="text-center py-10">Memuat produk...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="w-4/5 mx-auto py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Daftar UMKM Kampung Ramiki</h1>
            {/* Search & Sort */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                <input
                    type="text"
                    placeholder="Cari produk atau penjual..."
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
            {/* UMKM List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleProducts.map((item, index) => (
                    <div ref={visibleProducts.length === index + 1 ? lastProductElementRef : null} key={`${item.slug}-${index}`}>
                        <UmkmCard
                            image={item.image}
                            title={item.title}
                            sellerImage={item.sellerImage}
                            sellerName={item.sellerName}
                            description={item.description}
                        />
                    </div>
                ))}
            </div>
            {visibleCount >= sorted.length && (
                <p className="text-center text-gray-500 mt-8">-- Anda telah mencapai akhir daftar --</p>
            )}
        </div>
    );
}