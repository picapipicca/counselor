import Nav from "./Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="main">
                <div className="gradient"/>
            </div>
            <main className="app">
                <Nav />
                {children}
            </main>
        </>
    )
}
export default Layout;