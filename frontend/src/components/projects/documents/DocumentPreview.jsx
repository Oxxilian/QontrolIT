import {
    Box,
    Divider,
    Paper,
    Typography,
} from "@mui/material";

import {
    FileText,
} from "lucide-react";

export default function DocumentPreview({ file }) {

    if (!file) {

        return (

            <Paper
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <Box
                    textAlign="center"
                >

                    <FileText
                        size={64}
                        color="#BDBDBD"
                    />

                    <Typography
                        variant="h6"
                        mt={2}
                    >
                        Geen document geselecteerd
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Selecteer links een document.
                    </Typography>

                </Box>

            </Paper>

        );

    }

    return (

        <Paper
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >

            <Box
                sx={{
                    p: 2,
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    {file.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {file.relative_path}
                </Typography>

            </Box>

            <Divider />

            <Box
                sx={{
                    p: 3,
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <Typography
                    color="text.secondary"
                >
                    Preview wordt in de volgende sprint toegevoegd.
                </Typography>

            </Box>

        </Paper>

    );

}