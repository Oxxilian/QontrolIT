import {
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

const STATUS_COLORS = {
    red: "#D32F2F",
    yellow: "#FBC02D",
    green: "#2E7D32",
};

function StatusDot({ status }) {
    return (
        <div
            style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: STATUS_COLORS[status],
                flexShrink: 0,
            }}
        />
    );
}

function WorkflowItem({
    title,
    status,
    indent = false,
    onClick,
}) {

    return (

        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            onClick={onClick}
            sx={{
                px: 3,
                py: 1.8,
                pl: indent ? 7 : 3,
                cursor: "pointer",
                transition: "all .18s ease",

                "&:hover": {
                    backgroundColor: "#F7F8FA",
                },
            }}
        >

            <StatusDot status={status} />

            <Typography
                sx={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "#2F343A",
                    userSelect: "none",
                }}
            >
                {title}
            </Typography>

        </Stack>

    );

}

export default function WorkflowCard() {

    return (

        <Card
            sx={{
                borderRadius: 3,
                boxShadow:
                    "0 8px 24px rgba(0,0,0,.08)",
                overflow: "hidden",
            }}
        >

            <CardContent
                sx={{
                    p: 0,
                }}
            >

                <Typography
                    sx={{
                        px: 3,
                        py: 2.5,
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#2F343A",
                    }}
                >
                    Projectstatus
                </Typography>

                <Divider />

                <WorkflowItem
                    title="Voorbewerking"
                    status="red"
                    onClick={() => {}}
                />

                <Divider />

                <WorkflowItem
                    title="Gereed voor productie"
                    status="green"
                    onClick={() => {}}
                />

                <Divider />

                <WorkflowItem
                    title="Productie"
                    status="yellow"
                    onClick={() => {}}
                />
                <WorkflowItem
                    title="Samenstellen"
                    status="yellow"
                    indent
                    onClick={() => {}}
                />

                <WorkflowItem
                    title="Aflassen"
                    status="yellow"
                    indent
                    onClick={() => {}}
                />

                <Divider />

                <WorkflowItem
                    title="Conservering"
                    status="red"
                    onClick={() => {}}
                />

                <Divider />

                <WorkflowItem
                    title="Montage"
                    status="red"
                    onClick={() => {}}
                />

            </CardContent>

        </Card>

    );

}