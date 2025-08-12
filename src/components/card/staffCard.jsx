import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StaffCard({ nama, jabatan, foto }) {
    const [fotoImage, setFoto] = useState(null);
    const [loading, setLoading] = useState(true);
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

        const loadImages = async () => {
            setLoading(true);
            // Ambil gambar pertama dari image string
            await Promise.all([
                fetchImage(foto, setFoto)
            ]);
            setLoading(false);
        };

        loadImages();
    }, [foto]);
    return (
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 w-44 h-[220px] justify-between">
            <div className="flex flex-col items-center">
                <img
                    src={!loading && fotoImage ? fotoImage : "/assets/about/staffIcon.PNG"}
                    alt={nama}
                    className="w-20 h-20 object-cover rounded-full mb-2 border-2 border-green-500"
                    onError={(e) => {
                        e.target.src = "/assets/about/staffIcon.PNG";
                    }}
                />
                <span className="font-bold text-center text-sm min-h-[32px]">{jabatan}</span>
                <span className="text-gray-700 text-center text-sm min-h-[32px]">{nama}</span>
            </div>
        </div>
    );
}
