import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Layout from "./components/Layout";
import Home from "./pages/Home";



function App() {
  const [count, setCount] = useState(0)

  return (  
  <>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="./proyectos" element={<Proyectos />} /> */}
        {/* <Route path="./pobre-mi" element={<SobreMi />} /> */}
        {/* <Route path="./estados" element={<Estados />} /> */}
      </Route>
    </Routes>
  </>
  )
}

export default App
