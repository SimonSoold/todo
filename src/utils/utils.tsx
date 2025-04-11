export const isNearWhite = (hex:string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r + g + b) / 3;
    return brightness > 220; // tweak this threshold as needed
} 