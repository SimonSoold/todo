import React, {useState} from "react";
import { ColorPickerProps } from "../types";
import { isNearWhite } from "../utils/utils";

const ColorPicker = ({handleColor,color}:ColorPickerProps) => {
    const [warning, setWarning] = useState<string>("none")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNearWhite(e.target.value)) {
            handleColor(e)
            if (warning !== "none") {
                setWarning("none")
            }
        } else {
            setWarning("block")
        }
    }
    return (
        <>
            <input
                style={{
                    margin: "8px 0"
                }}
                name='color'
                type="color"
                value={color}
                onChange={handleChange}
            />
            <p id="warning" style={{
                color: "red",
                display: warning
            }}>
                Too close to white!
            </p>
        </>
    )
}
export default ColorPicker