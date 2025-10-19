import { Routes, Route } from "react-router-dom";
import Layout from "./components1/Layout";
import Home from "./pages1/Home";
import Proyectos from "./pages1/Proyectos";
import SobreMi from "./pages1/SobreMi";
import Estados from "./pages1/Estados";
import { useState } from 'react'



function App() {
  const [count, setCount] = useState(0)

  return (  
  <>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="./proyectos" element={<Proyectos />} />
        <Route path="./pobre-mi" element={<SobreMi />} />
        <Route path="./estados" element={<Estados />} />
      </Route>
    </Routes>
  </>
  )
}

export default App
