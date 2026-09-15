import {
    Box,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import StatusDot from "./StatusDot";

export default function ProcessSection({ process }) {

    return (

        <Box
            sx={{
                mb: 4,
            }}
        >

            <Typography
                variant="subtitle1"
                fontWeight={700}
                sx={{
                    mb: 1,
                }}
            >
                {process.title}
            </Typography>

            <Divider
                sx={{
                    mb: 2,
                }}
            />

            <Stack spacing={1.5}>

                {process.items.map((item) => (

                    <Stack
                        key={item.name}
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems: "center",
                        }}
                    >

                        <StatusDot
                            status={item.status}
                        />

                        <Typography
                            variant="body1"
                        >
                            {item.name}
                        </Typography>

                    </Stack>

                ))}

            </Stack>

        </Box>

    );

}