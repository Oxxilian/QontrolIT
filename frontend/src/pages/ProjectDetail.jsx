import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Alert,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";

import api from "../api/api";

import ProjectWorkflow from "../components/projects/ProjectWorkflow";
import ProjectDocuments from "../components/projects/ProjectDocuments";
import Production from "../components/projects/Production";

export default function ProjectDetail() {

    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [tab, setTab] = useState(0);

    useEffect(() => {
        loadProject();
    }, [id]);

    async function loadProject() {

        try {

            setLoading(true);

            const response = await api.get(`/projects/${id}`);

            setProject(response.data);

        } catch (error) {

            if (error.response?.data?.detail) {
                setError(error.response.data.detail);
            } else {
                setError("Project kon niet worden geladen.");
            }

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 8,
                }}
            >

                <CircularProgress />

            </Box>

        );

    }

    if (error) {

        return (

            <Alert severity="error">

                {error}

            </Alert>

        );

    }

    return (

        <>

            <Typography
                variant="h4"
                fontWeight={700}
            >
                {project.project_number}
            </Typography>

            <Typography
                variant="h6"
                color="text.secondary"
                mb={4}
            >
                {project.project_name}
            </Typography>

            <Card sx={{ mb: 3 }}>

                <Tabs
                    value={tab}
                    onChange={(event, value) => setTab(value)}
                    
                >
                    <Tab label="Algemeen" />
                    <Tab label="Workflow" />
                    <Tab label="Documenten" />
                    <Tab label="Productie" />
                    <Tab label="Kwaliteit" />
                    <Tab label="Conservering" />
                    <Tab label="Rapportages" />
                    <Tab label="Logboek" />
                </Tabs>

            </Card>

            {tab === 0 && (

                <Card>

                    <CardContent>

                        <Grid
                            container
                            spacing={3}
                        >

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    label="Projectnummer"
                                    value={project.project_number}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                />

                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    label="Projectnaam"
                                    value={project.project_name}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                />

                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    label="Opdrachtgever"
                                    value={project.customer}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                />

                            </Grid>

                            <Grid size={{ xs: 12 }}>

                                <TextField
                                    fullWidth
                                    label="Projectpad"
                                    value={project.project_path}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                />

                            </Grid>

                        </Grid>

                    </CardContent>

                </Card>

            )}

            {tab === 1 && (

                <ProjectWorkflow
                    workflow={project.workflow}
                />

            )}

            {tab === 2 && (

                <ProjectDocuments
                    projectId={project.id}
                />

            )}

            {tab === 3 && (

                <Production
                    projectId={project.id}
                />

            )}

            {tab === 4 && (

                <Card>

                    <CardContent>

                        <Typography variant="h5">

                            Kwaliteitsmodule

                        </Typography>

                    </CardContent>

                </Card>

            )}

            {tab === 5 && (

                <Card>

                    <CardContent>

                        <Typography variant="h5">

                            Conserveringsmodule

                        </Typography>

                    </CardContent>

                </Card>

            )}

            {tab === 6 && (

                <Card>

                    <CardContent>

                        <Typography variant="h5">

                            Rapportages

                        </Typography>

                    </CardContent>

                </Card>

            )}

            {tab === 7 && (

                <Card>

                    <CardContent>

                        <Typography variant="h5">

                            Logboek

                        </Typography>

                    </CardContent>

                </Card>

            )}

        </>

    );

}