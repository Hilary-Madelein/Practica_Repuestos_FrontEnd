import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Marca, GuardarAuto, ObtenerAuto, GuardarIngreso } from '../hooks/Conexion';
import Header from "./Header";
import Footer from './Footer';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';


function RegistrarAuto({ ingresoObtenido, autoObt, personObt }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navegation = useNavigate();

  //acciones
  // onsubmit
  const onSubmit = (data) => {
    var datos = {
      "fechaIngreso": data.fechaIngreso,
      "fechaEntrega": data.fechaEntrega,
      "descripcion": data.descripcion,
      "external_auto": autoObt,
      "external_persona": personObt
    };
    console.log("estos van", datos);
    GuardarIngreso(datos, getToken()).then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, 'error', 'Error');          
      } else {
        mensajes(info.msg);
        navegation('/autosvendidos');
      }     
    }
    );
  };

  return (
    <div className="wrapper">
      <div className="d-flex flex-column">
        <div className="content">
        
          <div className='container-fluid'>
            <div className="col-lg-10">
              <div className="p-5">

                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                  {/** INGRESAR FECHA INGRESO */}
                  <div className="form-group">
                    <input type="date" {...register('fechaIngreso', { required: true })} className="form-control form-control-user" placeholder="Ingrese la fecha de ingreso" />
                    {errors.fechaIngreso && errors.fechaIngreso.type === 'required' && <div className='alert alert-danger'>Ingrese una fecha</div>}
                  </div>

                  {/** INGRESAR FECHA ENTREGA */}
                  <div className="form-group">
                    <input type="date" {...register('fechaEntrega', { required: true })} className="form-control form-control-user" placeholder="Ingrese la fecha de entrega" />
                    {errors.fechaEntrega && errors.fechaEntrega.type === 'required' && <div className='alert alert-danger'>Ingrese una fecha</div>}
                  </div>

                  <Form.Group controlId="descripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={3} {...register('descripcion')} placeholder="Ingrese una descripción" />
                    {errors.descripcion && errors.descripcion.type === 'required' && <div className='alert alert-danger'>Ingrese la descripcion</div>}
                    {errors.descripcion && errors.descripcion.type === 'pattern' && <div className='alert alert-danger'>Ingrese una descripcion</div>}
                  </Form.Group>

                  {/** BOTÓN CANCELAR */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="/autosdisponibles" className="btn btn-danger btn-rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      <span style={{ marginLeft: '5px' }}>Cancelar</span>
                    </a>

                    {/** BOTÓN REGISTRAR */}
                    <input className="btn btn-success btn-rounded" type='submit' value='Registrar'></input>
                  </div>

                </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default RegistrarAuto;
