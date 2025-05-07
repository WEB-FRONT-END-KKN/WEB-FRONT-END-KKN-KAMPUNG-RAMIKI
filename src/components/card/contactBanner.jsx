import React from 'react';

export default function ContactBanner() {
    return (
        <div className="container mx-auto py-10 px-6">
            {/* Judul */}
            <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

            {/* Konten */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Google Maps */}
                <div className="rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d134.123456!3d-1.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x123456789abcdef!2sKampung%20Ramiki!5e0!3m2!1sen!2sid!4v1234567890"
                        width="100%"
                        height="250"
                        allowFullScreen=""
                        loading="lazy"
                        className="w-full h-full border-0"
                        title="Google Maps Kampung Ramiki"
                        ></iframe>
                </div>
                        

                {/* Informasi Kontak */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4">Informasi Kontak</h2>
                    <p className="text-gray-700 text-lg mb-2">
                        <strong>Lokasi:</strong> Kantor Desa Ramiki, Kabupaten Teluk Wondama, Papua Barat
                    </p>
                    <p className="text-gray-700 text-lg mb-2">
                        <strong>Email:</strong> desa.ramiki@example.com
                    </p>
                    <p className="text-gray-700 text-lg">
                        <strong>Kontak:</strong> +62 812-3456-7890
                    </p>
                </div>
            </div>
        </div>
    );
}
