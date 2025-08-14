import React from 'react';
import { FaEnvelope, FaInstagram, FaWhatsapp, FaTwitter, FaYoutube, FaTiktok, FaFacebook } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

export default function Footer() {
  return (
    <footer className="py-10 bg-white">
      <div className="container mx-auto flex flex-col items-center justify-center">
        
        {/* Logo dan Deskripsi */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex gap-4 mb-4">
            <img
              src="/assets/logoKelompok.jpg"
              alt="Logo Kelompok KKN"
              className="w-16 h-16 object-contain"
            />
            <img
              src="/assets/logoUnipa.webp"
              alt="Logo Universitas Papua"
              className="w-16 h-16 object-contain"
            />
            <img
              src="/assets/logoPapuaBarat.svg"
              alt="Logo Papua Barat"
              className="w-16 h-16 object-contain"
            />
            <img
              src="/assets/logoWondama.png"
              alt="Logo Wondama"
              className="w-16 h-16 object-contain"
            />
          </div>
          <p className="text-center text-sm">
            <strong>Kelompok KKN Kampung Ramiki</strong>
            <br />
            Tahun 2025
          </p>
        </div>

        {/* Social Media (opsional, jika mau aktifkan) */}
        {/* <div className="flex gap-4">
          <a href="https://www.tiktok.com/@kkn.ramiki" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition">
            <FaTiktok size={24} />
          </a>
          <a href="https://www.instagram.com/kkn_ramiki" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition">
            <RiInstagramFill size={24} />
          </a>
        </div> */}
      </div>
    </footer>
  );
}