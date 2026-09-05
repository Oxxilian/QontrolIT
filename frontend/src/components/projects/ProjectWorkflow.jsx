import {
    Box,
    Paper,
    Typography,
    Divider,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ProjectWorkflow({ workflow }) {

    if (!workflow) {
        return (
            <Typography>
                Geen workflow gevonden.
            </Typography>
        );
    }

    return (

        <Box sx={{ width: "100%" }}>

            {(workflow.phases ?? []).map((phase) => (

                <Paper
                    key={phase.phase}
                    sx={{
                        p: 3,
                        mb: 3,
                    }}
                >

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        {phase.phase}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        {phase.name}
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    {(phase.workflows ?? []).length === 0 ? (

                        <Typography color="text.secondary">
                            Geen werkstromen gevonden.
                        </Typography>

                    ) : (

                        <Grid container spacing={3}>

                            {phase.workflows.map((workflow) => (

                                <Grid
                                    key={workflow.id}
                                    size={{
                                        xs: 12,
                                        md: 6,
                                        lg: 4,
                                        xl: 3,
                                    }}
                                >

                                    <Paper
                                        elevation={2}
                                        sx={{
                                            height: "100%",
                                            p: 2,
                                            borderRadius: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            sx={{ mb: 2 }}
                                        >
                                            {workflow.title}
                                        </Typography>

                                        {(workflow.assemblies ?? []).length === 0 ? (

                                            <Typography
                                                color="text.secondary"
                                            >
                                                Geen assemblies gevonden.
                                            </Typography>

                                        ) : (

                                            workflow.assemblies.map((assembly) => (

                                                <Accordion
                                                    key={assembly.id}
                                                    disableGutters
                                                    elevation={0}
                                                    sx={{
                                                        mb: 1,
                                                        border: "1px solid #ddd",
                                                        borderRadius: 1,
                                                        "&:before": {
                                                            display: "none",
                                                        },
                                                    }}
                                                >

                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                    >

                                                        <Box>

                                                            <Typography
                                                                fontWeight={600}
                                                            >
                                                                {assembly.name}
                                                            </Typography>

                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                {assembly.total_files} bestanden
                                                            </Typography>

                                                        </Box>

                                                    </AccordionSummary>

                                                    <AccordionDetails>

                                                        {(assembly.files ?? []).length === 0 ? (

                                                            <Typography
                                                                color="text.secondary"
                                                            >
                                                                Geen documenten gevonden.
                                                            </Typography>

                                                        ) : (

                                                            <List dense>

                                                                {assembly.files.map((file) => (

                                                                    <ListItem
                                                                        key={file.path}
                                                                        disablePadding
                                                                    >

                                                                        <ListItemText
                                                                            primary={file.name}
                                                                        />

                                                                    </ListItem>

                                                                ))}

                                                            </List>

                                                        )}

                                                    </AccordionDetails>

                                                </Accordion>

                                            ))

                                        )}

                                    </Paper>

                                </Grid>

                            ))}

                        </Grid>

                    )}

                </Paper>

            ))}

        </Box>

    );

}