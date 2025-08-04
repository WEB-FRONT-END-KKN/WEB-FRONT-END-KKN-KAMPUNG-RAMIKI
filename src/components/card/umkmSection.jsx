import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function UmkmSection() {
    const images = [
        "/assets/umkm/umkmSection1.jpg",
        "/assets/umkm/umkmSection2.jpg",
        "/assets/umkm/umkmSection3.jpg",
        "/assets/umkm/umkmSection4.jpg",
    ];
    const [popupImage, setPopupImage] = useState(null);

    // State & ref untuk slider mobile
    const [currentIdx, setCurrentIdx] = useState(0);
    const intervalRef = useRef(null);

    // Auto-slide hanya di mobile
    useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        if (!isMobile) return;
        intervalRef.current = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(intervalRef.current);
    }, [images.length]);

    const handlePrev = () => {
        setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
        resetInterval();
    };
    const handleNext = () => {
        setCurrentIdx((prev) => (prev + 1) % images.length);
        resetInterval();
    };
    const resetInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % images.length);
        }, 5000);
    };

    const handleImageClick = (image) => setPopupImage(image);
    const closePopup = () => setPopupImage(null);

    return (
        <div className="container mx-auto py-10 px-6">
            {/* MOBILE */}
            <div className="flex flex-col items-center gap-6 lg:hidden">
                <h2 className="text-3xl font-bold mb-2 w-full text-center">UMKM Kampung Ramiki</h2>
                {/* Slider */}
                <div className="relative w-full max-w-md aspect-video bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                    <img
                        src={images[currentIdx]}
                        alt={`UMKM ${currentIdx + 1}`}
                        className="object-cover w-full h-full cursor-pointer"
                        onClick={() => handleImageClick(images[currentIdx])}
                    />
                    {/* Tombol kiri */}
                    <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                        onClick={handlePrev}
                        aria-label="Sebelumnya"
                        type="button"
                    >
                        <FaChevronLeft size={24} />
                    </button>
                    {/* Tombol kanan */}
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                        onClick={handleNext}
                        aria-label="Selanjutnya"
                        type="button"
                    >
                        <FaChevronRight size={24} />
                    </button>
                </div>
                {/* Dot indikator */}
                <div className="flex gap-2 mt-2">
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`w-3 h-3 rounded-full ${currentIdx === idx ? "bg-green-600" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
                {/* Penjelasan */}
                <div className="w-full max-w-md flex flex-col items-center">
                    <p className="text-gray-700 text-lg leading-relaxed mb-4 text-left">
                        UMKM Kampung Ramiki adalah inisiatif lokal yang bertujuan untuk meningkatkan kesejahteraan masyarakat
                        melalui berbagai produk kreatif dan inovatif. Produk-produk UMKM ini mencakup kerajinan tangan,
                        makanan khas, dan berbagai hasil bumi yang diolah dengan kualitas terbaik.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                        <img src="/assets/lagoDaerahTertinggal.png" alt="Logo Daerah Tertinggal" className="h-14" />
                        <img src="/assets/logoKemenkop.png" alt="Logo Kemenkop" className="h-14" />
                        <img src="/assets/logoWondama.png" alt="Logo Wondama" className="h-14" />
                        <img src="/assets/logoUnipa.webp" alt="Logo Unipa" className="h-14" />
                        <img src="/assets/logoKelompok.jpg" alt="Logo Kelompok" className="h-14" />
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 text-left">
                        Dengan mendukung UMKM Kampung Ramiki, Anda turut membantu pemberdayaan masyarakat lokal dan
                        pelestarian budaya tradisional. Mari bergabung dan dukung produk-produk lokal kami!
                    </p>
                </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden lg:flex flex-row items-center gap-8">
                {/* Galeri UMKM */}
                <div className="w-1/2">
                    <div className="grid grid-cols-2 gap-4">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`UMKM Image ${index + 1}`}
                                className="rounded-lg shadow-lg object-cover w-full h-48 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                </div>
                {/* Penjelasan UMKM */}
                <div className="w-1/2">
                    <h2 className="text-3xl font-bold mb-4">UMKM Kampung Ramiki</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        UMKM Kampung Ramiki adalah inisiatif lokal yang bertujuan untuk meningkatkan kesejahteraan masyarakat
                        melalui berbagai produk kreatif dan inovatif. Produk-produk UMKM ini mencakup kerajinan tangan,
                        makanan khas, dan berbagai hasil bumi yang diolah dengan kualitas terbaik. bekerja sama dengan berbagai pihak untuk memperluas jangkauan pasar dan meningkatkan kualitas produk.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                        <img src="/assets/lagoDaerahTertinggal.png" alt="Logo Daerah Tertinggal" className="h-14" />
                        <img src="/assets/logoKemenkop.png" alt="Logo Kemenkop" className="h-14" />
                        <img src="/assets/logoWondama.png" alt="Logo Wondama" className="h-14" />
                        <img src="/assets/logoUnipa.webp" alt="Logo Unipa" className="h-14" />
                        <img src="/assets/logoKelompok.jpg" alt="Logo Kelompok" className="h-14" />
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Dengan mendukung UMKM Kampung Ramiki, Anda turut membantu pemberdayaan masyarakat lokal dan
                        pelestarian budaya tradisional. Mari bergabung dan dukung produk-produk lokal kami!
                    </p>
                    {/* Tombol WhatsApp */}

                </div>
            </div>
            {/* Tombol Navigasi */}
            <div className="mt-8">
                <NavLink
                    to="/umkm"
                    className="w-full inline-block px-6 py-3 bg-red-500 text-white text-center font-semibold rounded-lg shadow-lg hover:bg-red-600 transition"
                >
                    Pelajari Lebih Lanjut
                </NavLink>
            </div>

            {/* Pop-up Image */}
            {popupImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={closePopup}
                >
                    <img
                        src={popupImage}
                        alt="Popup"
                        className="rounded-lg shadow-lg object-cover max-w-full max-h-full"
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
