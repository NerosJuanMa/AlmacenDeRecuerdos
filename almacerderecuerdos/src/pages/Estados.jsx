

import Header from "../components1/Header";
import Footer from "../components1/Footer";
import BotonAlerta from "../components1/BotonAlerta";
import BotonColor from "../components1/BotonColor";
import FormularioSimple from "../components1/FormularioSimple";

import "./Estados.css";


function Estados() {
  return (
<>
   <div>
      <Header />
    <main><br /><br /><br /><br />
        <div>
        <BotonAlerta />
        </div>
        <div> 
        <BotonColor />
        </div>
        <div> 
        <FormularioSimple />
        </div>
    </main>
    
    <Footer />
    </div>
</>
)
}
export default Estados;