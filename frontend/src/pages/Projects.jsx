import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";

import useProjects from "../hooks/useProjects";

import {
    deleteProject,
} from "../services/projectService";

import ProjectTable from "../components/projects/ProjectTable";
import ProjectToolbar from "../components/projects/ProjectToolbar";
import ImportProjectDialog from "../components/projects/ImportProjectDialog";

export default function Projects() {

    const [openImport, setOpenImport] =
        useState(false);

    const [
        deleteDialogOpen,
        setDeleteDialogOpen,
    ] = useState(false);

    const [
        selectedProject,
        setSelectedProject,
    ] = useState(null);

    const {
        projects,
        loading,
        error,
        reload,
    } = useProjects();

    function handleImported() {

        reload();

    }

    function handleDeleteClick(
        project,
    ) {

        setSelectedProject(project);

        setDeleteDialogOpen(true);

    }

    async function handleDeleteConfirm() {

        if (!selectedProject) {
            return;
        }

        try {

            await deleteProject(
                selectedProject.project_number
            );

            setDeleteDialogOpen(false);

            setSelectedProject(null);

            reload();

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <Box>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: "#2F343A",
                    mb: 4,
                    textAlign: "center",
                }}
            >
                Projecten
            </Typography>

            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow:
                        "0 8px 24px rgba(0,0,0,0.08)",
                }}
            >

                <CardContent sx={{ p: 4 }}>

                    <ProjectToolbar
                        onImport={() =>
                            setOpenImport(true)
                        }
                    />

                    <Divider sx={{ mb: 4 }} />

                    {error && (

                        <Alert
                            severity="error"
                            sx={{ mb: 3 }}
                        >
                            {error}
                        </Alert>

                    )}

                    <ProjectTable
                        projects={projects}
                        loading={loading}
                        onDelete={handleDeleteClick}
                    />

                </CardContent>

            </Card>

            <ImportProjectDialog
                open={openImport}
                onClose={() =>
                    setOpenImport(false)
                }
                onImported={handleImported}
            />

            <Dialog
                open={deleteDialogOpen}
                onClose={() =>
                    setDeleteDialogOpen(false)
                }
            >

                <DialogTitle>
                    Project verwijderen
                </DialogTitle>

                <DialogContent>

                    Weet je zeker dat project

                    <strong>
                        {" "}
                        {selectedProject?.project_name}
                    </strong>

                    wilt verwijderen?

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() =>
                            setDeleteDialogOpen(false)
                        }
                    >
                        Annuleren
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={
                            handleDeleteConfirm
                        }
                    >
                        Verwijderen
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>

    );

}