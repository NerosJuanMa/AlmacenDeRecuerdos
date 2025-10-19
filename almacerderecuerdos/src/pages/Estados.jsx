

import Header from "../components/Header";
import Footer from "../components/Footer";
import BotonAlerta from "../components/BotonAlerta";
import BotonColor from "../components/BotonColor";
import FormularioSimple from "../components/FormularioSimple";

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