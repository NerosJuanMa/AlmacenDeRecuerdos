import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Proyectos from "./pages/Proyectos";
import SobreMi from "./pages/SobreMi";
import Estados from "./pages/Estados";


function App() {
  const [count, setCount] = useState(0)

  return (  
  <>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="./proyectos" element={<Proyectos />} />
        <Route path="./sobre-mi" element={<SobreMi />} />
        <Route path="./estados" element={<Estados />} />
      </Route>
    </Routes>
  </>
  )
}

export default App
