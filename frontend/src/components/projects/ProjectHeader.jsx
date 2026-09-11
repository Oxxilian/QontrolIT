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
                    >
                        {project.project_number}
                    </Typography>

                    <Typography
                        variant="h5"
                    >
                        {project.project_name}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
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
                                }}
                            >
                                {selectedPhase.phase_number}
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{
                                    mt: 0.5,
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