import {User} from "../types"
export const saveSessionState = (state:any, name:string) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem(name, serializedState);
    } catch (err) {
        console.error('Error saving state:', err);
    }
}
export const loadSessionState = (name: string): User | object => {
    try {
        const serializedState = sessionStorage.getItem(name);
        const newState = serializedState ? (JSON.parse(serializedState) as unknown) : {};
        if (newState && typeof newState === "object") {
            return newState
        }
        return {}
    } catch (err) {
        console.error('Error loading state:', err);
        return {};
    }
}
export const toShortDateString = (utcString: string) => {
    const date = new Date(utcString);
    const pad = (n: number) => String(n).padStart(2, '0');
  
    const year = date.getFullYear();       // Full 4-digit year
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
  
    return `${year}-${month}-${day}`;
};