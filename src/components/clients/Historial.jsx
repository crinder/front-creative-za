import React, { useState,useEffect } from 'react'
import Find from './Find';
import Message from '../utils/Message';
import Global from '../../helpers/Global';
import { useAuth } from "../context/AuthContext";

const Historial = () => {

    const [message, setMessage] = useState();
    const [clientResponse, setClientResponse] = useState([]);
    const [description, setDescription] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState();
    const { token, isLoading } = useAuth();

    const handleAlert = () => {
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 5000);

    }

    const guardarHistorial = async (e) => {
        e.preventDefault();

        const params = {
            id_client: clientResponse._id,
            description: description
        }


        const response = await fetch(Global.url + 'client/register-historial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        });

        const data = await response.json();

        if (data.status === 'success') {
            setVariant('Correcto');
            setMessage('Historial guardado');
        } else {
            setVariant('Error');
            setMessage(data.message);
        }

        handleAlert();

    }


    return (
        <div className='content dark:border-slate-300/10'>
            <Find clientResponse={clientResponse} setClientResponse={setClientResponse} />

            <div className='client__control'>

                <Message showAlert={showAlert} tipo={variant} message={message} />

                <form className='form_control' onSubmit={guardarHistorial}>
                    <div className='w-full'>
                        <section className='clients__forms client__historial'>

                            <div className='historial__client'>
                                <textarea className='text__client' name="descripcion" id="descripcion" placeholder="Escribe aquí tu texto" onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <div className='align__div'>
                                <button type="submit" className={showAlert ? 'disabled button-success' : 'button-success'} >Crear</button>
                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Historial