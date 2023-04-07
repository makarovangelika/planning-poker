import { Registration, Template } from "./models";
import { store } from "./store"

const url = "http://localhost";

function getHeaders(): Headers
{
    return new Headers({
        "Content-Type": "application/json"
    })
}

function getAuthHeaders(): Headers
{
    const headers = getHeaders();

    const token = store.getState().registration?.token;
    if (token) {
        headers.append("Authorization", token)
    }

    return headers;
}

interface TemplatesResponse {
    templates: Template[]
}

export const registerUser = async (name: string): Promise<Registration> => {
    const response = await fetch(`${url}/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
            name: name
        })
    });

    return await response.json() as Registration;
}

export const getTemplates = async ():Promise<Template[]> => {
    const response = await fetch(`${url}/rooms/templates`, {
        headers: getAuthHeaders()
    });
    const templateResponse = await response.json() as TemplatesResponse;
    
    return templateResponse.templates;
}

export const createRoom = async (name: string, voteTemplate: number) => {
    const response = await fetch(`${url}/rooms`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            name: name,
            voteTemplate: voteTemplate
        })
    });
    return await response.json();
}