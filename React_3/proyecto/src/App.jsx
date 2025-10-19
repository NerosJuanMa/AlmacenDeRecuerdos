// import { Routes, Route } from "react-router-dom";

// import Layout from "./components/Layout";

// import Home from "./pages/Home";
// import Proyectos from "./pages/Proyectos";
// import SobreMi from "./pages/SobreMi";
// import Estados from "./pages/Estados";


// function App() {
//   return (
//     <Routes element= {<Layout />} >
//       <Route path="/inicio" element={<Inicio />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/proyectos" element={<Proyectos />} />
//         <Route path="/sobre-mi" element={<SobreMi />} />
//         <Route path="/estados" element={<Estados />} />
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Home from "./pages/Home";
import Proyectos from "./pages/Proyectos";
import SobreMi from "./pages/SobreMi";
import Estados from "./pages/Estados";
import Header from "./components/Header";
import Footer from "./components/Footer";

 
export default function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/estados" element={<Estados />} />
      </Route>
    </Routes>
    <Footer />
    </>
 );
}