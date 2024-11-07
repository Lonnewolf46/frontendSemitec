"use client";
import styles from "./add-student-screen.module.css";
import "./add-student-screen.module.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import buttonStyles from "@/app/_styles/Button.module.css";
import { useEffect, useState } from "react";
import ListCard from "./list-card";
import LessonImg from "../ui/lesson-img.svg";
import LessonInfo from "./lesson-info";

export default function LeesonsScreen() {
  const [lessons, setLessons] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const itemsPerPage = 4; 

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/lessons/public/total`);
      const data = await response.json();
      
      if (response.ok) {
        const totalLessons = data.get_lessons_public_count;
        const calculatedTotalPages = Math.ceil(totalLessons / itemsPerPage);
        setTotalPages(calculatedTotalPages);
      } else {
        console.error("Error al obtener el total de lecciones:", data.message);
      }
    } catch (error) {
      console.error("Error al llamar al endpoint:", error);
    }
  };
  const getLessons = async (var_page_number,var_page_size) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/lessons/public`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          var_page_number: var_page_number,
          var_page_size: var_page_size
      }),
      });
      const data = await response.json();
      setLessons(data); 
    } catch (error) {
      console.error('Error al cargar los datos de la API:', error);
    }
  };
  useEffect(() => {
    getLessons(currentPage,itemsPerPage); 
  }, [currentPage]);

  useEffect(() => {
    fetchData(); 
  }, []);
       
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const initialValues = {
    name: '',
    country: '',
    province: '',
    canton: '',
    institution_id: ''
  };

  // Validación de los campos (si es necesario)
  const validate = values => {
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

    if (!values.institution_id) {
      errors.institution_id = 'Institución requerida.';
    }

    return errors;
  };

  // Acción de envío (en este caso, solo se loguea los valores)
  const handleSubmit = (values) => {
    console.log('Filtros aplicados:', values);
    // Aquí podrías llamar a una API o realizar la lógica de búsqueda
  };

  return (
    <div>
        <div className={styles.inputGroup}>
            <h1>Agregar estudiantes</h1>
        </div>
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
                    <h1>Filtros de búsqueda</h1>
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
                        <Field as="select" name="province" className={styles.inputField}>
                            <option value="">Seleccione una provincia</option>
                            <option value="1">San José</option>
                            <option value="2">Alajuela</option>
                            <option value="3">Cartago</option>
                            <option value="4">Heredia</option>
                            {/* Agrega más provincias aquí */}
                        </Field>
                        <ErrorMessage className="error-message" name="province" component="div" />
                        </div>

                        <div className={styles.inputGroup}>
                        <label>Cantón</label>
                        <Field as="select" name="canton" className={styles.inputField}>
                            <option value="">Seleccione un cantón</option>
                            <option value="1">Alvarado</option>
                            <option value="2">Cartago</option>
                            <option value="3">El Guarco</option>
                            <option value="4">Jiménez</option>
                            {/* Agrega más cantones aquí */}
                        </Field>
                        <ErrorMessage className="error-message" name="canton" component="div" />
                        </div>

                        <div className={styles.inputGroup}>
                        <label>Distrito</label>
                        <Field as="select" name="canton" className={styles.inputField}>
                            <option value="">Seleccione un Distrito</option>
                            <option value="1">Alvarado</option>
                            <option value="2">Cartago</option>
                            <option value="3">El Guarco</option>
                            <option value="4">Jiménez</option>
                            {/* Agrega más Distritos aquí */}
                        </Field>
                        <ErrorMessage className="error-message" name="distrito" component="div" />
                        </div>

                        <div className={styles.inputGroup}>
                        <label>Institución</label>
                        <Field as="select" name="institution_id" className={styles.inputField}>
                            <option value="">Seleccione una institución</option>
                            <option value="1">Escuela Padre Peralta</option>
                            <option value="2">Escuela de los Angeles</option>
                            {/* Agrega más instituciones aquí */}
                        </Field>
                        <ErrorMessage className="error-message" name="institution_id" component="div" />
                        </div>
                    </div>
                    {/* Botón para aplicar filtros */}
                    <div className="buttons-container">
                    <button type="submit" disabled={isSubmitting}>
                        Aplicar Filtros
                    </button>
                    </div>
                </div>
                </Form>
            )}
            </Formik>
            <div className={styles.rightContainer}>
                {lessons.length > 0 ? (
                <LessonInfo lesson={lessons[activeIndex]} />
                ) : (
                <></>
                )}
            </div>
        </div>
    </div>
  );
};

