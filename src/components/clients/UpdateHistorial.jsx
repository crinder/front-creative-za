import React, { useState, useEffect } from 'react'
import Find from './Find';
import Message from '../utils/Message';
import Global from '../../helpers/Global';
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UpdateHistorial = () => {
    const [message, setMessage] = useState();
    const [clientResponse, setClientResponse] = useState([]);
    const [description, setDescription] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState();
    const { token, isLoading } = useAuth();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [idDescription, setIdDescription] = useState('');
    const [valueDescription, setValueDescription] = useState('');


    useEffect(() => {

        if (clientResponse._id) {
            buscarHistorial();
        }

    }, [clientResponse]);

    const mostrarModal = (descripcion, fecha, id) => {
        setDescripcion(descripcion);
        setFecha(fecha);
        setIdDescription(id);
        handleShow();
    }

    const actualizarHistorial = async () => {

        const response = await fetch(Global.url + 'client/update-historial/' + idDescription, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            },
            body: JSON.stringify({ description: valueDescription })
        });

        const data = await response.json();

        if (data.status === 'success') {
            setMessage('Historial actualizado');
            setVariant('Correcto');
        } else {
            setVariant('Error');
            setMessage(data.message);
        }

        buscarHistorial();
        handleAlert();
        handleClose();

    }

    const buscarHistorial = async () => {


        const response = await fetch(Global.url + 'client/list-historial/' + clientResponse._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        });

        const data = await response.json();

        if (data.status === 'success') {
            setDescription(data.clientStored);
        }
    }

    const handleAlert = () => {
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 5000);

    }

    const eliminarHistorial = async (id) => {

        const response = await fetch(Global.url + 'client/delete-historial/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        });

        const data = await response.json();

        if (data.status === 'success') {
            setMessage('Historial eliminado');
            setVariant('Correcto');
        } else {
            setVariant('Error');
            setMessage(data.message);
        }

        buscarHistorial();
        handleAlert();

    }

    return (
        <div className='content dark:border-slate-300/10'>
            <Find clientResponse={clientResponse} setClientResponse={setClientResponse} />

            <div className='client__control content__historial'>

                <Message showAlert={showAlert} tipo={variant} message={message} />

                {description.length > 0 && description.map(descripcion => {
                    return (
                        <div className='button__historial' key={descripcion._id}>
                            <span className='historial__span'>{clientResponse.name + " " + clientResponse.surname + " - " + moment(descripcion.created_at).format('DD-MM-YYYY')}

                            </span>
                            <span className='historial__span'>
                                <FontAwesomeIcon className='historial__icon' icon={faPen} onClick={() => { mostrarModal(descripcion.description, descripcion.created_at, descripcion._id) }} />
                            </span>
                            <span>
                                <FontAwesomeIcon className='historial__icon' icon={faTrash} onClick={() => { eliminarHistorial(descripcion._id) }} />
                            </span>
                        </div>
                    )
                })
                }

            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='dark:bg-slate-800 '>
                    <Modal.Title className='text-2xl dark:text-slate-50'>
                        {clientResponse.name + " " + clientResponse.surname + " - " + moment(fecha).format('DD-MM-YYYY')}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='dark:bg-slate-800 dark:text-slate-300 dark:border-slate-300/10'>
                    <div className=''>
                        <textarea className='textarea__modal shadow-lg w-11/12 py-3 md:py-3 px-6 text-xl font-semibold my-6 mx-3 dark:bg-slate-700 dark:border-none dark:text-slate-300'
                            name="descripcion" id="descripcion" placeholder="Escribe aquí tu texto" defaultValue={descripcion}
                            onChange={(e) => setValueDescription(e.target.value)}
                        ></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer className='dark:bg-slate-800'>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => { actualizarHistorial() }}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default UpdateHistorial