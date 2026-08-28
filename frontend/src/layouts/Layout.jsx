import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <>
            <Header />

            <div
                style={{
                    display: "flex",
                    minHeight: "calc(100vh - 64px)",
                    background: "#f5f6f8",
                }}
            >
                <Sidebar />

                <main
                    style={{
                        flex: 1,
                        padding: "30px",
                        overflow: "auto",
                    }}
                >
                    {children}
                </main>
            </div>
        </>
    );
}