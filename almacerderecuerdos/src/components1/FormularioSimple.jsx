import { useState } from "react";

function FormularioSimple() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [edad, setEdad] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        alert(
            `Nombre: ${nombre}\nEmail: ${email}\nEdad: ${edad}`
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="number"
                placeholder="Edad"
                value={edad}
                onChange={e => setEdad(e.target.value)}
            />
            <button type="submit">Enviar</button>
        </form>
    );
}
export default FormularioSimple;
