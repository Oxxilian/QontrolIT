import { Box, Typography } from "@mui/material";

const COLORS = {
    green: "#5E8F3C",
    yellow: "#C7A63A",
    red: "#B85C4A",
};

export default function WorkflowTimeline({
    phases,
    activePhase,
    onChange,
}) {

    return (

        <Box
            sx={{
                mb: 5,
                px: 4,
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                {phases.map((phase, index) => (

                    <Box
                        key={phase.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >

                        <Box
                            onClick={() => onChange(index)}
                            sx={{
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                minWidth: 100,
                            }}
                        >

                            <Box
                                sx={{
                                    width: activePhase === index ? 28 : 18,
                                    height: activePhase === index ? 28 : 18,

                                    borderRadius: "50%",

                                    backgroundColor: COLORS[phase.color],

                                    transition: "all .25s ease",

                                    boxShadow:
                                        activePhase === index
                                            ? `0 0 15px ${COLORS[phase.color]}`
                                            : "none",

                                    "&:hover": {
                                        transform: "scale(1.15)",
                                    },
                                }}
                            />

                            <Typography
                                sx={{
                                    mt: 1.5,
                                    color: "#000000",
                                    fontSize: 14,
                                    fontWeight:
                                        activePhase === index ? 700 : 500,
                                    textAlign: "center",
                                }}
                            >
                                {phase.title}
                            </Typography>

                        </Box>

                        {index !== phases.length - 1 && (

                            <Box
                                sx={{
                                    flex: 1,
                                    height: 4,
                                    mx: 2,
                                    borderRadius: 2,
                                    backgroundColor: "#707070",
                                }}
                            />

                        )}

                    </Box>

                ))}

            </Box>

        </Box>

    );

}