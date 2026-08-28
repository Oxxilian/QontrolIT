export default function ControlMap() {
    return (
        <>
            <h1
                style={{
                    marginTop: 0,
                    color: "#2F343A",
                }}
            >
                Controlemap
            </h1>

            <div
                style={{
                    marginTop: "25px",
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    padding: "30px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
            >
                <h2
                    style={{
                        marginTop: 0,
                        color: "#5E8F3C",
                    }}
                >
                    Algemene controlemap
                </h2>

                <p>
                    Iedere project krijgt één algemene controlemap.
                </p>

                <p>
                    Binnen deze controlemap worden alle fases en onderdelen
                    beheerd.
                </p>

                <ul>
                    <li>Projectgegevens</li>
                    <li>Fases</li>
                    <li>Onderdelen</li>
                    <li>Inkomende goederen</li>
                    <li>Conservering</li>
                    <li>Kwaliteitscontroles</li>
                    <li>Vrijgave productie</li>
                </ul>
            </div>
        </>
    );
}