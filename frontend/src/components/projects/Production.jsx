import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
    getProduction,
} from "../../services/productionService";

export default function Production({ projectId }) {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        loadProduction();

    }, [projectId]);

    async function loadProduction() {

        try {

            setLoading(true);

            const data = await getProduction(projectId);

            setRows(data);

        } catch (err) {

            console.error(err);

            setError("Productiestappen konden niet worden geladen.");

        } finally {

            setLoading(false);

        }

    }

    const columns = [

        {
            field: "phase",
            headerName: "Fase",
            flex: 1.4,
        },

        {
            field: "status",
            headerName: "Status",
            flex: 1,
        },

        {
            field: "employee",
            headerName: "Medewerker",
            flex: 1.2,
        },

        {
            field: "planned_start",
            headerName: "Planning start",
            flex: 1,
        },

        {
            field: "planned_end",
            headerName: "Planning eind",
            flex: 1,
        },

        {
            field: "actual_start",
            headerName: "Werkelijke start",
            flex: 1,
        },

        {
            field: "actual_end",
            headerName: "Werkelijk gereed",
            flex: 1,
        },

    ];

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

        <Paper sx={{ p: 2 }}>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >

                <Typography
                    variant="h5"
                    fontWeight={600}
                >
                    Productie
                </Typography>

                <Button
                    variant="contained"
                >
                    Productiestap toevoegen
                </Button>

            </Stack>

            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
            />

        </Paper>

    );

}