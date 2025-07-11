import React from 'react';

export default function UmkmCard({
    image,
    title,
    sellerImage,
    sellerName,
    description,
    whatsapp
}) {
    // Batasi deskripsi maksimal 80 karakter
    const maxDesc = 80;
    const shortDesc =
        description.length > maxDesc
            ? description.slice(0, maxDesc).trim() + '...'
            : description;

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-xs mx-auto flex flex-col"
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
            {/* Kontak WhatsApp */}
            <div className="px-4 pb-4 flex justify-center">
                <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 mr-2"
                    >
                        <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 6.01L0 24l6.26-1.58A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 22c-1.83 0-3.61-.5-5.17-1.44l-.37-.22-3.71.94.99-3.61-.24-.38A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.03c-.29-.15-1.71-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.52.15-.17.19-.29.29-.48.1-.19.05-.37-.02-.52-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.48h-.55c-.19 0-.48.07-.73.37-.26.29-.96.94-.96 2.29s.98 2.65 1.12 2.84c.15.19 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.11-.26-.18-.55-.33z" />
                    </svg>
                    Kontak Penjual
                </a>
            </div>
        </div>
    );
}
