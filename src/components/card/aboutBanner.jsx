import React, { useState, useEffect } from 'react';

export default function AboutBanner() {
    const images = [
        "/assets/about/aboutBanner1.jpg",
        "/assets/about/aboutBanner2.jpg", 
        "/assets/about/aboutBanner3.jpg",
        "/assets/about/aboutBanner4.jpg",
        // "/assets/badaraWasior.png",
        // "/assets/location.jpeg",
        // "/assets/badaraWasior.png",
        // "/assets/location.jpeg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handlePrev = () => {
        if (isAnimating) return; // Prevent multiple clicks during animation
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
            setIsAnimating(false);
        }, 700); // Match the duration of the CSS transition
    };

    const handleNext = () => {
        if (isAnimating) return; // Prevent multiple clicks during animation
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            setIsAnimating(false);
        }, 700); // Match the duration of the CSS transition
    };

    // Automatically call handleNext every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000); // 5000ms interval (5 seconds)

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <div className="container mx-auto py-10 px-6">
            {/* Title */}
            <h1 className="text-4xl font-bold text-center mb-8">Kampung</h1>

            {/* Gallery */}
            <div className="relative flex items-center justify-center perspective-1000 overflow-hidden">
                {/* Previous Image (Shadow Left) */}
                <div
                    className={`absolute transition-all duration-700 ease-in-out ${
                        isAnimating ? "transform translate-x-[-100%] scale-90 opacity-70" : "transform translate-x-[-40%] scale-90 opacity-70"
                    }`}
                    style={{ width: "30%" }}
                    onClick={handlePrev} // Trigger handlePrev on click
                >
                    <img
                        src={images[(currentIndex - 1 + images.length) % images.length]}
                        alt="Previous"
                        className="rounded-lg shadow-lg object-cover w-full cursor-pointer"
                    />
                </div>

                {/* Current Image */}
                <div
                    className={`relative z-10 transition-all duration-700 ease-in-out ${
                        isAnimating ? "transform translate-x-[-50%] scale-90 opacity-70" : "transform translate-x-0 scale-100"
                    }`}
                    style={{ width: "40%" }}
                >
                    <img
                        src={images[currentIndex]}
                        alt="Current"
                        className="rounded-lg shadow-lg object-cover h-full"
                    />
                </div>

                {/* Next Image (Shadow Right) */}
                <div
                    className={`absolute transition-all duration-700 ease-in-out ${
                        isAnimating ? "transform translate-x-[0%] scale-100" : "transform translate-x-[40%] scale-90 opacity-70"
                    }`}
                    style={{ width: "30%" }}
                    onClick={handleNext} // Trigger handleNext on click
                >
                    <img
                        src={images[(currentIndex + 1) % images.length]}
                        alt="Next"
                        className="rounded-lg shadow-lg object-cover w-full cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}
