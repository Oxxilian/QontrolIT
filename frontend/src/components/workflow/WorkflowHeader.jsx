import {
    Box,
    Typography,
} from "@mui/material";

export default function WorkflowHeader({
    projectNumber,
    projectName,
}) {

    return (

        <Box
            sx={{
                mb: 4,
            }}
        >

            <Typography
                sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#2F343A",
                }}
            >
                {projectNumber}
            </Typography>

            <Typography
                sx={{
                    mt: 0.5,
                    fontSize: 18,
                    color: "#6B7280",
                }}
            >
                {projectName}
            </Typography>

        </Box>

    );

}