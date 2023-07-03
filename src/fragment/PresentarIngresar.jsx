import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from 'react-bootstrap';
import { Button, Modal, Input, Table } from 'react-bootstrap';
import RegistrarAuto from "./RegistrarAuto";
import React, { useEffect, useState } from 'react';
import { Autos, AutosIngresados, DetallesFact, GenerarFactura, GuardarAuto, Marca, ObtenerAuto, ObtenerExt, ObtenerIngreso } from "../hooks/Conexion";
import { borrarSesion, getToken } from "../utilidades/Sessionutil";
import mensajes from "../utilidades/Mensajes";
import DetalleOrden from "./DetalleOrden";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export const Ingreso = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    //SHOW AGREGAR
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //SHOW EDITAR
    const [showEdit, setShowEdit] = useState(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    //CONSTANTES PARA LLAMAR UNA VEZ AL SERVIDOR
    const [llmarcas, setLlmarcas] = useState(false);
    const [llautos, setLlautos] = useState(false);

    //DATOS
    const [data, setData] = useState([]);
    const [selectedIngresoId, setSelectedIngresoId] = useState(-1);
    const [ingresoObtenido, setingresoObtenido] = useState("");
    const [detall, setdetall] = useState([]);
    const [ex, set_ex] = useState([]);
    const navegation = useNavigate();

    //ACCION OBTENER DATOS DE UN INGRESO
    const obtenerDatosIngreso = (id) => {
        ObtenerIngreso(id, getToken()).then((info) => {
            var datos = info.info;
            if (info.code !== 200) {
                mensajes(info.mensajes);
            } else {
                setingresoObtenido(datos);
            }
        })
    };


    if (!llautos) {
        AutosIngresados(getToken()).then((info) => {
            console.log(info.info);
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
            } else {
                setData(info.info);
                setLlautos(true);
            }
        })
    }

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

    const obtenerExt = (id) => {
        ObtenerExt(id, getToken()).then((info) => {
          var datos = info.info;
          if (info.code !== 200) {
            mensajes(info.mensajes);
          } else {
            set_ex(datos);
          }
        })
      };

    //CAMBIAR FORMATO FECHA

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1); // Ajustar la fecha sumando 1 día
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const onSubmit = async (data) => {
        var datos = {
            "lugarEmision": data.lugarEmision,
            "external_ordenIngreso": ingresoObtenido.external_id
        };
        GenerarFactura(datos, getToken()).then((info) => {
            if (info.code !== 200) {
                mensajes(info.msg, 'error', 'Error');
                console.log("hola");
            } else {
                console.log("hola2");
                mensajes(info.msg);
                navegation('/autos/mecanica');
            }
        });
    };

    return (

        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row">
                    <div className="col-sm-12 text-center mt-5 mb-4 text-gred d-flex justify-content-center">
                        <h2 style={{ color: "#00CED1" }}><b>Autos Ingresados a Reparación</b></h2>
                    </div>
                </div>
                <div className="row">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nro Orden</th>
                                <th>Fecha Ingreso</th>
                                <th>Fecha Entrega</th>
                                <th>Descripcion</th>
                                <th>Cliente</th>
                                <th>Apellidos</th>
                                <th>Nombres</th>
                                <th>Placa</th>
                                <th>Modelo</th>
                                <th>Facturar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((ingreso) => (
                                <tr key={ingreso.id}>
                                    <td>{ingreso.numeroOrden}</td>
                                    <td>{obtenerFechaFormateada(ingreso.fechaIngreso)}</td>
                                    <td>{obtenerFechaFormateada(ingreso.fechaEntrega)}</td>
                                    <td>{ingreso.descripcion}</td>
                                    <td>{ingreso.persona.identificacion}</td>
                                    <td>{ingreso.persona.apellidos}</td>
                                    <td>{ingreso.persona.nombres}</td>
                                    <td>{ingreso.auto.placa}</td>
                                    <td>{ingreso.auto.modelo}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {/* ...otros elementos de formulario... */}
                                            <button
                                                type="submit"
                                                className="btn btn-info float-right"
                                                onClick={() => {
                                                    handleShow();
                                                    obtenerDatosIngreso(ingreso.external_id);
                                                    setSelectedIngresoId(ingreso.id);
                                                    obtenerExt(ingreso.id);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-ruled" viewBox="0 0 16 16">
                                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h7v1a1 1 0 0 1-1 1H6zm7-3H6v-2h7v2z" />
                                                </svg>
                                            </button>



                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



                </div>
                {/* <VENTANA MODAL EDITAR> */}
                <div className="model_box" style={{ width: "100vw", margin: 0 }}>


                    <Modal show={show} onHide={handleClose} size="xl">
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body style={{ overflow: "auto" }}>

                            <DetalleOrden ingresoObtenido={ingresoObtenido} numeroFila={selectedIngresoId} detall={detall} ex={ex}/>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { handleCloseEdit(); setLlautos(false); }}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>


            </div>
        </div>
    );

}

export default Ingreso;