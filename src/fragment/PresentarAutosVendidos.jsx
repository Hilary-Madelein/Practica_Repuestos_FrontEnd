import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input, Table } from 'react-bootstrap';
import RegistrarAuto from "./RegistrarAuto";
import React, { useEffect, useState } from 'react';
import { Autos, AutosIngresados, AutosVendidos, GuardarAuto, Marca, ObtenerAuto, ObtenerIngreso, ObtenerVendidos } from "../hooks/Conexion";
import { borrarSesion, getToken } from "../utilidades/Sessionutil";
import mensajes from "../utilidades/Mensajes";
import { useNavigate } from "react-router";
import EditarAuto from "./EditarAuto";
import { useForm } from "react-hook-form";
import IngresarAuto from "./IngresarAuto";
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export const PresentarAutosVendidos = () => {

    //CONSTANTES PARA LLAMAR UNA VEZ AL SERVIDOR
    const [llautos, setLlautos] = useState(false);

    //DATOS
    const [data, setData] = useState([]);

    const navegation = useNavigate();
    //SHOW AGREGAR
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ingresoObtenido, setingresoObtenido] = useState([]);
    const [autoObt, setautoObt] = useState([]);
    const [personObt, setpersonObt] = useState([]);

    const [llautos1, setLlautos1] = useState(false);

    //DATOS
    const [data1, setData1] = useState([]);

    if (!llautos1) {
        AutosIngresados(getToken()).then((info) => {
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
            } else {
                setData1(info.info);
                setLlautos1(true);
            }
        })
    }

    if (!llautos) {
        AutosVendidos(getToken()).then((info) => {
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/sesion")
            } else {
                setData(info.info);
                setLlautos(true);
            }
        })
    }

    //ACCION OBTENER DATOS DE UN INGRESO
    const obtenerDatosIngreso = (id) => {
        ObtenerVendidos(id, getToken()).then((info) => {
            var datos = info.info;
            if (info.code !== 200) {
                mensajes(info.mensajes);
                console.log(info.error);
            } else {
                setingresoObtenido(datos);
                setautoObt(datos[0].auto_external_id);
                setpersonObt(datos[0].persona_external_id);
            }
        })
    };

    return (

        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">

                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Buscar auto" aria-label="Search" />

                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "blue" }}><h2><b>Autos Vendidos</b></h2></div>
                </div>
                <div className="row">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Modelo</th>
                                <th>Año</th>
                                <th>Kilometraje</th>
                                <th>Color</th>
                                <th>Placa</th>
                                <th>Precio</th>
                                <th>Dueño</th>
                                <th>Apellidos</th>
                                <th>Nombres</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((auto) => (
                                <tr key={auto.id}>
                                    <td>{auto.modelo}</td>
                                    <td>{auto.anioFabricacion}</td>
                                    <td>{auto.kilometraje}</td>
                                    <td>{auto.color}</td>
                                    <td>{auto.placa}</td>
                                    <td>{auto.precio}</td>
                                    <td>{auto.identificacion}</td>
                                    <td>{auto.apellidos}</td>
                                    <td>{auto.nombres}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                className="btn btn-outline-info btn-rounded"
                                                onClick={() => {
                                                    handleShow();
                                                    obtenerDatosIngreso(auto.external_id);
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
                {/* < VENTANA MODAL AGREGAR> */}

                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Formulario de ingreso a Reparación</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <IngresarAuto ingresoObtenido={ingresoObtenido} autoObt={autoObt} personObt={personObt} />

                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary">
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );

}

export default PresentarAutosVendidos;
