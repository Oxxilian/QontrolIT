import { useState } from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectTabs from "../components/projects/ProjectTabs";

import WorkflowTab from "../components/workflow/WorkflowTab";

export default function ProjectDetail() {

    const [tab, setTab] = useState(0);

    const [selectedPhase, setSelectedPhase] = useState(null);

    const [phaseWorkflows, setPhaseWorkflows] = useState({});

    const project = {
        project_number: "240015",
        project_name: "Nieuwbouw Distributiecentrum Tilburg",
        customer: "Heijmans",
        status: "🟡",
    };

    const phases = [
        {
            phase_number: "240015.01",
            name: "Trap",
            status: "🟢",
        },
        {
            phase_number: "240015.02",
            name: "Binnenbalustrade",
            status: "🟡",
        },
        {
            phase_number: "240015.03",
            name: "Balkons",
            status: "🔴",
        },
        {
            phase_number: "240015.500",
            name: "Meerwerk",
            status: "🔴",
        },
    ];

    function getPhaseStatus(phase) {

        const workflow =
            phaseWorkflows[phase.phase_number];

        if (!workflow) {
            return phase.status;
        }

        const allProcessesReady =
            workflow.every((processes) =>
                processes.every(
                    (process) =>
                        process.status === "green"
                )
            );

        if (allProcessesReady) {
            return "🟢";
        }

        const hasActivity =
            workflow.some((processes) =>
                processes.some(
                    (process) =>
                        process.status === "yellow" ||
                        process.status === "green"
                )
            );

        if (hasActivity) {
            return "🟡";
        }

        return "🔴";
    }

    function handlePhaseClick(phase) {

        setSelectedPhase(phase);
        setTab(1);

    }

    function handleWorkflowChange(
        phaseNumber,
        workflow
    ) {

        setPhaseWorkflows((currentWorkflows) => ({
            ...currentWorkflows,
            [phaseNumber]: workflow,
        }));

    }

    function renderTab() {

        switch (tab) {

            case 0:

                return (

                    <Box sx={{ mt: 3 }}>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                color: "#FFFFFF",
                            }}
                        >
                            Fasen
                        </Typography>

                        <Card
                            sx={{
                                borderRadius: 3,
                                backgroundColor: "#363C42",
                                color: "#FFFFFF",
                                border: "1px solid #596168",
                                boxShadow: "none",
                            }}
                        >

                            <CardContent sx={{ p: 3 }}>

                                {phases.map((phase) => (

                                    <Box
                                        key={phase.phase_number}
                                        onClick={() =>
                                            handlePhaseClick(phase)
                                        }
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            px: 3,
                                            py: 2,
                                            mb: 1.5,
                                            borderRadius: 2,
                                            backgroundColor: "#2F343A",
                                            color: "#FFFFFF",
                                            border: "1px solid #596168",
                                            cursor: "pointer",
                                            transition: "all .2s ease",

                                            "&:hover": {
                                                backgroundColor: "#3D444A",
                                                transform: "translateX(4px)",
                                            },
                                        }}
                                    >

                                        <Box>

                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: 17,
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {phase.phase_number}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: "#C7CCD1",
                                                }}
                                            >
                                                {phase.name}
                                            </Typography>

                                        </Box>

                                        <Typography
                                            sx={{
                                                fontSize: 24,
                                            }}
                                        >
                                            {getPhaseStatus(phase)}
                                        </Typography>

                                    </Box>

                                ))}

                            </CardContent>

                        </Card>

                    </Box>

                );

            case 1:

                return (
                    <WorkflowTab
                        selectedPhase={selectedPhase}
                        workflow={
                            selectedPhase
                                ? phaseWorkflows[
                                    selectedPhase.phase_number
                                ]
                                : null
                        }
                        onWorkflowChange={
                            selectedPhase
                                ? (workflow) =>
                                    handleWorkflowChange(
                                        selectedPhase.phase_number,
                                        workflow
                                    )
                                : undefined
                        }
                    />
                );

            case 2:

                return (

                    <Box sx={{ mt: 3 }}>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                color: "#FFFFFF",
                            }}
                        >
                            Tekeningen
                        </Typography>

                        <Card
                            sx={{
                                borderRadius: 3,
                                backgroundColor: "#363C42",
                                color: "#FFFFFF",
                                border: "1px solid #596168",
                                boxShadow: "none",
                            }}
                        >

                            <CardContent sx={{ p: 4 }}>

                                <Typography
                                    sx={{
                                        color: "#FFFFFF",
                                    }}
                                >
                                    Tekeningen van de geselecteerde fase
                                </Typography>

                            </CardContent>

                        </Card>

                    </Box>

                );

            case 3:

                return (

                    <Box sx={{ mt: 3 }}>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                color: "#FFFFFF",
                            }}
                        >
                            Bestellingen
                        </Typography>

                        <Card
                            sx={{
                                borderRadius: 3,
                                backgroundColor: "#363C42",
                                color: "#FFFFFF",
                                border: "1px solid #596168",
                                boxShadow: "none",
                            }}
                        >

                            <CardContent sx={{ p: 4 }}>

                                <Typography
                                    sx={{
                                        color: "#FFFFFF",
                                    }}
                                >
                                    Bestellingen van de geselecteerde fase
                                </Typography>

                            </CardContent>

                        </Card>

                    </Box>

                );

            default:

                return null;

        }

    }

    return (

        <Box>

            <ProjectHeader
                project={project}
                selectedPhase={selectedPhase}
            />

            <ProjectTabs
                tab={tab}
                setTab={(value) => {
                    setTab(value);

                    if (value === 0) {
                        setSelectedPhase(null);
                    }
                }}
                selectedPhase={selectedPhase}
            />

            {renderTab()}

        </Box>

    );

}