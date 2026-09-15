import { useEffect, useState } from "react";

import {
    createSupplier,
    getSuppliers,
    updateSupplier,
} from "../../services/supplierService";


const categories = [
    "Staal Handelslengtes",
    "Snijwerk platen",
    "Zetwerk",
    "Walswerk",
    "Traptreden",
    "Hout",
    "Kunststof",
    "Koopdelen",
    "Overig",
];


export default function LeveranciersPrototype() {

    const [suppliers, setSuppliers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [name, setName] = useState("");

    const [selectedCategories, setSelectedCategories] = useState([]);

    const [active, setActive] = useState(true);

    const [saving, setSaving] = useState(false);


    useEffect(() => {

        async function loadSuppliers() {

            try {

                setLoading(true);

                setError("");

                const data = await getSuppliers();

                setSuppliers(data);

            } catch (error) {

                console.error(
                    "Fout bij ophalen leveranciers:",
                    error
                );

                setError(
                    "Leveranciers konden niet worden opgehaald."
                );

            } finally {

                setLoading(false);

            }
        }

        loadSuppliers();

    }, []);


    function resetForm() {

        setName("");

        setSelectedCategories([]);

        setActive(true);

        setEditingId(null);

    }


    function openAddForm() {

        resetForm();

        setShowForm(true);

    }


    function openEditForm(supplier) {

        setName(supplier.name);

        setSelectedCategories(
            supplier.categories || []
        );

        setActive(supplier.active);

        setEditingId(supplier.id);

        setShowForm(true);

    }


    function closeForm() {

        resetForm();

        setShowForm(false);

    }


    function toggleCategory(category) {

        setSelectedCategories((current) =>
            current.includes(category)
                ? current.filter(
                      (item) => item !== category
                  )
                : [
                      ...current,
                      category,
                  ]
        );

    }


    async function saveSupplier() {

        const trimmedName = name.trim();

        if (
            !trimmedName ||
            selectedCategories.length === 0 ||
            saving
        ) {

            return;

        }


        try {

            setSaving(true);

            setError("");


            const supplierData = {
                name: trimmedName,
                categories: selectedCategories,
                active,
            };


            if (editingId !== null) {

                const updatedSupplier =
                    await updateSupplier(
                        editingId,
                        supplierData
                    );


                setSuppliers((current) =>
                    current.map((supplier) =>
                        supplier.id === editingId
                            ? updatedSupplier
                            : supplier
                    )
                );

            } else {

                const newSupplier =
                    await createSupplier(
                        supplierData
                    );


                setSuppliers((current) => [
                    ...current,
                    newSupplier,
                ]);

            }


            closeForm();

        } catch (error) {

            console.error(
                "Fout bij opslaan leverancier:",
                error
            );

            setError(
                "Leverancier kon niet worden opgeslagen."
            );

        } finally {

            setSaving(false);

        }

    }


    async function toggleActive(id) {

        const supplier = suppliers.find(
            (item) => item.id === id
        );


        if (!supplier || saving) {

            return;

        }


        try {

            setSaving(true);

            setError("");


            const updatedSupplier =
                await updateSupplier(
                    supplier.id,
                    {
                        name: supplier.name,
                        categories:
                            supplier.categories || [],
                        active: !supplier.active,
                    }
                );


            setSuppliers((current) =>
                current.map((item) =>
                    item.id === supplier.id
                        ? updatedSupplier
                        : item
                )
            );

        } catch (error) {

            console.error(
                "Fout bij wijzigen leverancierstatus:",
                error
            );

            setError(
                "Status van leverancier kon niet worden gewijzigd."
            );

        } finally {

            setSaving(false);

        }

    }


    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#2F343A",
                color: "#F2F3F4",
                padding: "32px",
                boxSizing: "border-box",
                fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
        >

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "28px",
                    }}
                >

                    <div>

                        <h1
                            style={{
                                margin: 0,
                                fontSize: "28px",
                                fontWeight: 600,
                            }}
                        >
                            Leveranciers
                        </h1>


                        <p
                            style={{
                                margin: "8px 0 0",
                                color: "#AEB5BA",
                                fontSize: "14px",
                            }}
                        >
                            Beheer de leveranciers die binnen QontrolIT
                            gebruikt worden.
                        </p>

                    </div>


                    <button
                        onClick={openAddForm}
                        style={{
                            background: "#5E8F3C",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "6px",
                            padding: "11px 18px",
                            fontSize: "14px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        + Leverancier toevoegen
                    </button>

                </div>


                {!loading && error && (

                    <div
                        style={{
                            background: "#363C42",
                            border: "1px solid #B85C4A",
                            borderRadius: "8px",
                            padding: "24px",
                            color: "#F2F3F4",
                            marginBottom: "18px",
                        }}
                    >
                        {error}
                    </div>

                )}


                {loading && (

                    <div
                        style={{
                            background: "#363C42",
                            border: "1px solid #596168",
                            borderRadius: "8px",
                            padding: "24px",
                            color: "#AEB5BA",
                        }}
                    >
                        Leveranciers laden...
                    </div>

                )}


                {!loading && (

                    <div
                        style={{
                            background: "#363C42",
                            border: "1px solid #596168",
                            borderRadius: "8px",
                            overflow: "hidden",
                        }}
                    >

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "2fr 2fr 120px 100px",
                                padding: "14px 18px",
                                background: "#252A2F",
                                borderBottom:
                                    "1px solid #596168",
                                color: "#AEB5BA",
                                fontSize: "12px",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                            }}
                        >

                            <div>Leverancier</div>

                            <div>Categorieën</div>

                            <div>Status</div>

                            <div></div>

                        </div>


                        {suppliers.map((supplier) => (

                            <div
                                key={supplier.id}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "2fr 2fr 120px 100px",
                                    alignItems: "center",
                                    padding: "17px 18px",
                                    borderBottom:
                                        "1px solid #4B5258",
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: 500,
                                    }}
                                >
                                    {supplier.name}
                                </div>


                                <div
                                    style={{
                                        display: "flex",
                                        gap: "6px",
                                        flexWrap: "wrap",
                                    }}
                                >

                                    {(supplier.categories || []).map(
                                        (category) => (

                                            <span
                                                key={category}
                                                style={{
                                                    background:
                                                        "#454C52",
                                                    border:
                                                        "1px solid #596168",
                                                    borderRadius:
                                                        "4px",
                                                    padding:
                                                        "4px 8px",
                                                    fontSize:
                                                        "12px",
                                                    color:
                                                        "#D7DBDE",
                                                }}
                                            >
                                                {category}
                                            </span>

                                        )
                                    )}

                                </div>


                                <div>

                                    <button
                                        onClick={() =>
                                            toggleActive(
                                                supplier.id
                                            )
                                        }
                                        disabled={saving}
                                        style={{
                                            background:
                                                "transparent",
                                            border: "none",
                                            color:
                                                supplier.active
                                                    ? "#7FA95A"
                                                    : "#B85C4A",
                                            cursor:
                                                saving
                                                    ? "not-allowed"
                                                    : "pointer",
                                            padding: 0,
                                            fontSize:
                                                "13px",
                                            fontWeight:
                                                600,
                                        }}
                                    >
                                        {supplier.active
                                            ? "Actief"
                                            : "Inactief"}
                                    </button>

                                </div>


                                <div>

                                    <button
                                        onClick={() =>
                                            openEditForm(
                                                supplier
                                            )
                                        }
                                        disabled={saving}
                                        style={{
                                            background:
                                                "transparent",
                                            border: "none",
                                            color:
                                                "#BFC5C9",
                                            cursor:
                                                saving
                                                    ? "not-allowed"
                                                    : "pointer",
                                            fontSize:
                                                "13px",
                                        }}
                                    >
                                        Bewerken
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {showForm && (

                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background:
                            "rgba(0, 0, 0, 0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "center",
                        padding: "20px",
                    }}
                >

                    <div
                        style={{
                            width: "100%",
                            maxWidth: "480px",
                            background: "#363C42",
                            border:
                                "1px solid #596168",
                            borderRadius: "8px",
                            padding: "24px",
                            boxSizing:
                                "border-box",
                        }}
                    >

                        <h2
                            style={{
                                margin:
                                    "0 0 22px",
                                fontSize: "21px",
                            }}
                        >
                            {editingId !== null
                                ? "Leverancier bewerken"
                                : "Leverancier toevoegen"}
                        </h2>


                        <label
                            style={{
                                display: "block",
                                marginBottom:
                                    "8px",
                                fontSize: "13px",
                                color: "#AEB5BA",
                            }}
                        >
                            Naam leverancier
                        </label>


                        <input
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target
                                        .value
                                )
                            }
                            placeholder="Naam leverancier"
                            style={{
                                width: "100%",
                                boxSizing:
                                    "border-box",
                                background:
                                    "#2F343A",
                                color:
                                    "#F2F3F4",
                                border:
                                    "1px solid #596168",
                                borderRadius:
                                    "5px",
                                padding:
                                    "11px 12px",
                                outline: "none",
                                fontSize:
                                    "14px",
                                marginBottom:
                                    "22px",
                            }}
                        />


                        <div
                            style={{
                                marginBottom:
                                    "22px",
                            }}
                        >

                            <div
                                style={{
                                    fontSize:
                                        "13px",
                                    color:
                                        "#AEB5BA",
                                    marginBottom:
                                        "10px",
                                }}
                            >
                                Categorieën
                            </div>


                            <div
                                style={{
                                    display:
                                        "flex",
                                    flexDirection:
                                        "column",
                                    gap: "9px",
                                }}
                            >

                                {categories.map(
                                    (category) => (

                                        <label
                                            key={
                                                category
                                            }
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: "9px",
                                                fontSize:
                                                    "14px",
                                                cursor:
                                                    "pointer",
                                            }}
                                        >

                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(
                                                    category
                                                )}
                                                onChange={() =>
                                                    toggleCategory(
                                                        category
                                                    )
                                                }
                                            />

                                            {category}

                                        </label>

                                    )
                                )}

                            </div>

                        </div>


                        <label
                            style={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: "9px",
                                fontSize: "14px",
                                marginBottom:
                                    "25px",
                                cursor:
                                    "pointer",
                            }}
                        >

                            <input
                                type="checkbox"
                                checked={active}
                                onChange={(event) =>
                                    setActive(
                                        event.target
                                            .checked
                                    )
                                }
                            />

                            Leverancier is actief

                        </label>


                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "flex-end",
                                gap: "10px",
                            }}
                        >

                            <button
                                onClick={closeForm}
                                disabled={saving}
                                style={{
                                    background:
                                        "transparent",
                                    color:
                                        "#C4C9CC",
                                    border:
                                        "1px solid #596168",
                                    borderRadius:
                                        "5px",
                                    padding:
                                        "10px 16px",
                                    cursor:
                                        saving
                                            ? "not-allowed"
                                            : "pointer",
                                }}
                            >
                                Annuleren
                            </button>


                            <button
                                onClick={saveSupplier}
                                disabled={
                                    !name.trim() ||
                                    selectedCategories.length ===
                                        0 ||
                                    saving
                                }
                                style={{
                                    background:
                                        "#5E8F3C",
                                    color:
                                        "#FFFFFF",
                                    border: "none",
                                    borderRadius:
                                        "5px",
                                    padding:
                                        "10px 18px",
                                    cursor:
                                        !name.trim() ||
                                        selectedCategories.length ===
                                            0 ||
                                        saving
                                            ? "not-allowed"
                                            : "pointer",
                                    opacity:
                                        !name.trim() ||
                                        selectedCategories.length ===
                                            0 ||
                                        saving
                                            ? 0.5
                                            : 1,
                                }}
                            >
                                {saving
                                    ? "Opslaan..."
                                    : "Opslaan"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}