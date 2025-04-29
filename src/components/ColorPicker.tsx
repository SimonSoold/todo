import React, {useState} from "react";
import ErrorField from "./ErrorField";
interface ColorPickerProps {
    handleColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
    color: string;
    brightnessThreshold?: number
}
export const isNearWhite = (hex:string, threshold: number = 220) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r + g + b) / 3;
    return brightness > threshold;
} 
const ColorPicker = ({handleColor,color,brightnessThreshold}:ColorPickerProps) => {
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNearWhite(e.target.value, brightnessThreshold)) {
            handleColor(e)
            if (error) {
                setError(null)
            }
        } else {
            setError("Too close to white!")
        }
    }
    return (
        <>
            <input
                style={{
                    margin: "0 0 8px 0"
                }}
                name="color"
                type="color"
                value={color}
                onChange={handleChange}
            />
            <ErrorField>
                {error}
            </ErrorField>
        </>
    )
}
export default ColorPicker