import React, { useState, useEffect, useRef } from 'react';

export default function DescriptionAbout() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div className="container mx-auto py-10 px-6">
            {/* Judul */}
            <h1 className="text-4xl font-bold text-center mb-8">Tentang Kampung Ramiki</h1>

            {/* Letak dan Informasi Umum */}
            <section className="mb-10">
                <h2 className="text-3xl font-bold text-center mb-4">Letak dan Informasi Umum</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Kampung Ramiki terletak di Kabupaten Teluk Wondama, Provinsi Papua Barat. Kampung ini dikenal dengan
                    keindahan alamnya yang asri, masyarakat yang ramah, dan budaya lokal yang kaya. Kampung Ramiki
                    merupakan salah satu destinasi yang cocok untuk belajar tentang kehidupan masyarakat Papua Barat.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <img
                        src="/assets/location.jpeg"
                        alt="Lokasi Kampung Ramiki"
                        className="rounded-lg shadow-lg object-cover w-full h-64"
                    />
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d134.123456!3d-1.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x123456789abcdef!2sKampung%20Ramiki!5e0!3m2!1sen!2sid!4v1234567890"
                        width="100%"
                        height="250"
                        allowFullScreen=""
                        loading="lazy"
                        className="rounded-lg shadow-lg"
                        title="Google Maps Kampung Ramiki"
                    ></iframe>
                </div>
            </section>

            {/* Visi dan Misi */}
            <section
                ref={sectionRef}
                className={`mb-10 transform transition-transform duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
                <h2 className="text-3xl font-bold text-center mb-8">Visi dan Misi</h2>
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Visi */}
                    <div className="w-full lg:w-1/2 text-center lg:text-right">
                        <h3 className="text-2xl font-bold mb-4">Visi</h3>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Mewujudkan masyarakat Kampung Ramiki yang mandiri, sejahtera, dan berbudaya dengan
                            memanfaatkan potensi lokal secara berkelanjutan.
                        </p>
                    </div>

                    {/* Garis Tengah dan Logo Garuda */}
                    <div className="relative flex items-center justify-center">
                        {/* Garis Tengah */}
                        {/* <div className="w-px h-48 bg-gray-400"></div> */}

                        
                        <img
                                src="/assets/garudaPancasila.webp"
                                alt="Garuda Pancasila"
                                className="w-20 h-20 object-contain rounded-full"
                            />
                    </div>

                    {/* Misi */}
                    <div className="w-full lg:w-1/2 text-left">
                        <h3 className="text-2xl font-bold mb-4 text-center">Misi</h3>
                        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed">
                            <li>Meningkatkan kualitas pendidikan dan kesehatan masyarakat.</li>
                            <li>Mendorong pengembangan UMKM dan ekonomi kreatif berbasis potensi lokal.</li>
                            <li>Melestarikan budaya dan tradisi lokal sebagai identitas masyarakat.</li>
                            <li>Meningkatkan infrastruktur untuk mendukung kesejahteraan masyarakat.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Kepala Desa */}
            <section className="mb-10">
                <h2 className="text-3xl font-bold text-center mb-4">Kepala Desa</h2>
                <div className="flex flex-col lg:flex-row items-center gap-6">
                    <img
                        src="/assets/kepalaDesa.jpg"
                        alt="Kepala Desa Kampung Ramiki"
                        className="rounded-lg shadow-lg object-cover w-full lg:w-1/3 h-64"
                    />
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Kepala Desa Kampung Ramiki adalah Bapak John Doe, seorang pemimpin yang berdedikasi untuk
                        memajukan masyarakat dan menjaga tradisi lokal. Beliau aktif dalam berbagai program pemberdayaan
                        masyarakat dan pembangunan infrastruktur untuk meningkatkan kesejahteraan warga.
                    </p>
                </div>
            </section>
        </div>
    );
}
