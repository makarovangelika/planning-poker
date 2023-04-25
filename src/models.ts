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

export interface ISeat {
    user: User,
    vote: Vote,
    voted: boolean,
    voteOpened: boolean,
    owner: boolean,
    active: boolean
}

export interface IRoom {
    id: string,
    name: string,
    status: number,
    owner: boolean,
    seats: ISeat[],
    templateTitle: string,
    voteCards: {
        vote: Vote,
        active: boolean
    }[]
}

export interface VoteResponse {
    message: "Voted"
}

export const statusVoting = 1;
export const statusVoted = 2;
