import api from "../api/api";

export async function getProjectDocuments(projectId) {

    const response = await api.get(
        `/projects/${projectId}/documents`
    );

    return response.data;

}