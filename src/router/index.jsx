import { Route, Routes } from "react-router-dom";
import RootLayout from "../layout/rootLayout";
import { Home, About, NotFound, Contact, Citizen } from "../pages";


export default function RootRoutes() {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/citizen" element={<Citizen />} />
                
                {/* Route untuk halaman yang tidak terdaftar */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}