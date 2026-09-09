import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

const columns = (onDelete) => [
    {
        field: "project_number",
        headerName: "Projectnummer",
        width: 150,
    },
    {
        field: "project_name",
        headerName: "Projectnaam",
        flex: 1,
    },
    {
        field: "customer",
        headerName: "Klant",
        flex: 1,
    },
    {
        field: "current_phase",
        headerName: "Fase",
        width: 180,
    },
    {
        field: "actions",
        headerName: "",
        width: 70,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Tooltip title="Project verwijderen">
                    <IconButton
                        color="error"
                        onClick={(event) => {
                            event.stopPropagation();
                            onDelete(params.row);
                        }}
                    >
                        <Trash2 size={18} />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    },
];

export default function ProjectTable({
    projects,
    loading,
    onDelete,
}) {

    const navigate = useNavigate();

    return (

        <div style={{ height: 500 }}>

            <DataGrid
                rows={projects}
                columns={columns(onDelete)}
                loading={loading}
                getRowId={(row) => row.project_number}
                disableRowSelectionOnClick
                pageSizeOptions={[
                    10,
                    25,
                    50,
                    100,
                ]}
                onRowClick={(params) => {

                    navigate(
                        `/projects/${params.row.project_number}`
                    );

                }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                            page: 0,
                        },
                    },
                }}
            />

        </div>

    );

}