import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Link,
    Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "project", headerName: "Project", flex: 1.5 },
    { field: "customer", headerName: "Klant", flex: 1.2 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "progress", headerName: "Gereed", flex: 0.6 },
];

const rows = [
    {
        id: 1,
        project: "24015 - Gemeente Zwolle",
        customer: "Gemeente Zwolle",
        status: "Lopend",
        progress: "42%",
    },
    {
        id: 2,
        project: "24016 - Station Almelo",
        customer: "ProRail",
        status: "Conservering",
        progress: "81%",
    },
];

export default function Projects() {

    const [open, setOpen] = useState(false);

    return (
        <Box>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: "#2F343A",
                    mb: 4,
                    textAlign: "center",
                }}
            >
                Projecten
            </Typography>

            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
            >
                <CardContent sx={{ p: 4 }}>

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
                                onClick={() => setOpen(true)}
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

                    <Divider sx={{ mb: 4 }} />

                    <div style={{ height: 500 }}>

                        <DataGrid
                            rows={rows}
                            columns={columns}
                            disableRowSelectionOnClick
                            pageSizeOptions={[10, 25, 50]}
                        />

                    </div>

                </CardContent>

            </Card>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
            >

                <DialogTitle
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    Project importeren
                </DialogTitle>

                <DialogContent>

                    <Card
                        variant="outlined"
                        sx={{
                            mt: 2,
                            borderRadius: 2,
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                            >
                                Geselecteerde projectmap
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 3,
                                    mb: 3,
                                    color: "#777",
                                    textAlign: "center",
                                }}
                            >
                                Nog geen projectmap geselecteerd
                            </Typography>

                            <Box
                                display="flex"
                                justifyContent="center"
                            >

                                <Button
                                    variant="contained"
                                    sx={{
                                        width: 180,
                                        backgroundColor: "#5E8F3C",

                                        "&:hover": {
                                            backgroundColor: "#4D7532",
                                        },
                                    }}
                                >
                                    Bladeren...
                                </Button>

                            </Box>

                        </CardContent>

                    </Card>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => setOpen(false)}
                    >
                        Annuleren
                    </Button>

                    <Button
                        variant="contained"
                        disabled
                        sx={{
                            backgroundColor: "#5E8F3C",
                        }}
                    >
                        Importeren
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}