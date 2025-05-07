import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Description() {
    const [lineHeight, setLineHeight] = useState(0); // State untuk tinggi garis
    const containerRef = useRef(null); // Referensi untuk container utama

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const containerTop = containerRef.current.getBoundingClientRect().top;
                const containerHeight = containerRef.current.offsetHeight;
                const windowHeight = window.innerHeight;

                // Hitung tinggi garis berdasarkan scroll
                if (containerTop < windowHeight && containerTop + containerHeight > 0) {
                    const visibleHeight = Math.min(windowHeight - containerTop, containerHeight);
                    setLineHeight((visibleHeight / containerHeight) * 100); // Persentase tinggi garis
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="relative container mx-auto py-10">
            {/* Garis Tengah */}
            <div className="absolute inset-0 flex justify-center">
                <div
                    className="w-1 bg-teal-600"
                    style={{ height: `${lineHeight}%`, transition: "height 0.2s ease-out" }}
                ></div>
            </div>

            <div className="flex flex-col space-y-20 relative">
                {/* Section 1 */}
                <div className="flex items-center">
                    <div className="w-1/2">
                        <img
                            src="src/assets/location.jpeg"
                            alt="Section 1"
                            className="rounded-lg shadow-lg object-cover w-4/5 mx-auto h-64"
                        />
                    </div>
                    <div className="w-1/2 pl-10">
                        <h2 className="text-2xl font-bold text-teal-600">Kampung Ramiki</h2>
                        <p className="text-gray-700 mt-4">
                            Kampung Ramiki adalah destinasi yang menawarkan keindahan alam Papua Barat dan kekayaan budaya lokal.
                            Sebagai pusat pengembangan budaya, Kampung Ramiki berkomitmen untuk melestarikan tradisi dan mendukung
                            kegiatan masyarakat melalui pengembangan UMKM dan pariwisata berbasis komunitas.
                        </p>
                    </div>
                </div>

                {/* Titik di Tengah untuk Section 1 */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-[calc(5%+80px)]">
                    <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
                </div>

                {/* Section 2 */}
                <div className="flex items-center">
                    <div className="w-1/2 pr-10 text-right">
                        <h2 className="text-2xl font-bold text-teal-600">Tentang Kampung Ramiki</h2>
                        <p className="text-gray-700 mt-4">
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
                    <div className="w-1/2">
                        <img
                            src="src/assets/bandara.jpg"
                            alt="Tentang Kampung Ramiki"
                            className="rounded-lg shadow-lg object-cover w-4/5 mx-auto h-64"
                        />
                    </div>
                </div>

                {/* Titik di Tengah untuk Section 2 */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-[calc(40%+80px)]">
                    <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
                </div>

                {/* Section 3 */}
                <div className="flex items-center">
                    <div className="w-1/2">
                        <img
                            src="src/assets/badaraWasior.png"
                            alt="Section 3"
                            className="rounded-lg shadow-lg object-cover w-4/5 mx-auto h-64"
                        />
                    </div>
                    <div className="w-1/2 pl-10">
                        <h2 className="text-2xl font-bold text-teal-600">Kontak Kampung Ramiki</h2>
                        <p className="text-gray-700 mt-4">
                            Informasi kontak untuk Kampung Ramiki dapat ditemukan di berbagai platform media sosial.
                            Kampung Ramiki dapat diakses melalui transportasi laut menggunakan kapal Pelni atau melalui transportasi udara dengan penerbangan lokal menuju Bandara Wasior.
                        </p>
                        <NavLink
                            to="/contact"
                            className="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition"
                        >
                            Hubungi Kami
                        </NavLink>
                    </div>
                </div>

                {/* Titik di Tengah untuk Section 3 */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-[calc(75%+80px)]">
                    <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}