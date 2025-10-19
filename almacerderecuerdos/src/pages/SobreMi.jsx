

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./SobreMi.css";

function SobreMi() {
    return(        
        <div>
            <Header />
           
                < div>
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    <h2>
                        <p>"Sobre mi - JuanMa."</p> 
                    </h2>
                    <br />
                </div>
                <div className="calendar-container">
                    <p>Reservas  </p>
                    <label htmlFor="fecha">
                        <i className="fas fa-calendar-alt"></i>
                    </label>
                    <input type="date" id="fecha" name="fecha" />
                </div>
            <Footer />
        </div>
        
    );
 }
export default SobreMi;