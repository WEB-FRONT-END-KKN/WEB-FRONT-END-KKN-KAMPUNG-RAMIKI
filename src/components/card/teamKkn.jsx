import React from 'react';
import { FaInstagram } from 'react-icons/fa'; // Import logo Instagram dari React Icons

export default function TeamKkn() {
    const galleryImages = [
        "src/assets/teamKkn1.jpg",
        "src/assets/teamKkn1.jpg",
        "src/assets/teamKkn1.jpg",
        "src/assets/teamKkn1.jpg",
    ];

    return (
        <div className="container mx-auto py-10 px-6">
            {/* Judul */}
            <h1 className="text-4xl font-bold text-center mb-8">Kelompok KKN</h1>

            {/* Galeri Foto Kelompok */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {galleryImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Foto Kelompok ${index + 1}`}
                        className="rounded-lg shadow-lg object-cover w-full h-48"
                    />
                ))}
            </div>

            {/* Logo Kelompok, UNIPA, dan Dinas Wasior */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
                <img
                    src="src/assets/logoKelompok.jpg"
                    alt="Logo Kelompok KKN"
                    className="w-32 h-32 object-contain"
                />
                <img
                    src="src/assets/logoUnipa.webp"
                    alt="Logo Universitas Papua"
                    className="w-32 h-32 object-contain"
                />
                <img
                    src="src/assets/logoPapuaBarat.svg"
                    alt="Logo Dinas Wasior/Papua Barat"
                    className="w-32 h-32 object-contain"
                />
            </div>

            {/* Penjelasan Kelompok KKN */}
            <div className="text-center my-5">
                <p className="text-gray-700 text-lg leading-relaxed">
                    Kelompok KKN ini berasal dari kampus <strong>Universitas Papua</strong>. Tujuan kami adalah
                    membantu proses <strong>digitalisasi</strong>, <strong>mengajar</strong>, dan
                    <strong> mengembangkan desa</strong> agar lebih maju dan mandiri.
                </p>
            </div>

            {/* Tombol Instagram */}
            <div className="text-center">
                <a
                    href="https://www.instagram.com/kkn_ramiki/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition"
                >
                    <FaInstagram className="w-6 h-6 mr-2" /> {/* Logo Instagram */}
                    Follow us for more @kkn_ramiki
                </a>
            </div>
        </div>
    );
}
