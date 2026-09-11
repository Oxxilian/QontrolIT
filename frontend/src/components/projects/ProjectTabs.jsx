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
            }}
        >

            <Tabs
                value={tab}
                onChange={(_, value) => setTab(value)}
                variant="scrollable"
                scrollButtons="auto"
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