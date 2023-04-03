import { Registration } from "./models";

const url = "http://localhost";
let headers = new Headers();
headers.append("Content-Type", "application/json");

export const registerUser = async (name: string): Promise<Registration> => {
    const response = await fetch(`${url}/register`,
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                name: name
            })
        });

    return await response.json() as Registration;
}