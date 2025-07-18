import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArtikelCard({ image, title, excerpt, date }) {
    console.log('Rendering ArtikelCard:', { image, title, excerpt, date });
    const [imgSrc, setImgSrc] = useState(image);

    useEffect(() => {
        // Cek jika image adalah Google Drive ID
        const match = image && image.match(/id=([a-zA-Z0-9_-]+)/);
        if (match) {
            const fileId = match[1];
            axios.get(
                `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=AIzaSyCcHVF-YTiEhhfZUDsN8o-95EqAuKSyM9E`,
                { responseType: 'blob' }
            ).then(res => {
                setImgSrc(URL.createObjectURL(res.data));
            });
        }
    }, [image]);

    return (
        <div className="flex flex-col md:flex-row w-full bg-white rounded-lg shadow-md overflow-hidden mb-4 relative">
            {/* Gambar Artikel */}
            <div className="w-full h-48 md:w-64 md:h-32 flex items-center justify-center bg-gray-100">
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt={title}
                        className="w-full h-48 object-cover md:w-64 md:h-32"
                    />
                ) : (
                    <span className="loading loading-ring loading-lg"></span>
                )}
            </div>
            {/* Konten */}
            <div className="flex-1 p-4 flex flex-col justify-between z-10">
                <div>
                    <h2
                        className="text-lg font-bold mb-1 truncate"
                        title={title}
                    >
                        {title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">{excerpt}</p>
                </div>
                <span className="text-xs text-gray-400">{date}</span>
            </div>
            {/* SVG Indonesia hanya di desktop */}
            <div className="hidden md:flex absolute right-0 top-0 h-full w-1/3 items-end justify-end z-0">
                <img
                    src="/assets/indonesia.svg"
                    alt="Peta Indonesia"
                    className="absolute right-0 top-0 h-full w-full object-contain opacity-60 pointer-events-none"
                    style={{ zIndex: 1 }}
                />
            </div>
            {/* Logo Wondama di pojok kanan bawah */}
            <img
                src="/assets/logoWondama.png"
                alt="Logo Wondama"
                className="absolute bottom-2 right-2 w-10 h-10 opacity-90"
                style={{ zIndex: 2 }}
            />
        </div>
    );
}
