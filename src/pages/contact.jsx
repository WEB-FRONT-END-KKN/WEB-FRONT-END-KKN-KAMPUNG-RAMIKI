import React from 'react';
import { ContactBanner, TransformationInformation } from '../components';
import { FaEnvelope, FaTiktok, FaInstagram } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

export default function Contact() {
    return (
        <div>
            <Helmet>
                <title>Kontak Kampung Ramiki | KKN, UMKM & Koperasi</title>
                <meta name="description" content="Hubungi kelompok KKN Kampung Ramiki, Teluk Wondama Papua Barat. Tersedia kontak email, TikTok, Instagram, dan informasi transformasi UMKM & koperasi." />
                <meta name="keywords" content="Kontak Kampung Ramiki, KKN, UMKM, Koperasi, Teluk Wondama, Papua Barat, Email, TikTok, Instagram" />
                <meta property="og:title" content="Kontak Kampung Ramiki" />
                <meta property="og:description" content="Hubungi kelompok KKN Kampung Ramiki, Teluk Wondama Papua Barat. Tersedia kontak email, TikTok, Instagram, dan informasi transformasi UMKM & koperasi." />
                <meta property="og:type" content="website" />
            </Helmet>
            <ContactBanner />
            <TransformationInformation />

            {/* Section Kontak Kelompok KKN */}
            {/* <div className="container mx-auto py-10 px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Kontak Kelompok KKN</h2> */}

                {/* Logo Kelompok */}
                {/* <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                    <img
                        src="/assets/logoKelompok.jpg"
                        alt="Logo Kelompok KKN"
                        className="w-32 h-32 object-contain"
                    />
                    <img
                        src="/assets/logoUnipa.webp"
                        alt="Logo Universitas Papua"
                        className="w-32 h-32 object-contain"
                    />
                    <img
                        src="/assets/logoPapuaBarat.svg"
                        alt="Logo Papua Barat"
                        className="w-32 h-32 object-contain"
                    />
                </div> */}

                {/* Kontak Media */}
                {/* <div className="flex flex-col items-center gap-4"> */}
                    {/* Tombol Instagram */}
                    {/* <div className="text-center">
                        <a
                            href="https://www.instagram.com/kkn_ramiki/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-white hover:text-pink-500 transition"
                        >
                            <FaInstagram className="w-6 h-6 mr-2" /> 
                            Follow us for more @kkn_ramiki
                        </a>
                    </div> */}
                    {/* Tombol Instagram */}
                    {/* <div className="text-center">
                        <a
                            href="https://www.tiktok.com/@kkn.ramiki"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-white hover:text-black transition"
                        >
                            <FaTiktok className="w-6 h-6 mr-2" /> 
                            Follow us for more @kkn.ramiki
                        </a>
                    </div> */}
                {/* </div> */}
            {/* </div> */}
        </div>
    );
}
