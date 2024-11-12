"use client";
import styles from "./add-student-screen.module.css";
import stylesTable from "@/app/_styles/GroupsTable.module.css";
import "./add-student-screen.module.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import buttonStyles from "@/app/_styles/Button.module.css";
import { useEffect, useState } from "react";
import ListCard from "./list-card";
import LessonImg from "../ui/lesson-img.svg";
import LessonInfo from "./lesson-info";
import UIDisplayInfo from "./UIStateDisplay"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LeesonsScreen() {
  const [studentsDB, setStudents] = useState([]);
  const [checkedStudents, setCheckedStudents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const itemsPerPage = 4; 
  const [loading, setLoadingData] = useState(true); 
  const [errorLoading, setErrorLoad] = useState(false); 
  const [provinces, setProvinces] = useState([])
  const [cantons, setCantons] = useState([])
  const [districts, setDistricts] = useState([])
  const [institutions, setInstitutions] = useState([])
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedCanton, setSelectedCanton] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedInstitution, setSelectedInstitution] = useState("")  
  const searchParams = useSearchParams();

  
  const fetchCount = async (var_name,var_institution_id,var_group_id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/groups/students/filter/total`,{
        method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            var_name: var_name,
            var_institution_id: var_institution_id,
            var_group_id: var_group_id
        })
        }
      );
      const data = await response.json();
      if (response.ok) {
        const totalStudents = data[0].get_students_by_name_and_institution_count;
        const calculatedTotalPages = Math.ceil(totalStudents / itemsPerPage);
        setTotalPages(calculatedTotalPages);
      } else {
        console.error("Error al obtener el total de estudiantes según el filtro:", data.message);
      }
    } catch (error) {
      setErrorLoad(true);
    }
  };
  const getStudents = async (var_name,var_institution_id,var_group_id,var_page_number,var_page_size) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/groups/students/filter`,{
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            var_name: var_name,
            var_institution_id: var_institution_id,
            var_group_id: var_group_id,
            var_page_number: var_page_number,
            var_page_size: var_page_size
        })
        }
      );
      const data = await response.json();
      if (response.ok) {
        setErrorLoad(false);
        setStudents(data);
      }
    } catch (error) {
      setErrorLoad(true);
      console.log(error);
    } finally {
      setLoadingData(false); // Set loading state to false after fetch is done
    }
  };

 
  useEffect(() => {
    getStudents("",selectedInstitution,searchParams.get("group_id"),currentPage,itemsPerPage)
  }, [currentPage]);

  useEffect(() => {
    setErrorLoad(false);
    getProvinces()
    .then( (res) => res.json())
    .then(data => setProvinces(data))          
    .catch( (err) => {
      throw new Error(
        `Unable to Fetch Data from provinces.`
      )
    })
    setLoadingData(false); 
  }, [])

  useEffect(() => {
    if (selectedProvince){
      getCantons()
      .then( (res) => res.json())
      .then(data => setCantons(data))          
      .catch( (err) => {
        throw new Error(
          `Unable to Fetch Data from Provinces.`
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
       
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleCheckboxChange = (student_id) => {
    setCheckedStudents((prev) => {
      if (prev.includes(student_id)) { 
        return prev.filter((id) => id !== student_id); 
      } else { 
        return [...prev, student_id]; 
      } 
    }); 
  };

  const handleProvinceChange = (event) => {
    const selectedValue = event.target.value; 
    setSelectedProvince(selectedValue);
    setSelectedCanton("");
    setSelectedDistrict("");
    setSelectedInstitution("");
  };

  const handleCantonChange = (event) => {
    const selectedValue = event.target.value; 
    setSelectedCanton(selectedValue);
    setSelectedDistrict("");
    setSelectedInstitution("");
  };
  const handleDistrictChange = (event) => {
    const selectedValue = event.target.value; 
    setSelectedDistrict(selectedValue);
    setSelectedInstitution("");
  };
  const handleInstitutionChange = (event) => {
    const selectedValue = event.target.value; 
    setSelectedInstitution(selectedValue);
  };
  const initialValues = {
    name: '',
    province: '',
    canton: '',
    district: '',
    institution: ''
  };

  // Validación de los campos (si es necesario)
  const validate = values => {
    const errors = {};
    if (selectedProvince === "") {
      errors.province = 'Provincia requerida.';
    }
    if (selectedCanton === "") {
      errors.canton = 'Cantón requerido.';
    }
    if (selectedDistrict === "") {
      errors.district = 'Distrito requerido.';
    }
    if (selectedInstitution === "") {
      errors.institution = 'Institución requerida.';
    }

    return errors;
  };

  // Acción de envío (en este caso, solo se loguea los valores)
  const handleSubmit = (values) => {
    console.log('Filtros aplicados:', values);
    fetchCount("",selectedInstitution,searchParams.get("group_id"));
    getStudents("",selectedInstitution,searchParams.get("group_id"),currentPage,itemsPerPage)
    
    // Aquí podrías llamar a una API o realizar la lógica de búsqueda
  };

  const getProvinces= async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/provinces?country_id=${1}`); 
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/institutions?country_id=${selectedDistrict}`); 
    if (!response.ok) {
      throw new Error(
        `Unable to Fetch Data.`
      );
    }
    return response
  };
  //UI for loading data
  if (loading) {
    return (
      <UIDisplayInfo
        title="Cargando..."
      />
    )
  }

  return (
    <div>
        <div className={styles.MainContainer}>
            <Formik 
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form>
                <div className={styles.leftContainer}>
                    {/* Filtros de búsqueda */}
                    <h1 style={{fontSize: "2.1vw"}}>Filtros de búsqueda</h1>
                    <div className={styles.FormContainer}>
                        <div className={styles.inputGroup}>
                            <label>Nombre</label>
                            <Field 
                                className={styles.inputField}
                                type="text" 
                                name="name" 
                                placeholder="Ingrese el nombre"
                            />
                            <ErrorMessage className="error-message" name="name" component="div" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Apellido</label>
                            <Field 
                                className={styles.inputField}
                                type="text" 
                                name="Lastname" 
                                placeholder="Ingrese el nombre"
                            />
                            <ErrorMessage className="error-message" name="name" component="div" />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <h3>Ubicación de la Institución</h3>
                    </div>
  
                    <div className={styles.FormUbicationContainer}>
                      <div className={styles.inputGroup}>
                        <label>Provincia</label>
                        <Field 
                          as="select" 
                          name="province" 
                          className={styles.inputField} 
                          value={selectedProvince} 
                          onChange={handleProvinceChange}
                        >
                          <option value="">Seleccione una provincia</option>
                          {provinces.length > 0 ? (
                            provinces.map((province) => (
                              <option key={province.province_id} value={province.province_id}>
                                {province.name}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>Cargando provincias...</option>
                          )}
                        </Field>
                        <ErrorMessage className="error-message" name="province" component="div" />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Cantón</label>
                        <Field 
                          as="select" 
                          name="canton" 
                          className={styles.inputField} 
                          value={selectedCanton} 
                          onChange={handleCantonChange}
                          disabled={selectedProvince === ""}
                        >
                          <option value="">Seleccione un cantón</option>
                          {cantons.length > 0 ? (
                            cantons.map((canton) => (
                              <option key={canton.canton_id} value={canton.canton_id}>
                                {canton.name}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>Cargando cantones...</option>
                          )}
                        </Field>
                        <ErrorMessage className="error-message" name="canton" component="div" />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Distrito</label>
                        <Field 
                          as="select" 
                          name="district" 
                          className={styles.inputField} 
                          value={selectedDistrict} 
                          onChange={handleDistrictChange}
                          disabled={selectedProvince === ""||selectedCanton === ""}
                        >
                          <option value="">Seleccione un distrito</option>
                          {cantons.length > 0 ? (
                            districts.map((district) => (
                              <option key={district.district_id} value={district.district_id}>
                                {district.name}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>Cargando distritos...</option>
                          )}
                        </Field>
                        <ErrorMessage className="error-message" name="district" component="div" />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Institución</label>
                        <Field 
                          as="select" 
                          name="institution" 
                          className={styles.inputField} 
                          value={selectedInstitution} 
                          onChange={handleInstitutionChange}
                          disabled={selectedProvince === ""||selectedCanton === ""||selectedDistrict === ""}
                        >
                          <option value="">Seleccione una institución</option>
                          {cantons.length > 0 ? (
                            institutions.map((institution) => (
                              <option key={institution.institution_id} value={institution.institution_id}>
                                {institution.name}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>Cargando instituciones...</option>
                          )}
                        </Field>
                        <ErrorMessage className="error-message" name="institution" component="div" />
                      </div>
                    </div>
                    
                    
                    {/* Botón para aplicar filtros */}
                    <div className="buttons-container">
                      <button type="submit" className={buttonStyles.primary} disabled={isSubmitting||selectedProvince === ""||selectedCanton === ""||selectedDistrict === ""|| selectedInstitution === ""}>
                          Aplicar Filtros
                      </button>
                    </div>
                </div>
                </Form>
            )}
            </Formik>
            <div className={styles.rightContainer}>
              {studentsDB.length > 0 ? (
                <>
                <div className={stylesTable.container}>
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre completo</th>
                        <th>Asignar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsDB.map((student, index) => (
                        <tr key={index}>
                          <td>{student.name}</td>
                          <td>
                            <input
                              style={{ width: '4vh', height: '4vh', margin: '1vw' }}
                              type="checkbox"
                              checked={checkedStudents.includes(student.user_id)}
                              onChange={() => handleCheckboxChange(student.user_id)}
                              alt={`Incluir a ${student.name} en la actividad.`} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={stylesTable.buttonContainer}>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={buttonStyles.primary}
                    >
                      Anterior
                    </button>
                    <span>
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={buttonStyles.primary}
                    >
                      Siguiente
                    </button>
                  </div>
                </>
                ) : (
                  <></>
                )}
            </div>
        </div>
    </div>
    
  );
};

