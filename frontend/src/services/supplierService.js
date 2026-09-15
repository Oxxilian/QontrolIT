import api from "../api/api";


export async function getSuppliers() {

    const response = await api.get(
        "/suppliers"
    );

    return response.data.data;
}


export async function createSupplier(
    supplier
) {

    const response = await api.post(
        "/suppliers",
        supplier
    );

    return response.data.data;
}


export async function updateSupplier(
    supplierId,
    supplier
) {

    const response = await api.put(
        `/suppliers/${supplierId}`,
        supplier
    );

    return response.data.data;
}