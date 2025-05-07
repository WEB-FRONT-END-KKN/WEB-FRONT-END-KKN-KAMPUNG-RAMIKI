import React from 'react';
import { ContactBanner, TransformationInformation } from '../components';
import { FaEnvelope, FaTiktok, FaInstagram } from 'react-icons/fa'; // Import React Icons

export default function Contact() {
    return (
        <div>
            <ContactBanner />
            <TransformationInformation />

            {/* Section Kontak Kelompok KKN */}
            <div className="container mx-auto py-10 px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Kontak Kelompok KKN</h2>

                {/* Logo Kelompok */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                    <img
                        src="src/assets/logoKelompok.jpg"
                        alt="Logo Kelompok KKN"
                        className="w-32 h-32 object-contain"
                    />
                    <img
                        src="src/assets/logoUnipa.webp"
                        alt="Logo Universitas Papua"
                        className="w-32 h-32 object-contain"
                    />
                    <img
                        src="src/assets/logoPapuaBarat.svg"
                        alt="Logo Papua Barat"
                        className="w-32 h-32 object-contain"
                    />
                </div>

                {/* Kontak Media */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-lg text-gray-700">
                        <FaEnvelope className="text-blue-500 w-6 h-6" />
                        <span>email_kelompok_kkn@example.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-lg text-gray-700">
                        <FaTiktok className="text-black w-6 h-6" />
                        <span>@tiktok_kelompok_kkn</span>
                    </div>
                    <div className="flex items-center gap-2 text-lg text-gray-700">
                        <FaInstagram className="text-pink-500 w-6 h-6" />
                        <span>@instagram_kelompok_kkn</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
