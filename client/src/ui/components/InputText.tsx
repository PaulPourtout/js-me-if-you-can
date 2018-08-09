import * as React from "react";

interface Props {
    label: string;
    value: string;
    onChange?: (e) => void;
    onBlur?: (e) => void;
    onFocus?: (e) => void;
}

export const InputText = ({label, value, onChange}) => {
    const emptyOrFocused = true;

    return (
        <div style={{position: "relative"}}>
            <label style={{position: "absolute", top: -5, left: 2}}htmlFor={label}>{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e)}
            />
        </div>
    )
}
