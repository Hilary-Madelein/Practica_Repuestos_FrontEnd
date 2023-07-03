import React from 'react';
import './App.css';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Sesion from './fragment/Sesion';
import Inicio from './fragment/Inicio';
import PresentarAuto, { Prueba } from './fragment/PresentarAuto';
import EditarAuto from './fragment/EditarAuto';
import { estaSesion } from './utilidades/Sessionutil';
import PresentarAutosVendidos from './fragment/PresentarAutosVendidos';
import Orden from './fragment/DetalleOrden';
import Ingreso from './fragment/PresentarIngresar';
import Actualizar from './fragment/Actualizar';

function App() {
  const Middeware = ({children}) =>{
    const autenticado = estaSesion();
    const location = useLocation();
    if(autenticado){
      return children;
    }else{
      return <Navigate to= '/sesion' state={location}/>;
    }
  }


  const MiddewareSesion = ({children}) =>{
    const autenticado = estaSesion();
    const location = useLocation();
    if(autenticado){
      return <Navigate to= '/inicio'/>;
      
    }else{
      return children;
    }
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/sesion' element={<Middeware><Sesion/></Middeware>}/>
        <Route path='/inicio' element={<Middeware><Inicio/></Middeware>}/>
        <Route path='/autosdisponibles' element={<Prueba/>}/>
        <Route path='/autosvendidos' element={<PresentarAutosVendidos/>}/>
        <Route path='/autos/edicion' element={<EditarAuto/>}/>
        <Route path='/autos/reparacion' element={<Orden/>}/>
        <Route path='/autos/mecanica' element={<Ingreso/>}/>
        <Route path='/autoss' element={<Actualizar/>}/>
      </Routes>
      </div>
  );
}

export default App;
