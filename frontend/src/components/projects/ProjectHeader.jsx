import {
    Box,
    Typography,
} from "@mui/material";

import StatusDot from "./StatusDot";

export default function ProjectHeader({
    project,
    selectedPhase,
}) {

    return (

        <Box
            sx={{
                mb: 4,
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                            color: "#FFFFFF",
                        }}
                    >
                        {project.project_number}
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            color: "#FFFFFF",
                        }}
                    >
                        {project.project_name}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,
                            color: "#C7CCD1",
                        }}
                    >
                        {project.customer}
                    </Typography>

                </Box>

                {selectedPhase && (

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            mr: 2,
                        }}
                    >

                        <Box
                            sx={{
                                textAlign: "right",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: "#FFFFFF",
                                }}
                            >
                                {selectedPhase.phase_number}
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 0.5,
                                    color: "#C7CCD1",
                                }}
                            >
                                {selectedPhase.name}
                            </Typography>

                        </Box>

                        <StatusDot
                            status={selectedPhase.status}
                        />

                    </Box>

                )}

            </Box>

        </Box>

    );

}