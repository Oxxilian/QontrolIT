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
                background: "#f5f6f8",
            }}
        >

            <Header />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    overflow: "hidden",
                }}
            >

                <Sidebar />

                <main
                    style={{
                        flex: 1,
                        padding: "30px",
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                >
                    {children}
                </main>

            </div>

        </div>

    );

}