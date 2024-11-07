"use client";
import styles from "./LessonsScreen.module.css";
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

  return (
    <div className={styles.lessonsMainContainer}>
      <div className={styles.leftContainer}>
        <h1 style={{fontSize: "2.1vw"}}>Lecciones</h1>
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
                  active={activeIndex === index}
                />
              </li>
            ))}
          </ul>
        </div>
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
      </div>

      <div className={styles.rightContainer}>
        {lessons.length > 0 ? (
          <LessonInfo lesson={lessons[activeIndex]} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
