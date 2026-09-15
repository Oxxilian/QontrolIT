import { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Typography,
} from "@mui/material";

import WorkflowTimeline from "./WorkflowTimeline";
import WorkflowStage from "./WorkflowStage";
import { workflowData } from "./workflowData";

export default function WorkflowPrototype({
    selectedPhase,
    workflow,
    onWorkflowChange,
}) {

    const [activePhase, setActivePhase] = useState(1);

    const [phaseProcesses, setPhaseProcesses] = useState(
        workflow ||
        workflowData.map((phase) => phase.processes)
    );

    useEffect(() => {

        setActivePhase(1);

        setPhaseProcesses(
            workflow ||
            workflowData.map((phase) => phase.processes)
        );

    }, [selectedPhase]);

    useEffect(() => {

        if (workflow) {
            setPhaseProcesses(workflow);
        }

    }, [workflow]);

    const getPhaseStatus = (phase, index) => {

        const processes = phaseProcesses[index];

        const allProcessesReady = processes.every(
            (process) => process.status === "green"
        );

        if (allProcessesReady) {
            return "green";
        }

        if (index === 0) {
            return "red";
        }

        const previousProcesses = phaseProcesses[index - 1];

        const previousPhaseReady = previousProcesses.every(
            (process) => process.status === "green"
        );

        if (!previousPhaseReady) {
            return "red";
        }

        if (index === activePhase) {
            return "yellow";
        }

        return "red";
    };

    const phases = workflowData.map((phase, index) => ({
        ...phase,
        processes: phaseProcesses[index],
        color: getPhaseStatus(phase, index),
    }));

    const currentPhase = phases[activePhase];

    const previousPhase =
        activePhase > 0
            ? phases[activePhase - 1]
            : null;

    const previousPhaseReady =
        activePhase === 0 ||
        previousPhase?.color === "green";

    const isPhaseLocked =
        currentPhase.color === "green";

    const isPhaseAvailable =
        previousPhaseReady;

    const handleProcessesChange = (updatedProcesses) => {

        setPhaseProcesses((currentProcesses) => {

            const updatedPhaseProcesses = [
                ...currentProcesses,
            ];

            updatedPhaseProcesses[activePhase] =
                updatedProcesses;

            if (onWorkflowChange) {
                onWorkflowChange(
                    updatedPhaseProcesses
                );
            }

            return updatedPhaseProcesses;
        });

    };

    return (

        <Box
            sx={{
                maxWidth: 1500,
                mx: "auto",
                py: 2,
            }}
        >

            <WorkflowTimeline
                phases={phases}
                activePhase={activePhase}
                onChange={(index) => {

                    setActivePhase(index);

                }}
            />

            <WorkflowStage
                phase={currentPhase}
                isPhaseLocked={isPhaseLocked}
                isPhaseAvailable={isPhaseAvailable}
                onProcessesChange={
                    handleProcessesChange
                }
            />

            {false && (

                <Paper
                    elevation={4}
                    sx={{
                        p: 5,
                        borderRadius: 4,
                        backgroundColor: "#40444B",
                        color: "#FFFFFF",
                        minHeight: 430,
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 28,
                            fontWeight: 700,
                        }}
                    >
                        TEKENINGEN
                    </Typography>

                    <Typography
                        sx={{
                            mt: 2,
                            color: "#C9CDD3",
                            fontSize: 18,
                        }}
                    >
                        Preview van Tekeningen
                    </Typography>

                </Paper>

            )}

        </Box>

    );

}