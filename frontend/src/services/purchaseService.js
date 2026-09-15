import api from "../api/api";


export async function getPurchases() {

    const response = await api.get(
        "/purchases"
    );

    return response.data.data;
}