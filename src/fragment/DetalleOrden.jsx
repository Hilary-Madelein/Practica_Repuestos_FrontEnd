import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input, Table } from 'react-bootstrap';
import RegistrarAuto from "./RegistrarAuto";
import React, { useEffect, useState } from 'react';
import { Autos, AutosVendidos, CalcularValores, DetalleGuardar, DetallesFact, DetallesOrden, GenerarFactura, GuardarAuto, Marca, ObtenerAuto, ObtenerDetalle, ObtenerExt, ObtenerOrdenes, ReparacionListar, Repuesto, ValoresMostrar } from "../hooks/Conexion";
import { borrarSesion, getToken } from "../utilidades/Sessionutil";
import mensajes from "../utilidades/Mensajes";
import { useNavigate } from "react-router";
import EditarAuto from "./EditarAuto";
import { useForm } from "react-hook-form";
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


export const Orden = ({ ingresoObtenido, numeroFila, ex }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [llrepuestos, setLlrepuestos] = useState(false);
  const [data, setData] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [llreparac, setLlreparac] = useState(false);
  const [reparac, setreparac] = useState([]);
  const [ex1, set_ex1] = useState([]);
  const [ordenes, setordenes] = useState([]);

  const [lldetall, setLldetall] = useState(false); 
  const [detall, setdetall] = useState([]);

  const [repuestoSelec, setrepuestoSelec] = useState([]);
  const [selectedRepuesto, setSelectedRepuesto] = useState("");
  const [llamadaRealizada, setLlamadaRealizada] = useState(false);

  const navegation = useNavigate();

  const handleRepuestoChange = (event) => {
    setSelectedRepuesto(event.target.value);
  };

  const handleAgregarClick = () => {
    // Lógica para agregar el repuesto a la tabla
  };

  console.log("DDD", ex);

  const onSubmit = (data) => {
    var datos = {
      "lugarEmision": data.lugarEmision,
      "external_ordenIngreso": ingresoObtenido && ingresoObtenido.external_id
    };
    GenerarFactura(datos, getToken()).then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, 'error', 'Error');
      } else {
        mensajes(info.msg);
        navegation('/autos/mecanica');
      }
    });
  };

  const onSubmit2 = (data) => {
    for (let i = 0; i < detall.length; i++) {
      var datos = {
        external: detall[i].external_id
      };
      CalcularValores(datos, getToken()).then((info) => {
        if (info.code !== 200) {
          mensajes(info.msg, 'error', 'Error');
        } else {
          mensajes(info.msg);
          navegation('/autos/mecanica');
        }
      });
    }
  };

  const calcular = async () => {
    var subTotal = 0;
    for (let i = 0; i < detall.length; i++) {
      var cant = detall[i].repuesto.precio * detall[i].cantidad
      subTotal = Number(subTotal) + Number(cant);
    }
    var iva = subTotal * 0.12;
    var total = Number(iva) + Number(subTotal);
    var datos = {
      "external_id": detall[0].external_id,
      "subTotal": subTotal,
      "valorIVA": iva,
      "total": total
    };

    CalcularValores(datos, getToken()).then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, 'error', 'Error');
      } else {
        mensajes(info.msg);
        navegation('/autos/mecanica');
      }
    });
  }

  if (!llrepuestos) {
    Repuesto(getToken()).then((info) => {
      if (info.code !== 200 && info.msg == 'Acceso denegado. Token ha expirado') {
        borrarSesion();
        mensajes(info.msg);
        navegation("/sesion");
      } else {
        setRepuestos(info.info);
        setLlrepuestos(true);
      }
    });
  }


  if (!llreparac) {
    ReparacionListar(getToken()).then((info) => {
      if (info.code !== 200 && info.msg == 'Acceso denegado. Token ha expirado') {
        borrarSesion();
        mensajes(info.msg);
        navegation("/sesion");
      } else {
        setreparac(info.info);
        setLlreparac(true);
      }
    });
  }

  const obtenerExt = (id) => {
    ObtenerExt(id, getToken()).then((info) => {
      var datos = info.info;
      if (info.code !== 200) {
        mensajes(info.mensajes);
      } else {
        set_ex1(datos);
      }
    })
  };

  const obtenerDatosFac = (id) => {
    ValoresMostrar(id, getToken()).then((info) => {
      var datos = info.info;
      if (info.code !== 200) {
        mensajes(info.mensajes);
      } else {
        setordenes(datos);
      }
    })
  };

  const onSubmit1 = (data) => {
    var datos = {
      "cantidad": data.cantidad,
      "external_repuesto": repuestoSelec,
      "external_ordenReparacion": ex.external_id
    };
    DetalleGuardar(datos, getToken()).then((info) => {
      if (info.code !== 200) {
        mensajes(info.msg, 'error', 'Error');
      } else {
        mensajes(info.msg);
        navegation('/autos/mecanica');
      }
    }
    );
  };

  const obtenerDel = (id) => {
    DetallesFact(id, getToken()).then((info) => {
      var datos = info.info;
      if (info.code !== 200) {
        mensajes(info.mensajes);
      } else {
        setdetall(datos);
      }
    })
  };

  const handleBlur = (exId) => {
    if (!llamadaRealizada) {
      obtenerDel(exId);
      obtenerDatosFac(exId);
      setLlamadaRealizada(true);
    }
  };


  return (
    <section className="factura">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="mb-4">Facturación de Repuestos</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Datos del Cliente</h5>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="nombre">Nombres:</label>
                      <input
                        type="text"
                        id="nombre"
                        className="form-control"
                        value={ingresoObtenido.persona && ingresoObtenido.persona.nombres}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="apellido">Apellidos:</label>
                      <input
                        type="text"
                        id="apellido"
                        className="form-control"
                        value={ingresoObtenido.persona && ingresoObtenido.persona.apellidos}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="telefono">Identificación:</label>
                      <input
                        type="text"
                        id="identificacion"
                        className="form-control"
                        value={ingresoObtenido.persona && ingresoObtenido.persona.identificacion}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="email">Tipo identificación:</label>
                      <input
                        type="text"
                        id="tipo_identificacion"
                        className="form-control"
                        value={ingresoObtenido.persona && ingresoObtenido.persona.tipo_identificacion}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="direccion">Dirección:</label>
                      <input
                        type="text"
                        id="direccion"
                        className="form-control"
                        value={ingresoObtenido.persona && ingresoObtenido.persona.direccion}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="ciudad">Lugar de Emisión:</label>
                      <input
                        type="text"
                        id="ciudad"
                        {...register('lugarEmision', { required: true })}
                        className="form-control"
                        placeholder="Ingrese su ciudad"
                      />
                      {errors.lugarEmision && errors.lugarEmision.type === 'required' && <div className='alert alert-danger'>Ingrese una ciudad</div>}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <button
                      type="button"
                      className="btn btn-info float-right"
                      onClick={handleSubmit(onSubmit)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                        <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Detalle de la Factura</h5>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="repuesto">Repuesto:</label>
                      <select
                        className="form-control"
                        {...register('repuesto', { required: true })}
                        onChange={(e) => setrepuestoSelec(e.target.value)}
                      >
                        <option>Seleccione un repuesto</option>
                        {repuestos.map((m) => (
                          <option key={m.external_id} value={m.external_id}>
                            {m.nombre} - {m.marca} - {m.categoria}
                          </option>
                        ))}

                      </select>
                      {errors.repuesto && errors.repuesto.type === 'required' && (
                        <div className="alert alert-danger">Seleccione un repuesto</div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="cantidad">Cantidad:</label>
                      <input
                        type="number"
                        id="cantidad"
                        {...register('cantidad', { required: true })}
                        className="form-control"
                        placeholder="Ingrese la cantidad"
                        onBlur={() => {
                          handleBlur(ex.id);
                          setLlamadaRealizada(false);
                      }}
                      />
                      {errors.cantidad && errors.cantidad.type === 'required' && <div className='alert alert-danger'>Ingrese una cantidad</div>}
                    </div>
                  </div>

                </div>


                <button
                  type="button"
                  className="btn btn-info"
                  onClick={handleSubmit(onSubmit1)}
                >
                  Agregar
                </button>
                <table className="table mt-4">
                  <thead>
                    <tr>
                      <th>Repuesto</th>
                      <th>Marca</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const rows = [];
                      for (let i = 0; i < detall.length; i++) {
                        const detalle = detall[i];
                        rows.push(
                          <tr key={detalle.id}>
                            <td>{detalle.repuesto.nombre}</td>
                            <td>{detalle.repuesto.marca}</td>
                            <td>{detalle.cantidad}</td>
                            <td>{detalle.repuesto.precio}</td>

                          </tr>
                        );
                      }
                      return rows;
                    })()}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Resumen de la Factura</h5>
                <form>
                  <div className="form-group">
                    <label htmlFor="subtotal">Subtotal:</label>
                    <input
                      type="text"
                      id="subtotal"
                      className="form-control"
                      value={ordenes.subTotal}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="descuento">IVA:</label>
                    <input
                      type="number"
                      id="descuento"
                      className="form-control"
                      placeholder="Ingrese el descuento"
                      value={ordenes.valorIVA}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="total">Total:</label>
                    <input
                      type="text"
                      id="total"
                      className="form-control"
                      value={ordenes.total}
                      disabled
                    />
                  </div>
                </form>
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={handleSubmit(() =>
                    calcular()
                  )}
                >
                  Generar Factura
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

};


export default Orden;