'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css';
import '../components/button/button.css'

export default function Login() { 
    console.log()
    return  <div className='flex-container'>
                <div className='bg-size' alt="Imagen azul decorativa en el fondo"/>
                <div className='login-size'>
                    <div className='logo-img'/>
                    <div className='login-right-side'>
                        <text className='login-header'>Iniciar sesión</text> 
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Correo requerido.';
                                    } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                    errors.email = 'Correo inválido.';
                                    }

                                if (!values.password) {
                                    errors.password = 'Contraseña requerida.';
                                } 
                                
                                return errors;
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                                }, 400);
                            }}
                            >
                            {({ isSubmitting }) => (
                                <Form>
                                    <text className='login-text'>Correo</text>
                                    <Field className='form-control' type="email" name="email" placeholder="Ingrese su correo."/>
                                    <ErrorMessage name="email" component="div" className='field-error'/> 
                                    <text className='login-text'>Contraseña</text>
                                    <Field className='form-control' type="password" name="password" placeholder="Ingrese su contraseña."/>
                                    <ErrorMessage name="password" component="div" className='field-error'/>
                                    <br></br>
                                    <button type="submit" className="button" disabled={isSubmitting}>
                                        Iniciar Sesión
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
}

