'use client';
import {React, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Popup.css';


/** HOW TO USE: (vean el componente llamado ejemplo.jsx)
 * 1. importan este componente al archvio donde lo usaran
 * 2. en ese archivo crean un useState igual al de la linea 18
 * 3. llaman este componente de primero de la siguente manera:
        <Popop show={show} setShow={setShow}/>
 * ahi lo que hacen es pasar la variable y el "setter" como "parametros" que en react se llaman props, de esa forma el componente puede interactuar 
 * con el componente desde el cual se esta llamando
 */

export const Popup = (props) => {
    // Controla si el popup se muestra o no. Usenlo si quieren que el popup se active con un boton por ejemplo
    //const [show, setShow] = useState(false)

    return <div>
        {
            //aca iria el boton que activaria el boton
            /**EJM:
             * <button onClick={ () => setShow(true)}>
                    texto o simbolo del boton
             * </button>

             * Noten que el onCLick usa setShow, no props.setShow
             * Si lo hacen asi cambien el onClick del primer div para que use setShow y no props.setShow
             * y cambien el props.show por show en la linea 35
             */
        }
        {
            //Si show === true entonces tambien carga el elemento que sigue, si es falso no lo carga
            props.show &&
            <div 
                className='popup-Container'
                onClick={ () => props.setShow(false)}
            > 
                <div 
                    className='popup-Contents'
                    onClick={(e) => e.stopPropagation()}
                > 
                    {
                        /* El onClick del primer div hace que cuando hagan click fuera del contenido, en el backdrop, el popup se cierre.
                         * El onClick del segundo evita detiene el evento del padre, lo que permite que tengan bototnes en el contenido y 
                         * puedan darles click sin que el popup se cierre. 
                         * aca donde esta este comentario ponen el contenido que va adento del popup. Recuerden que todo va "encapsulado"
                         * dentro de un solo elemento, pueden agrupar como en el ejemplo, con <></>, o pueden usar un div
                         * EJM:
                         * <>
                            <h1> Hola desde el Popup</h1>
                            <div style={{backgroundColor: "red", color:"White"}}> 
                                Este fondo es rojo!
                            </div>
                        </>
                         */
                        <>
                            <p> 
                                Digite el ID del grupo al que dese unirse
                            </p>
                            <input className='popup-input' placeholder='Ingrese ID del grupo'/>
                            <div className='popup-buttons'> 
                                <button className='cancel-btn' onClick={() => props.setShow(false)}>
                                    Cancel
                                </button>
                                <button className='accept-btn'>
                                    Continuar
                                </button>
                            </div>
                        </>
                        
                    }
                </div> 
            </div> 
        }
    </div>

}