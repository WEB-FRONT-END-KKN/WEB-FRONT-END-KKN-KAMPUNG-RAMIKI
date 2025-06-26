import { Route, Routes } from "react-router-dom";
import RootLayout from "../layout/rootLayout";
import { Home, About, NotFound, Contact, Citizen,ArtikelList,ArtikelPage } from "../pages";


export default function RootRoutes() {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/citizen" element={<Citizen />} />
                <Route path="/artikel" element={<ArtikelList />} />
                <Route path="/artikel/:nama" element={<ArtikelPage />} />
                {/* Route untuk halaman yang tidak terdaftar */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}