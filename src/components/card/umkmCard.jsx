import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';

export default function UmkmCard({
    image,
    title,
    sellerImage,
    sellerName,
    description,
}) {
    const [imgSrc, setImgSrc] = useState(null);
    const [sellerImgSrc, setSellerImgSrc] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async (url, setState) => {
            if (!url || typeof url !== 'string') {
                setState(null);
                return;
            }
            const fileIdMatch = url.match(/id=([^&]+)/);
            if (!fileIdMatch || !fileIdMatch[1]) {
                setState(url); // Asumsikan URL sudah direct
                return;
            }
            const fileId = fileIdMatch[1];
            const apiKey = import.meta.env.VITE_API_KEY; // Ambil API key dari environment variable
            const googleDriveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
            try {
                const response = await axios.get(googleDriveUrl, { responseType: 'blob' });
                const blobUrl = URL.createObjectURL(response.data);
                setState(blobUrl);
            } catch (error) {
                setState(null);
                console.error("Error fetching image:", error);
            }
        };

        const getFirstImageFromRaw = (raw) => {
            if (!raw || typeof raw !== 'string') return '';
            const urls = raw.split(',').map(url => url.trim()).filter(Boolean);
            return urls[0] || '';
        };

        const loadImages = async () => {
            setLoading(true);
            // Ambil gambar pertama dari image string
            await Promise.all([
                fetchImage(getFirstImageFromRaw(image), setImgSrc),
                fetchImage(sellerImage, setSellerImgSrc)
            ]);
            setLoading(false);
        };

        loadImages();

        return () => {
            if (imgSrc && imgSrc.startsWith('blob:')) {
                URL.revokeObjectURL(imgSrc);
            }
            if (sellerImgSrc && sellerImgSrc.startsWith('blob:')) {
                URL.revokeObjectURL(sellerImgSrc);
            }
        };
    }, [image, sellerImage]);

    const maxDesc = 80;
    const shortDesc =
        description.length > maxDesc
            ? description.slice(0, maxDesc).trim() + '...'
            : description;

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
                <div className="w-full h-44 sm:h-48 flex items-center justify-center bg-gray-200">
                    {loading ? (
                        <span className="loading loading-ring loading-lg"></span>
                    ) : (
                        <img
                            src={imgSrc || '/assets/placeholder.png'} // Fallback image
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Judul Produk */}
                <div className="px-4 pt-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 text-center">{title}</h3>
                </div>

                {/* Penjual */}
                <div className="flex flex-col items-center mb-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-green-500 flex items-center justify-center bg-gray-200">
                        {loading ? (
                            <span className="loading loading-ring loading-sm"></span>
                        ) : (
                            <img
                                src={sellerImgSrc || '/assets/placeholder.png'} // Fallback image
                                alt={sellerName}
                                className="w-full h-full rounded-full object-cover"
                            />
                        )}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 mt-1">{sellerName}</span>
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
                        {/* <FaWhatsapp className="w-5 h-5 mr-2" /> */}
                        Lihat Detail
                    </div>
                </div>
            </div>
        </Link>
    );
}