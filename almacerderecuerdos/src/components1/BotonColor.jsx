import { useState } from "react";
function BotonColor() {
    const [color, setColor] = useState("blue");
    function cambiarColor() {
        setColor(color === "blue" ? "green" : "blue");
    }
    return (
        <button
            onClick={cambiarColor}
            style={{ background: color, color: "white", padding: "1rem" }}
        >
            Cambiar color
        </button>
    );
}
export default BotonColor;
