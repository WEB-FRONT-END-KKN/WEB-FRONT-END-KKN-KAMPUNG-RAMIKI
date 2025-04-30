import { Header, Footer } from "../components"
import { Outlet } from "react-router-dom"
export default function rootLayout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}