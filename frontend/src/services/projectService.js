import api from "../api/api";

export async function getProjects() {

    const response = await api.get("/projects/");

    return response.data;

}

export async function scanProject(projectPath) {

    const response = await api.post("/import/scan", {
        project_path: projectPath,
    });

    return response.data;

}

export async function importProject(projectPath) {

    const response = await api.post("/import/", {
        project_path: projectPath,
    });

    return response.data;

}

export async function deleteProject(projectId) {

    const response = await api.delete(`/projects/${projectId}`);

    return response.data;

}