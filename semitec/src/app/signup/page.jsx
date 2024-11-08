'use client';
import {React, useState, useEffect, use} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from "next/navigation";
import './Signup.css';
import '../components/button/button.css'
import { number } from 'yup';

export default function SignUp() {
  const router = useRouter();
  const [stage, setSignUpStage] = useState(1)
  const [userTypes, setUserTypes] = useState([])
  const [countries, setCountries] = useState([])
  const [provinces, setProvinces] = useState([])
  const [cantons, setCantons] = useState([])
  const [districts, setDistricts] = useState([])
  const [educationLevels, setEducationLevels] = useState([])
  const [institutions, setInstitutions] = useState([])
  const [selectedUserType, setSelectedUserType] = useState()
  const [selectedCountry, setSelectedCountry] = useState()
  const [selectedProvince, setSelectedProvince] = useState()
  const [selectedCanton, setSelectedCanton] = useState()
  const [selectedDistrict, setSelectedDistrict] = useState()
  const [selectedInstitution, setSelectedInstitution] = useState() 
  const [selectedEducationLevel, setSelectedEducationLevel] = useState() 

  const signupTutor = async (credentials) => {
    let { country, province, canton,...updated_data } = credentials;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/register-teacher`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify
            ({
              user_type_id: updated_data.user_type,
              institution_id: updated_data.institution,
              district_id: updated_data.district,
              name: updated_data.fullname,
              password: updated_data.password,
              email: updated_data.email,
              other_signs: updated_data.other_signs
          }) 
          })
          const data = await response.json()

    } catch (error){
        console.log(error)
    }
  }

  const signupStudent = async (credentials) => {
    let { country, province, canton,...updated_data } = credentials;
    console.log("student")
    {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/register-student`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify
            ({
              user_type_id: updated_data.user_type,
              institution_id: updated_data.institution,
              district_id: updated_data.district,
              name: updated_data.fullname,
              password: updated_data.password,
              email: updated_data.email,
              other_signs: updated_data.other_signs,
              education_level_id: updated_data.education_level,
              date_birth: updated_data.birth_date.toString()
          }) 
          })
          const data = await response.json()
          console.log(data)

    } catch (error){
        console.log(error)
    }}
}

  const getCountries = () => {
    const response = fetch(`${process.env.NEXT_PUBLIC_API_HOST}/countries`)
    return response
    /*
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/countries`);
      if (!response.ok) {
        throw new Error(
          `Unable to Fetch Data.`
        );
      }
		  return await response.json();
    }  
    catch (error) {
      console.error('Some Error Occured:', error);
    }*/
  };

  const getProvinces= async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/provinces?country_id=${selectedCountry}`); 
    if (!response.ok) {
      throw new Error(
        `Unable to Fetch Data.`
      );
    }
    return response
  };

  const getCantons = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/cantons?province_id=${selectedProvince}`); 
    if (!response.ok) {
      throw new Error(
        `Unable to Fetch Data.`
      );
    }
    return response
  };

  const getDistricts = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/districts?canton_id=${selectedCanton}`); 
    if (!response.ok) {
      throw new Error(
        `Unable to Fetch Data.`
      );
    }
    return response
  };

  const getInstitutions = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/institutions?country_id=${selectedCountry}`); 
    if (!response.ok) {
      throw new Error(
        `Unable to Fetch Data.`
      );
    }
    return response
  };

  const getUserTypes = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/account-type`); 
    if (!response.ok) {
      throw new Error(
        `Unable to Fetch Data.`
      );
    }
    return response
  };

  const getEducationLevels = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/education-levels`); 
    if (!response.ok) {
      throw new Error(
        `Unable to Fetch Data.`
      );
    }
    return response
  };

  useEffect( () => {
    getUserTypes()
    .then( (res) => res.json())
    .then(data => setUserTypes(data))          
    .catch( (err) => {
      throw new Error(
        `Unable to Fetch Data from User Types.`
      )
    })
    
  } , [])

  useEffect(() => {
    getCountries()
    .then( (res) => res.json())
    .then(data => setCountries(data))          
    .catch( (err) => {
      throw new Error(
        `Unable to Fetch Data from Countries.`
      )
    })
    
  }, [])

  useEffect(() => {
    if (selectedCountry){
      getProvinces()
      .then( (res) => res.json())
      .then(data => setProvinces(data))          
      .catch( (err) => {
        throw new Error(
          `Unable to Fetch Data from Provinces.`
        )
      })
    }
  }, [selectedCountry])

  useEffect(() => {
    if (selectedProvince){
      getCantons()
      .then( (res) => res.json())
      .then(data => setCantons(data))          
      .catch( (err) => {
        throw new Error(
          `Unable to Fetch Data from Cantons.`
        )
      })
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedCanton){
      getDistricts()
      .then( (res) => res.json())
      .then(data => setDistricts(data))          
      .catch( (err) => {
        throw new Error(
          `Unable to Fetch Data from Districts.`
        )
      })
    }
  }, [selectedCanton])

  useEffect(() => {
    if (selectedDistrict){
      getInstitutions()
      .then( (res) => res.json())
      .then(data => setInstitutions(data))          
      .catch( (err) => {
        throw new Error(
          `Unable to Fetch Data from Institutions.`
        )
      })
    }
  }, [selectedDistrict])

  useEffect(() => {
    getEducationLevels()
    .then( (res) => res.json())
    .then(data => setEducationLevels(data))          
    .catch( (err) => {
      throw new Error(
        `Unable to Fetch Data from Education Levels.`
      )
    })
    
  }, [])
  

  return (

  <div className='signup'>
    <div>
            <div className='logo-img'/>

            <Formik 
              initialValues={{fullname: '',  email: '', password: '', user_type: '', country:'', province:'', canton:'', district: '', other_signs: '', education_level: '', institution:''}}
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

                if (!values.fullname) {
                  errors.fullname = 'Nombre requerido.';
                } 

                if (!values.user_type) {
                  errors.user_type = 'Tipo de usuario requerido.';
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

                if (!values.district) {
                  errors.district = 'Distrito requerido.';
                } 

                if (!values.other_signs) {
                  errors.other_signs = 'Otras señas requeridas.';
                } 

                if (!values.education_level) {
                  errors.education_level = 'Nivel de educación requerido.';
                } 

                if (!values.institution) {
                  errors.institution = 'Institución requerida.';
                } 
                
                return errors;
              }}
              onSubmit={(values) => {
                                      console.log(values)
                                      {
                                        selectedUserType==1?
                                        signupStudent(values):
                                        signupTutor(values)
                                      }
                                      setSignUpStage(stage+1)
                                  }}
              >
              
              {({ submitForm, setFieldValue }) => (
                <Form>
                  <div className={stage === 1 ? 'personal' : 'hidden'}>
                      <div className='signup-header'>Registrarme (Paso 1 de 3)</div>
                        <text className='login-text'>Nombre</text>
                        <Field className="form-styling" type ="fullname" name="fullname" placeholder = "Ingrese su nombre." />
                        <ErrorMessage className='error-message' name="fullname" component="div"/> 
                        <br></br>
                        <br></br>
                        <text className='login-text'>Correo</text>
                        <Field className="form-styling" type="email" name="email" placeholder="Ingrese su correo."/>
                        <ErrorMessage className='error-message' name="email" component="div"/> 
                        <br></br>
                        <br></br>
                        <text className='login-text'>Contraseña</text>
                        <Field className="form-styling" type="password" name="password" placeholder="Ingrese su nueva contraseña."/>
                        <ErrorMessage className='error-message' name="password" component="div"/>
                        <br></br>
                        <br></br>
                        <text className='login-text'>Soy</text>
                        <Field as="select" className="form-styling" type="user_type" name="user_type" onChange={(e)=>{setSelectedUserType(e.target.value); setFieldValue("user_type", (e.target.value))}}>
                        <option>Seleccione un tipo de cuenta.</option>
                        {
                          userTypes && Array.isArray(userTypes)? 

                              userTypes.map( 
                                (user_type) => {
                                  return <option value={user_type.user_type_id}>
                                    {user_type.user_type_name}
                                    </option>}
                              )
                              :
                              <></>
                        }
                        </Field>
                        <ErrorMessage className='error-message' name="user_type" component="div"/>
                        <br></br>
                        <br></br>

                        {
                          selectedUserType && selectedUserType==1?
                          <>
                          <text className='login-text'>Fecha de nacimiento</text>
                          <Field className="form-styling" type ="birth_date" name="birth_date" placeholder = "Formato: dia.mes.año" />
                          <ErrorMessage className='error-message' name="birth_date" component="div"/>
                          </>:
                          <></>
                        }

                        <div className='buttons-container'>
                          <a className="anchor-button" href={'/login'}> Volver </a>
                          <button className="button" onClick={() => setSignUpStage(stage+1)}> Siguiente </button>
                        </div>
                  </div>

                  <div className={stage === 2 ? 'location' : 'hidden'}>
                    <div className='signup-header'>Registrarme (Paso 2 de 3)</div>
                    <text className='login-text'>País</text>
                    <Field as="select" className="form-styling" type="country" name="country" onChange={(e)=>{setSelectedCountry(e.target.value); setFieldValue("country", (e.target.value))}} >
                      <option>Seleccione un país.</option>
                      {
                        countries && Array.isArray(countries)? 

                            countries.map( 
                              (country) => {
                                return <option value={country.country_id}>
                                  {country.name}
                                  </option>}
                            )
                            :
                            <></>
                      }
                    </Field>
                    <ErrorMessage className='error-message' name="country" component="div"/>
                    <br></br>
                    <br></br>
                    {
                      selectedCountry &&
                      <>
                        <text className='login-text'>Provincia</text>
                        <Field as="select" className="form-styling" type="province" name="province" onChange={(e)=>{setSelectedProvince(e.target.value); setFieldValue("province", (e.target.value))}}>
                        <option>Seleccione una provincia.</option>
                          {
                            provinces && Array.isArray(provinces)? 
                                provinces.map( 
                                  (province) => {
                                    return <option value={province.province_id}>
                                      {province.name}
                                      </option>}
                                )
                                :
                                <></>
                          }
                        </Field>
                        <ErrorMessage className='error-message' name="province" component="div"/>
                      </>
                      
                    }
                    
                    <br></br>
                    <br></br>

                    {
                    selectedProvince &&
                    <>
                      <text className='login-text'>Cantón</text>
                      <Field as="select" className="form-styling" type="canton" name="canton" onChange={(e)=>{setSelectedCanton(e.target.value); setFieldValue("canton", (e.target.value))}}>
                        <option>Seleccione un cantón.</option>
                          {
                            cantons && Array.isArray(cantons)? 
                                cantons.map( 
                                  (canton) => {
                                    return <option value={canton.canton_id}>
                                      {canton.name}
                                      </option>}
                                )
                                :
                                <></>
                          }
                      </Field>
                      <ErrorMessage className='error-message' name="canton" component="div"/>
                    </>
                    }
                    
                    <br></br>
                    <br></br>

                    {
                      selectedCanton &&
                      <>
                      <text className='login-text'>Distrito</text>
                    <Field as="select" className="form-styling" type="district" name="district" onChange={(e)=>{setSelectedDistrict(e.target.value); setFieldValue("district", (e.target.value))}}>
                      <option>Seleccione un distrito.</option>
                      {
                            districts && Array.isArray(districts)? 
                                districts.map( 
                                  (district) => {
                                    return <option value={district.district_id}>
                                      {district.name}
                                      </option>}
                                )
                                :
                                <></>
                          }
                    </Field>
                    <ErrorMessage className='error-message' name="district" component="div"/>
                      </>
                    }
                    
                    <br></br>
                    <br></br>

                    {
                      selectedDistrict &&
                      <>
                        <text className='login-text'>Otras señas</text>
                        <Field className="form-styling" type ="other_signs" name="other_signs" placeholder = "Digite otras señas de ubicación." />
                        <ErrorMessage className='error-message' name="other_signs" component="div"/>
                      </>
                    }

                    <div className='buttons-container'>
                          <a className="anchor-button" href={'/login'}> Volver </a>
                          <button className="button" onClick={() => setSignUpStage(stage+1)}> Siguiente </button>
                      </div>
                    </div>

                    <div className={stage === 3 ? 'academia' : 'hidden'}>
                    <div className='signup-header'>Registrarme (Paso 3 de 3)</div>
                    <text className='login-text'>Nivel Académico</text>
                    <Field as="select" className="form-styling" type="education_level" name="education_level" onChange={(e)=>{setSelectedEducationLevel(e.target.value); setFieldValue("education_level", (e.target.value))}}>
                      <option>Seleccione un nivel académico.</option>
                      {
                            educationLevels && Array.isArray(educationLevels)? 
                                educationLevels.map( 
                                  (education_level) => {
                                    return <option value={education_level.education_level_id}>
                                      {education_level.name}
                                      </option>}
                                )
                                :
                                <></>
                        }
                    </Field>
                    <ErrorMessage className='error-message' name="education_level" component="div"/>
                    <br></br>
                    <br></br>
                    
                    <text className='login-text'>Institución</text>
                      <Field as="select" className="form-styling" type="institution" name="institution" onChange={(e)=>{setSelectedInstitution(e.target.value); setFieldValue("institution", (e.target.value))}}>
                        <option>Seleccione una institución.</option>
                        {
                            institutions && Array.isArray(institutions)? 
                                institutions.map( 
                                  (institution) => {
                                    return <option value={institution.institution_id}>
                                      {institution.name}
                                      </option>}
                                )
                                :
                                <></>
                        }
                      </Field>
                      <ErrorMessage className='error-message' name="institution" component="div"/>

                    <br></br>
                    <br></br>
                    <div className='buttons-container'>
                      <button className="button" type="button" onClick={() => setSignUpStage(stage-1)}> Volver </button>
                      <button className="button" type="submit"> Registrarme </button>
                    </div>
                    
                  </div>

                  <div className={stage === 4 ? 'academia' : 'hidden'}>
                      <div className='welcome-header'>¡Ahora sos parte de SEMITEC!</div>
                      <div className='welcome-text'>Iniciá sesión para empezar a aprender</div>
                      <div className='wave-img' aria-description='Imagen de un perro saludando.'/>
                      <a className="final-anchor-button" href={'/login'}> Continuar </a>
                  </div>
                </Form>
              )}
            </Formik>
    </div>
  </div>
  );
}