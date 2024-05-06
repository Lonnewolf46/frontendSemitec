import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css';
import loginimg from '/resources/Semitec_logosuite/semitec_logo_300px_color.png';

const Login = () => {
    return  <div className='flex-container'>
                <div className='bg-size' alt="Imagen azul decorativa en el fondo"/>
                <div className='login-size'>
                    <img className='logo-size' src={loginimg} alt="Logo de SEMITEC" />
                    <text className='login-header'>Iniciar sesión!</text> 
                
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Dirección de correo requerida.';
                                } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                errors.email = 'Dirección de email inválida.';
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
                                <Field type="email" name="email" placeholder="Ingrese su correo electrónico."/>
                                <ErrorMessage name="email" component="div" className='field-error'/> 
                                <text className='login-text'>Contraseña</text>
                                <Field type="password" name="password" placeholder="Ingrese su contraseña."/>
                                <ErrorMessage name="password" component="div" className='field-error'/>
                                <br></br>
                                <button type="submit" disabled={isSubmitting}>
                                    Iniciar Sesión
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
  }

export default Login;


