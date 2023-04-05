import { StringMappingType } from "typescript"

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

export interface Template {
        title: string,
        votes: Vote[]
}

export interface Vote {
    value: number,
    type: string
}
