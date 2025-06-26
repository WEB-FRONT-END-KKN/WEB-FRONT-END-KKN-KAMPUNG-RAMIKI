import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import axios from "axios";
import { FaUsers } from "react-icons/fa";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF69B4", "#A52A2A"];

export default function Citizen() {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState("umur");
    const [showPapuaDetail, setShowPapuaDetail] = useState(false);

    useEffect(() => {
        const spreadsheetId = "144pLSC4_7trcyH5n_dEIwckFYwsgefwzOdtbi1eR-lc";
        const apiKey = "AIzaSyCcHVF-YTiEhhfZUDsN8o-95EqAuKSyM9E";
        const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Form Responses 1?key=${apiKey}`;

        axios.get(spreadsheetUrl).then((response) => {
            const rows = response.data.values.slice(1);
            const parsedData = rows.map((row) => {
                const [, nama, tanggalLahir, namaKepalaKeluarga, jenisKelamin, agama, suku, papua, nonPapua] = row;
                return { nama, tanggalLahir, namaKepalaKeluarga, jenisKelamin, agama, suku, papua, nonPapua };
            });
            setData(parsedData);
        });
    }, []);

    // Hitung umur berdasarkan tanggal lahir
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    // Hitung kepala keluarga unik
    const kepalaKeluargaUnik = new Set(data.map(d => d.namaKepalaKeluarga)).size;

    // Filter data untuk chart
    const filteredData = data.reduce((acc, curr) => {
        if (selectedData === "suku") {
            if (curr.suku.trim() === "Papua") {
                if (showPapuaDetail) {
                    // Tampilkan detail suku Papua (misal: Wondamen, Biak, dll)
                    const detail = curr.papua?.trim() || "Lainnya";
                    acc[detail] = (acc[detail] || 0) + 1;
                } else {
                    acc["Papua"] = (acc["Papua"] || 0) + 1;
                }
            } else {
                acc["Non Papua"] = (acc["Non Papua"] || 0) + 1;
            }
        } else if (selectedData === "umur") {
            const age = calculateAge(curr.tanggalLahir);
            if (age <= 5) acc["Balita/Toddlers"] = (acc["Balita/Toddlers"] || 0) + 1;
            else if (age >= 6 && age <= 18) acc["Pelajar"] = (acc["Pelajar"] || 0) + 1;
            else if (age >= 19 && age <= 58) acc["Pekerja/Mahasiswa"] = (acc["Pekerja/Mahasiswa"] || 0) + 1;
            else acc["Pensiun"] = (acc["Pensiun"] || 0) + 1;
        } else if (selectedData === "jenisKelamin") {
            acc[curr.jenisKelamin] = (acc[curr.jenisKelamin] || 0) + 1;
        } else if (selectedData === "agama") {
            acc[curr.agama] = (acc[curr.agama] || 0) + 1;
        }
        return acc;
    }, {});

    // Data chart sesuai pilihan
    let chartData = [];
    if (selectedData === "umur" || selectedData === "suku" || selectedData === "jenisKelamin" || selectedData === "agama") {
        chartData = Object.entries(filteredData).map(([key, value]) => ({
            name: key,
            value,
        }));
    }

    return (
        <div className="container mx-auto py-10 px-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-8">Data Masyarakat Kampung Ramiki</h1>

            {/* Dropdown untuk mobile */}
            <div className="w-full flex justify-center mb-8 sm:hidden">
                <select
                    className="w-[80%] px-4 py-2 rounded-lg shadow-lg border border-gray-300 text-gray-900"
                    value={selectedData}
                    onChange={e => setSelectedData(e.target.value)}
                >
                    <option value="umur">Umur</option>
                    <option value="suku">Suku</option>
                    <option value="jenisKelamin">Jenis Kelamin</option>
                    <option value="agama">Agama</option>
                    <option value="kepalaKeluarga">Kepala Keluarga</option>
                </select>
            </div>

            {/* Radio button untuk desktop */}
            <div className="hidden sm:flex items-center gap-4 mb-8 overflow-x-auto flex-nowrap w-full justify-center">
                <label className="flex items-center gap-2 cursor-pointer min-w-max">
                    <input
                        type="radio"
                        name="dataSwitch"
                        value="umur"
                        checked={selectedData === "umur"}
                        onChange={() => setSelectedData("umur")}
                        className="hidden"
                    />
                    <span className={`px-4 py-2 rounded-lg shadow-lg ${selectedData === "umur" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                        Umur
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer min-w-max">
                    <input
                        type="radio"
                        name="dataSwitch"
                        value="suku"
                        checked={selectedData === "suku"}
                        onChange={() => setSelectedData("suku")}
                        className="hidden"
                    />
                    <span className={`px-4 py-2 rounded-lg shadow-lg ${selectedData === "suku" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                        Suku
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer min-w-max">
                    <input
                        type="radio"
                        name="dataSwitch"
                        value="jenisKelamin"
                        checked={selectedData === "jenisKelamin"}
                        onChange={() => setSelectedData("jenisKelamin")}
                        className="hidden"
                    />
                    <span className={`px-4 py-2 rounded-lg shadow-lg ${selectedData === "jenisKelamin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                        Jenis Kelamin
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer min-w-max">
                    <input
                        type="radio"
                        name="dataSwitch"
                        value="agama"
                        checked={selectedData === "agama"}
                        onChange={() => setSelectedData("agama")}
                        className="hidden"
                    />
                    <span className={`px-4 py-2 rounded-lg shadow-lg ${selectedData === "agama" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                        Agama
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer min-w-max">
                    <input
                        type="radio"
                        name="dataSwitch"
                        value="kepalaKeluarga"
                        checked={selectedData === "kepalaKeluarga"}
                        onChange={() => setSelectedData("kepalaKeluarga")}
                        className="hidden"
                    />
                    <span className={`px-4 py-2 rounded-lg shadow-lg ${selectedData === "kepalaKeluarga" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                        Kepala Keluarga
                    </span>
                </label>
            </div>

            {/* Filter detail suku Papua */}
            {selectedData === "suku" && (
                <label className="flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        checked={showPapuaDetail}
                        onChange={e => setShowPapuaDetail(e.target.checked)}
                    />
                    <span>Tampilkan detail suku Papua</span>
                </label>
            )}

            {/* Tampilkan jumlah kepala keluarga unik jika radio kepala keluarga dipilih */}
            {selectedData === "kepalaKeluarga" && (
                <div className="mb-8 flex items-center gap-3 text-2xl font-semibold">
                    <span>Kepala Keluarga: </span>
                    <span className="text-blue-600 flex items-center gap-2">
                        {kepalaKeluargaUnik}
                        <FaUsers className="inline ml-2" />
                    </span>
                </div>
            )}

            {/* Pie Chart untuk selain kepala keluarga */}
            {(selectedData !== "kepalaKeluarga") && (
                <PieChart width={400} height={600}>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend
                        formatter={(value) => {
                            const found = chartData.find(d => d.name === value);
                            return `${value} (${found ? found.value : 0})`;
                        }}
                    />
                </PieChart>
            )}
        </div>
    );
}