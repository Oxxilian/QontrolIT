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
                sx={{
                    "--DataGrid-containerBackground": "#252A2F",
                    "--DataGrid-rowBorderColor": "#596168",

                    backgroundColor: "#363C42",
                    color: "#FFFFFF",
                    border: "1px solid #596168",

                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#252A2F !important",
                        color: "#FFFFFF",
                        borderBottom: "1px solid #596168",
                    },

                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#252A2F !important",
                    },

                    "& .MuiDataGrid-columnHeaderTitle": {
                        color: "#FFFFFF",
                        fontWeight: 700,
                    },

                    "& .MuiDataGrid-cell": {
                        color: "#FFFFFF",
                        borderBottom:
                            "1px solid #596168",
                    },

                    "& .MuiDataGrid-row": {
                        backgroundColor: "#363C42",
                    },

                    "& .MuiDataGrid-row:hover": {
                        backgroundColor: "#3D444A",
                    },

                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "#252A2F",
                        color: "#FFFFFF",
                        borderTop: "1px solid #596168",
                    },

                    "& .MuiTablePagination-root": {
                        color: "#FFFFFF",
                    },

                    "& .MuiTablePagination-selectIcon": {
                        color: "#FFFFFF",
                    },

                    "& .MuiDataGrid-iconButtonContainer": {
                        color: "#FFFFFF",
                    },

                    "& .MuiDataGrid-sortIcon": {
                        color: "#FFFFFF",
                    },

                    "& .MuiDataGrid-menuIconButton": {
                        color: "#FFFFFF",
                    },

                    "& .MuiCheckbox-root": {
                        color: "#5E8F3C",
                    },

                    "& .MuiCheckbox-root.Mui-checked": {
                        color: "#5E8F3C",
                    },
                }}
            />

        </div>

    );

}