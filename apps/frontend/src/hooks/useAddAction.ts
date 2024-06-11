import { useState } from "react";
import { addAction } from "../api";

export function useAddAction() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const addNewAction = async (type: string) => {
        setLoading(true);
        try {
            await addAction(type);
            setError(null);
        } catch (err) {
            console.error("Error adding action:", err);
            setError('Failed to add action');
        } finally {
            setLoading(false);
        }
    };

    return { addNewAction, loading, error };
}
