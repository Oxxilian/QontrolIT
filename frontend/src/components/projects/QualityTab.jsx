import {
    Card,
    CardContent,
    Checkbox,
    Chip,
    Divider,
    FormControlLabel,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

const checks = [
    "Materiaalingang gecontroleerd",
    "Maatvoering gecontroleerd",
    "Lasnaden gecontroleerd",
    "Visuele controle uitgevoerd",
    "Eindcontrole uitgevoerd",
    "Project vrijgegeven",
];

export default function QualityTab() {

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
                            Kwaliteitscontrole
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Stack spacing={2}>

                            {checks.map((check, index) => (

                                <FormControlLabel
                                    key={check}
                                    control={
                                        <Checkbox
                                            checked={index < 2}
                                        />
                                    }
                                    label={check}
                                />

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
                            Status
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Chip
                            label="Controle actief"
                            color="warning"
                        />

                        <Typography
                            color="text.secondary"
                            mt={3}
                        >
                            2 van de 6 controles zijn afgerond.
                            Zodra alle controles zijn voltooid kan
                            het project automatisch worden vrijgegeven.
                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

        </Grid>

    );

}