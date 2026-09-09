import {
    Card,
    Tab,
    Tabs,
} from "@mui/material";

export default function ProjectTabs({
    tab,
    setTab,
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

                <Tab label="Algemeen" />
                <Tab label="Workflow" />
                <Tab label="Documenten" />
                <Tab label="Productie" />
                <Tab label="Kwaliteit" />
                <Tab label="Conservering" />
                <Tab label="Rapportages" />
                <Tab label="Logboek" />

            </Tabs>

        </Card>

    );

}