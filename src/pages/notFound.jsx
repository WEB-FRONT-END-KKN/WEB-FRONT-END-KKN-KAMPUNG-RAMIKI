import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {/* Judul 404 */}
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <p className="text-xl text-gray-700 mb-8">Halaman yang Anda cari tidak ditemukan.</p>

            {/* Tombol Kembali ke Beranda */}
            <Link
                to="/"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
}
