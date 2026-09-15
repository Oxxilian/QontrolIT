import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import StatusDot from "./StatusDot";
import ProcessSection from "./ProcessSection";

export default function PhaseCard({ phase }) {

    const processes = [
        {
            title: "Productie",
            items: Object.values(phase.production || {}).map((item) => ({
                name: item.label,
                status: item.status,
            })),
        },
        {
            title: "Conservering",
            items: Object.values(phase.conservation || {}).map((item) => ({
                name: item.label,
                status: item.status,
            })),
        },
    ];

    return (

        <Accordion
            disableGutters
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                "&:before": {
                    display: "none",
                },
            }}
        >

            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    px: 3,
                    py: 1,
                }}
            >

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        width: "100%",
                    }}
                >

                    <StatusDot
                        status={phase.status}
                    />

                    <Box
                        sx={{
                            flexGrow: 1,
                        }}
                    >

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            {phase.code}
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            {phase.name}
                        </Typography>

                    </Box>

                </Stack>

            </AccordionSummary>

            <AccordionDetails
                sx={{
                    px: 3,
                    pb: 3,
                }}
            >

                <Stack spacing={3}>

                    {processes.map((process) => (

                        <ProcessSection
                            key={process.title}
                            process={process}
                        />

                    ))}

                </Stack>

            </AccordionDetails>

        </Accordion>

    );

}