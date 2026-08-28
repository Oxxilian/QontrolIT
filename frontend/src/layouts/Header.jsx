export default function Header() {
    return (
        <header
            style={{
                height: "64px",
                background: "#2F343A",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 30px",
                borderBottom: "3px solid #5E8F3C",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontSize: "22px",
                        fontWeight: 700,
                    }}
                >
                    QontrolIT
                </h2>

                <span
                    style={{
                        color: "#A7D36C",
                        fontSize: "14px",
                    }}
                >
                    Smart Quality Management
                </span>
            </div>

            <div
                style={{
                    fontSize: "14px",
                    color: "#D5D8DC",
                }}
            >
                Productieleider
            </div>
        </header>
    );
}