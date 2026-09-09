import { useState } from "react";

import {
    Alert,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { FolderOpen } from "lucide-react";

import {
    importProject,
    scanProject,
} from "../../services/projectService";

import PhaseCard from "./PhaseCard";

export default function ImportProjectDialog({
    open,
    onClose,
    onImported,
}) {

    const [projectPath, setProjectPath] = useState("");
    const [project, setProject] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    async function browseFolder() {

        if (!window.electron) {

            setSeverity("error");
            setMessage("Electron API niet beschikbaar.");
            return;

        }

        setMessage("");
        setProject(null);

        try {

            const folder =
                await window.electron.selectProjectFolder();

            if (!folder) {
                return;
            }

            setProjectPath(folder);

            setLoading(true);

            const result =
                await scanProject(folder);

            setProject(result);

        } catch (error) {

            setSeverity("error");

            if (error.response?.data?.detail) {

                setMessage(
                    error.response.data.detail
                );

            } else {

                setMessage("Scannen mislukt.");

            }

        } finally {

            setLoading(false);

        }

    }

    async function handleImport() {

        try {

            setLoading(true);

            await importProject(projectPath);

            if (onImported) {
                await onImported();
            }

            setProject(null);
            setProjectPath("");
            setMessage("");

            onClose();

        } catch (error) {

            setSeverity("error");

            if (error.response?.data?.detail) {

                setMessage(
                    error.response.data.detail
                );

            } else {

                setMessage("Importeren mislukt.");

            }

        } finally {

            setLoading(false);

        }

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
        >

            <DialogTitle>
                Project importeren
            </DialogTitle>

            <DialogContent>

                <Card
                    variant="outlined"
                    sx={{ mt: 2 }}
                >

                    <CardContent>

                        <Stack
                            direction="row"
                            spacing={2}
                        >

                            <TextField
                                fullWidth
                                label="Projectmap"
                                value={projectPath}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                            />

                            <Button
                                variant="contained"
                                startIcon={
                                    <FolderOpen size={18} />
                                }
                                onClick={browseFolder}
                                disabled={loading}
                            >
                                Bladeren
                            </Button>

                        </Stack>

                        {message && (

                            <Alert
                                severity={severity}
                                sx={{ mt: 3 }}
                            >
                                {message}
                            </Alert>

                        )}

                        {project && (

                            <>

                                <Divider sx={{ my: 4 }} />

                                <Typography
                                    variant="h6"
                                >
                                    Project
                                </Typography>

                                <Stack
                                    spacing={2}
                                    sx={{ mt: 2 }}
                                >

                                    <TextField
                                        label="Projectnummer"
                                        value={project.project_number}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />

                                    <TextField
                                        label="Projectnaam"
                                        value={project.project_name}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />

                                    <TextField
                                        label="Opdrachtgever"
                                        value={project.customer}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />

                                </Stack>

                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 4,
                                        mb: 2,
                                    }}
                                >
                                    Fases ({project.phases.length})
                                </Typography>

                                <Stack spacing={2}>

                                    {project.phases.map((phase) => (

                                        <PhaseCard
                                            key={phase.code}
                                            phase={phase}
                                        />

                                    ))}

                                </Stack>

                            </>

                        )}

                    </CardContent>

                </Card>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Annuleren
                </Button>

                <Button
                    variant="contained"
                    disabled={
                        loading ||
                        !project
                    }
                    onClick={handleImport}
                >
                    Importeren
                </Button>

            </DialogActions>

        </Dialog>

    );

}