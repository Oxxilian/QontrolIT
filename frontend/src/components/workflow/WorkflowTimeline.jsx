import {
    Box,
    Stack,
} from "@mui/material";

import StatusDot from "./StatusDot";

function TimelineItem({
    status,
    children,
    indent = false,
}) {

    return (

        <Stack
            direction="row"
            spacing={2}
            sx={{
                position: "relative",
                pl: indent ? 5 : 0,
            }}
        >

            <Box
                sx={{
                    width: 22,
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                }}
            >

                <Box
                    sx={{
                        position: "absolute",
                        top: 18,
                        bottom: -18,
                        width: 2,
                        background: "#D8DCE2",
                    }}
                />

                <StatusDot
                    status={status}
                />

            </Box>

            <Box
                sx={{
                    flex: 1,
                    pb: 3,
                }}
            >

                {children}

            </Box>

        </Stack>

    );

}

export default function WorkflowTimeline({

    children,

}) {

    return (

        <Box>

            {children}

        </Box>

    );

}

export {

    TimelineItem,

};