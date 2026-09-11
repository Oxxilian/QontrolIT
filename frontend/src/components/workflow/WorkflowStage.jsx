import { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Typography,
    Divider,
} from "@mui/material";

const COLORS = {
    green: "#5E8F3C",
    yellow: "#C7A63A",
    red: "#B85C4A",
};

const CLICKABLE_PHASES = [
    "Productie",
    "Eindcontrole",
    "Montage",
];

export default function WorkflowStage({
    phase,
    isPhaseLocked,
    isPhaseAvailable,
    onProcessesChange,
}) {

    const [processes, setProcesses] = useState(phase.processes);

    useEffect(() => {
        setProcesses(phase.processes);
    }, [phase]);

    const isConservation =
        phase.title === "Conservering";

    const isProduction =
        phase.title === "Productie";

    const allProcessesReady = processes.every(
        (process) => process.status === "green"
    );

    const productionProcessesReady =
        isProduction &&
        processes
            .filter(
                (process) => process.name !== "Controle"
            )
            .every(
                (process) => process.status === "green"
            );

    const conservationComplete =
        isConservation &&
        processes.every(
            (process) => process.status === "green"
        );

    const rightPanelColor = isConservation
        ? conservationComplete
            ? COLORS.green
            : processes[0]?.status === "yellow"
                ? COLORS.yellow
                : COLORS.red
        : allProcessesReady
            ? COLORS.green
            : COLORS.red;

    const rightPanelStatus = isConservation
        ? conservationComplete
            ? phase.statusText
            : processes[0]?.status === "yellow"
                ? "Conservering in behandeling"
                : "Nog niet gereed"
        : allProcessesReady
            ? phase.statusText
            : "Nog niet gereed";

    const isClickable =
        CLICKABLE_PHASES.includes(phase.title) &&
        isPhaseAvailable &&
        !isPhaseLocked;

    const getNextStatus = (status, process) => {

        if (
            phase.title === "Productie" &&
            process.name === "Controle"
        ) {
            return status === "red"
                ? "green"
                : "red";
        }

        if (phase.title === "Productie") {

            if (status === "red") {
                return "yellow";
            }

            if (status === "yellow") {
                return "green";
            }

            return "red";
        }

        if (
            phase.title === "Eindcontrole" ||
            phase.title === "Montage"
        ) {

            if (status === "red") {
                return "green";
            }

            return "red";
        }

        return status;
    };

    const handleProcessClick = (index) => {

        if (!isClickable) {
            return;
        }

        const clickedProcess = processes[index];

        if (
            isProduction &&
            clickedProcess.name === "Controle" &&
            !productionProcessesReady
        ) {
            return;
        }

        setProcesses((currentProcesses) => {

            const updatedProcesses = currentProcesses.map(
                (process, processIndex) => {

                    if (processIndex !== index) {
                        return process;
                    }

                    return {
                        ...process,
                        status: getNextStatus(
                            process.status,
                            process
                        ),
                    };
                }
            );

            onProcessesChange(updatedProcesses);

            return updatedProcesses;
        });
    };

    const handleConservationCompleteClick = () => {

        if (!isPhaseAvailable || isPhaseLocked) {
            return;
        }

        const updatedProcesses = processes.map(
            (process) => ({
                ...process,
                status: "green",
            })
        );

        setProcesses(updatedProcesses);
        onProcessesChange(updatedProcesses);
    };

    return (

        <Paper
            elevation={4}
            sx={{
                borderRadius: 4,
                backgroundColor: "#40444B",
                color: "#FFFFFF",
                overflow: "hidden",
            }}
        >

            <Box
                sx={{
                    px: 4,
                    py: 3,
                }}
            >

                <Typography
                    sx={{
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: 1,
                    }}
                >
                    {phase.title.toUpperCase()}
                </Typography>

            </Box>

            <Divider
                sx={{
                    borderColor: "#5B5E64",
                }}
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    minHeight: 430,
                }}
            >

                <Box
                    sx={{
                        p: 4,
                    }}
                >

                    {isConservation ? (

                        <>

                            {processes.map((process) => (

                                <Box
                                    key={process.name}
                                    sx={{
                                        backgroundColor:
                                            COLORS[process.status],

                                        color: "#FFFFFF",

                                        borderRadius: 2,

                                        px: 3,

                                        py: 1.5,

                                        mb: 2,

                                        width: "65%",

                                        fontSize: 18,

                                        fontWeight: 600,
                                    }}
                                >

                                    {process.name}

                                </Box>

                            ))}

                            <Box
                                onClick={
                                    handleConservationCompleteClick
                                }
                                sx={{
                                    backgroundColor:
                                        conservationComplete
                                            ? COLORS.green
                                            : COLORS.yellow,

                                    color: "#FFFFFF",

                                    borderRadius: 2,

                                    px: 3,

                                    py: 1.5,

                                    mb: 2,

                                    width: "65%",

                                    fontSize: 18,

                                    fontWeight: 600,

                                    cursor:
                                        !isPhaseAvailable ||
                                        isPhaseLocked
                                            ? "default"
                                            : "pointer",

                                    transition: "all .2s ease",

                                    "&:hover":
                                        isPhaseAvailable &&
                                        !isPhaseLocked
                                            ? {
                                                transform:
                                                    "translateX(5px)",
                                            }
                                            : {},
                                }}
                            >

                                Compleet

                            </Box>

                        </>

                    ) : (

                        processes.map((process, index) => {

                            const isControlProcess =
                                isProduction &&
                                process.name === "Controle";

                            const isControlAvailable =
                                isControlProcess &&
                                productionProcessesReady;

                            const processIsClickable =
                                isClickable &&
                                (
                                    !isControlProcess ||
                                    isControlAvailable
                                );

                            const processStatus =
                                isControlProcess &&
                                !isControlAvailable
                                    ? "red"
                                    : process.status;

                            return (
                                <Box
                                    key={process.name}
                                    onClick={() =>
                                        handleProcessClick(index)
                                    }
                                    sx={{
                                        backgroundColor:
                                            COLORS[processStatus],

                                        color: "#FFFFFF",

                                        borderRadius: 2,

                                        px: 3,

                                        py: 1.5,

                                        mb: 2,

                                        width: "65%",

                                        fontSize: 18,

                                        fontWeight: 600,

                                        cursor:
                                            processIsClickable
                                                ? "pointer"
                                                : "default",

                                        transition: "all .2s ease",

                                        "&:hover":
                                            processIsClickable
                                                ? {
                                                    transform:
                                                        "translateX(5px)",
                                                }
                                                : {},
                                    }}
                                >

                                    {process.name}

                                </Box>
                            );
                        })

                    )}

                </Box>

                <Box
                    sx={{
                        borderLeft: "2px solid #5B5E64",

                        display: "flex",

                        justifyContent: "center",

                        alignItems: "center",

                        p: 4,
                    }}
                >

                    <Box
                        sx={{
                            width: "100%",

                            height: "100%",

                            border: `8px solid ${rightPanelColor}`,

                            borderRadius: 4,

                            display: "flex",

                            flexDirection: "column",

                            justifyContent: "center",

                            alignItems: "center",

                            textAlign: "center",

                            backgroundColor: "#40444B",
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize: 24,
                                fontWeight: 700,
                                mb: 4,
                            }}
                        >
                            {phase.nextPhase}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 32,
                                fontWeight: 700,
                                lineHeight: 1.3,
                            }}
                        >
                            {rightPanelStatus}
                        </Typography>

                    </Box>

                </Box>

            </Box>

        </Paper>

    );
}