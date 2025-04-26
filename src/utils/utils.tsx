import {User} from "../types"
export const isNearWhite = (hex:string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r + g + b) / 3;
    return brightness > 220; // tweak this threshold as needed
} 

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