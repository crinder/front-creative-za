import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Detail = () => {

    const location = useLocation();
    const navigate = useNavigate();

    let datos = location.state.datos;
    let clientes = location.state.clientesAct;
    const ind = 'R';
    console.log('Detail paso 1');
    console.log(clientes);
    console.log(datos);

    const regresa = () => {

        navigate('/creative-za/invoice', { state: { ind } });

    }


    return (
        <div className='content dark:border-slate-300/10 dark:text-slate-200'>

            <h2 className='text-4xl font-bold mb-4 dark:text-slate-200'>Asistencias de {clientes && clientes[0].nombre}</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg details__clientes">
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 table__details'>
                    <thead className='text-lg text-gray-800 bg-gray-50 dark:bg-slate-800 dark:text-slate-400'>
                        <tr className="text-center bg-gray-50 dark:bg-slate-800 title__thead">
                            <th className="title__thead">Fecha</th>
                            <th className="title__thead">Monto</th>
                        </tr>
                    </thead>

                    <tbody id="team-member-rows">

                        {datos && datos.map(client => {

                            return (

                                <tr key={client._id} className="text-center dark:text-slate-300 text-xl client-edit">

                                    <td className='team-member-profile px-6 py-2'>
                                        <span className="profile-info">{moment(client.created_at).format('DD-MM-YYYY hh:mm:ss')}</span>
                                    </td>

                                    <td className='team-member-profile px-6 py-2'>
                                        <span className="profile-info">{client.amount}</span>
                                    </td>
                                </tr>

                            )
                        })

                        }

                    </tbody>
                </table>
            </div>

            <div className='div__espacio'>
                <span className="button__span" onClick={regresa}>
                    Regresar
                </span>
            </div>

        </div >
    )
}

export default Detail