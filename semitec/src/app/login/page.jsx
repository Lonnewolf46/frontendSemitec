'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css';
import '../components/button/button.css'

export default function Login() { 
    console.log()
    return  <div className='flex-container'>
                <div className='bg-size' alt="Imagen azul decorativa en el fondo">
                    <div className='details-container'>
                        <text className='login-left-side-header'>SEMITEC</text>
                        <text className='login-left-side-text'>Sistema de enseñanza de la mecanografía</text>
                        <text className='login-left-side-text'>para personas con discapacidad visual. </text>
                        <text className='login-left-side-text'>Con excelencia en mente, del TEC para </text>
                        <text className='login-left-side-text'>Costa Rica. </text>
                    </div>
                </div>
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
                                    <ErrorMessage className='error-message' name="email" component="div"/> 
                                    <text className='login-text'>Contraseña</text>
                                    <Field className='form-control' type="password" name="password" placeholder="Ingrese su contraseña."/>
                                    <ErrorMessage className='error-message' name="password" component="div"/>
                                    <br></br>
                                    <button type="submit" className="button" disabled={isSubmitting}>
                                        Iniciar Sesión
                                    </button>
                                    <div className='anchor-and-text-container'> 
                                        <text className='reg-text'>¿Aún no tiene cuenta? </text> 
                                        <text className='reg-text'>  </text> 
                                        <a href="">Registrarse</a>
                                    </div>
                                    <div className='anchor-container'>
                                        <a href="">Ingresar como invitado</a>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
}

