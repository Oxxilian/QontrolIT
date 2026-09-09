import {
    Box,
    Stack,
    Typography,
} from "@mui/material";

import StatusDot from "./StatusDot";

export default function ProjectHeader({ project }) {

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

                <StatusDot
                    status={project.status}
                />

            </Box>

        </Box>

    );

}