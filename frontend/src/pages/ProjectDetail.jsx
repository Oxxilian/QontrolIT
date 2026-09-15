import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectTabs from "../components/projects/ProjectTabs";

import WorkflowTab from "../components/workflow/WorkflowTab";

import {
    getProject,
} from "../services/projectService";

export default function ProjectDetail() {

    const { id: projectNumber } = useParams();

    const [tab, setTab] = useState(0);

    const [selectedPhase, setSelectedPhase] = useState(null);

    const [phaseWorkflows, setPhaseWorkflows] = useState({});

    const [project, setProject] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProject() {

            try {

                setLoading(true);
                setError("");

                const result =
                    await getProject(projectNumber);

                setProject(result);

            } catch (error) {

                console.error(error);

                setError(
                    "Project kon niet worden geladen."
                );

            } finally {

                setLoading(false);

            }

        }

        loadProject();

    }, [projectNumber]);

    const phases =
        project?.phases?.map((phase) => ({
            phase_number: phase.code,
            name: phase.name,
            status: "🔴",
        })) || [];

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

        if (loading) {

            return (
                <Typography
                    sx={{
                        mt: 3,
                        color: "#FFFFFF",
                    }}
                >
                    Project laden...
                </Typography>
            );

        }

        if (error) {

            return (
                <Typography
                    sx={{
                        mt: 3,
                        color: "#FFFFFF",
                    }}
                >
                    {error}
                </Typography>
            );

        }

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

            {project && (

                <ProjectHeader
                    project={project}
                    selectedPhase={selectedPhase}
                />

            )}

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