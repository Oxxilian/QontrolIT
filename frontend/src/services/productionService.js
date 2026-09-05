import api from "../api/api";

export async function getProduction(projectId) {

    const response = await api.get(
        `/production/${projectId}`
    );

    return response.data;

}

export async function createProductionStep(data) {

    const response = await api.post(
        "/production",
        data
    );

    return response.data;

}

export async function updateProductionStep(id, data) {

    const response = await api.put(
        `/production/${id}`,
        data
    );

    return response.data;

}

export async function deleteProductionStep(id) {

    await api.delete(
        `/production/${id}`
    );

}