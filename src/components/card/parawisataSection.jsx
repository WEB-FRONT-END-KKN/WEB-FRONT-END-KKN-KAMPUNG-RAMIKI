import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
];

export default function ParawisataSection() {
    const [mainIdx, setMainIdx] = useState(0);

    const handleThumbClick = idx => setMainIdx(idx);
    const handlePrev = () => setMainIdx((mainIdx - 1 + images.length) % images.length);
    const handleNext = () => setMainIdx((mainIdx + 1) % images.length);

    return (
        <div className="w-full flex flex-col items-center">
            {/* Judul */}
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center w-full">Pariwisata Ramiki</h2>
            
            {/* Gallery */}
            <div className="w-full flex flex-col items-center mb-8">
                <div className="relative w-full aspect-video bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                    <img
                        src={images[mainIdx]}
                        alt={`Pariwisata ${mainIdx + 1}`}
                        className="object-cover w-full h-full"
                    />
                    {/* Slide buttons */}
                    <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                        onClick={handlePrev}
                        aria-label="Sebelumnya"
                    >
                        <FaChevronLeft size={22} />
                    </button>
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                        onClick={handleNext}
                        aria-label="Selanjutnya"
                    >
                        <FaChevronRight size={22} />
                    </button>
                </div>
                {/* Thumbnails */}
                <div className="flex gap-2 mt-3 overflow-x-auto w-full justify-center">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleThumbClick(idx)}
                            className={`rounded-lg overflow-hidden border-2 ${mainIdx === idx ? "border-blue-500" : "border-transparent"}`}
                            style={{ minWidth: 48, minHeight: 48 }}
                        >
                            <img src={img} alt={`thumb-${idx}`} className="object-cover w-12 h-12" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Penjelasan */}
            <div className="w-full mb-10">
                <p className="text-xl text-gray-700 leading-relaxed text-justify">
                    Kampung Ramiki menawarkan keindahan alam Papua yang masih asri, budaya lokal yang unik, serta keramahan masyarakatnya.
                    Wisatawan dari berbagai negara, seperti Jerman dan Prancis, telah berkunjung untuk menikmati pesona alam dan satwa langka yang hanya dapat ditemukan di kawasan ini.
                    Selain panorama sungai yang jernih dan hutan yang lebat, Ramiki juga menjadi habitat bagi berbagai hewan endemik Papua yang menarik perhatian para peneliti dan pecinta alam dunia.
                    <br /><br />
                    Pengalaman wisata di Ramiki tidak hanya tentang keindahan alam, tetapi juga interaksi budaya dengan masyarakat lokal yang ramah dan penuh cerita.
                    Berbagai aktivitas budaya, pertunjukan seni, dan kuliner khas Papua siap menyambut para pengunjung yang ingin merasakan keaslian Papua secara langsung.
                </p>
            </div>

            {/* Tourguide Section */}
            <div className="w-full max-w-3xl flex flex-col md:flex-row items-center bg-gray-50 rounded-xl shadow p-6 gap-6">
                {/* Foto Tourguide */}
                <div className="flex-shrink-0">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Tourguide Ramiki"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-300"
                    />
                </div>
                {/* Bio & Kontak */}
                <div className="flex-1 flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-2">Budi Ramiki</h3>
                    <p className="text-gray-700 mb-4">
                        Tourguide lokal berpengalaman, siap menemani Anda menjelajahi keindahan dan budaya Kampung Ramiki. 
                        Budi telah mendampingi wisatawan dari berbagai negara dan fasih berbahasa Indonesia serta Inggris.
                    </p>
                    <div className="flex gap-3">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            <FaFacebook size={20} /> Facebook
                        </a>
                        <a
                            href="https://wa.me/628123456789"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                        >
                            <FaWhatsapp size={20} /> WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}