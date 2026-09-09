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

const departments = [
    {
        name: "Inkoop",
        progress: 100,
        status: "Gereed",
        color: "success",
    },
    {
        name: "Zaagstraat",
        progress: 100,
        status: "Gereed",
        color: "success",
    },
    {
        name: "Laser",
        progress: 80,
        status: "Bezig",
        color: "warning",
    },
    {
        name: "Kantbank",
        progress: 45,
        status: "Bezig",
        color: "warning",
    },
    {
        name: "Lassen",
        progress: 0,
        status: "Wacht",
        color: "default",
    },
    {
        name: "Assemblage",
        progress: 0,
        status: "Wacht",
        color: "default",
    },
];

export default function ProductionTab() {

    return (

        <Grid
            container
            spacing={3}
        >

            {departments.map((department) => (

                <Grid
                    key={department.name}
                    size={{
                        xs: 12,
                        md: 6,
                        xl: 4,
                    }}
                >

                    <Card
                        sx={{
                            borderRadius: 3,
                            height: "100%",
                        }}
                    >

                        <CardContent>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >

                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                >
                                    {department.name}
                                </Typography>

                                <Chip
                                    label={department.status}
                                    color={department.color}
                                    size="small"
                                />

                            </Stack>

                            <Divider sx={{ mb: 3 }} />

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={1}
                            >
                                Voortgang
                            </Typography>

                            <LinearProgress
                                variant="determinate"
                                value={department.progress}
                                sx={{
                                    height: 10,
                                    borderRadius: 10,
                                    mb: 2,
                                }}
                            />

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                {department.progress}%
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            ))}

        </Grid>

    );

}