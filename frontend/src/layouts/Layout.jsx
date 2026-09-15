import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                background: "#2F343A",
            }}
        >
            <Header />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    overflow: "hidden",
                    background: "#2F343A",
                }}
            >
                <Sidebar />

                <main
                    style={{
                        flex: 1,
                        padding: "30px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        background: "#2F343A",
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}