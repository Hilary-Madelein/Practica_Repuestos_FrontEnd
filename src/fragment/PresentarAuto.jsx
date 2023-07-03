import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input, Table } from 'react-bootstrap';
import RegistrarAuto from "./RegistrarAuto";
import React, { useEffect, useState } from 'react';
import { Autos, GuardarAuto, Marca, ObtenerAuto } from "../hooks/Conexion";
import { borrarSesion, getToken } from "../utilidades/Sessionutil";
import mensajes from "../utilidades/Mensajes";
import { useNavigate } from "react-router";
import EditarAuto from "./EditarAuto";
import { useForm } from "react-hook-form";
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export const Prueba = () => {

    //SHOW AGREGAR
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //SHOW EDITAR
    const [showEdit, setShowEdit] = useState(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    //SHOW ELIMINAR
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

    //CONSTANTES PARA LLAMAR UNA VEZ AL SERVIDOR
    const [llmarcas, setLlmarcas] = useState(false);
    const [llautos, setLlautos] = useState(false);

    //DATOS
    const [data, setData] = useState([]);
    const [autoObtenido, setautoObtenido] = useState([]);

    const [marcas, setMarcas] = useState([]);

    const navegation = useNavigate();

    //ACCION HABILITAR EDICION CAMPOS
    const handleChange = e => {
        const { name, value } = e.target;
        setautoObtenido((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    //ACCION OBTENER DATOS DE UN AUTO
    const obtenerId = (id) => {
        ObtenerAuto(id, getToken()).then((info) => {
            var datos = info.info;
            //console.log("8888", info.info);
            if (info.code !== 200) {
                mensajes(info.mensajes);
                console.log(info.error);
            } else {
                setautoObtenido(datos);
            }
        })
    };

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

    if (!llautos) {
        Autos(getToken()).then((info) => {
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

    //Eliminar (aun en reparacion)
    const eliminar = () => {
        setData(data.filter(auto => auto.placa !== autoObtenido.placa));
    }

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
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "blue" }}><h2><b>Autos Disponibles</b></h2></div>
                    <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <span style={{ marginLeft: '5px' }}>Agregar Auto</span>
                        </Button>
                    </div>
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
                                <th>Marca</th>
                                <th>Acciones</th>
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
                                    <td>{auto.marca.nombre}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Button variant="btn btn-outline-info btn-rounded" onClick={() => {
                                                handleShowEdit();
                                                obtenerId(auto.external_id);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </Button>

                                            <Button variant="btn btn-outline-danger btn-rounded" onClick={() => {
                                                handleShowDelete();
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            </Button>
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
                            <Modal.Title>Agregar auto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RegistrarAuto />

                        </Modal.Body>

                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => { handleClose(); setLlautos(false); }}>
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>

                {/* < VENTANA MODAL ELIMINAR> */}
                <div className="model_box">
                    <Modal
                        show={showDelete}
                        onHide={handleCloseDelete}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar Auto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¿Estas seguro que desea eliminar este auto?

                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={() => eliminar()}>
                                Aceptar

                            </Button>
                            <Button variant="secondary" onClick={handleCloseDelete}>
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>

                {/* < VENTANA MODAL EDITAR> */}
                <div className="model_box">
                    <Modal
                        show={showEdit}
                        onHide={handleCloseEdit}
                        //backdrop="static"
                        keyboard={true}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Editar auto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditarAuto autoObtenido={autoObtenido} handleChange={handleChange} />
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

export default Prueba;
