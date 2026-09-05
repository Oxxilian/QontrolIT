import {
    Box,
    Button,
    Divider,
    Stack,
    TextField,
} from "@mui/material";

import {
    FolderOpen,
    RefreshCcw,
    Search,
} from "lucide-react";

export default function DocumentToolbar({

    search,
    onSearchChange,
    onRefresh,
    onOpenFolder,

}) {

    return (

        <Box
            sx={{
                p: 2,
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: "#fafafa",
            }}
        >

            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >

                <TextField
                    size="small"
                    fullWidth
                    placeholder="Zoek document..."
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <Search
                                    size={18}
                                    style={{
                                        marginRight: 8,
                                    }}
                                />
                            ),
                        },
                    }}
                />

                <Divider
                    orientation="vertical"
                    flexItem
                />

                <Button
                    variant="outlined"
                    startIcon={<RefreshCcw size={18} />}
                    onClick={onRefresh}
                >
                    Vernieuwen
                </Button>

                <Button
                    variant="contained"
                    startIcon={<FolderOpen size={18} />}
                    onClick={onOpenFolder}
                >
                    Open map
                </Button>

            </Stack>

        </Box>

    );

}