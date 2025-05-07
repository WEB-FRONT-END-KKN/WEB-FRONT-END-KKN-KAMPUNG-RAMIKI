import React from 'react';

export default function TransportationInformation() {
    return (
        <div className="container mx-auto py-10 px-6">
            {/* Judul */}
            <h1 className="text-4xl font-bold text-center mb-8">Informasi Transportasi</h1>

            {/* Konten */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Gambar Kapal */}
                <div className="flex justify-center order-1 md:order-2">
                    <img
                        src="/assets/kapalPelni.jpeg"
                        alt="Transportasi Kapal"
                        className="rounded-lg shadow-lg object-cover w-full md:w-3/4"
                    />
                </div>

                {/* Penjelasan Transportasi */}
                <div className="order-2 md:order-1">
                    <h2 className="text-2xl font-bold mb-4">Transportasi Menuju Kampung Wasior</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Kampung Wasior dapat diakses melalui transportasi laut menggunakan kapal atau melalui transportasi udara. 
                        Kapal Pelni adalah salah satu pilihan utama untuk perjalanan laut, sementara penerbangan tersedia melalui 
                        maskapai lokal yang melayani rute ke Wasior.
                    </p>

                    {/* Tombol Traveloka dan Pelni */}
                    <div className="flex gap-4">
                        <a
                            href="https://www.traveloka.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
                        >
                            Traveloka
                        </a>
                        <a
                            href="https://www.pelni.co.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
                        >
                            Pelni
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
