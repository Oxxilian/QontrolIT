import { useEffect, useState } from "react";

import {
    Box,
    Card,
    CardContent,
    Checkbox,
    TextField,
    Typography,
} from "@mui/material";

import api from "../api/api";

import { getPurchases } from "../services/purchaseService";
import { getSuppliers } from "../services/supplierService";


function getStatus(received, ordered) {

    if (received === 0) {
        return "red";
    }

    if (received < ordered) {
        return "yellow";
    }

    return "green";
}


const STATUS_COLORS = {

    green: "#5E8F3C",
    yellow: "#C7A63A",
    red: "#B85C4A",

};


function normalizeSupplierName(name) {

    return String(name || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

}


async function getReceipts(purchaseId) {

    const response = await api.get(
        `/purchases/${purchaseId}/receipts`
    );

    return response.data.data || [];

}


async function updateReceipt(
    purchaseId,
    receiptId,
    quantityReceived
) {

    const response = await api.put(
        `/purchases/${purchaseId}/receipts/${receiptId}`,
        {
            quantity_received: quantityReceived,
        }
    );

    return response.data.data;

}


export default function IncomingGoods() {

    const [goods, setGoods] = useState([]);

    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [editingValue, setEditingValue] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {

        async function loadIncomingGoods() {

            try {

                setLoading(true);
                setError(null);

                const [
                    purchases,
                    suppliers,
                ] = await Promise.all([
                    getPurchases(),
                    getSuppliers(),
                ]);


                const supplierMap =
                    new Map(
                        suppliers.map(
                            (supplier) => [
                                normalizeSupplierName(
                                    supplier.name
                                ),
                                supplier,
                            ]
                        )
                    );


                const incomingLines =
                    (
                        await Promise.all(
                            purchases.map(
                                async (purchase) => {

                                    const supplier =
                                        supplierMap.get(
                                            normalizeSupplierName(
                                                purchase.supplier
                                            )
                                        );


                                    const categories =
                                        supplier?.categories || [];


                                    const isMaterial =
                                        categories.includes(
                                            "Staal Handelslengtes"
                                        );


                                    if (isMaterial) {
                                        return [];
                                    }


                                    const category =
                                        categories.length > 0
                                            ? categories.join(", ")
                                            : "Overig";


                                    const receipts =
                                        await getReceipts(
                                            purchase.id
                                        );


                                    const receiptMap =
                                        new Map();


                                    receipts.forEach(
                                        (receipt) => {

                                            receiptMap.set(
                                                receipt.purchase_order_line_id,
                                                receipt
                                            );

                                        }
                                    );


                                    return (
                                        purchase.lines || []
                                    ).map(
                                        (line) => {

                                            const receipt =
                                                receiptMap.get(
                                                    line.id
                                                );


                                            return {

                                                id: line.id,

                                                purchaseId:
                                                    purchase.id,

                                                receiptId:
                                                    receipt?.id || null,

                                                project:
                                                    `${purchase.project_number} — ${purchase.project_name}`,

                                                orderNumber:
                                                    purchase.order_number,

                                                material:
                                                    `${line.profile}${line.quality ? ` ${line.quality}` : ""}`,

                                                supplier:
                                                    purchase.supplier,

                                                category,

                                                deliveryDate:
                                                    purchase.delivery_date,

                                                ordered:
                                                    line.quantity,

                                                received:
                                                    receipt
                                                        ? Number(
                                                            receipt.quantity_received
                                                        )
                                                        : 0,

                                            };

                                        }
                                    );

                                }
                            )
                        )
                    ).flat();


                setGoods(
                    incomingLines
                );

            } catch (err) {

                console.error(
                    "Fout bij ophalen van inkomende goederen:",
                    err
                );

                setError(
                    "Inkomende goederen konden niet worden geladen."
                );

            } finally {

                setLoading(false);

            }

        }


        loadIncomingGoods();

    }, []);


    const handleCheckboxChange = async (
        item
    ) => {

        const newReceived =
            item.received === item.ordered
                ? 0
                : item.ordered;


        try {

            if (
                item.receiptId
            ) {

                await updateReceipt(
                    item.purchaseId,
                    item.receiptId,
                    newReceived
                );

            } else {

                const response =
                    await api.post(
                        `/purchases/${item.purchaseId}/receipts`,
                        {
                            purchase_order_line_id:
                                item.id,
                            quantity_received:
                                newReceived,
                        }
                    );


                const receipt =
                    response.data.data;


                setGoods(
                    (currentGoods) =>
                        currentGoods.map(
                            (currentItem) =>
                                currentItem.id ===
                                item.id
                                    ? {
                                        ...currentItem,
                                        receiptId:
                                            receipt.id,
                                        received:
                                            newReceived,
                                    }
                                    : currentItem
                        )
                );


                return;

            }


            setGoods(
                (currentGoods) =>
                    currentGoods.map(
                        (currentItem) =>
                            currentItem.id ===
                            item.id
                                ? {
                                    ...currentItem,
                                    received:
                                        newReceived,
                                }
                                : currentItem
                    )
            );

        } catch (err) {

            console.error(
                "Fout bij opslaan van ontvangst:",
                err
            );

            setError(
                "Ontvangst kon niet worden opgeslagen."
            );

        }

    };


    const handleReceivedClick = (
        item
    ) => {

        setEditingId(
            item.id
        );

        setEditingValue(
            String(item.received)
        );

    };


    const handleReceivedSave = async (
        item
    ) => {

        let received =
            parseInt(
                editingValue,
                10
            );


        if (
            Number.isNaN(received)
        ) {

            received =
                item.received;

        }


        received =
            Math.max(
                0,
                Math.min(
                    received,
                    item.ordered
                )
            );


        try {

            if (
                item.receiptId
            ) {

                await updateReceipt(
                    item.purchaseId,
                    item.receiptId,
                    received
                );

            } else {

                const response =
                    await api.post(
                        `/purchases/${item.purchaseId}/receipts`,
                        {
                            purchase_order_line_id:
                                item.id,
                            quantity_received:
                                received,
                        }
                    );


                const receipt =
                    response.data.data;


                setGoods(
                    (currentGoods) =>
                        currentGoods.map(
                            (currentItem) =>
                                currentItem.id ===
                                item.id
                                    ? {
                                        ...currentItem,
                                        receiptId:
                                            receipt.id,
                                        received,
                                    }
                                    : currentItem
                        )
                );


                setEditingId(null);
                setEditingValue("");

                return;

            }


            setGoods(
                (currentGoods) =>
                    currentGoods.map(
                        (currentItem) =>
                            currentItem.id ===
                            item.id
                                ? {
                                    ...currentItem,
                                    received,
                                }
                                : currentItem
                    )
            );

        } catch (err) {

            console.error(
                "Fout bij opslaan van ontvangst:",
                err
            );

            setError(
                "Ontvangst kon niet worden opgeslagen."
            );

        }


        setEditingId(null);

        setEditingValue("");

    };


    const handleReceivedKeyDown = (
        event,
        item
    ) => {

        if (
            event.key === "Enter"
        ) {

            handleReceivedSave(
                item
            );

        }


        if (
            event.key === "Escape"
        ) {

            setEditingId(null);

            setEditingValue("");

        }

    };


    const filteredGoods =
        goods.filter(
            (item) => {

                const searchValue =
                    search
                        .trim()
                        .toLowerCase();


                if (
                    !searchValue
                ) {

                    return true;

                }


                return (

                    item.project
                        .toLowerCase()
                        .includes(
                            searchValue
                        ) ||

                    item.orderNumber
                        .toLowerCase()
                        .includes(
                            searchValue
                        )

                );

            }
        );


    return (

        <Box
            sx={{
                minHeight: "100%",
                backgroundColor: "#2F343A",
                color: "#FFFFFF",
                p: 3,
            }}
        >

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: "#FFFFFF",
                }}
            >
                Inkomende goederen
            </Typography>


            <TextField
                fullWidth
                value={search}
                onChange={(event) =>
                    setSearch(
                        event.target.value
                    )
                }
                placeholder="Zoek op bestelnummer of projectnummer..."
                variant="outlined"
                sx={{
                    mb: 3,
                    backgroundColor: "#3A4046",
                    borderRadius: 2,

                    "& .MuiOutlinedInput-root": {
                        color: "#FFFFFF",

                        "& fieldset": {
                            borderColor: "#596168",
                        },

                        "&:hover fieldset": {
                            borderColor: "#707980",
                        },

                        "&.Mui-focused fieldset": {
                            borderColor: "#5E8F3C",
                        },
                    },

                    "& .MuiInputBase-input::placeholder": {
                        color: "#BFC4C8",
                        opacity: 1,
                    },
                }}
            />


            <Card
                sx={{
                    borderRadius: 3,
                    backgroundColor: "#363C42",
                    color: "#FFFFFF",
                    border: "1px solid #596168",
                    boxShadow: "none",
                }}
            >

                <CardContent
                    sx={{
                        p: 0,
                        overflowX: "auto",
                    }}
                >

                    <Box
                        sx={{
                            minWidth: 1100,
                        }}
                    >

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns:
                                    "55px 45px minmax(360px, 2fr) 140px minmax(180px, 1fr) 160px 130px 90px 90px 100px",
                                alignItems: "center",
                                px: 2,
                                py: 1.5,
                                backgroundColor: "#252A2F",
                                borderBottom:
                                    "1px solid #596168",
                            }}
                        >

                            <Box />
                            <Box />

                            <Typography
                                variant="body2"
                                fontWeight={700}
                                sx={{
                                    color: "#FFFFFF",
                                }}
                            >
                                Project
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight={700}
                                sx={{
                                    color: "#FFFFFF",
                                }}
                            >
                                Bestelnummer
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight={700}
                                sx={{
                                    color: "#FFFFFF",
                                }}
                            >
                                Materiaal
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight={700}
                                sx={{
                                    color: "#FFFFFF",
                                }}
                            >
                                Leverancier
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight={700}
                                sx={{
                                    color: "#FFFFFF",
                                }}
                            >
                                Leverdatum
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight={700}
                                align="right"
                                sx={{
                                    color: "#FFFFFF",
                                }}
                            >
                                Besteld
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight={700}
                                align="right"
                                sx={{
                                    color: "#FFFFFF",
                                }}
                            >
                                Binnen
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight={700}
                                align="right"
                                sx={{
                                    color: "#FFFFFF",
                                }}
                            >
                                Nog nodig
                            </Typography>

                        </Box>


                        {loading && (

                            <Box
                                sx={{
                                    px: 2,
                                    py: 3,
                                }}
                            >

                                <Typography
                                    sx={{
                                        color: "#BFC4C8",
                                    }}
                                >
                                    Inkomende goederen laden...
                                </Typography>

                            </Box>

                        )}


                        {error && (

                            <Box
                                sx={{
                                    px: 2,
                                    py: 3,
                                }}
                            >

                                <Typography
                                    sx={{
                                        color: "#B85C4A",
                                    }}
                                >
                                    {error}
                                </Typography>

                            </Box>

                        )}


                        {!loading &&
                            !error &&
                            filteredGoods.map(
                                (item) => {

                                    const remaining =
                                        item.ordered -
                                        item.received;


                                    const isComplete =
                                        remaining === 0;


                                    const status =
                                        getStatus(
                                            item.received,
                                            item.ordered
                                        );


                                    return (

                                        <Box
                                            key={item.id}
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    "55px 45px minmax(360px, 2fr) 140px minmax(180px, 1fr) 160px 130px 90px 90px 100px",
                                                alignItems: "center",
                                                px: 2,
                                                py: 1.5,
                                                borderBottom:
                                                    "1px solid #596168",
                                                color: "#FFFFFF",

                                                "&:hover": {
                                                    backgroundColor:
                                                        "#3D444A",
                                                },
                                            }}
                                        >

                                            <Checkbox
                                                checked={
                                                    isComplete
                                                }
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        item
                                                    )
                                                }
                                                sx={{
                                                    p: 0.5,
                                                    color: "#5E8F3C",

                                                    "&.Mui-checked": {
                                                        color: "#5E8F3C",
                                                    },
                                                }}
                                            />


                                            <Typography
                                                component="span"
                                                sx={{
                                                    fontSize: 32,
                                                    lineHeight: 1,
                                                    color:
                                                        STATUS_COLORS[
                                                            status
                                                        ],
                                                }}
                                            >
                                                ●
                                            </Typography>


                                            <Typography
                                                sx={{
                                                    fontSize: 14,
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {item.project}
                                            </Typography>


                                            <Typography
                                                sx={{
                                                    fontSize: 14,
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {item.orderNumber}
                                            </Typography>


                                            <Typography
                                                sx={{
                                                    fontSize: 14,
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {item.material}
                                            </Typography>


                                            <Typography
                                                sx={{
                                                    fontSize: 14,
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {item.supplier}
                                            </Typography>


                                            <Typography
                                                sx={{
                                                    fontSize: 14,
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {item.deliveryDate}
                                            </Typography>


                                            <Typography
                                                sx={{
                                                    fontSize: 14,
                                                    color: "#FFFFFF",
                                                }}
                                                align="right"
                                            >
                                                {item.ordered}
                                            </Typography>


                                            {editingId ===
                                            item.id ? (

                                                <TextField
                                                    autoFocus
                                                    type="number"
                                                    value={
                                                        editingValue
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        setEditingValue(
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        handleReceivedSave(
                                                            item
                                                        )
                                                    }
                                                    onKeyDown={(
                                                        event
                                                    ) =>
                                                        handleReceivedKeyDown(
                                                            event,
                                                            item
                                                        )
                                                    }
                                                    inputProps={{
                                                        min: 0,
                                                        max: item.ordered,
                                                        step: 1,
                                                    }}
                                                    size="small"
                                                    sx={{
                                                        width: 75,
                                                        ml: "auto",

                                                        "& .MuiOutlinedInput-root": {
                                                            color: "#FFFFFF",

                                                            "& fieldset": {
                                                                borderColor:
                                                                    "#5E8F3C",
                                                            },

                                                            "&:hover fieldset": {
                                                                borderColor:
                                                                    "#5E8F3C",
                                                            },

                                                            "&.Mui-focused fieldset": {
                                                                borderColor:
                                                                    "#5E8F3C",
                                                            },
                                                        },

                                                        "& input": {
                                                            textAlign:
                                                                "right",
                                                            color: "#FFFFFF",
                                                        },

                                                        "& input[type=number]::-webkit-inner-spin-button":
                                                            {
                                                                display:
                                                                    "none",
                                                            },

                                                        "& input[type=number]::-webkit-outer-spin-button":
                                                            {
                                                                display:
                                                                    "none",
                                                            },
                                                    }}
                                                />

                                            ) : (

                                                <Typography
                                                    onClick={() =>
                                                        handleReceivedClick(
                                                            item
                                                        )
                                                    }
                                                    sx={{
                                                        fontSize: 14,
                                                        color: "#FFFFFF",
                                                        textAlign:
                                                            "right",
                                                        cursor:
                                                            "pointer",
                                                        textDecoration:
                                                            "underline",
                                                        textDecorationColor:
                                                            "#596168",
                                                        textUnderlineOffset:
                                                            "3px",

                                                        "&:hover": {
                                                            color:
                                                                "#5E8F3C",
                                                        },
                                                    }}
                                                >
                                                    {
                                                        item.received
                                                    }
                                                </Typography>

                                            )}


                                            <Typography
                                                sx={{
                                                    fontSize: 14,
                                                    fontWeight:
                                                        remaining >
                                                        0
                                                            ? 700
                                                            : 400,
                                                    color: "#FFFFFF",
                                                }}
                                                align="right"
                                            >
                                                {
                                                    remaining
                                                }
                                            </Typography>

                                        </Box>

                                    );

                                }
                            )}

                    </Box>

                </CardContent>

            </Card>

        </Box>

    );

}