import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    FolderOpen,
    CheckCircle2,
    TriangleAlert,
} from "lucide-react";

import {
    importProject,
    scanProject,
} from "../../services/projectService";

export default function ImportProjectDialog({
    open,
    onClose,
    onImported,
}) {
    const [projectPath, setProjectPath] = useState("");
    const [scanResult, setScanResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    async function browseFolder() {

        console.log("Electron API:", window.electron);

        if (!window.electron) {

            setSeverity("error");
            setMessage("Electron API niet beschikbaar.");

            return;

        }

        setMessage("");
        setScanResult(null);

        try {

            const folder =
                await window.electron.selectProjectFolder();

            console.log("Geselecteerde map:", folder);

            if (!folder) {
                return;
            }

            setProjectPath(folder);

            setLoading(true);

            const result =
                await scanProject(folder);

            console.log(result);

            setScanResult(result);

        } catch (error) {

            console.error(error);

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

            const result =
                await importProject(projectPath);

            setSeverity("success");
            setMessage(result.database);

            if (onImported) {
    await onImported();
}

setProjectPath("");
setScanResult(null);
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
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>
                Project importeren
            </DialogTitle>

            <DialogContent>

                <Card
                    variant="outlined"
                    sx={{
                        mt: 2,
                        borderRadius: 2,
                    }}
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

                        {scanResult && (

                            <Box mt={4}>

                                <Divider sx={{ mb: 3 }} />

                                <Typography
                                    variant="h6"
                                    gutterBottom
                                >
                                    Projectgegevens
                                </Typography>

                                <Stack spacing={2}>

                                    <TextField
                                        label="Projectnummer"
                                        value={scanResult.project_number}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />

                                    <TextField
                                        label="Projectnaam"
                                        value={scanResult.project_name}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />

                                    <TextField
                                        label="Opdrachtgever"
                                        value={scanResult.customer}
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
                                    Mappen
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    flexWrap="wrap"
                                >

                                    {scanResult.found.map(
                                        (folder) => (
                                            <Chip
                                                key={folder}
                                                color="success"
                                                icon={
                                                    <CheckCircle2 size={16} />
                                                }
                                                label={folder}
                                            />
                                        )
                                    )}

                                    {scanResult.missing.map(
                                        (folder) => (
                                            <Chip
                                                key={folder}
                                                color="warning"
                                                icon={
                                                    <TriangleAlert size={16} />
                                                }
                                                label={folder}
                                            />
                                        )
                                    )}

                                </Stack>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 4,
                                        mb: 2,
                                    }}
                                >
                                    Samenvatting
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                >

                                    <Chip
                                        color="primary"
                                        label={`${scanResult.files.length} bestanden`}
                                    />

                                    <Chip
                                        color="info"
                                        label={`${scanResult.folders.length} mappen`}
                                    />

                                </Stack>

                            </Box>

                        )}

                    </CardContent>

                </Card>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Annuleren
                </Button>

                <Button
                    variant="contained"
                    onClick={handleImport}
                    disabled={
                        loading ||
                        !scanResult
                    }
                    sx={{
                        backgroundColor: "#5E8F3C",
                    }}
                >
                    Importeren
                </Button>

            </DialogActions>

        </Dialog>

    );

}