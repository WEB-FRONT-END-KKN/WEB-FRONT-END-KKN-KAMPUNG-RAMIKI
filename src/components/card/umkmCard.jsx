import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

export default function UmkmCard({
    image,
    title,
    sellerImage,
    sellerName,
    description,
    // whatsapp
}) {
    // Batasi deskripsi maksimal 80 karakter
    const maxDesc = 80;
    const shortDesc =
        description.length > maxDesc
            ? description.slice(0, maxDesc).trim() + '...'
            : description;

    // Buat slug untuk URL dengan pemisah '%'
    // Mengubah spasi menjadi '-' dan menggabungkan dengan '%'
    const sellerSlug = sellerName.toLowerCase().trim().replace(/\s+/g, '-');
    const titleSlug = title.toLowerCase().trim().replace(/\s+/g, '-');
    const slug = `${sellerSlug}<>${titleSlug}`;

    return (
        <Link to={`/umkmdetail/${slug}`} className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-xs mx-auto flex flex-col no-underline text-black">
            <div
                style={{
                    minHeight: 370,
                    height: '100%',
                    width: '100%',
                    maxWidth: '320px'
                }}
            >
                {/* Gambar Produk */}
                <img
                    src={image}
                    alt={title}
                    className="w-full h-44 sm:h-48 object-cover"
                />
                {/* Judul Produk */}
                <div className="px-4 pt-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 text-center">{title}</h3>
                </div>
                {/* Penjual */}
                <div className="flex flex-col items-center mb-2">
                    <img
                        src={sellerImage}
                        alt={sellerName}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-green-500 mb-1"
                    />
                    <span className="text-sm font-semibold text-gray-700">{sellerName}</span>
                </div>
                {/* Deskripsi */}
                <div className="px-4 mb-4 flex-1">
                    <p className="text-gray-600 text-center text-sm break-words">{shortDesc}</p>
                </div>
                {/* Tombol Detail */}
                <div className="px-4 pb-4 flex justify-center">
                    <div
                        className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                    >
                        <FaWhatsapp className="w-5 h-5 mr-2" />
                        Lihat Detail
                    </div>
                </div>
            </div>
        </Link>
    );
}