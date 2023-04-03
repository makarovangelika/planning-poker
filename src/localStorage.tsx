import { Registration } from './models';

export function loadFromLocalStorage() {
    const serialisedState = localStorage.getItem('registration');
    if (serialisedState === null) {
        return  null;
    }
    return JSON.parse(serialisedState);
}

export function saveToLocalStorage(state: Registration | null) {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('registration', serialisedState);
}