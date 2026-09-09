const COLORS = {
    red: "#D32F2F",
    yellow: "#FBC02D",
    green: "#2E7D32",
};

export default function StatusDot({
    status,
    size = 16,
}) {

    return (

        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: COLORS[status],
                flexShrink: 0,
                boxShadow: "0 0 0 2px white",
            }}
        />

    );

}