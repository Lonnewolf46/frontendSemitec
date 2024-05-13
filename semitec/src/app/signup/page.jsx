'use client';
import {React, useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { customSelectSchema } from "../schemas";
import './Signup.css';
import '../components/button/button.css'

export default function SignUp() {

  const [stage, setSignUpStage] = useState(1)
  const test = true

  const [userTypeOptions, setUserTypeOptions] = useState([])

  useEffect( () => {
      //call AP
      const userTypes = [{user_type_id: 0, name:"Tipo de usuario"}, {user_type_id: 1, name:"Estudiante"}, {user_type_id: 2, name:"Tutor"}]
      setUserTypeOptions(userTypes)
  } , [])

  const signup = async (credentials) => {
    let { country, province, canton, institution_id,...updated_data } = credentials;
    updated_data.district_id = 1;
    console.log(updated_data)
    try {
        const response = await fetch('http://25.37.76.172:5000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updated_data)
          })
          const data = await response.json()
          console.log(data)

    } catch (error){
        console.log(error)
    }
  }

  const getCountries = async() => {
    try {
      const response = await fetch("http://localhost:5000/countries");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProvinces= async() => {
    try {
      const response = await fetch("http://localhost:5000/provinces?country_id=1");
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCantons = async() => {
    try {
      const response = await fetch("http://server-ip:3000/cantons?province_id=3");
      const data = await response.json();
      setCantons(data);
    } catch (error) {
      console.log(error);
    }
  };
 
  const getInstitutions = async() => {
    try {
      const response = await fetch("http://server-ip:3000/institutions?country_id=1");
      const data = await response.json();
      setInstitutions(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (

  <div className='signup'>
    <div>
            <div className='logo-img'/>

            <Formik 
              initialValues={{ email: '', password: '', user_type_id: '', country:'', province:'', canton:'', institution_id:'', name: ''}}
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

                if (!values.name) {
                  errors.name = 'Nombre requerido.';
                } 

                if (!values.user_type_id) {
                  errors.user_type_id = 'Tipo de usuario requerido.';
                } 

                if (!values.country) {
                  errors.country = 'País requerido.';
                } 

                if (!values.province) {
                  errors.province = 'Provincia requerida.';
                } 

                if (!values.canton) {
                  errors.canton = 'Cantón requerido.';
                } 

                if (!values.institution_id) {
                  errors.institution_id = 'Institución requerida.';
                } 
                
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                                      signup(values)
                                      setSignUpStage(stage+1)
                                  }}
              >
              
              {({ isSubmitting }) => (
                <Form>
                  <div className={stage === 1 ? 'personal' : 'hidden'}>
                      <div className='signup-header'>Registrarme (Paso 1 de 2)</div>
                        <text className='login-text'>Nombre</text>
                        <br></br>
                        <Field width="100" type ="name" name="name" placeholder = "Ingrese su nombre." />
                        <ErrorMessage className='error-message' name="name" component="div"/> 
                        <br></br>
                        <br></br>
                        <text className='login-text'>Correo</text>
                        <br></br>
                        <Field className='form-control' type="email" name="email" placeholder="Ingrese su correo."/>
                        <ErrorMessage className='error-message' name="email" component="div"/> 
                        <br></br>
                        <br></br>
                        <text className='login-text'>Contraseña</text>
                        <br></br>
                        <Field className='form-control' type="password" name="password" placeholder="Ingrese su nueva contraseña."/>
                        <ErrorMessage className='error-message' name="password" component="div"/>
                        <br></br>
                        <br></br>
                        <text className='login-text'>Soy</text>
                        <br></br>
                        <Field as="select" className='form-control' type="user_type_id" name="user_type_id">
                          <option>Seleccione un tipo de usuario.</option>
                          <option value="1">Estudiante</option>
                          <option value="2">Tutor</option>
                        </Field>
                        <ErrorMessage className='error-message' name="user_type_id" component="div"/>
                        <br></br>
                        <br></br>
                        <div className='buttons-container'>
                          <a className="anchor-button" href={'/login'}> Volver </a>
                          <button className="button" onClick={() => setSignUpStage(stage+1)}> Siguiente </button>
                        </div>
                  </div>

                  <div className={stage === 2 ? 'personal' : 'hidden'}>
                    <div className='signup-header'>Registrarme (Paso 2 de 2)</div>
                    <text className='login-text'>País</text>
                    <Field as="select" className='form-control' type="country" name="country">
                      <option>Seleccione un país.</option>
                      <option value="1">Costa Rica</option>
                    </Field>
                    <ErrorMessage className='error-message' name="country" component="div"/>
                    <br></br>
                    <br></br>
                    <text className='login-text'>Provincia</text>
                    <Field as="select" className='form-control' type="province" name="province">
                      <option>Seleccione una provincia.</option>
                      <option value="1">San José</option>
                      <option value="2">Alajuela</option>
                      <option value="3">Cartago</option>
                      <option value="4">Heredia</option>
                      <option value="5">Guanacaste</option>
                      <option value="6">Puntareas</option>
                      <option value="7">Limón</option>
                    </Field>
                    <ErrorMessage className='error-message' name="province" component="div"/>
                    <br></br>
                    <br></br>
                    <text className='login-text'>Cantón</text>
                    <Field as="select" className='form-control' type="canton" name="canton">
                      <option>Seleccione un cantón.</option>
                      <option value="1">Alvarado</option>
                      <option value="2">Cartago</option>
                      <option value="3">El Guarco</option>
                      <option value="4">Jiménez</option>
                      <option value="5">La Unión</option>
                      <option value="6">Oreamuno</option>
                      <option value="7">Paraíso</option>
                      <option value="7">Turrialba</option>
                    </Field>
                    <ErrorMessage className='error-message' name="canton" component="div"/>
                    <br></br>
                    <br></br>
                    <text className='login-text'>Institución</text>
                    <Field as="select" className='form-control' type="institution_id" name="institution_id">
                      <option>Seleccione una institución.</option>
                      <option value="1">Escuela Padre Peralta</option>
                      <option value="2">Escuela de los Angeles</option>
                      <option value="3">Escuela Nuestra Señora de Fátima</option>
                      <option value="4">Escuela de Quircot</option>
                      <option value="5">Escuela el Bosque</option>
                      <option value="6">Colegio San Luis Gonzaga</option>
                    </Field>
                    <ErrorMessage className='error-message' name="institution_id" component="div"/>
                    <br></br>
                    <br></br>
                    <div className='buttons-container'>
                      <button className="button" onClick={() => setSignUpStage(stage-1)}> Volver </button>
                      <button className="button" type="submit" disabled={isSubmitting}>
                                                Registrarme
                      </button>
                    </div>
                  </div>

                  <div className={stage === 3 ? 'personal' : 'hidden'}>
                      <div className='welcome-header'>¡Ahora sos parte de SEMITEC!</div>
                      <div className='welcome-text'>Iniciá sesión para empezar a aprender</div>
                      <div className='wave-img'/>
                      <a className="final-anchor-button" href={'/login'}> Continuar </a>
                  </div>
                </Form>
              )}
            </Formik>
    </div>
  </div>
  );
}