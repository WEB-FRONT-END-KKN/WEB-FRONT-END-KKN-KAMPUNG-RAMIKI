import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF69B4", "#A52A2A"];

export default function Citizen() {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState("umur");

    useEffect(() => {
        // ID Spreadsheet dan API Key
        const spreadsheetId = "1dpfc9uoMeaN87gwAzlNCx8chXKl7uR0-K1tfMGS2Wh8";
        const apiKey = "AIzaSyCcHVF-YTiEhhfZUDsN8o-95EqAuKSyM9E";

        // URL Google Sheets API
        const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Form Responses 1?key=${apiKey}`;

        // Ambil data dari Google Sheets API
        axios.get(spreadsheetUrl).then((response) => {
            const rows = response.data.values.slice(1); // Hapus header
            const parsedData = rows.map((row) => {
                const [, nama, tanggalLahir, jenisKelamin, agama, suku] = row;
                return { nama, tanggalLahir, jenisKelamin, agama, suku };
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

    // Kelompokkan data berdasarkan kategori umur, suku, jenis kelamin, atau agama
    const filteredData = data.reduce(
        (acc, curr) => {
            if (selectedData === "umur") {
                const age = calculateAge(curr.tanggalLahir);
                if (age <= 5) acc["Balita/Toddlers"] = (acc["Balita/Toddlers"] || 0) + 1;
                else if (age >= 6 && age <= 18) acc["Pelajar"] = (acc["Pelajar"] || 0) + 1;
                else if (age >= 19 && age <= 58) acc["Pekerja/Mahasiswa"] = (acc["Pekerja/Mahasiswa"] || 0) + 1;
                else acc["Pensiun"] = (acc["Pensiun"] || 0) + 1;
            } else if (selectedData === "suku") {
                const suku = curr.suku.trim();
                if (["Wondamen", "Wamesa", "Biak", "Yapen", "Dani", "Manokwari"].includes(suku)) {
                    acc[suku] = (acc[suku] || 0) + 1;
                } else {
                    acc["Yang Lain"] = (acc["Yang Lain"] || 0) + 1;
                }
            } else if (selectedData === "jenisKelamin") {
                acc[curr.jenisKelamin] = (acc[curr.jenisKelamin] || 0) + 1;
            } else if (selectedData === "agama") {
                acc[curr.agama] = (acc[curr.agama] || 0) + 1;
            }
            return acc;
        },
        {}
    );

    const chartData = Object.entries(filteredData).map(([key, value]) => ({
        name: key,
        value,
    }));

    return (
        <div className="container mx-auto py-10 px-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-8">Data Masyarakat Kampung Ramiki</h1>

            {/* Switch untuk memilih data */}
            <div className="flex items-center gap-4 mb-8">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="dataSwitch"
                        value="umur"
                        checked={selectedData === "umur"}
                        onChange={() => setSelectedData("umur")}
                        className="hidden"
                    />
                    <span
                        className={`px-4 py-2 rounded-lg shadow-lg ${selectedData === "umur" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        Umur
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="dataSwitch"
                        value="suku"
                        checked={selectedData === "suku"}
                        onChange={() => setSelectedData("suku")}
                        className="hidden"
                    />
                    <span
                        className={`px-4 py-2 rounded-lg shadow-lg ${selectedData === "suku" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        Suku
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="dataSwitch"
                        value="jenisKelamin"
                        checked={selectedData === "jenisKelamin"}
                        onChange={() => setSelectedData("jenisKelamin")}
                        className="hidden"
                    />
                    <span
                        className={`px-4 py-2 rounded-lg shadow-lg ${selectedData === "jenisKelamin" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        Jenis Kelamin
                    </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="dataSwitch"
                        value="agama"
                        checked={selectedData === "agama"}
                        onChange={() => setSelectedData("agama")}
                        className="hidden"
                    />
                    <span
                        className={`px-4 py-2 rounded-lg shadow-lg ${selectedData === "agama" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        Agama
                    </span>
                </label>
            </div>

            {/* Pie Chart */}
            <PieChart width={400} height={400}>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
            </PieChart>
        </div>
    );
}