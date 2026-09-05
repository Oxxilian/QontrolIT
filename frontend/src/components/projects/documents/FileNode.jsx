import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";

import {
    File,
    FileArchive,
    FileCode,
    FileImage,
    FileSpreadsheet,
    FileText,
} from "lucide-react";

export default function FileNode({

    file,
    level,
    onOpen,

}) {

    function getIcon() {

        switch (file.extension.toLowerCase()) {

            case ".pdf":
                return <FileText size={18} color="#d32f2f" />;

            case ".xlsx":
            case ".xls":
            case ".csv":
                return <FileSpreadsheet size={18} color="#2e7d32" />;

            case ".doc":
            case ".docx":
                return <FileText size={18} color="#1565c0" />;

            case ".dwg":
            case ".dxf":
                return <FileCode size={18} color="#6a1b9a" />;

            case ".jpg":
            case ".jpeg":
            case ".png":
            case ".bmp":
            case ".gif":
                return <FileImage size={18} color="#ef6c00" />;

            case ".zip":
            case ".rar":
            case ".7z":
                return <FileArchive size={18} color="#795548" />;

            default:
                return <File size={18} color="#616161" />;

        }

    }

    function formatSize(bytes) {

        if (bytes < 1024)
            return `${bytes} B`;

        if (bytes < 1024 * 1024)
            return `${(bytes / 1024).toFixed(1)} KB`;

        if (bytes < 1024 * 1024 * 1024)
            return `${(bytes / 1024 / 1024).toFixed(1)} MB`;

        return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;

    }

    return (

        <ListItemButton
            onClick={() => onOpen(file)}
            sx={{
                pl: level * 2 + 5,
            }}
        >

            <ListItemIcon sx={{ minWidth: 28 }}>
                {getIcon()}
            </ListItemIcon>

            <ListItemText
                primary={file.name}
                secondary={file.extension.toUpperCase()}
            />

            <Typography
                variant="caption"
                color="text.secondary"
            >
                {formatSize(file.size)}
            </Typography>

        </ListItemButton>

    );

}