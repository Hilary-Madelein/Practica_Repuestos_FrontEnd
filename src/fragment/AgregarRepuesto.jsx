import React, { useState } from 'react';
import './Modal.css';

const AgregarRepuesto = () => {
  const [repuestoSeleccionado, setRepuestoSeleccionado] = useState('');

  const handleRepuestoChange = (event) => {
    setRepuestoSeleccionado(event.target.value);
  };

  const handleCerrarClick = () => {
    // Lógica para cerrar la ventana modal
    console.log('Cerrando ventana modal');
  };

  const handleAgregarClick = () => {
    // Lógica para agregar el repuesto seleccionado
    console.log(`Agregando repuesto: ${repuestoSeleccionado}`);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <h2>Agregar repuesto</h2>
        <select value={repuestoSeleccionado} onChange={handleRepuestoChange}>
          <option value="">Seleccione un repuesto</option>
          <option value="Repuesto 1">Repuesto 1</option>
          <option value="Repuesto 2">Repuesto 2</option>
          <option value="Repuesto 3">Repuesto 3</option>
        </select>
        <div className="modal-buttons">
          <button onClick={handleCerrarClick}>Cerrar</button>
          <button onClick={handleAgregarClick}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default AgregarRepuesto;
