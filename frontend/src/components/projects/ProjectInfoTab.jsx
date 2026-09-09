import {
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

function InfoItem({ label, value }) {

    return (

        <Grid
            size={{
                xs: 12,
                md: 6,
            }}
        >

            <Typography
                variant="caption"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                fontWeight={600}
            >
                {value || "-"}
            </Typography>

        </Grid>

    );

}

export default function ProjectInfoTab({ project }) {

    if (!project) return null;

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
                        height: "100%",
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            mb={3}
                        >
                            Projectinformatie
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Grid
                            container
                            spacing={3}
                        >

                            <InfoItem
                                label="Projectnummer"
                                value={project.project_number}
                            />

                            <InfoItem
                                label="Projectnaam"
                                value={project.project_name}
                            />

                            <InfoItem
                                label="Klant"
                                value={project.customer_name}
                            />

                            <InfoItem
                                label="Locatie"
                                value={project.location}
                            />

                            <InfoItem
                                label="Projectleider"
                                value={project.project_manager}
                            />

                            <InfoItem
                                label="Werkvoorbereider"
                                value={project.work_preparer}
                            />

                            <InfoItem
                                label="Startdatum"
                                value={project.start_date}
                            />

                            <InfoItem
                                label="Einddatum"
                                value={project.end_date}
                            />

                        </Grid>

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
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            mb={3}
                        >
                            Samenvatting
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Typography
                            color="text.secondary"
                        >
                            Hier komt later een samenvatting van het project,
                            voortgang, planning, openstaande acties en
                            kwaliteitsstatus.
                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

        </Grid>

    );

}