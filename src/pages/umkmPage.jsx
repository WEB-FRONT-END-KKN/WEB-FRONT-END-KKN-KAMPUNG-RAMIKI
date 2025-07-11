import React from 'react'
import UmkmCard from '../components/card/umkmCard'
import { useMediaQuery } from 'react-responsive';

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

    // Contoh data UMKM
    const umkmList = [
        {
            image: "/assets/produk1.jpg",
            title: "Sagu Lezat",
            sellerImage: "/assets/penjual1.jpg",
            sellerName: "Budi",
            description: "Sagu asli Papua, diolah secara tradisional dan higienis.",
            whatsapp: "628123456789"
        },
        {
            image: "/assets/produk2.jpg",
            title: "Keripik Keladi",
            sellerImage: "/assets/penjual2.jpg",
            sellerName: "Mira",
            description: "Keripik keladi renyah, camilan sehat khas Ramiki.",
            whatsapp: "628987654321"
        },
        {
            image: "/assets/produk3.jpg",
            title: "Kopi Wondama",
            sellerImage: "/assets/penjual3.jpg",
            sellerName: "Pak Agus",
            description: "Kopi robusta asli Wondama, aroma khas dan nikmat.",
            whatsapp: "6281122334455"
        },
        {
            image: "/assets/produk4.jpg",
            title: "Kerajinan Anyaman",
            sellerImage: "/assets/penjual4.jpg",
            sellerName: "Ibu Rina",
            description: "Anyaman tangan kreatif dari daun sagu dan pandan.",
            whatsapp: "6285566778899"
        }
    ];

    // Responsive: 4 card di mobile, 6 di desktop
    const isMobile = useMediaQuery({ maxWidth: 1023 });
    const cardsToShow = isMobile ? umkmList.slice(0, 4) : umkmList.slice(0, 6);

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
                {/* Daftar UMKM */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
                    {cardsToShow.map((umkm, idx) => (
                        <UmkmCard key={idx} {...umkm} />
                    ))}
                </div>
                {/* Tombol Lebih Lengkap */}
                <div className="flex justify-center mb-12">
                    <a
                        href="/umkm"
                        className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition text-lg font-semibold"
                    >
                        Lihat Lebih Lengkap UMKM Kampung Ramiki
                    </a>
                </div>
            </div>
        </div>
    )
}