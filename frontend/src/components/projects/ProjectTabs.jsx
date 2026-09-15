import {
    Card,
    Tab,
    Tabs,
} from "@mui/material";

export default function ProjectTabs({
    tab,
    setTab,
    selectedPhase,
}) {

    return (

        <Card
            sx={{
                mb: 3,
                borderRadius: 3,
                backgroundColor: "#363C42",
                border: "1px solid #596168",
                boxShadow: "none",
            }}
        >

            <Tabs
                value={tab}
                onChange={(_, value) => setTab(value)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    "& .MuiTab-root": {
                        color: "#C7CCD1",
                        fontWeight: 600,
                    },

                    "& .MuiTab-root.Mui-selected": {
                        color: "#FFFFFF",
                    },

                    "& .MuiTabs-indicator": {
                        backgroundColor: "#5E8F3C",
                        height: 3,
                    },

                    "& .MuiTabs-scrollButtons": {
                        color: "#FFFFFF",
                    },
                }}
            >

                <Tab label="Fase" />

                {selectedPhase && (
                    <>
                        <Tab label="Workflow" />
                        <Tab label="Tekeningen" />
                        <Tab label="Bestellingen" />
                    </>
                )}

            </Tabs>

        </Card>

    );

}