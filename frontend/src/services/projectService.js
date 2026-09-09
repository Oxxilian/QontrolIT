import api from "../api/api";

export async function getProjects() {

    const response = await api.get(
        "/projects"
    );

    return response.data.data;

}

export async function getProject(
    projectNumber,
) {

    const response = await api.get(
        `/projects/${projectNumber}`
    );

    return response.data.data;

}

export async function scanProject(
    projectPath,
) {

    const response = await api.post(
        "/projects/scan",
        null,
        {
            params: {
                project_path: projectPath,
            },
        },
    );

    return response.data.data;

}

export async function importProject(
    projectPath,
) {

    const response = await api.post(
        "/projects/import",
        null,
        {
            params: {
                project_path: projectPath,
            },
        },
    );

    return response.data.data;

}

export async function deleteProject(
    projectNumber,
) {

    const response = await api.delete(
        `/projects/${projectNumber}`
    );

    return response.data.data;

}

export async function getStatistics() {

    const response = await api.get(
        "/projects/statistics"
    );

    return response.data.data;

}