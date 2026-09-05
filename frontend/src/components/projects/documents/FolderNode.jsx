import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import {
    ChevronDown,
    ChevronRight,
    Folder,
    FolderOpen,
} from "lucide-react";

import FileNode from "./FileNode";

export default function FolderNode({

    folder,
    path,
    level,
    expanded,
    onToggle,
    onOpen,
    onSelectFolder,

}) {

    const open = expanded[path] ?? true;

    return (

        <>

            <ListItemButton
                onClick={() => {

                    onToggle(path);

                    if (onSelectFolder) {
                        onSelectFolder(path);
                    }

                }}
                sx={{
                    pl: level * 2 + 1,
                }}
            >

                <ListItemIcon sx={{ minWidth: 28 }}>

                    {open
                        ? <ChevronDown size={16} />
                        : <ChevronRight size={16} />}

                </ListItemIcon>

                <ListItemIcon sx={{ minWidth: 28 }}>

                    {open
                        ? <FolderOpen size={18} color="#d4a017" />
                        : <Folder size={18} color="#d4a017" />}

                </ListItemIcon>

                <ListItemText
                    primary={folder.name}
                />

            </ListItemButton>

            <Collapse
                in={open}
                timeout="auto"
            >

                <List disablePadding>

                    {Object.values(folder.folders).map((child) => (

                        <FolderNode
                            key={child.name}
                            folder={child}
                            path={`${path}\\${child.name}`}
                            level={level + 1}
                            expanded={expanded}
                            onToggle={onToggle}
                            onOpen={onOpen}
                            onSelectFolder={onSelectFolder}
                        />

                    ))}

                    {folder.files.map((file) => (

                        <FileNode
                            key={file.full_path}
                            file={file}
                            level={level + 1}
                            onOpen={onOpen}
                        />

                    ))}

                </List>

            </Collapse>

        </>

    );

}