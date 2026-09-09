import { useState } from "react";

import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

export default function Workflow() {

    const [selected, setSelected] =
        useState("production");

    const workflow = [

        {
            id: "preparation",
            title: "Voorbewerking",
            status: "green",
        },

        {
            id: "ready",
            title: "Gereed voor productie",
            status: "green",
        },

        {
            id: "production",
            title: "Productie",
            status: "yellow",
        },

        {
            id: "assembly",
            title: "Samenstellen",
            status: "yellow",
            child: true,
        },

        {
            id: "welding",
            title: "Lassen",
            status: "red",
            child: true,
        },

        {
            id: "coating",
            title: "Conservering",
            status: "red",
        },

        {
            id: "installation",
            title: "Montage",
            status: "red",
        },

    ];

    const colors = {

        red: "#D32F2F",

        yellow: "#FBC02D",

        green: "#2E7D32",

    };

    function StatusDot({ color }) {

        return (

            <Box
                sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    bgcolor: colors[color],
                    flexShrink: 0,
                }}
            />

        );

    }

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={0.5}
            >
                Workflow
            </Typography>

            <Typography
                color="text.secondary"
                mb={4}
            >
                Project 2026-001
            </Typography>

            <Grid
                container
                spacing={3}
            >
                <Grid
                    size={{
                        xs: 12,
                        md: 4,
                    }}
                >

                    <Card
                        sx={{
                            borderRadius: 3,
                            height: "100%",
                        }}
                    >

                        <CardContent
                            sx={{
                                p: 0,
                            }}
                        >

                            <Typography
                                sx={{
                                    px: 3,
                                    py: 2.5,
                                    fontSize: 22,
                                    fontWeight: 700,
                                }}
                            >
                                Workflow
                            </Typography>

                            <Divider />

                            {workflow.map((item) => (

                                <Stack
                                    key={item.id}
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    onClick={() =>
                                        setSelected(item.id)
                                    }
                                    sx={{
                                        px: 3,
                                        py: 2,
                                        pl: item.child ? 7 : 3,
                                        cursor: "pointer",
                                        transition: ".15s",

                                        backgroundColor:
                                            selected === item.id
                                                ? "#EEF5FF"
                                                : "transparent",

                                        "&:hover": {
                                            backgroundColor:
                                                "#F7F8FA",
                                        },
                                    }}
                                >

                                    <StatusDot
                                        color={item.status}
                                    />

                                    <Typography
                                        sx={{
                                            fontWeight:
                                                selected === item.id
                                                    ? 700
                                                    : 600,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                </Stack>

                            ))}

                        </CardContent>

                    </Card>

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 8,
                    }}
                >
                    <Card
                        sx={{
                            borderRadius: 3,
                            height: "100%",
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                                mb={3}
                            >
                                {workflow.find(
                                    item => item.id === selected
                                )?.title}
                            </Typography>

                            <Divider sx={{ mb: 3 }} />

                            <Grid
                                container
                                spacing={3}
                            >

                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6,
                                    }}
                                >

                                    <Card variant="outlined">

                                        <CardContent>

                                            <Typography
                                                variant="caption"
                                            >
                                                Totaal onderdelen
                                            </Typography>

                                            <Typography
                                                variant="h4"
                                                fontWeight={700}
                                            >
                                                142
                                            </Typography>

                                        </CardContent>

                                    </Card>

                                </Grid>

                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6,
                                    }}
                                >

                                    <Card variant="outlined">

                                        <CardContent>

                                            <Typography
                                                variant="caption"
                                            >
                                                Nog samenstellen
                                            </Typography>

                                            <Typography
                                                variant="h4"
                                                fontWeight={700}
                                            >
                                                81
                                            </Typography>

                                        </CardContent>

                                    </Card>

                                </Grid>

                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6,
                                    }}
                                >

                                    <Card variant="outlined">

                                        <CardContent>

                                            <Typography
                                                variant="caption"
                                            >
                                                Nog lassen
                                            </Typography>

                                            <Typography
                                                variant="h4"
                                                fontWeight={700}
                                            >
                                                54
                                            </Typography>

                                        </CardContent>

                                    </Card>

                                </Grid>

                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6,
                                    }}
                                >

                                    <Card variant="outlined">

                                        <CardContent>

                                            <Typography
                                                variant="caption"
                                            >
                                                Gereed
                                            </Typography>

                                            <Typography
                                                variant="h4"
                                                fontWeight={700}
                                            >
                                                61
                                            </Typography>

                                        </CardContent>

                                    </Card>

                                </Grid>
                                <Grid
                                    size={{
                                        xs: 12,
                                    }}
                                >

                                    <Card
                                        variant="outlined"
                                    >

                                        <CardContent>

                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                mb={2}
                                            >
                                                Laatste activiteit
                                            </Typography>

                                            <Typography
                                                color="text.secondary"
                                            >
                                                Vandaag 14:36
                                            </Typography>

                                            <Divider
                                                sx={{
                                                    my: 2,
                                                }}
                                            />

                                            <Typography>
                                                Onderdeel
                                                M-245 is
                                                doorgestuurd
                                                naar Lassen.
                                            </Typography>

                                        </CardContent>

                                    </Card>

                                </Grid>

                            </Grid>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

        </Box>
    );

}