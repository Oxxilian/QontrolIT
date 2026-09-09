import {
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import DescriptionIcon from "@mui/icons-material/Description";

const reports = [
    {
        title: "Kwaliteitsrapport",
        description: "Volledig overzicht van alle uitgevoerde kwaliteitscontroles.",
        icon: <DescriptionIcon color="primary" />,
    },
    {
        title: "Productierapport",
        description: "Status en voortgang van alle productieafdelingen.",
        icon: <TableChartIcon color="primary" />,
    },
    {
        title: "Controlemap (PDF)",
        description: "Complete controlemap inclusief documenten en inspecties.",
        icon: <PictureAsPdfIcon color="error" />,
    },
];

export default function ReportsTab() {

    return (

        <Grid
            container
            spacing={3}
        >

            {reports.map((report) => (

                <Grid
                    key={report.title}
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
                                spacing={2}
                                height="100%"
                            >

                                {report.icon}

                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                >
                                    {report.title}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        flexGrow: 1,
                                    }}
                                >
                                    {report.description}
                                </Typography>

                                <Divider />

                                <Button
                                    variant="contained"
                                    fullWidth
                                >
                                    Rapport genereren
                                </Button>

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

            ))}

        </Grid>

    );

}