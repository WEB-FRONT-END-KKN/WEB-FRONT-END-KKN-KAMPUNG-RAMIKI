import React from 'react';
import { FaShip, FaPlane } from 'react-icons/fa';

export default function TransportationInformation() {
    const galleryImages = [
        "/assets/kapalPelni.jpeg",
        "/assets/kapalExpress.jpeg",
        "/assets/kapalMargaret.jpeg",
        "/assets/pesawatSusi.jpg",
    ];
    return (
        <div className="container mx-auto py-10 px-6">
            {/* Judul */}
            <h1 className="text-4xl font-bold text-center mb-8">Informasi Transportasi</h1>

            {/* Konten */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Gambar Kapal */}
                <div className="flex justify-center order-1 md:order-2">
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        {galleryImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Foto Kelompok ${index + 1}`}
                                className="rounded-lg shadow-lg object-cover w-full h-48"
                            />
                        ))}
                    </div>
                </div>

                {/* Penjelasan Transportasi */}
                <div className="order-2 md:order-1">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-6">
                            Transportasi Laut dan Udara Menuju Wasior
                        </h2>

                        <section className="mb-8">
                            <h3 className="flex items-center text-xl font-semibold mb-4">
                                <FaShip className="text-green-500 mr-2" />
                                Transportasi Laut
                            </h3>
                            <ul className="list-disc list-inside space-y-3 text-gray-700">
                                <li>
                                    <strong className="font-semibold">Kapal Gunung Dempo (Pelni)</strong>:
                                    kapal besar yang melayani rute ke Wasior. Informasi jadwal dan
                                    pemesanan tiket ada di {''}
                                    <a
                                        href="https://www.pelni.co.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        www.pelni.co.id
                                    </a>
                                    .
                                </li>
                                <li>
                                    <strong className="font-semibold">Kapal Margaret</strong>: kapal
                                    kecil yang juga berangkat menuju Wasior.
                                </li>
                                <li>
                                    <strong className="font-semibold">Kapal Express</strong>: kapal
                                    cepat yang langsung berlayar ke Pelabuhan Anggrem, Manokwari,
                                    sebagai titik awal sebelum melanjutkan ke Wasior.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="flex items-center text-xl font-semibold mb-4">
                                <FaPlane className="text-blue-500 mr-2" />
                                Transportasi Udara
                            </h3>
                            <p className="text-gray-700">
                                Wasior juga dapat dijangkau melalui penerbangan domestik yaitu pesawat susi air yang dilayani
                                maskapai lokal. Kamu biasanya akan transit di Manokwari sebelum terbang
                                ke Wasior setiap senin rabu jum'at. Sedangkan Nabire ke Wasior setiap kamis.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
