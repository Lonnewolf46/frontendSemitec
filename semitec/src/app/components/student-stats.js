"use client";

import styles from "./view-groups.module.css";
import buttonStyles from "@/app/_styles/Button.module.css";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ListCard from "./list-card";
import LessonImg from "../ui/lesson-img.svg";
import UIDisplayInfo from "./UIStateDisplay";
import LessonStats from "./lesson-stats"

export default function StatsTable({student_ID}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userID, setUserID] = useState(student_ID);
  const [userType, setUserType] = useState(pathname === "/student/groups" ? "student" : "teacher");
  const [lessons, setLessons] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoadingData] = useState(true); 
  const [pageChangeActive, setPageChangeActive] = useState(false);
  const [errorLoading, setErrorLoad] = useState(false);
  const itemsPerPage = 4;
  

  const getLessonsHistoryCount = async () => {
    try {
        //If the user is a teacher, then the student_ID must come from another screen.
        //If the user is a student, then the student_ID is provided on the header.
        let response;
        if(userType === "teacher"){
            response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${userType}/lessons/history/total?user_id=${userID}`,{
                method: "GET",
                headers: {
                "auth-token": localStorage.getItem("auth-token"),
                },
            });
        }
        else{
            response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${userType}/lessons/history/total`,{
                method: "GET",
                headers: {
                "auth-token": localStorage.getItem("auth-token"),
                },
            });
        }
        
        const data = await response.json();
        if (response.ok) {
            const totalLessons = data.get_lesson_student_history_count;
            const calculatedTotalPages = Math.ceil(totalLessons / itemsPerPage);
            setTotalPages(calculatedTotalPages);
        } else {
            console.error("Error al obtener el historial de lecciones", data.message);
        }
        } catch (error) {
            setErrorLoad(true);
        }
  };

  const getLessonsHistory = async (var_page_number,var_page_size) => {
    try {
        //If the user is a teacher, then the student_ID must come from another screen.
        //If the user is a student, then the student_ID is provided on the header.
        let response;
    if(userType === "teacher"){
        response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${userType}/lessons/history?user_id=${userID}`,{
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              var_page_number: var_page_number,
              var_page_size: var_page_size
          })
          });
    }
    else{
        response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${userType}/lessons/history`,{
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              var_page_number: var_page_number,
              var_page_size: var_page_size
          })
          });
    }
      const data = await response.json();
      if (!Array.isArray(data)) {
            throw new Error('Unexpected data format');
        }
        //console.log(data);
        setLessons(data);
        setActiveIndex(0);
        setErrorLoad(false);
    //}
    } catch (error) {
        setErrorLoad(true);
    } finally {
      setLoadingData(false); // Set loading state to false after fetch is done
      setPageChangeActive(false);
    }
  };

  useEffect(() => {
    getLessonsHistory(currentPage,itemsPerPage); 
  }, [currentPage]);

  useEffect(() => {
    setUserID(student_ID);
    setLoadingData(true);
    setErrorLoad(false);
    getLessonsHistoryCount();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageChangeActive(true);
      setCurrentPage(newPage);
    }
  };

  const handleRetryLoad = () => {
    setLoadingData(true);
    setErrorLoad(false);
    getLessonsHistoryCount();
    getLessonsHistory(currentPage,itemsPerPage);
  }

  const handleOnExitClick = () => {
    router.push(`/${userType}/groups`);
  }

  //UI for loading data
  if (loading) {
    return (
      <UIDisplayInfo
        title="Cargando..."
      />
    )
  }

  if(errorLoading){
    return(
      <><UIDisplayInfo
        title="Error"
        message="Hubo un error al cargar las métricas." /><div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1vw' }}>
          <button
            className={buttonStyles.primary}
            onClick={handleRetryLoad}
          >
            Reintentar
          </button>
        </div></>
    )
  }

  //If there are no groups in the data state
  if (lessons.length === 0){
    return(
      <>
        {userType === "teacher" &&(
          <>
            <UIDisplayInfo
              title="Historial y métricas"
              message="No hay métricas que mostrar. Cuando el estudiante haga una práctica, la información se mostrará aquí."
            />
            <div className={styles.buttonContainer} style={{marginBottom:'0.25vw'}}>
                <button className={buttonStyles.secondary} onClick={handleOnExitClick}>
                Regresar
                </button>
            </div>
          </>
      )}
      {userType === "student" && (
        <>
          <UIDisplayInfo
            title="Historial y métrica"
            message="No hay métricas que mostrar. Cuando hagas una práctica, la información se mostrará aquí."
          />
          <div className={styles.buttonContainer} style={{marginBottom:'0.25vw'}}>
                <button className={buttonStyles.secondary} onClick={handleOnExitClick}>
                Regresar
                </button>
            </div>
        </>
      )}
    </>
    )
  }
  
  //Normal procedure
  return (
    <><div className={styles.groupsMainContainer}>
          <div className={styles.leftContainer}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2vw' }}>
                  <h1 style={{ fontSize: "2.1vw", margin: '0' }}>Lecciones realizadas</h1>
              </div>
              {!pageChangeActive && (
                  <><div className={styles.groupListContainer}>
                      <ul className={styles.groupList}>
                          {lessons.map((lesson, index) => (
                              <li
                                  tabIndex={0}
                                  key={index}
                                  onClick={() => {
                                      setActiveIndex(index);
                                      console.log("Cambio");
                                  } }
                                  onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                          setActiveIndex(index);
                                      }
                                  } }
                              >
                                  <ListCard
                                      imagePath={LessonImg}
                                      lessonName={lesson.name}
                                      middleInfo={lesson.lesson_code}
                                      active={activeIndex === index} />
                              </li>
                          ))}
                      </ul>
                  </div><div className={styles.buttonContainer}>
                          <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              className={buttonStyles.primary}
                              aria-label="Lecciones: anterior página"
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
                              aria-label="Lecciones: siguiente página"
                          >
                              Siguiente
                          </button>
                      </div></>
              )}
          </div>

          <div className={styles.rightContainer}>
              <LessonStats lessonId={lessons[activeIndex].lesson_id} studentId={userID}></LessonStats>
          </div>
        </div>
        <div className={styles.buttonContainer} style={{marginBottom:'0.25vw'}}>
            <button className={buttonStyles.secondary} onClick={handleOnExitClick}>
              Regresar
            </button>
        </div>
    </>
  );
}