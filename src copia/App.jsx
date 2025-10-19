import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Proyectos from "./pages/Proyectos";
import SobreMi from "./pages/SobreMi";
import Estados from "./pages/Estados";
// import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/estados" element={<Estados />} />
      </Route>
    </Routes>
  );
}

export default App;