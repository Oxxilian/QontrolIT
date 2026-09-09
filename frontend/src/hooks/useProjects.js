import { useCallback, useEffect, useState } from "react";

import { getProjects } from "../services/projectService";

export default function useProjects() {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const loadProjects = useCallback(async () => {

        try {

            setLoading(true);

            const projects =
                await getProjects();

            setProjects(projects);

            setError(null);

        } catch (error) {

            console.error(error);

            setError(
                "Projecten konden niet worden geladen."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadProjects();

    }, [loadProjects]);

    return {

        projects,

        loading,

        error,

        reload: loadProjects,

    };

}