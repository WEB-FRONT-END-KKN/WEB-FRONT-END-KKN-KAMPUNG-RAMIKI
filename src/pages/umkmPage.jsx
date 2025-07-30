import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import UmkmCard from '../components/card/umkmCard'
import { useMediaQuery } from 'react-responsive';
import { Helmet } from 'react-helmet';

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
            nama: "Max Sawaki"
        },
        {
            foto: "/assets/wakilKetuaBidangUsaha.jpg",
            jabatan: "Wakil Ketua Bidang Usaha",
            nama: "Ronal Dubri"
        },
        {
            foto: "/assets/wakilKetuaBidangAnggota.jpg",
            jabatan: "Wakil Ketua Bidang Anggota",
            nama: "Yulianus Tawaru"
        },
        {
            foto: "/assets/sekretaris.jpg",
            jabatan: "Sekretaris",
            nama: "Tania Nunanki"
        },
        {
            foto: "/assets/bendahara.jpg",
            jabatan: "Bendahara",
            nama: "Marice Ayomi"
        }
    ];

    // State untuk data UMKM yang akan diambil dari API
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID_UMKM;
        const API_KEY = import.meta.env.VITE_API_KEY;
        const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Form Responses 1?key=${API_KEY}`;

        const fetchAndProcessData = async () => {
            try {
                const response = await axios.get(spreadsheetUrl);
                const rows = response.data.values.slice(1);
                const dataPromises = rows.map(async (row) => {
                    const [
                        _timestamp, sellerName, sellerImageRaw, whatsapp, _facebook,
                        title, description, _category, imageRaw, _imagesRaw
                    ] = row;

                    const sellerImagePromise = getGoogleDriveImageAsBlobUrl(sellerImageRaw);
                    const imagePromise = getGoogleDriveImageAsBlobUrl(imageRaw);

                    const [sellerImage, image] = await Promise.all([sellerImagePromise, imagePromise]);

                    if (sellerName && title && image) {
                        return {
                            sellerName, sellerImage, whatsapp, title, description, image,
                        };
                    }
                    return null;
                });

                const parsedData = (await Promise.all(dataPromises)).filter(Boolean);
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
    }, []); // <-- GANTI dari [products] menjadi []


    // Responsive: 4 card di mobile, 6 di desktop
    const isMobile = useMediaQuery({ maxWidth: 1023 });
    const cardsToShow = isMobile ? products.slice(0, 4) : products.slice(0, 6);

    console.log("Cards to show:", cardsToShow, "products:", products);

    return (
        <div className="w-full bg-white">
            <Helmet>
                <title>UMKM Kampung Ramiki | Produk Lokal & Koperasi</title>
                <meta name="description" content="Daftar UMKM Kampung Ramiki, Teluk Wondama Papua Barat. Temukan produk lokal, hasil bumi, kerajinan, dan koperasi masyarakat Ramiki." />
                <meta name="keywords" content="UMKM Kampung Ramiki, Produk Lokal, Koperasi, Teluk Wondama, Papua Barat, Sagu, Keladi, Kerajinan" />
                <meta property="og:title" content="UMKM Kampung Ramiki" />
                <meta property="og:description" content="Daftar UMKM Kampung Ramiki, Teluk Wondama Papua Barat. Temukan produk lokal, hasil bumi, kerajinan, dan koperasi masyarakat Ramiki." />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Koperasi Merah Putih Kampung Ramiki",
                        "description": "Struktur pengurus Koperasi Merah Putih Kampung Ramiki, Teluk Wondama Papua Barat.",
                        "member": strukturKoperasi.map(item => ({
                            "@type": "Person",
                            "name": item.nama,
                            "jobTitle": item.jabatan,
                            "image": typeof item.foto === "string" && item.foto.startsWith("/") ? `${window.location.origin}${item.foto}` : item.foto
                        }))
                    })}
                </script>
            </Helmet>
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
                            <div key={idx} className="flex flex-col items-center w-30">
                                <img src={item.foto} alt={item.nama} className="w-20 h-20 rounded-full object-cover border-2 border-green-500 mb-2" />
                                <span className="font-bold text-center">{item.jabatan}</span>
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