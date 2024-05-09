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
      const userTypes = [{user_type_id: 1, name:"Estudiante"}, {user_type_id: 2, name:"Tutor"}]
      setUserTypeOptions(userTypes)
  } , [])
 
  return (
    <main>
      <h1>Registro</h1>

      <Formik 
        initialValues={{ name: '', email: '', password: '', user_type: ''}}
        validationSchema={customSelectSchema}

        onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                  console.log(values)
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                                }, 400);
                            }}
        >
        
        {({ isSubmitting }) => (
          <Form>
            <div className={stage === 1 ? 'personal' : 'hidden'}>
              <text className='login-text'>Nombre</text>
              <Field className = 'form-control' type ="name" name="name" placeholder = "Ingrese su nombre." />
              <ErrorMessage className='error-message' name="name" component="div"/> 

              <text className='login-text'>Correo</text>
              <Field className='form-control' type="email" name="email" placeholder="Ingrese su correo."/>
              <ErrorMessage className='error-message' name="email" component="div"/> 

              <text className='login-text'>Contraseña</text>
              <Field className='form-control' type="password" name="password" placeholder="Ingrese su nueva contraseña."/>
              <ErrorMessage className='error-message' name="password" component="div"/>
             
              <text className='login-text'>Soy</text>
              <Field as="select" className='form-control' type="user_type" name="user_type">
                {
                  userTypeOptions && 
                  userTypeOptions.map( (userType) => {
                        return <option 
                                value={userType.user_type_id} 
                                label={userType.name}>
                                    {userType.name}
                               </option>
                  } )
                }
              </Field>

              <ErrorMessage className='error-message' name="user_type" component="div"/>
              <div><a href={'/login'}> Volver </a></div>
              <button onClick={() => setSignUpStage(stage+1)}> Siguiente </button>
              
            </div>
            <div className={stage === 2 ? 'personal' : 'hidden'}>
                Holi :P
                <button onClick={() => setSignUpStage(stage+1)}> Siguiente </button>
            </div>
            <div className={stage === 2 ? 'personal' : 'hidden'}>
                Welcome!
                <button onClick={() => setSignUpStage(stage+1)}> Siguiente </button>
            </div>
          </Form>
        )}
      </Formik>
      
    </main>
  );
}