'use client';
import {React, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Popup } from './Popup';

const ejemplo = () => {

    const [show, setShow] = useState(false)
    //Aca estoy usando un ejemplo con un boton
    //Pero si quieren pueden setear wl valor de show en codigo directamente, en una funcion, un if, lo que sea
    // solo deben ponerlo en true y listo
    return <div> 
        <Popup show={show} setShow={setShow}/>
        <button onClick={() => setShow(true)}>
            Open Popup
        </button>
    </div>
}
export default ejemplo