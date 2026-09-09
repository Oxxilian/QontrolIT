import { Stack } from "@mui/material";

import PhaseCard from "./PhaseCard";

const phases = [
    {
        code: "Fase 01",
        name: "Kolommen",
        status: "🟡",
        processes: [
            {
                title: "Voorbereiding",
                items: [
                    { name: "Profielstaal", status: "🟢" },
                    { name: "Plaatmateriaal", status: "🟢" },
                ],
            },
            {
                title: "Voorbewerking",
                items: [
                    { name: "Laser platen", status: "🟢" },
                    { name: "Laser profielen", status: "🟡" },
                    { name: "Zaag", status: "🔴" },
                    { name: "Wals", status: "🔴" },
                    { name: "Zetwerk", status: "🔴" },
                ],
            },
            {
                title: "Productie",
                items: [
                    { name: "Samenstellen", status: "🔴" },
                    { name: "Aflassen", status: "🔴" },
                ],
            },
            {
                title: "Conservering",
                items: [
                    { name: "Verzonden", status: "🔴" },
                    { name: "Retour", status: "🔴" },
                ],
            },
        ],
    },
    {
        code: "Fase 02",
        name: "Trappenhuis",
        status: "🔴",
        processes: [
            {
                title: "Voorbereiding",
                items: [
                    { name: "Profielstaal", status: "🔴" },
                    { name: "Plaatmateriaal", status: "🔴" },
                ],
            },
        ],
    },
    {
        code: "Fase 03",
        name: "Bordessen",
        status: "🔴",
        processes: [
            {
                title: "Voorbereiding",
                items: [
                    { name: "Profielstaal", status: "🔴" },
                    { name: "Plaatmateriaal", status: "🔴" },
                ],
            },
        ],
    },
];

export default function WorkflowTab() {

    return (

        <Stack spacing={2}>

            {phases.map((phase) => (

                <PhaseCard
                    key={phase.code}
                    phase={phase}
                />

            ))}

        </Stack>

    );

}