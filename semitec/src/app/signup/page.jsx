'use client';
import {React, useState, useEffect, use, useRef} from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { useRouter } from "next/navigation";
import './Signup.css';
import doggo from "@/app/ui/semitec-doggo.gif";
import '../components/button/button.css'
import Image from "next/image"

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
  const [selectedUserType, setSelectedUserType] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedCanton, setSelectedCanton] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedInstitution, setSelectedInstitution] = useState(null) 
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null) 
  const [selectedBirthDate, setBirthDate] = useState(null)

  const handleDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  const maxDate = () => {
    const today = new Date().toISOString().split('T')[0];
    return today
  }

  const signupTutor = async (credentials) => {
    let { country, province, canton,...updated_data } = credentials;
    console.log(updated_data.user_type,updated_data.institution,updated_data.district,updated_data.fullname,updated_data.password,updated_data.email,updated_data.other_signs)
    
    console.log(updated_data.district, selectedDistrict)
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
              district_id: selectedDistrict,
              name: updated_data.fullname,
              password: updated_data.password,
              email: updated_data.email,
              other_signs: updated_data.other_signs
          }) 
          })
          const data = await response.json()
          setSignUpStage(4)
    } catch (error){
        console.log(error)
        setSignUpStage(5)
    }
  }

  const signupStudent = async (credentials) => {
    let { country, province, canton,...updated_data } = credentials;
    console.log(selectedBirthDate)
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
              district_id: selectedDistrict,
              name: updated_data.fullname,
              password: updated_data.password,
              email: updated_data.email,
              other_signs: updated_data.other_signs,
              education_level_id: updated_data.education_level,
              date_birth: selectedBirthDate
          }) 
          })
          const data = await response.json()
          console.log(data)
          setSignUpStage(4)
        } catch (error){
            console.log(error)
            setSignUpStage(5)
}}}

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

  const validateDate = () => {
    if(selectedUserType && selectedUserType == 1){
      return !!selectedBirthDate
    }else{
      return !!selectedUserType
    }
  }

  const checkLocations = (otherSigns) => {
    console.log('checking')
    console.log(otherSigns)
    /*if (selectedCountry && selectedProvince && selectedCanton && selectedDistrict && values.other_signs !== ''){
      console.log('is valid')
      return true
    }else{
      console.log('not valid')
      return false
    }*/
  }

  const validateStage1 = (values) => {
    const errors = {};
    {   
        if (!values.email) {
        errors.email = 'Correo requerido.';
        } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
        errors.email = 'Correo inválido.';
        } else if (
        (values.email).length > 32
        ) {
        errors.email = 'Máximo de caracteres excedido, ingresá un correo más corto.';
        }

        if (!values.password) {
            errors.password = 'Contraseña requerida.';
          } else if(
            (values.password).length > 15
          ){ 
          errors.password = 'Máximo de caracteres excedido.'
        } 

        if (!values.fullname) {
          errors.fullname = 'Nombre requerido.';
        } else if(
          (values.fullname).length > 48
        ){ 
        errors.fullname = 'Máximo de caracteres excedido.'
        } 

        if (!values.user_type) {
          errors.user_type = 'Tipo de usuario requerido.';
        } 
        return errors;
      }
  }

  const validateStage2 = (values) => {
    const errors = {};
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
      } else if(
        (values.other_signs).length > 500
      ){ 
      errors.other_signs = 'Máximo de caracteres excedido, por favor se más breve.'
      } 
      return errors;
  }

  const validateStage3 = (values) => {
    const errors = {};
    if (!values.education_level) {
      errors.education_level = 'Nivel de educación requerido.';
    } 

    if (!values.institution) {
      errors.institution = 'Institución requerida.';
    } 
    return errors;
  }

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
      .then(data => {
        setProvinces(data)
        setCantons(null)
        setDistricts(null)
      })          
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
      .then(data => {
        setCantons(data)
        setDistricts(null)
      })          
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
              validateOnMount={true}
              enableReinitialize={false}
              initialValues={{fullname: '',  email: '', password: '', user_type: '', country:'', province:'', canton:'', district: '', other_signs: '', education_level: '', institution:''}}
              validate={(values) => {
                let errors = {};
                switch (stage) {
                  case 1:
                    errors = validateStage1(values);
                    break;
                  case 2:
                    errors = validateStage2(values);
                    break;
                  case 3:
                    errors = validateStage3(values);
                    break;
                }
                return errors;
              }}
              onSubmit={(values) => {
                                      {
                                        selectedUserType==1?
                                        signupStudent(values):
                                        signupTutor(values)
                                      }
                                  }}
              >
              
              {({ submitForm, setFieldValue, isValid, validateForm }) => (
                <Form>
                  <div className={stage === 1 ? 'personal' : 'hidden'}>
                      <h1 className='signup-header'>Registrarme (Paso 1 de 3)</h1>
                        <h2 className='login-text'>Nombre</h2>
                        <Field className="form-styling" type ="fullname" name="fullname" placeholder = "Ingrese su nombre." />
                        <ErrorMessage className='error-message' name="fullname" component="div"/> 
                        <br></br>
                        <br></br>
                        <h2 className='login-text'>Correo</h2>
                        <Field className="form-styling" type="email" name="email" placeholder="Ingrese su correo."/>
                        <ErrorMessage className='error-message' name="email" component="div"/> 
                        <br></br>
                        <br></br>
                        <h2 className='login-text'>Contraseña</h2>
                        <Field className="form-styling" type="password" name="password" placeholder="Ingrese su nueva contraseña."/>
                        <ErrorMessage className='error-message' name="password" component="div"/>
                        <br></br>
                        <br></br>
                        <h2 className='login-text'>Soy</h2>
                        <Field as="select" className="form-styling" type="user_type" name="user_type" onChange={(e)=>{setSelectedUserType(e.target.value); setFieldValue("user_type", (e.target.value))}}>
                        <option>Seleccione un tipo de cuenta.</option>
                        {
                          userTypes && Array.isArray(userTypes)? 

                              userTypes.map( 
                                (user_type) => {
                                  return <option key={user_type.user_type_id} value={user_type.user_type_id}>
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
                          <h2 className='login-text'>Fecha de nacimiento</h2>
                            <input
                                className='datePicker'
                                type="date"
                                id="birth_date"
                                name="birth_date"
                                min="1930-01-01"
                                max={maxDate()}
                                onChange={handleDateChange}
                                required 
                            />
                          <ErrorMessage className='error-message' name="birth_date" component="div"/>
                          </>
                          :
                          <></>
                        } 
 
                        <div className='buttons-container'>
                          <a className="anchor-button" href={'/login'}> Volver </a>
                          <button type='button' className="button" disabled={!(isValid && validateDate())} onClick={() => setSignUpStage(2)}> Siguiente </button>
                        </div>
                  </div>

                  <div className={stage === 2 ? 'location' : 'hidden'}>
                    <h1 className='signup-header'>Registrarme (Paso 2 de 3)</h1>
                    <h2 className='login-text'>País</h2>
                    <Field as="select" 
                      className="form-styling" 
                      type="country"
                      name="country" 
                      onChange={(e)=>{
                        setSelectedCountry(e.target.value); 
                        setFieldValue("country", (e.target.value));
                        setFieldValue("province", 0);
                        setFieldValue("other_signs", (""))
                      }} >
                      <option value={0}>Seleccione un país.</option>
                      {
                        countries && Array.isArray(countries)? 

                            countries.map( 
                              (country) => {
                                return <option key={country.country_id} value={country.country_id}>
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
                        <h2 className='login-text'>Provincia</h2>
                        <Field as="select" className="form-styling" type="province" name="province" 
                          onChange={(e)=>{
                            setSelectedProvince(e.target.value); 
                            setFieldValue("province", (e.target.value));
                            setFieldValue("canton", 0);
                            setFieldValue("other_signs", (""))
                          }}>
                        <option value={0}>Seleccione una provincia.</option>
                          {
                            provinces && Array.isArray(provinces)? 
                                provinces.map( 
                                  (province) => {
                                    return <option key={province.province_id} value={province.province_id}>
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
                      <h2 className='login-text'>Cantón</h2>
                      <Field as="select" className="form-styling" type="canton" name="canton" onChange={(e)=>
                      {
                        setSelectedCanton(e.target.value); 
                        setFieldValue("canton", (e.target.value));
                        setFieldValue("district", 0);
                        setFieldValue("other_signs", (""))
                      }}>
                        <option value={0}>Seleccione un cantón.</option>
                          {
                            cantons && Array.isArray(cantons)? 
                                cantons.map( 
                                  (canton) => {
                                    return <option key={canton.canton_id} value={canton.canton_id}>
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
                      <h2 className='login-text'>Distrito</h2>
                    <Field as="select" className="form-styling" type="district" name="district" onChange={(e)=>{
                      setSelectedDistrict(e.target.value); 
                      setFieldValue("district", (e.target.value));
                      setFieldValue("other_signs", (""))
                      }}>
                      <option>Seleccione un distrito.</option>
                      {
                            districts && Array.isArray(districts)? 
                                districts.map( 
                                  (district) => {
                                    return <option key={district.district_id} value={district.district_id}>
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
                        <h2 className='login-text'>Otras señas</h2>
                        <Field className="form-styling" type ="other_signs" name="other_signs" placeholder = "Digite otras señas de ubicación." />
                        <ErrorMessage className='error-message' name="other_signs" component="div"/>
                      </>
                    }

                    <div className='buttons-container'>
                          <button type='button' className="button" onClick={() => setSignUpStage(1)}> Volver </button>
                          <button type='button' 
                          className="button" 
                          disabled={!isValid} 
                          onClick={async () => {
                            try {
                              // Manually trigger validation
                              const formErrors = await validateForm(); // Trigger form validation
                        
                              console.log('Validation errors from validateForm:', formErrors);
                        
                              // If no errors, proceed to the next stage
                              if (Object.keys(formErrors).length === 0) {
                                setSignUpStage((prev) => prev + 1);  // Proceed to the next stage
                              } else {
                                // Validation failed, show errors in the console (or log)
                                console.log('Validation errors found:', formErrors);
                              }
                            } catch (err) {
                              console.error('Error during form validation:', err);
                            }
                          }}> 
                          Siguiente 
                          </button>
                      </div>
                    </div>

                    <div className={stage === 3 ? 'academia' : 'hidden'}>
                    <h1 className='signup-header'>Registrarme (Paso 3 de 3)</h1>
                    <h2 className='login-text'>Nivel Académico</h2>
                    <Field as="select" className="form-styling" type="education_level" name="education_level" onChange={(e)=>{setSelectedEducationLevel(e.target.value); setFieldValue("education_level", (e.target.value))}}>
                      <option>Seleccione un nivel académico.</option>
                      {
                            educationLevels && Array.isArray(educationLevels)? 
                                educationLevels.map( 
                                  (education_level) => {
                                    return <option key={education_level.education_level_id} value={education_level.education_level_id}>
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
                    
                    <h2 className='login-text'>Institución</h2>
                      <Field as="select" className="form-styling" type="institution" name="institution" onChange={(e)=>{setSelectedInstitution(e.target.value); setFieldValue("institution", (e.target.value))}}>
                        <option>Seleccione una institución.</option>
                        {
                            institutions && Array.isArray(institutions)? 
                                institutions.map( 
                                  (institution) => {
                                    return <option key={institution.institution_id} value={institution.institution_id}>
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
                      <button className="button" type="button" onClick={() => setSignUpStage(2)}> Volver </button>
                      <button className="button" type="submit"> Registrarme </button>
                    </div>
                    
                  </div>

                  <div className={stage === 4 ? 'academia' : 'hidden'}>
                      <h1 className='welcome-header'>¡Ahora sos parte de SEMITEC!</h1>
                      <h2 className='welcome-text'>Iniciá sesión para empezar a aprender</h2>
                      <div>
                        <Image 
                          width={232} 
                          height={189} 
                          src={doggo} 
                          className="doggo"
                          alt="La mascota de semitec, un perro guía, dandote la bienvenida!" />
                      </div>
                      <a className="final-anchor-button" href={'/login'}> Continuar </a>
                  </div>

                  <div className={stage === 5 ? 'academia' : 'hidden'}>
                      <h1 className='welcome-header'>¡Oh, no!</h1>
                      <h2 className='welcome-text'>Algo salió mal. Por favor intentá de nuevo.</h2>
                      <div>
                      <Image 
                          width={232} 
                          height={189} 
                          src={doggo} 
                          className="doggo"
                          alt="La mascota de semitec, un perro guía, dandote la bienvenida!" />
                      </div>
                      <a className="final-anchor-button" href={'/login'}> Continuar </a>
                  </div>
                </Form>
              )}
            </Formik>
    </div>
  </div>
  );
}