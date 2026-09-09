import {
    Avatar,
    Card,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";

import EngineeringIcon from "@mui/icons-material/Engineering";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const logEntries = [
    {
        title: "Project aangemaakt",
        description: "Project is succesvol aangemaakt.",
        date: "08-09-2026 08:14",
        icon: <EngineeringIcon />,
    },
    {
        title: "Materiaalingang gecontroleerd",
        description: "Binnengekomen materialen zijn goedgekeurd.",
        date: "08-09-2026 09:26",
        icon: <InventoryIcon />,
    },
    {
        title: "Kwaliteitscontrole uitgevoerd",
        description: "Eerste kwaliteitscontrole succesvol afgerond.",
        date: "08-09-2026 11:03",
        icon: <FactCheckIcon />,
    },
    {
        title: "Productie gestart",
        description: "Werkorder is vrijgegeven voor productie.",
        date: "08-09-2026 13:42",
        icon: <LocalShippingIcon />,
    },
];

export default function LogbookTab() {

    return (

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
                    Projectlogboek
                </Typography>

                <Divider sx={{ my: 3 }} />

                <List disablePadding>

                    {logEntries.map((entry, index) => (

                        <ListItem
                            key={entry.title + index}
                            divider={index !== logEntries.length - 1}
                            alignItems="flex-start"
                        >

                            <ListItemAvatar>

                                <Avatar
                                    color="primary"
                                    sx={{
                                        bgcolor: "primary.main",
                                    }}
                                >
                                    {entry.icon}
                                </Avatar>

                            </ListItemAvatar>

                            <ListItemText
                                primary={
                                    <Typography
                                        fontWeight={600}
                                    >
                                        {entry.title}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {entry.description}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.disabled"
                                        >
                                            {entry.date}
                                        </Typography>
                                    </>
                                }
                            />

                        </ListItem>

                    ))}

                </List>

            </CardContent>

        </Card>

    );

}