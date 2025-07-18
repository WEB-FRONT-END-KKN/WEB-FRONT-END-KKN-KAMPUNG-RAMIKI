import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import UmkmCard from '../components/card/umkmCard'
import { useMediaQuery } from 'react-responsive';

// --- Helper function untuk mengambil gambar sebagai data & membuat URL ---
const getGoogleDriveImageAsBlobUrl = async (url) => {
    if (!url || typeof url !== 'string') return '';
    const fileIdMatch = url.match(/id=([^&]+)/);
    if (!fileIdMatch || !fileIdMatch[1]) return url;
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/uc?id=${fileId}`;
};

export default function UmkmPage() {
    // Contoh data struktur koperasi
    const strukturKoperasi = [
        {
            foto: "/assets/ketua.jpg",
            jabatan: "Ketua",
            nama: "Andi Saputra"
        },
        {
            foto: "/assets/sekretaris.jpg",
            jabatan: "Sekretaris",
            nama: "Siti Aminah"
        },
        {
            foto: "/assets/bendahara.jpg",
            jabatan: "Bendahara",
            nama: "Joko Santoso"
        }
    ];

    // State untuk data UMKM yang akan diambil dari API
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const SPREADSHEET_ID = '12EGp8r-dF8FQujkSFip5HxlDazz1VJSfq8Uaki-zlqc';
        const API_KEY = 'AIzaSyCcHVF-YTiEhhfZUDsN8o-95EqAuKSyM9E'; // Ganti dengan API Key Anda
        const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Form Responses 1?key=${API_KEY}`;

        const fetchAndProcessData = async () => {
            try {
                const response = await axios.get(spreadsheetUrl);
                const rows = response.data.values.slice(1);
                console.log("Data dari spreadsheet:", rows);
                const dataPromises = rows.map(async (row) => {
                    const [
                        _timestamp, sellerName, sellerImageRaw, whatsapp, _facebook,
                        title, description, _category, imageRaw, _imagesRaw
                    ] = row;

                    const sellerImagePromise = getGoogleDriveImageAsBlobUrl(sellerImageRaw);
                    const imagePromise = getGoogleDriveImageAsBlobUrl(imageRaw);

                    const [sellerImage, image] = await Promise.all([sellerImagePromise, imagePromise]);

                    // Hanya return produk yang valid (punya nama, judul, dan gambar utama)
                    if (sellerName && title && image) {
                        return {
                            sellerName, sellerImage, whatsapp, title, description, image,
                        };
                    }
                    return null;
                });

                const parsedData = (await Promise.all(dataPromises)).filter(Boolean); // Hapus produk yang null
                setProducts(parsedData);

            } catch (err) {
                console.error("Gagal memuat atau memproses data:", err);
                setError("Gagal memuat data produk. Pastikan URL dan API Key benar.");
            } finally {
                setLoading(false);
            }
        };

        fetchAndProcessData();

        // Cleanup function untuk mencegah memory leak
        return () => {
            products.forEach(p => {
                if (p.image) URL.revokeObjectURL(p.image);
                if (p.sellerImage) URL.revokeObjectURL(p.sellerImage);
            });
        };
    }, [products]); // Dependensi kosong agar hanya berjalan sekali


    // Responsive: 4 card di mobile, 6 di desktop
    const isMobile = useMediaQuery({ maxWidth: 1023 });
    const cardsToShow = isMobile ? products.slice(0, 4) : products.slice(0, 6);

    console.log("Cards to show:", cardsToShow, "products:", products);

    return (
        <div className="w-full bg-white">
            <div className="mx-auto w-full max-w-7xl" style={{ width: '80%' }}>
                {/* Judul */}
                <h1 className="text-3xl font-bold text-center mb-4 mt-8">UMKM Kampung Ramiki</h1>
                {/* Penjelasan Potensi */}
                <p className="text-lg text-left mb-6">
                    Kampung Ramiki merupakan salah satu kampung di Kabupaten Teluk Wondama yang memiliki potensi besar dalam pengembangan produk lokal.
                    Berbagai hasil bumi seperti sagu, keladi, dan kopi menjadi komoditas utama yang diolah secara tradisional maupun inovatif oleh masyarakat.
                    Selain itu, kerajinan tangan dari daun sagu dan pandan menjadi ciri khas yang memperkaya budaya lokal.
                    Dengan semangat gotong royong, masyarakat Ramiki terus berinovasi dan beradaptasi untuk meningkatkan kesejahteraan melalui UMKM yang kreatif, berdaya saing, dan ramah lingkungan.
                    Dukungan dari berbagai pihak telah mendorong UMKM di Ramiki untuk berkembang, membuka lapangan kerja, serta memperkuat perekonomian kampung secara berkelanjutan.
                </p>
                {/* Logo Berjejer */}
                <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                    <img src="/assets/lagoDaerahTertinggal.png" alt="Logo Daerah Tertinggal" className="h-14" />
                    <img src="/assets/logoKemenkop.png" alt="Logo Kemenkop" className="h-14" />
                    <img src="/assets/logoWondama.png" alt="Logo Wondama" className="h-14" />
                    <img src="/assets/logoUnipa.webp" alt="Logo Unipa" className="h-14" />
                    <img src="/assets/logoKelompok.jpg" alt="Logo Kelompok" className="h-14" />
                </div>
                {/* Penjelasan Koperasi */}
                <div className="my-8">
                    <h2 className="text-3xl font-semibold mb-2 text-center">Koperasi Merah Putih</h2>
                    <p className="text-left text-gray-700 mb-4">
                        Koperasi Merah Putih didirikan sebagai wadah pemberdayaan ekonomi masyarakat Kampung Ramiki.
                        Melalui koperasi ini, masyarakat dapat mengelola hasil bumi, produk UMKM, dan kerajinan secara bersama-sama untuk meningkatkan kesejahteraan dan kemandirian ekonomi.
                        Koperasi berperan penting dalam membantu pemasaran produk, memberikan pelatihan kewirausahaan, serta memperkuat jaringan antar pelaku UMKM.
                        Dengan adanya koperasi, masyarakat Ramiki semakin percaya diri untuk bersaing di pasar lokal maupun nasional, serta mampu menciptakan inovasi produk yang bernilai tambah tinggi.
                        Koperasi juga menjadi motor penggerak kolaborasi antar warga, memperkuat solidaritas, dan membuka akses ke berbagai pelatihan serta pendampingan usaha.
                        Dengan dukungan koperasi, UMKM di Ramiki mampu bertahan dan berkembang di tengah tantangan zaman, serta menjadi inspirasi bagi kampung lain di Papua Barat.
                    </p>
                    {/* Struktur Koperasi */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {strukturKoperasi.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <img src={item.foto} alt={item.nama} className="w-20 h-20 rounded-full object-cover border-2 border-green-500 mb-2" />
                                <span className="font-bold">{item.jabatan}</span>
                                <span className="text-gray-700">{item.nama}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* --- Bagian Daftar UMKM Dinamis --- */}
                {loading && <div className="text-center text-lg py-8">Memuat produk unggulan...</div>}
                {error && <div className="text-center text-lg text-red-500 py-8">{error}</div>}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
                        {cardsToShow.map((umkm, idx) => (
                            <UmkmCard
                                key={idx}
                                image={umkm.image}
                                title={umkm.title}
                                sellerImage={umkm.sellerImage}
                                sellerName={umkm.sellerName}
                                description={umkm.description}
                                whatsapp={umkm.whatsapp}
                            />
                        ))}
                    </div>
                )}

                {/* Tombol Lebih Lengkap */}
                <div className="flex justify-center mb-12">
                    <a
                        href="/umkmlist" // Mengarahkan ke halaman daftar UMKM
                        className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition text-lg font-semibold"
                    >
                        Lihat Lebih Lengkap UMKM Kampung Ramiki
                    </a>
                </div>
            </div>
        </div>
    )
}