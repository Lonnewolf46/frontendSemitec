"use client";
import styles from "./LessonsScreen.module.css";
import buttonStyles from "@/app/_styles/Button.module.css";
import { useEffect, useState } from "react";
import ListCard from "./list-card";
import LessonImg from "../ui/lesson-img.svg";
import LessonInfo from "./lesson-info";
import { usePathname, useRouter } from "next/navigation";

export default function LeesonsScreen({
  title,
  lessonByCodeRoute,
  lessonCountRoute,
  pagedLessonsRoute,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [lessonCode, setLessonCode] = useState("");
  const [lessons, setLessons] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const itemsPerPage = 4;

  const fetchData = async (var_name) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}${lessonCountRoute}`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            var_name: var_name,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        const totalLessons = Object.values(data)[0];
        const calculatedTotalPages = Math.ceil(totalLessons / itemsPerPage);
        console.log(calculatedTotalPages);
        setTotalPages(calculatedTotalPages);
      } else {
        console.error("Error al obtener el total de lecciones:", data);
      }
    } catch (error) {
      console.error("Error al llamar al endpoint:", error);
    }
  };

  const getLessons = async (var_page_number, var_page_size, var_name) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}${pagedLessonsRoute}`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            var_page_number: var_page_number,
            var_page_size: var_page_size,
            var_name: var_name,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLessons(data);
      }
    } catch (error) {
      console.error("Error al cargar los datos de la API:", error);
    }
  };

  const handleCodeChange = (event) => {
    const value = event.target.value;
    const isValid = value.length <= 16;
    if (isValid) {
      setLessonCode(value);
      setError("");
    } else {
      setError("Solo se permiten de 1 a 16 caracteres.");
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (lessonCode.length >= 1 && lessonCode.length <= 32) {
      fetchData(lessonCode);
      getLessons(currentPage, itemsPerPage, lessonCode);
    } else {
      setError("Se requiere de 1 a 16 caracteres para buscar una lección.");
    }
  };

  const handleClear = (event) => {
    console.log("clearing");
    event.preventDefault();
    setLessonCode("");
    setCurrentPage(1);
    fetchData();
    getLessons(1, itemsPerPage, "");
  }

  const getLessonsByCode = async (lessonCode) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}${lessonByCodeRoute}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({
            lesson_code: lessonCode,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setTotalPages(1);
      setLessons(data);
    } catch (error) {
      console.error("Error al cargar los datos de la API:", error);
    }
  };

  useEffect(() => {
    getLessons(currentPage, itemsPerPage, lessonCode);
  }, [currentPage]);

  useEffect(() => {
    if (lessonCode.length === 0){

    console.log(lessonCode);
      fetchData("");
      getLessons(1, itemsPerPage, "");
    }
  }, [lessonCode]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setActiveIndex(0);
    }
  };

  return (
    <main className={styles.mainWrapper}>
      <section className={styles.halfScreenContainer} style={{overflowY:'auto'}}>
        <div className={styles.flexContainer}>
          <h1>{title}</h1>
          {pathname.includes("teacher/lessons/assignment") && (
            <button
              className={buttonStyles.primary}
              onClick={() => router.push("/teacher/lessons/create")}
            >
              Crear
            </button>
          )}
        </div>
        <form className={styles.searchForm}>
          <div className={styles.labelDiv}>
            <label htmlFor="search">
              <strong>Buscar por nombre</strong>
            </label>
          </div>
          <div className={styles.inputDiv}>
            <input
              id="search"
              type="text"
              aria-invalid={!!error}
              aria-describedby={error ? "search-error" : ""}
              placeholder="Lección 1"
              value={lessonCode}
              onChange={handleCodeChange}
            />
            {lessonCode && (
              <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Eliminar búsqueda">
                <svg
                  className="accesibility-bar-btn-content"
                  xmlns="http://www.w3.org/2000/svg"
                  height="100%"
                  viewBox="0 -960 960 960"
                  width="2vw"
                  fill="gray"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            )}
            <button
            className={styles.searchButton}
            onClick={handleSearch}
            aria-label="Buscar lección">
              <svg
                className="accessibility-bar-btn-content"
                xmlns="http://www.w3.org/2000/svg"
                height="100%"
                viewBox="0 -960 960 960"
                width="2vw"
                fill="#e8eaed"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </button>
          </div>
        </form>
        {error && (
          <p
            style={{
              fontSize: "1.2vw",
              color: "red",
              margin: "2px",
              textAlign: "right",
            }}
            role="alert"
          >
            {error}
          </p>
        )}
        <div className={styles.lessonListContainer}>
          <ul className={styles.lessonList}>
            {lessons.map((lesson, index) => (
              <li
                tabIndex={0}
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                }}
              >
                <ListCard
                  imagePath={LessonImg}
                  lessonName={lesson.name}
                  middleInfo={lesson.lesson_code}
                  active={activeIndex === index}
                />
              </li>
            ))}
          </ul>
        </div>
        {lessons.length === 0 && (
          <p>Ups... No se encontraron lecciones que mostrar</p>
        )}
        {lessons.length > 0 && (
          <div className={styles.buttonContainer}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={buttonStyles.primary}
              aria-label="Actividades: página anterior"
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
              aria-label="Actividades: siguiente página"
            >
              Siguiente
            </button>
          </div>
        )}
      </section>

      <section className={styles.halfScreenContainer}>
        {lessons.length > 0 ? (
          <LessonInfo lesson={lessons[activeIndex]} />
        ) : (
          <></>
        )}
      </section>
    </main>
  );
}
