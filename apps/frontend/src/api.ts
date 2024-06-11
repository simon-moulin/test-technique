import axios from "axios";

const SERVER_URL = 'http://localhost:3000';

export async function fetchActionTypes() {
    try {
        const response = await axios.get(`${SERVER_URL}/action/types`);
        return response.data;
    } catch (error) {
        console.error("Error fetching action types:", error);
        throw error;
    }
}

export async function addAction(type:string) {
    try {
        await axios.post(`${SERVER_URL}/action`, { type });
    } catch (error) {
        console.error("Error adding action:", error);
        throw error;
    }
}
