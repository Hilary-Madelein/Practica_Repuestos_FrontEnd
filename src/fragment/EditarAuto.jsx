import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Marca, GuardarAuto, Autos, ActualizarAuto } from '../hooks/Conexion';
import Header from "./Header";
import Footer from './Footer';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import { useForm } from 'react-hook-form';
import '../css/style.css';
import '../css/stylea.css';


function EditarAuto({ autoObtenido, handleChange }) {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navegation = useNavigate();
  const [marcas, setMarcas] = useState([]);

  //CONSTANTES PARA LLAMAR UNA VEZ AL SERVIDOR
  const [llmarcas, setLlmarcas] = useState(false);

  if (!llmarcas) {
    Marca(getToken()).then((info) => {
      if (info.code !== 200 && info.msg == 'Acceso denegado. Token ha expirado') {
        borrarSesion();
        mensajes(info.msg);
        navegation("/sesion");
      } else {
        setMarcas(info.info);
        setLlmarcas(true);
      }
    });
  }

  const editar = async () => {

    var datos = {
      "modelo": autoObtenido.modelo,
      "kilometraje": autoObtenido.kilometraje,
      "anioFabricacion": autoObtenido.anioFabricacion,
      "marca": autoObtenido.marca,
      "precio": autoObtenido.precio,
      "color": autoObtenido.color,
      "placa": autoObtenido.placa,
      "external_id": autoObtenido.external_id,
    };

    ActualizarAuto(datos, getToken()).then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, 'error', 'Error');
        //msgError(info.message);            
      } else {
        mensajes(info.msg);
        navegation('/autosdisponibles');
      }
    });
  }

  return (
    <div className="wrapper">
      <div className="d-flex flex-column">
        <div className="content">

          <div className='container-fluid'>
            <div className="col-lg-10">
              <div className="p-5">

                <form className="user" onSubmit={handleSubmit(() => editar())}>
                  {/** INGRESAR MODELO */}
                  <div className="form-group">
                    <input type="text" {...register('modelo', { required: true })} className="form-control form-control-user" placeholder="Ingrese el modelo" value={autoObtenido.modelo} onChange={handleChange} />
                    {errors.modelo && errors.modelo.type === 'required' && <div className='alert alert-danger'>Ingrese un modelo</div>}
                  </div>

                  {/** INGRESAR AÑO */}
                  <div className="form-group">
                    <input type="number" className="form-control form-control-user" placeholder="Ingrese el año" {...register('anioFabricacion', { required: true })} value={autoObtenido.anioFabricacion} onChange={handleChange} />
                    {errors.anioFabricacion && errors.anioFabricacion.type === 'required' && <div className='alert alert-danger'>Ingrese un anio</div>}
                  </div>

                  {/** INGRESAR KILOMETRAJE */}
                  <div className="form-group">
                    <input type="text" className="form-control form-control-user" placeholder="Ingrese el kilometraje" {...register('kilometraje', { required: true })} value={autoObtenido.kilometraje} onChange={handleChange} />
                    {errors.kilometraje && errors.kilometraje.type === 'required' && <div className='alert alert-danger'>Ingrese un kilometraje</div>}
                  </div>

                  {/** INGRESAR COLOR */}
                  <div className="form-group">
                    <input type="text" className="form-control form-control-user" placeholder="Ingrese un color" {...register('color', { required: true })} value={autoObtenido.color} onChange={handleChange} />
                    {errors.color && errors.color.type === 'required' && <div className='alert alert-danger'>Ingrese un color</div>}
                  </div>

                  {/** INGRESAR PLACA */}
                  <div className="form-group">
                    <input type="text" className="form-control form-control-user" placeholder="Ingrese la placa" {...register('placa', { required: true })} value={autoObtenido.placa} onChange={handleChange} />
                    {errors.placa && errors.placa.type === 'required' && <div className='alert alert-danger'>Ingrese una placa</div>}
                  </div>

                  {/** INGRESAR PRECIO */}
                  <div className="form-group">
                    <input type="text" className="form-control form-control-user" placeholder="Ingrese el precio" {...register('precio', { required: true, pattern: /^[0-9]*(\.[0-9]{0,2})?$/ })} value={autoObtenido.precio} onChange={handleChange} />
                    {errors.precio && errors.precio.type === 'required' && <div className='alert alert-danger'>Ingrese el precio</div>}
                    {errors.precio && errors.precio.type === 'pattern' && <div className='alert alert-danger'>Ingrese un precio valido</div>}

                  </div>

                 {/** <div className="form-group">
                    <select className="form-control" {...register('marca', { required: true })} onChange={handleChange}>
                      <option value="">Elija una marca</option>
                      {marcas.map((m, i) => (
                        <option key={i} value={m.nombre} selected={m.nombre === autoObtenido.marca.nombre}>
                          {m.nombre}
                        </option>
                      ))}
                    </select>
                    {errors.marca && errors.marca.type === 'required' && (
                      <div className="alert alert-danger">Seleccione una marca</div>
                    )}
                  </div>*/}

                  <hr />

                  {/** BOTÓN CANCELAR */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="/autosdisponibles" className="btn btn-danger btn-rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      <span style={{ marginLeft: '5px' }}>Cancelar</span>
                    </a>

                    {/** BOTÓN EDITAR */}
                    <input className="btn btn-success btn-rounded" type='submit' value='Editar'></input>
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
export default EditarAuto;