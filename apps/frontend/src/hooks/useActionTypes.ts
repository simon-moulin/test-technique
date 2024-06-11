import { useEffect, useState } from "react";
import { fetchActionTypes } from "../api";

export function useActionTypes() {
    const [actionTypes, setActionTypes] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const types = await fetchActionTypes();
                setActionTypes(types.ActionTypes);
                setError(null);
            } catch (err) {
                console.error("Error fetching action types:", err);
                setError('Failed to fetch action types');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { actionTypes, loading, error };
}
