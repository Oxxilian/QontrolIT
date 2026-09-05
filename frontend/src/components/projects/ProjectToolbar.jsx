import { Box, Button, Link } from "@mui/material";

export default function ProjectToolbar({ onImport }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 4,
            }}
        >
            <Button
                variant="contained"
                sx={{
                    width: 180,
                    height: 40,
                    backgroundColor: "#5E8F3C",
                    fontWeight: 600,
                    fontSize: "0.60rem",
                    "&:hover": {
                        backgroundColor: "#4D7532",
                    },
                }}
            >
                Zoeken...
            </Button>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
            >
                <Button
                    variant="contained"
                    onClick={onImport}
                    sx={{
                        width: 180,
                        height: 40,
                        backgroundColor: "#5E8F3C",
                        fontWeight: 600,
                        fontSize: "0.60rem",
                        "&:hover": {
                            backgroundColor: "#4D7532",
                        },
                    }}
                >
                    📁 Project importeren
                </Button>

                <Link
                    component="button"
                    underline="hover"
                    sx={{
                        mt: 1.5,
                        fontSize: "0.80rem",
                        color: "#666",
                    }}
                >
                    Handmatig project aanmaken
                </Link>
            </Box>
        </Box>
    );
}