import React from 'react'
import { NavLink } from "react-router-dom";

export default function descriptionMobile() {
    return (
        <div className="container mx-auto py-10 px-4">
            {/* Section 1 */}
            <div className="flex flex-col items-center space-y-6">
                <h2 className="text-2xl font-bold text-teal-600 text-center">Kampung Ramiki</h2>
                <img
                    src="src/assets/location.jpeg"
                    alt="Kampung Ramiki"
                    className="rounded-lg shadow-lg object-cover w-full h-64"
                />
                <p className="text-gray-700 text-center">
                    Kampung Ramiki adalah destinasi yang menawarkan keindahan alam Papua Barat dan kekayaan budaya lokal.
                    Sebagai pusat pengembangan budaya, Kampung Ramiki berkomitmen untuk melestarikan tradisi dan mendukung
                    kegiatan masyarakat melalui pengembangan UMKM dan pariwisata berbasis komunitas.
                </p>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col items-center space-y-6 mt-10">
                <h2 className="text-2xl font-bold text-teal-600 text-center">Tentang Kampung Ramiki</h2>
                <img
                    src="src/assets/bandara.jpg"
                    alt="Tentang Kampung Ramiki"
                    className="rounded-lg shadow-lg object-cover w-full h-64"
                />
                <p className="text-gray-700 text-center">
                    Kampung Ramiki adalah sebuah desa yang terletak di Kabupaten Teluk Wondama, Papua Barat.
                    Desa ini dipimpin oleh kepala desa yang berdedikasi untuk memajukan masyarakat melalui
                    pengembangan UMKM lokal dan pelestarian budaya tradisional.
                </p>
                <NavLink
                    to="/about"
                    className="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition"
                >
                    Pelajari Lebih Lanjut
                </NavLink>
            </div>

            {/* Section 3 */}
            <div className="flex flex-col items-center space-y-6 mt-10">
                <h2 className="text-2xl font-bold text-teal-600 text-center">Kontak Kampung Ramiki</h2>
                <img
                    src="src/assets/badaraWasior.png"
                    alt="Kontak Kampung Ramiki"
                    className="rounded-lg shadow-lg object-cover w-full h-64"
                />
                <p className="text-gray-700 text-center">
                    Informasi kontak untuk Kampung Ramiki dapat ditemukan di berbagai platform media sosial.
                    Kampung Ramiki dapat diakses melalui transportasi laut menggunakan kapal Pelni atau melalui transportasi udara
                    dengan penerbangan lokal menuju Bandara Wasior.
                </p>
                <NavLink
                    to="/contact"
                    className="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition"
                >
                    Hubungi Kami
                </NavLink>
            </div>
        </div>
    );
}