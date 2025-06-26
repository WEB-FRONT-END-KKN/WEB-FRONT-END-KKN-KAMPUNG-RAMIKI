import React, { useState, useRef, useEffect } from 'react';

export default function UmkmSection() {
    const images = [
        "/assets/badaraWasior.png",
        "/assets/location.jpeg",
        "/assets/badaraWasior.png",
        "/assets/location.jpeg",
    ];

    const umkmContact = "628123456789";
    const [popupImage, setPopupImage] = useState(null);

    // State & ref untuk slider mobile
    const [currentIdx, setCurrentIdx] = useState(0);
    const intervalRef = useRef(null);

    // Auto-slide hanya di mobile
    useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        if (!isMobile) return;
        intervalRef.current = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(intervalRef.current);
    }, [images.length]);

    const handlePrev = () => {
        setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
        resetInterval();
    };
    const handleNext = () => {
        setCurrentIdx((prev) => (prev + 1) % images.length);
        resetInterval();
    };
    const resetInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % images.length);
        }, 5000);
    };

    const handleImageClick = (image) => setPopupImage(image);
    const closePopup = () => setPopupImage(null);

    return (
        <div className="container mx-auto py-10 px-6">
            {/* MOBILE */}
            <div className="flex flex-col items-center gap-6 lg:hidden">
                <h2 className="text-3xl font-bold mb-2 w-full text-center">UMKM Sagu</h2>
                {/* Slider */}
                <div className="relative w-full max-w-md aspect-video bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                    <img
                        src={images[currentIdx]}
                        alt={`UMKM ${currentIdx + 1}`}
                        className="object-cover w-full h-full cursor-pointer"
                        onClick={() => handleImageClick(images[currentIdx])}
                    />
                    {/* Tombol kiri */}
                    <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                        onClick={handlePrev}
                        aria-label="Sebelumnya"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.293 15.707a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                    </button>
                    {/* Tombol kanan */}
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                        onClick={handleNext}
                        aria-label="Selanjutnya"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.707 4.293a1 1 0 010 1.414L4.414 9H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </button>
                </div>
                {/* Dot indikator */}
                <div className="flex gap-2 mt-2">
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`w-3 h-3 rounded-full ${currentIdx === idx ? "bg-green-600" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
                {/* Penjelasan */}
                <div className="w-full max-w-md flex flex-col items-center">
                    <p className="text-gray-700 text-lg leading-relaxed mb-4 text-left">
                        UMKM Kampung Ramiki adalah inisiatif lokal yang bertujuan untuk meningkatkan kesejahteraan masyarakat
                        melalui berbagai produk kreatif dan inovatif. Produk-produk UMKM ini mencakup kerajinan tangan,
                        makanan khas, dan berbagai hasil bumi yang diolah dengan kualitas terbaik.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 text-left">
                        Dengan mendukung UMKM Kampung Ramiki, Anda turut membantu pemberdayaan masyarakat lokal dan
                        pelestarian budaya tradisional. Mari bergabung dan dukung produk-produk lokal kami!
                    </p>
                    {/* Tombol WhatsApp */}
                    <a
                        href={`https://wa.me/${umkmContact}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 mr-2"
                        >
                            <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 6.01L0 24l6.26-1.58A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 22c-1.83 0-3.61-.5-5.17-1.44l-.37-.22-3.71.94.99-3.61-.24-.38A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.03c-.29-.15-1.71-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.52.15-.17.19-.29.29-.48.1-.19.05-.37-.02-.52-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.48h-.55c-.19 0-.48.07-.73.37-.26.29-.96.94-.96 2.29s.98 2.65 1.12 2.84c.15.19 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.11-.26-.18-.55-.33z" />
                        </svg>
                        Hubungi via WhatsApp
                    </a>
                </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden lg:flex flex-row items-center gap-8">
                {/* Penjelasan & tombol di kiri */}
                <div className="w-1/2">
                    <h2 className="text-3xl font-bold mb-4">UMKM Sagu</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        UMKM Kampung Ramiki adalah inisiatif lokal yang bertujuan untuk meningkatkan kesejahteraan masyarakat
                        melalui berbagai produk kreatif dan inovatif. Produk-produk UMKM ini mencakup kerajinan tangan,
                        makanan khas, dan berbagai hasil bumi yang diolah dengan kualitas terbaik.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Dengan mendukung UMKM Kampung Ramiki, Anda turut membantu pemberdayaan masyarakat lokal dan
                        pelestarian budaya tradisional. Mari bergabung dan dukung produk-produk lokal kami!
                    </p>
                    {/* Tombol WhatsApp */}
                    <a
                        href={`https://wa.me/${umkmContact}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 mr-2"
                        >
                            <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 6.01L0 24l6.26-1.58A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 22c-1.83 0-3.61-.5-5.17-1.44l-.37-.22-3.71.94.99-3.61-.24-.38A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.03c-.29-.15-1.71-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.52.15-.17.19-.29.29-.48.1-.19.05-.37-.02-.52-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.48h-.55c-.19 0-.48.07-.73.37-.26.29-.96.94-.96 2.29s.98 2.65 1.12 2.84c.15.19 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.11-.26-.18-.55-.33z" />
                        </svg>
                        Hubungi via WhatsApp
                    </a>
                </div>
                {/* Galeri di kanan */}
                <div className="w-1/2">
                    <div className="grid grid-cols-2 gap-4">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`UMKM Image ${index + 1}`}
                                className="rounded-lg shadow-lg object-cover w-full h-48 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Pop-up Image */}
            {popupImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={closePopup}
                >
                    <img
                        src={popupImage}
                        alt="Popup"
                        className="rounded-lg shadow-lg object-cover max-w-full max-h-full"
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
