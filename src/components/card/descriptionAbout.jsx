import React, { useState, useEffect, useRef } from 'react';
import StaffCard from './staffCard';
import axios from 'axios';

export default function DescriptionAbout() {
    const [isVisible, setIsVisible] = useState(false);
    const [staffList, setStaffList] = useState([]);
    const [kepalaDesaData, setKepalaDesaData] = useState(null);
    const [kepalaDesaImage, setKepalaDesaImage] = useState(null);
    const sectionRef = useRef(null);
    const apiKey = import.meta.env.VITE_API_KEY;
    const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID_STAFF;

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

    useEffect(() => {
        async function fetchStaff() {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Form Responses 1?key=${apiKey}`;
            const res = await fetch(url);
            const data = await res.json();
            const rows = data.values.slice(1); // skip header
            const staff = rows
                .filter(row => row[2] !== "Kepala Desa" && row[8] === "Aktif") // kolom jabatan
                .map(row => ({
                    nama: row[1],
                    jabatan: row[2],
                    foto: row[3] && row[3].startsWith("http") ? row[3] : null,
                    tahunJabat: row[4], // kolom tahun jabatan
                    latarBelakang: row[5], // kolom latar belakang
                    visi: row[6], // kolom visi
                    misi: row[7], // kolom misi
                    status: row[8] // kolom status
                }));
            console.log("Staff Data:", staff);
            setStaffList(staff);
            const getLatestTimestamp = (rows) => {
                return rows
                    .map(row => ({
                        timestamp: new Date(row[0]),
                        data: {
                            nama: row[1],
                            jabatan: row[2],
                            foto: row[3] && row[3].startsWith("http") ? row[3] : null,
                            tahunJabat: row[4],
                            latarBelakang: row[5],
                            visi: row[6],
                            misi: row[7],
                            status: row[8],
                            fileId: row[3]?.split("/d/")[1]?.split("/")[0] // jika foto dari drive
                        }
                    }))
                    .filter(entry => entry.data.jabatan === "Kepala Desa" && entry.data.status === "Aktif")
                    .sort((a, b) => b.timestamp - a.timestamp)[0]?.data; // ambil terbaru
            };

            const latestKepalaDesa = getLatestTimestamp(rows);
            setKepalaDesaData(latestKepalaDesa);
        }
        fetchStaff();
    }, [spreadsheetId, apiKey]);

    useEffect(() => {
        const fetchImage = async (url, setState) => {
            if (!url || typeof url !== 'string') {
                setState(null);
                return;
            }
            const fileIdMatch = url.match(/id=([^&]+)/);
            if (!fileIdMatch || !fileIdMatch[1]) {
                setState(url); // Asumsikan URL sudah direct
                return;
            }
            const fileId = fileIdMatch[1];
            const apiKey = import.meta.env.VITE_API_KEY; // Ambil API key dari environment variable
            const googleDriveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
            try {
                const response = await axios.get(googleDriveUrl, { responseType: 'blob' });
                const blobUrl = URL.createObjectURL(response.data);
                setState(blobUrl);
            } catch (error) {
                setState(null);
                console.error("Error fetching image:", error);
            }
        };

        fetchImage(kepalaDesaData?.foto, setKepalaDesaImage)
    }, [kepalaDesaData?.foto]);

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
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59693.91483593621!2d134.57582349999998!3d-2.7781019999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d4b65659ec8064d%3A0xf925bcf81248760!2sWondamawi%20II%2C%20Distrik%20Wasior%2C%20Kabupaten%20Teluk%20Wondama%2C%20Papua%20Bar.!5e1!3m2!1sid!2sid!4v1754282389101!5m2!1sid!2sid"
                        width="100%"
                        height="250"
                        allowFullScreen=""
                        loading="lazy"
                        className="rounded-lg shadow-lg"
                        title="Google Maps Kampung Ramiki"
                    ></iframe>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63762.067585534096!2d134.57582349999998!3d-2.7781019999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d4b65659ec8064d%3A0xf925bcf81248760!2sWondamawi%20II%2C%20Distrik%20Wasior%2C%20Kabupaten%20Teluk%20Wondama%2C%20Papua%20Bar.!5e0!3m2!1sid!2sid!4v1754280175114!5m2!1sid!2sid"
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
                className={`mb-10 transform transition-transform duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
            >
                <h2 className="text-3xl font-bold text-center mb-8">Visi dan Misi</h2>
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Visi */}
                    <div className="w-full lg:w-1/2 text-center lg:text-right">
                        <h3 className="text-2xl font-bold mb-4">Visi</h3>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {kepalaDesaData?.visi || "Visi belum tersedia."}
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
                            {/* <li>Meningkatkan kualitas pendidikan dan kesehatan masyarakat.</li>
                            <li>Mendorong pengembangan UMKM dan ekonomi kreatif berbasis potensi lokal.</li>
                            <li>Melestarikan budaya dan tradisi lokal sebagai identitas masyarakat.</li>
                            <li>Meningkatkan infrastruktur untuk mendukung kesejahteraan masyarakat.</li> */}
                            {kepalaDesaData?.misi && kepalaDesaData.misi.split('-').map((misi, index) => (
                                <li key={index}>{misi}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Kepala Desa */}
            <section className="mb-10">
                <h2 className="text-3xl font-bold text-center mb-4">Kepala Desa</h2>
                <div className="flex flex-col items-center lg:flex-row gap-6">
                    <div className='w-full lg:w-1/3 flex justify-center'>
                        <img
                            src={kepalaDesaImage || "/assets/about/staffIcon.PNG"}
                            alt="Kepala Desa Kampung Ramiki"
                            className=" object-cover h-64 mr-5"
                        />
                    </div>
                    <div className='my-5'>
                        <h3 className="text-2xl font-bold mb-2  max-lg:text-center">{kepalaDesaData?.nama}</h3>
                        <p className="text-gray-700 text-lg leading-relaxed  max-lg:text-justify">
                            {kepalaDesaData?.latarBelakang}
                        </p>
                    </div>
                </div>
            </section>

            {/* Section Staff Desa */}
            <section className="mb-10">
                <h2 className="text-3xl font-bold text-center mb-4">Staff Desa</h2>
                <div className="flex overflow-x-auto flex-nowrap lg:flex-wrap lg:overflow-x-visible justify-start gap-6 px-2 snap-x scroll-smooth">
                    {staffList.map((staff, idx) => (
                        <div key={idx} className="snap-center flex-shrink-0">
                            <StaffCard
                                nama={staff.nama}
                                jabatan={staff.jabatan}
                                foto={staff.foto}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
