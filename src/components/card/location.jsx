import React from "react";
import { motion } from "framer-motion";

const Location = () => {
    return (
        <motion.div
            className="p-5 text-center"
            initial={{ opacity: 0, y: 50 }} // Mulai dari bawah dengan opacity 0
            whileInView={{ opacity: 1, y: 0 }} // Saat terlihat, animasi ke posisi normal
            transition={{ duration: 0.8 }} // Durasi animasi
            viewport={{ once: true, amount: 0.5 }} // Animasi hanya terjadi sekali saat 50% terlihat
        >
            <h2 className="text-2xl font-bold mb-4">Lokasi Kampung Ramiki</h2>
            <div className="mb-5">
                <iframe
                    title="Lokasi Kampung Ramiki"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31693.123456789!2d134.216667!3d-2.716667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d123456789abcdef%3A0x123456789abcdef!2sWasior%2C%20Kampung%20Ramiki!5e0!3m2!1sid!2sid!4v1234567890123"
                    className="w-full h-[450px] border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="text-gray-700">
                <p className="mb-4">
                    Kampung Ramiki terletak di Wasior, Teluk Wondama, Papua Barat. Kampung ini dikelilingi oleh pemandangan alam
                    yang indah dan memiliki suasana yang nyaman untuk berbagai kegiatan.
                </p>
                <p>
                    Dengan keramahan penduduk lokal dan keunikan budaya yang dimiliki, Kampung Ramiki menjadi tempat yang menarik
                    untuk dikunjungi dan dieksplorasi.
                </p>
            </div>
        </motion.div>
    );
};

export default Location;