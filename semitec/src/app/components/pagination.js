import React, { useState, useEffect } from 'react';
import ListCard from './ListCard'; 
import LessonInfo from './LessonInfo'; 
import LessonImg from './lessonImg.png'; 
import styles from './Paginacion.module.css'; 
function Paginacion({ apiUrl }) {
  const [lessons, setLessons] = useState([]); 
  const [activeIndex, setActiveIndex] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const itemsPerPage = 5; 
 
  const fetchData = async (page) => {
    try {
      const response = await fetch(`${apiUrl}?page=${page}&limit=${itemsPerPage}`);
      const result = await response.json();
      setLessons(result.data); 
      setTotalPages(result.totalPages); 
    } catch (error) {
      console.error('Error al cargar los datos de la API:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage); 
  }, [currentPage]);

 
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.lessonsMainContainer}>
      
      <div className={styles.leftContainer}>
        <h1 style={{ fontSize: '2.1vw' }}>Lista de Componentes</h1>

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


        <div className={styles.paginationControls}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
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

export default Paginacion;
