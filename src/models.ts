export interface Registration {
    user: User,
    token: string
}

export interface User {
    id: string,
    name: string
}

export interface State {
    registration: Registration
}
