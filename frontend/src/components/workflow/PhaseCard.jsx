import {
    Box,
    Card,
    CardContent,
    Divider,
    Typography,
} from "@mui/material";

export default function PhaseCard({
    title,
    processes,
}) {

    function getProcessColor(status) {

        switch (status) {

            case "🟢":
                return "#5E8F3C";

            case "🟡":
            case "🟨":
                return "#C7A63A";

            default:
                return "#B85C4A";

        }

    }

    const nextPhase = {
        title: "PRODUCTIE",
        status: "🟥",
        text: "Gereed voor\nProductie",
        footer: "Wacht op vrijgave\nProductieleider",
    };

    function getStatusColor(status) {

        switch (status) {

            case "🟢":
                return "#5E8F3C";

            case "🟡":
            case "🟨":
                return "#C7A63A";

            default:
                return "#B85C4A";

        }

    }

    return (

        <Card
            elevation={4}
            sx={{
                mb: 3,
                borderRadius: 3,
                backgroundColor: "#45484F",
            }}
        >

            <CardContent>

                <Typography
                    sx={{
                        color: "#FFFFFF",
                        fontSize: 22,
                        fontWeight: 700,
                        mb: 3,
                    }}
                >
                    {title}
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "68% 32%",
                        gap: 0,
                    }}
                >

                    {/* LINKER DEEL */}

                    <Box
                        sx={{
                            pr: 4,
                        }}
                    >

                        {processes.map((process) => (

                            <Box
                                key={process.id}
                                sx={{
                                    backgroundColor: getProcessColor(process.status),
                                    color: "white",

                                    height: 42,

                                    display: "flex",
                                    alignItems: "center",

                                    pl: 2.5,

                                    mb: 2,

                                    borderRadius: 2,

                                    fontSize: 17,

                                    fontWeight: 600,

                                    width: "78%",
                                }}
                            >

                                {process.name}

                            </Box>

                        ))}

                    </Box>

                    {/* RECHTER STATUSVAK */}

                    <Box
                        sx={{
                            borderLeft: "3px solid #60646B",

                            pl: 4,

                            display: "flex",

                            alignItems: "stretch",
                        }}
                    >

                        <Box
                            sx={{
                                width: "100%",

                                border: `8px solid ${getStatusColor(nextPhase.status)}`,

                                borderRadius: 3,

                                backgroundColor: "#45484F",

                                display: "flex",

                                flexDirection: "column",
                            }}
                        >

                            <Box
                                sx={{
                                    p: 3,
                                }}
                            >

                                <Typography
                                    sx={{
                                        color: "white",
                                        fontWeight: 700,
                                        fontSize: 22,
                                        textAlign: "center",
                                    }}
                                >
                                    {nextPhase.title}
                                </Typography>

                            </Box>

                            <Divider
                                sx={{
                                    borderColor: "#6A6D73",
                                }}
                            />

                            <Box
                                sx={{
                                    flex: 1,

                                    display: "flex",

                                    justifyContent: "center",

                                    alignItems: "center",

                                    px: 4,
                                }}
                            >

                                <Typography
                                    sx={{
                                        color: "white",

                                        fontSize: 32,

                                        fontWeight: 700,

                                        textAlign: "center",

                                        whiteSpace: "pre-line",

                                        lineHeight: 1.3,
                                    }}
                                >
                                    {nextPhase.text}
                                </Typography>

                            </Box>

                            <Divider
                                sx={{
                                    borderColor: "#6A6D73",
                                }}
                            />

                            <Box
                                sx={{
                                    p: 3,
                                }}
                            >

                                <Typography
                                    sx={{
                                        color: "#C9CDD3",

                                        fontSize: 15,

                                        textAlign: "center",

                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {nextPhase.footer}
                                </Typography>

                            </Box>

                        </Box>

                    </Box>

                </Box>

            </CardContent>

        </Card>

    );

}