export const workflowData = [

    {
        id: 1,
        title: "Voorbewerking",
        color: "red",
        processes: [
            {
                name: "Vlakke plaatlaser",
                status: "green",
            },
            {
                name: "Profiellaser",
                status: "green",
            },
            {
                name: "Zaag",
                status: "green",
            },
            {
                name: "Wals",
                status: "green",
            },
            {
                name: "Zetwerk",
                status: "green",
            },
        ],
        nextPhase: "Productie",
        statusText: "Gereed voor Productie",
    },

    {
        id: 2,
        title: "Productie",
        color: "red",
        processes: [
            {
                name: "Samenstellen",
                status: "red",
            },
            {
                name: "Aflassen",
                status: "red",
            },
            {
                name: "Controle",
                status: "red",
            },
        ],
        nextPhase: "Conservering",
        statusText: "Gereed voor Conservering",
    },

    {
        id: 3,
        title: "Conservering",
        color: "red",
        processes: [
            {
                name: "Duplex",
                status: "red",
            },
            {
                name: "Retour verwacht: 11-09-2026",
                status: "red",
            },
        ],
        nextPhase: "Eindcontrole",
        statusText: "Gereed voor Eindcontrole",
    },

    {
        id: 4,
        title: "Eindcontrole",
        color: "red",
        processes: [
            {
                name: "Visuele controle",
                status: "red",
            },
            {
                name: "Vrijgave",
                status: "red",
            },
        ],
        nextPhase: "Montage",
        statusText: "Gereed voor Montage",
    },

    {
        id: 5,
        title: "Montage",
        color: "red",
        processes: [
            {
                name: "Materieel",
                status: "red",
            },
            {
                name: "Montage",
                status: "red",
            },
            {
                name: "Oplevering",
                status: "red",
            },
        ],
        nextPhase: "",
        statusText: "Project voltooid",
    },

];