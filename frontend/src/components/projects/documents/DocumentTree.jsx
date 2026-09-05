import { useMemo, useState } from "react";

import {
    Box,
    List,
} from "@mui/material";

import FolderNode from "./FolderNode";

export default function DocumentTree({ documents, onOpen }) {

    const [expanded, setExpanded] = useState({});

    const tree = useMemo(() => {

        const root = {
            name: "",
            folders: {},
            files: [],
        };

        documents.forEach((document) => {

            const parts = document.relative_path.split("\\");

            let current = root;

            for (let i = 0; i < parts.length - 1; i++) {

                const folder = parts[i];

                if (!current.folders[folder]) {

                    current.folders[folder] = {
                        name: folder,
                        folders: {},
                        files: [],
                    };

                }

                current = current.folders[folder];

            }

            current.files.push(document);

        });

        return root;

    }, [documents]);

    function toggle(path) {

        setExpanded((previous) => ({

            ...previous,

            [path]: !previous[path],

        }));

    }

    return (

        <Box>

            <List disablePadding>

                {Object.values(tree.folders).map((folder) => (

                    <FolderNode
                        key={folder.name}
                        folder={folder}
                        path={folder.name}
                        level={0}
                        expanded={expanded}
                        onToggle={toggle}
                        onOpen={onOpen}
                    />

                ))}

            </List>

        </Box>

    );

}