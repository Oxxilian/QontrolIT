import {
    LayoutDashboard,
    FolderOpen,
    Boxes,
    Truck,
    ShieldCheck,
    Building2,
    ClipboardCheck,
    BarChart3,
    Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard", path: "/" },
    { icon: FolderOpen, text: "Projecten", path: "/projects" },
    { icon: Boxes, text: "Materialen", path: "/materials" },
    { icon: Truck, text: "Inkomende goederen", path: "/incoming-goods" },
    { icon: ShieldCheck, text: "Conservering", path: "/conservation" },
    { icon: Building2, text: "Leveranciers", path: "/suppliers" },
    { icon: ClipboardCheck, text: "Controlemap", path: "/controlmap" },
    { icon: BarChart3, text: "Rapportages", path: "/reports" },
    { icon: Settings, text: "Instellingen", path: "/settings" },
];

export default function Sidebar() {
    return (
        <aside
            style={{
                width: "260px",
                background: "#2F343A",
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "calc(100vh - 64px)",
                flexShrink: 0,
            }}
        >
            <div>
                {menuItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.text}
                            to={item.path}
                            style={({ isActive }) => ({
                                display: "flex",
                                alignItems: "center",
                                gap: "15px",
                                padding: "16px 22px",
                                textDecoration: "none",
                                color: "#FFFFFF",
                                backgroundColor: isActive
                                    ? "#5E8F3C"
                                    : index % 2 === 0
                                    ? "#363C43"
                                    : "#2F343A",
                                transition: "background-color .2s ease",
                            })}
                            onMouseEnter={(e) => {
                                if (!e.currentTarget.classList.contains("active")) {
                                    e.currentTarget.style.backgroundColor = "#5E8F3C";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!e.currentTarget.classList.contains("active")) {
                                    e.currentTarget.style.backgroundColor =
                                        index % 2 === 0 ? "#363C43" : "#2F343A";
                                }
                            }}
                        >
                            <Icon
                                size={20}
                                color="#A7D36C"
                                strokeWidth={2}
                            />

                            <span
                                style={{
                                    fontSize: "15px",
                                    fontWeight: 500,
                                }}
                            >
                                {item.text}
                            </span>
                        </NavLink>
                    );
                })}
            </div>

            <div
                style={{
                    padding: "18px 22px",
                    borderTop: "1px solid #454B52",
                    fontSize: "12px",
                    color: "#BFC5CC",
                    lineHeight: 1.6,
                }}
            >
                <strong
                    style={{
                        color: "#FFFFFF",
                        fontSize: "13px",
                    }}
                >
                    QontrolIT
                </strong>

                <br />

                Smart Quality Management

                <br />

                Versie 1.0.0
            </div>
        </aside>
    );
}