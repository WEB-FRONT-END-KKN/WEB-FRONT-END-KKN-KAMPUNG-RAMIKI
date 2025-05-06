import React, { useState } from 'react';

export default function UmkmSection() {
    const images = [
        "src/assets/badaraWasior.png",
        "src/assets/location.jpeg",
        "src/assets/badaraWasior.png",
        "src/assets/location.jpeg",
    ];

    const umkmContact = "628123456789"; // Replace with the actual contact number
    const [popupImage, setPopupImage] = useState(null); // State for the pop-up image

    const handleImageClick = (image) => {
        setPopupImage(image); // Set the clicked image as the pop-up image
    };

    const closePopup = () => {
        setPopupImage(null); // Close the pop-up
    };

    return (
        <div className="container mx-auto py-10 px-6 flex flex-col lg:flex-row items-center gap-8">
            {/* Galeri UMKM */}
            <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`UMKM Image ${index + 1}`}
                            className="rounded-lg shadow-lg object-cover w-full h-48 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => handleImageClick(image)} // Open pop-up on click
                        />
                    ))}
                </div>
            </div>

            {/* Penjelasan UMKM */}
            <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-bold mb-4">UMKM Kampung</h2>
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

            {/* Pop-up Image */}
            {popupImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={closePopup} // Close pop-up when clicking outside the image
                >
                    <img
                        src={popupImage}
                        alt="Popup"
                        className="rounded-lg shadow-lg object-cover max-w-full max-h-full"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
                    />
                </div>
            )}
        </div>
    );
}
