import { useEffect, useState } from "react";

import { getProjects } from "../services/projectService";

export default function useProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProjects = async () => {
        try {
            setLoading(true);

            const data = await getProjects();

            setProjects(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Projecten konden niet worden geladen.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return {
        projects,
        loading,
        error,
        reload: loadProjects,
    };
}