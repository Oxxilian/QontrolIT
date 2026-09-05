import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Box,
    CircularProgress,
    Divider,
    Grid,
    List,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import { getProjectDocuments } from "../../services/documentService";

import DocumentTree from "./documents/DocumentTree";
import FileNode from "./documents/FileNode";

export default function ProjectDocuments({ projectId }) {

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [selectedFolder, setSelectedFolder] = useState("");

    useEffect(() => {
        loadDocuments();
    }, [projectId]);

    async function loadDocuments() {

        try {

            setLoading(true);

            const result = await getProjectDocuments(projectId);

            setDocuments(result);

        } catch (error) {

            if (error.response?.data?.detail) {
                setError(error.response.data.detail);
            } else {
                setError("Documenten konden niet worden geladen.");
            }

        } finally {

            setLoading(false);

        }

    }

    async function openDocument(file) {

        await window.electron.openFile(file.full_path);

    }

    const filteredDocuments = useMemo(() => {

        const value = search.toLowerCase();

        return documents.filter(doc =>

            doc.name.toLowerCase().includes(value) ||
            doc.relative_path.toLowerCase().includes(value)

        );

    }, [documents, search]);

    const folderFiles = useMemo(() => {

        if (!selectedFolder)
            return [];

        return filteredDocuments.filter(doc => {

            const folder = doc.relative_path.substring(
                0,
                doc.relative_path.lastIndexOf("\\")
            );

            return folder === selectedFolder;

        });

    }, [filteredDocuments, selectedFolder]);

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

        <Grid container spacing={2}>

            <Grid size={{ xs: 4 }}>

                <Paper sx={{ p: 2, height: "78vh", overflow: "auto" }}>

                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Zoeken..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <DocumentTree
                        documents={filteredDocuments}
                        onOpen={openDocument}
                        onSelectFolder={setSelectedFolder}
                    />

                </Paper>

            </Grid>

            <Grid size={{ xs: 8 }}>

                <Paper sx={{ height: "78vh", overflow: "auto" }}>

                    <Box sx={{ p: 2 }}>

                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            {selectedFolder || "Selecteer een map"}
                        </Typography>

                    </Box>

                    <Divider />

                    <List>

                        {folderFiles.map(file => (

                            <FileNode
                                key={file.full_path}
                                file={file}
                                level={0}
                                onOpen={openDocument}
                            />

                        ))}

                    </List>

                </Paper>

            </Grid>

        </Grid>

    );

}