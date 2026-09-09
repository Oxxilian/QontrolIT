import {
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";

const treatments = [
    {
        name: "Stralen",
        progress: 100,
        status: "Gereed",
        color: "success",
    },
    {
        name: "Metalliseren",
        progress: 100,
        status: "Gereed",
        color: "success",
    },
    {
        name: "Poedercoaten",
        progress: 55,
        status: "Bezig",
        color: "warning",
    },
    {
        name: "Laagdiktemeting",
        progress: 0,
        status: "Wacht",
        color: "default",
    },
    {
        name: "Eindinspectie",
        progress: 0,
        status: "Wacht",
        color: "default",
    },
];

export default function ConservationTab() {

    return (

        <Grid
            container
            spacing={3}
        >

            <Grid
                size={{
                    xs: 12,
                    lg: 8,
                }}
            >

                <Card
                    sx={{
                        borderRadius: 3,
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            Conserveringsproces
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Stack spacing={3}>

                            {treatments.map((item) => (

                                <Card
                                    key={item.name}
                                    variant="outlined"
                                >

                                    <CardContent>

                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            mb={2}
                                        >

                                            <Typography
                                                fontWeight={700}
                                            >
                                                {item.name}
                                            </Typography>

                                            <Chip
                                                label={item.status}
                                                color={item.color}
                                                size="small"
                                            />

                                        </Stack>

                                        <LinearProgress
                                            variant="determinate"
                                            value={item.progress}
                                            sx={{
                                                height: 10,
                                                borderRadius: 10,
                                            }}
                                        />

                                        <Typography
                                            mt={2}
                                            fontWeight={600}
                                        >
                                            {item.progress}%
                                        </Typography>

                                    </CardContent>

                                </Card>

                            ))}

                        </Stack>

                    </CardContent>

                </Card>

            </Grid>

            <Grid
                size={{
                    xs: 12,
                    lg: 4,
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
                            variant="h6"
                            fontWeight={700}
                        >
                            Conserveringsstatus
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Typography
                            variant="h2"
                            fontWeight={700}
                            color="primary"
                        >
                            51%
                        </Typography>

                        <Typography
                            color="text.secondary"
                            mt={2}
                        >
                            Het conserveringsproces is gestart.
                            Na afronding van het poedercoaten wordt
                            automatisch de eindinspectie vrijgegeven.
                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

        </Grid>

    );

}