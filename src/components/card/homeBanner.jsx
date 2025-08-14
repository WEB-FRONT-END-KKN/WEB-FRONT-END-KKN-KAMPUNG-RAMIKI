import React from 'react';

export default function homeBanner() {
    const scrollToDescription = () => {
        const element = document.getElementById('description');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(/assets/home/homePage3.jpg)",
            }}
        >

            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h3 className="mb-2 text-4xl font-bold">Selamat Datang Di</h3>
                    <h1 className="mb-5 text-5xl font-bold">Kampung Ramiki</h1>
                    <p className="mb-5">
                        Website ini dibuat oleh Kelompok KKN Kampung Ramiki untuk mendukung digitalisasi dan pengembangan dunia digital di Kampung Ramiki.
                        Tujuan kami adalah membantu masyarakat dalam memanfaatkan teknologi untuk kemajuan bersama.
                    </p>
                    <button onClick={scrollToDescription} className="btn btn-primary">
                        Mulai Kunjungi
                    </button>
                </div>
            </div>
        </div>
    );
}
