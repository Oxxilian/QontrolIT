import {
    Stack,
    Typography,
} from "@mui/material";

import StatusDot from "./StatusDot";

export default function WorkflowItem({
    title,
    status,
    indent = false,
    active = false,
    onClick,
}) {

    return (

        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            onClick={onClick}
            sx={{
                px: 3,
                py: 1.8,
                pl: indent ? 7 : 3,
                cursor: "pointer",
                borderRadius: 2,
                transition: "all .15s ease",

                backgroundColor: active
                    ? "#EEF6FF"
                    : "transparent",

                "&:hover": {
                    backgroundColor: active
                        ? "#E5F0FF"
                        : "#F7F8FA",
                },
            }}
        >

            <StatusDot status={status} />

            <Typography
                sx={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: active
                        ? 700
                        : 600,
                    color: "#2F343A",
                    userSelect: "none",
                }}
            >
                {title}
            </Typography>

        </Stack>

    );

}