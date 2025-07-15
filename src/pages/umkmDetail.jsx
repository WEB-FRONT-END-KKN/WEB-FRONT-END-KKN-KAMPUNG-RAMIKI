import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaWhatsapp, FaFacebook } from 'react-icons/fa';

// --- Helper function baru untuk mengambil gambar sebagai data & membuat URL ---
const getGoogleDriveImageAsBlobUrl = async (url) => {
    if (!url || typeof url !== 'string') return null; // Kembalikan null jika URL tidak valid

    // Ekstrak ID file dari URL Google Drive
    const fileIdMatch = url.match(/id=([^&]+)/);
    if (!fileIdMatch || !fileIdMatch[1]) return null; // Kembalikan null jika tidak ada ID
    
    const fileId = fileIdMatch[1];
    // URL ini untuk men-download konten file secara langsung
    const downloadUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

    try {
        // 1. Lakukan GET request dengan axios untuk mendapatkan gambar sebagai blob
        const response = await axios.get(downloadUrl, { responseType: 'blob' });
        
        // 2. Buat Object URL dari blob yang diterima
        const blobUrl = URL.createObjectURL(response.data);
        
        // 3. Kembalikan URL yang bisa dipakai oleh <img>
        return blobUrl;
    } catch (error) {
        console.error(`Gagal mengambil gambar dari Google Drive: ${url}`, error);
        return null; // Kembalikan null jika terjadi error
    }
};

// --- Helper function untuk membuat slug ---
const createSlug = (sellerName, title) => {
    if (!sellerName || !title) return '';
    const sellerSlug = sellerName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const titleSlug = title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `${sellerSlug}<>${titleSlug}`;
};


export default function UmkmDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState(0);

    useEffect(() => {
        const SPREADSHEET_ID = '12EGp8r-dF8FQujkSFip5HxlDazz1VJSfq8Uaki-zlqc';
        const API_KEY = 'AIzaSyCcHVF-YTiEhhfZUDsN8o-95EqAuKSyM9E';

        const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Form Responses 1?key=${API_KEY}`;
        
        // Buat fungsi async untuk mengelola semua proses
        const fetchAndProcessData = async () => {
            try {
                // Ambil data dari spreadsheet
                const response = await axios.get(spreadsheetUrl);
                const rows = response.data.values.slice(1);

                // Buat array promise untuk memproses setiap baris secara asinkron
                const dataPromises = rows.map(async (row) => {
                    const [
                        , sellerName, sellerImageRaw, whatsapp, facebook,
                        title, description, category, imageRaw, imagesRaw
                    ] = row;
                    
                    // Promise untuk mengambil setiap gambar
                    const sellerImagePromise = getGoogleDriveImageAsBlobUrl(sellerImageRaw);
                    const imagePromise = getGoogleDriveImageAsBlobUrl(imageRaw);
                    const galleryImagesPromises = imagesRaw
                        ? imagesRaw.split(',').map(url => getGoogleDriveImageAsBlobUrl(url.trim()))
                        : [];
                    
                    // Tunggu semua promise gambar selesai
                    const [sellerImage, image, ...galleryImages] = await Promise.all([
                        sellerImagePromise,
                        imagePromise,
                        ...galleryImagesPromises
                    ]);

                    const images = [image, ...galleryImages.filter(img => img && img !== image)];
                    const productSlug = createSlug(sellerName, title);

                    return {
                        sellerName, sellerImage, whatsapp, facebook: facebook || null,
                        title, description, category, image, images, slug: productSlug,
                    };
                });

                // Tunggu semua baris data selesai diproses
                const parsedData = await Promise.all(dataPromises);

                const foundProduct = parsedData.find(p => p.slug === slug);
                setProduct(foundProduct);

            } catch (err) {
                console.error("Gagal memuat atau memproses data:", err);
                setError("Gagal memuat data produk. Pastikan URL dan API Key benar.");
            } finally {
                setLoading(false);
            }
        };

        fetchAndProcessData();

        // Cleanup function untuk menghapus Object URL saat komponen dilepas
        // Ini penting untuk mencegah memory leak di browser
        return () => {
            if (product && product.images) {
                product.images.forEach(URL.revokeObjectURL);
                if (product.sellerImage) {
                    URL.revokeObjectURL(product.sellerImage);
                }
            }
        };
    }, [slug]); // Dependensi slug dan product untuk cleanup

    // ... (sisa kode JSX untuk tampilan tidak berubah)
    if (loading) {
        return <div className="text-center py-20">Memuat data dan gambar produk...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    if (!product) {
        return <div className="text-center py-10">Produk tidak ditemukan atau URL salah.</div>;
    }

    const handleNext = () => {
        setMainImage((prev) => (prev + 1) % product.images.length);
    };

    const handlePrev = () => {
        setMainImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className="container mx-auto py-10 px-6">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Galeri Gambar */}
                <div className="w-full lg:w-2/3">
                    <div className="relative mb-4">
                        <img src={product.images[mainImage]} alt={product.title} className="w-full h-96 object-cover rounded-lg shadow-lg bg-gray-200" />
                        <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white">
                            <FaChevronLeft size={24} />
                        </button>
                        <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white">
                            <FaChevronRight size={24} />
                        </button>
                    </div>
                    <div className="flex gap-2 justify-center flex-wrap">
                        {product.images.map((img, idx) => (
                           img && <img
                                key={idx}
                                src={img}
                                alt={`thumb-${idx}`}
                                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${mainImage === idx ? 'border-blue-500' : 'border-transparent'}`}
                                onClick={() => setMainImage(idx)}
                            />
                        ))}
                    </div>
                </div>

                {/* Deskripsi dan Info Penjual */}
                <div className="w-full lg:w-1/3">
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    {product.category && (
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">{product.category}</span>
                    )}
                    <p className="text-gray-700 my-6">{product.description}</p>

                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img src={product.sellerImage} alt={product.sellerName} className="w-16 h-16 rounded-full object-cover border-2 border-green-500 bg-gray-300" />
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold">{product.sellerName}</h3>
                                <p className="text-gray-600">Penjual</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <a href={`https://wa.me/${product.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">
                                <FaWhatsapp size={20} />
                                <span>Hubungi via WhatsApp</span>
                            </a>
                            {product.facebook && (
                                <a href={product.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                                    <FaFacebook size={20} />
                                    <span>Lihat di Facebook</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}