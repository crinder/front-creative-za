import React from 'react'
import { useLocation } from 'react-router-dom';
import Global from '../../helpers/Global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const HistorialUpd = () => {

    const location = useLocation();
    const { descripcion, cliente, fecha } = location.state;

    return (
        <div className='content dark:border-slate-300/10'>

            <section className='clients__forms client__historial'>

                <FontAwesomeIcon icon={faAngleLeft} className='back-btn' onClick={() => { window.location.href = '/creative-za/historial-clientes' }} />

                <div className='client__control'>
                    <span className="text-4xl font-bold historial__name">{cliente}</span>
                    <span className="text-4xl font-bold historial__fec">{fecha}</span>
                </div>

                <div className='historial__client'>
                    <textarea className='text__client' name="descripcion" id="descripcion" placeholder="Escribe aquí tu texto" defaultValue={descripcion} ></textarea>
                </div>
                
                <div className='align__div'>
                    <button type="submit" className='button-success'>Actualizar</button>
                </div>
            </section>
        </div>
    )
}

export default HistorialUpd