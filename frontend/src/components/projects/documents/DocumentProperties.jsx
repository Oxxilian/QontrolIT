import {
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

export default function DocumentProperties({ file }) {

    function formatSize(bytes) {

        if (!bytes) return "-";

        if (bytes < 1024)
            return `${bytes} B`;

        if (bytes < 1024 * 1024)
            return `${(bytes / 1024).toFixed(1)} KB`;

        if (bytes < 1024 * 1024 * 1024)
            return `${(bytes / 1024 / 1024).toFixed(1)} MB`;

        return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;

    }

    function formatDate(timestamp) {

        if (!timestamp)
            return "-";

        return new Date(timestamp * 1000).toLocaleString("nl-NL");

    }

    return (

        <Paper
            sx={{
                p: 2,
                height: "100%",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={600}
                mb={2}
            >
                Eigenschappen
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {!file && (

                <Typography color="text.secondary">

                    Geen document geselecteerd.

                </Typography>

            )}

            {file && (

                <Stack spacing={2}>

                    <div>

                        <Typography variant="caption">
                            Naam
                        </Typography>

                        <Typography>
                            {file.name}
                        </Typography>

                    </div>

                    <div>

                        <Typography variant="caption">
                            Type
                        </Typography>

                        <Typography>
                            {file.extension}
                        </Typography>

                    </div>

                    <div>

                        <Typography variant="caption">
                            Grootte
                        </Typography>

                        <Typography>
                            {formatSize(file.size)}
                        </Typography>

                    </div>

                    <div>

                        <Typography variant="caption">
                            Gewijzigd
                        </Typography>

                        <Typography>
                            {formatDate(file.modified)}
                        </Typography>

                    </div>

                    <div>

                        <Typography variant="caption">
                            Locatie
                        </Typography>

                        <Typography
                            sx={{
                                wordBreak: "break-all",
                            }}
                        >
                            {file.relative_path}
                        </Typography>

                    </div>

                </Stack>

            )}

        </Paper>

    );

}