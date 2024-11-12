"use client";
import styles from "./LessonsScreen.module.css";
import buttonStyles from "@/app/_styles/Button.module.css";
import { useEffect, useState } from "react";
import ListCard from "./list-card";
import LessonImg from "../ui/lesson-img.svg";
import LessonInfo from "./lesson-info";

export default function LeesonsScreen({
  title,
  lessonByCodeRoute,
  lessonCountRoute,
  pagedLessonsRoute,
}) {
  const [lessonCode, setLessonCode] = useState("");
  const [lessons, setLessons] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const itemsPerPage = 4;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}${lessonCountRoute}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        const totalLessons = data.get_lessons_public_count;
        const calculatedTotalPages = Math.ceil(totalLessons / itemsPerPage);
        console.log(calculatedTotalPages);
        setTotalPages(calculatedTotalPages);
      } else {
        console.error("Error al obtener el total de lecciones:", data.message);
      }
    } catch (error) {
      console.error("Error al llamar al endpoint:", error);
    }
  };

  const getLessons = async (var_page_number, var_page_size) => {
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

    const isValid =
      /^[a-zA-Z0-9]*$/.test(event.target.value) && value.length <= 7;
    if (isValid) {
      setLessonCode(value);
      setError("");
    } else {
      setError("Solo se permiten de 4 a 7 caracteres alfanuméricos.");
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (lessonCode.length >= 4 && lessonCode.length <= 7) {
      getLessonsByCode(lessonCode);
    } else {
      setError("El código debe tener de 4 a 7 caracteres.");
    }
  };

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
    getLessons(currentPage, itemsPerPage);
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <main className={styles.mainWrapper}>
      <section className={styles.halfScreenContainer}>
        <h1>{title}</h1>
        <form className={styles.searchForm}>
          <div className={styles.labelDiv}>
            <label htmlFor="search">
              <strong>Buscar por código</strong>
            </label>
          </div>
          <div className={styles.inputDiv}>
            <input
              id="search"
              type="text"
              aria-invalid={!!error}
              aria-describedby={error ? "search-error" : ""}
              placeholder="LEC140"
              value={lessonCode}
              onChange={handleCodeChange}
            />
            <button onClick={handleSearch}>
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
                tabIndex={index}
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
