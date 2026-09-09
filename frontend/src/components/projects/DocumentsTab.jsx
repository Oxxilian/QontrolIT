import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";

const documents = [
    {
        name: "Tekening A-101.pdf",
        type: "Werktekening",
    },
    {
        name: "Lasplan.pdf",
        type: "Kwaliteit",
    },
    {
        name: "Coating specificatie.pdf",
        type: "Conservering",
    },
];

export default function DocumentsTab() {

    return (

        <Stack spacing={3}>

            <Card
                sx={{
                    borderRadius: 3,
                }}
            >

                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Documenten
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Box
                        sx={{
                            border: "2px dashed",
                            borderColor: "divider",
                            borderRadius: 3,
                            p: 6,
                            textAlign: "center",
                            bgcolor: "grey.50",
                        }}
                    >

                        <UploadFileIcon
                            sx={{
                                fontSize: 60,
                                color: "primary.main",
                                mb: 2,
                            }}
                        />

                        <Typography
                            variant="h6"
                            fontWeight={600}
                            gutterBottom
                        >
                            Sleep documenten hierheen
                        </Typography>

                        <Typography
                            color="text.secondary"
                            mb={3}
                        >
                            Of kies bestanden vanaf je computer.
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<UploadFileIcon />}
                        >
                            Document uploaden
                        </Button>

                    </Box>

                </CardContent>

            </Card>

            <Card
                sx={{
                    borderRadius: 3,
                }}
            >

                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Projectdocumenten
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <List disablePadding>

                        {documents.map((doc) => (

                            <ListItem
                                key={doc.name}
                                divider
                            >

                                <DescriptionIcon
                                    color="primary"
                                    sx={{ mr: 2 }}
                                />

                                <ListItemText
                                    primary={doc.name}
                                    secondary={doc.type}
                                />

                            </ListItem>

                        ))}

                    </List>

                </CardContent>

            </Card>

        </Stack>

    );

}