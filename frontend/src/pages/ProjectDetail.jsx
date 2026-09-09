import { useState } from "react";
import { Box } from "@mui/material";

import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectTabs from "../components/projects/ProjectTabs";

export default function ProjectDetail() {

    const [tab, setTab] = useState(0);

    const project = {
        project_number: "240015",
        project_name: "Nieuwbouw Distributiecentrum Tilburg",
        customer: "Heijmans",
        status: "🟡",
    };

    return (

        <Box>

            <ProjectHeader
                project={project}
            />

            <ProjectTabs
                tab={tab}
                setTab={setTab}
            />

        </Box>

    );

}