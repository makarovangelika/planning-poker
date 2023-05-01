import { IRoom, Registration, Template, VoteResponse } from "./models";
import { store } from "./store/store";
import { unregister } from './store/RegistrationSlice';

export const url = "http://localhost";

function appendHeaders(key: string, value: string, init?: RequestInit): RequestInit {
    if (!init) {
        init = {}
    }
    let headers: HeadersInit = init.headers ? new Headers(init.headers) : new Headers();
    headers.set(key, value);
    init.headers = headers;
    return init;
}

async function authFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    init = appendHeaders("Content-Type", "application/json", init);
    const token = store.getState().registration?.token;
    if (token) {
        init = appendHeaders("Authorization", token, init);
    }
    const result = fetch(input, init);
    result.then(response => {
        if (response.status === 401) {
            store.dispatch(unregister());
            window.location.href = "/";
        }
    })
    return result;
}

interface TemplatesResponse {
    templates: Template[]
}

export const registerUser = async (name: string): Promise<Registration> => {
    const response = await authFetch(`${url}/register`, {
        method: "POST",
        body: JSON.stringify({
            name: name
        })
    });

    return await response.json() as Registration;
}

export const getTemplates = async ():Promise<Template[]> => {
    const response = await authFetch(`${url}/rooms/templates`);
    const templateResponse = await response.json() as TemplatesResponse;
    
    return templateResponse.templates;
}

export const createRoom = async (name: string, voteTemplate: number): Promise<IRoom> => {
    const response = await authFetch(`${url}/rooms`, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            voteTemplate: voteTemplate
        })
    });
    return await response.json();
}

export const getRoom = async (id: string) => {
    const response = await authFetch(`${url}/rooms/${id}`);
    return await response.json();
}

export const voteRequest = async (id: string, value: number): Promise<VoteResponse> => {
    const response = await authFetch(`${url}/rooms/${id}/vote`, {
        method: "POST",
        body: JSON.stringify({
            value: value
        })
    });
    return await response.json();
}

export const endVote = async (id: string): Promise<IRoom> => {
    const response = await authFetch(`${url}/rooms/${id}/end`, {
            method: "POST",
        });
        return await response.json();
}

export const resetRoom = async (id: string): Promise<IRoom> => {
    const response = await authFetch(`${url}/rooms/${id}/reset`, {
        method: 'POST'
    });
    return await response.json();
}

export const leaveRoom = async(id: string) => {
    const response = await authFetch(`${url}/rooms/${id}/leave`, {
        method: 'POST'
    });
    return await response.json();
}