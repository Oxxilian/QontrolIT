import {
    Box,
    List,
    Paper,
    Typography,
} from "@mui/material";

import FileNode from "./FileNode";

export default function DocumentList({

    folder,
    files,
    onOpen,

}) {

    return (

        <Paper
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >

            <Box
                sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: "1px solid #e0e0e0",
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    {folder || "Geen map geselecteerd"}
                </Typography>

            </Box>

            <List
                sx={{
                    flex: 1,
                    overflow: "auto",
                }}
            >

                {files.map((file) => (

                    <FileNode
                        key={file.full_path}
                        file={file}
                        level={0}
                        onOpen={onOpen}
                    />

                ))}

            </List>

        </Paper>

    );

}