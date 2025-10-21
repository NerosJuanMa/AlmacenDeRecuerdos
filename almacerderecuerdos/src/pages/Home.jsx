import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import TATOO_NEROS_V2_ROJO2 from '../assets/TATOO_NEROS_V2_ROJO2.svg'
import './Home.css'
// import "./assets/images/TATOO_NEROS_V2_ROJO2";


export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='contenedor-imagen'>
      <img src={TATOO_NEROS_V2_ROJO2} alt="fondo" />    
    </div>
    <br /><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure delectus error fugit cum, omnis officia deleniti, praesentium commodi repellendus quis, dolorum alias magnam molestiae inventore officiis ratione quibusdam temporibus blanditiis.</p><br /><br /><br /><br /><br />
    <br /><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure delectus error fugit cum, omnis officia deleniti, praesentium commodi repellendus quis, dolorum alias magnam molestiae inventore officiis ratione quibusdam temporibus blanditiis.</p><br /><br /><br /><br /><br />
    <br /><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure delectus error fugit cum, omnis officia deleniti, praesentium commodi repellendus quis, dolorum alias magnam molestiae inventore officiis ratione quibusdam temporibus blanditiis.</p><br /><br /><br /><br /><br />
    <br /><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure delectus error fugit cum, omnis officia deleniti, praesentium commodi repellendus quis, dolorum alias magnam molestiae inventore officiis ratione quibusdam temporibus blanditiis.</p><br /><br /><br /><br /><br />
    <br /><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure delectus error fugit cum, omnis officia deleniti, praesentium commodi repellendus quis, dolorum alias magnam molestiae inventore officiis ratione quibusdam temporibus blanditiis.</p><br /><br /><br /><br /><br />
    <br /><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure delectus error fugit cum, omnis officia deleniti, praesentium commodi repellendus quis, dolorum alias magnam molestiae inventore officiis ratione quibusdam temporibus blanditiis.</p><br /><br /><br /><br /><br />
     <div className='home'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
