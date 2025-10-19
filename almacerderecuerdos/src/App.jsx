import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Proyectos from "./Pages/Proyectos";
import SobreMi from "./Pages/SobreMi";
import Estados from "./Pages/Estados";
//import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="./Home" element={<Home />} />
        <Route path="./Proyectos" element={<Proyectos />} />
        <Route path="./Sobre-mi" element={<SobreMi />} />
        <Route path="./Estados" element={<Estados />} />
      </Route>
    </Routes>
  );
}

export default App;