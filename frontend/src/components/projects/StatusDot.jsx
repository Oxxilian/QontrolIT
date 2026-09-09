import { Box } from "@mui/material";

const colors = {
    "🔴": "#d32f2f",
    "🟡": "#ed6c02",
    "🟢": "#2e7d32",
};

export default function StatusDot({ status, onClick }) {

    return (

        <Box
            onClick={onClick}
            sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                bgcolor: colors[status],
                cursor: "pointer",
                flexShrink: 0,
                transition: "0.15s",
                "&:hover": {
                    transform: "scale(1.15)",
                },
            }}
        />

    );

}