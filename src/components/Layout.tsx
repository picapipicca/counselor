import { useEffect } from "react";
import Nav from "./Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="container">
                <div className="background_gradation" />
            </div>
            <main className="app">
                <Nav />
                {children}
            </main>
        </>
    )
}
export default Layout;