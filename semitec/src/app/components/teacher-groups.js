"use client";

import styles from "./teacher-groups.module.css";
import buttonStyles from "@/app/_styles/Button.module.css";
import { act, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListCard from "./list-card";
import LessonImg from "../ui/lesson-img.svg";
import GroupInfo from "../teacher/groups/info/page";
import UIDisplayInfo from "./UIStateDisplay"
import { Button } from "bootstrap";


export default function TeacherGroupsTable({usage}) {
  const router = useRouter();
  const [pagePurpose, setPurpose] = useState(usage);
  const [groups, setGroups] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoadingData] = useState(true); 
  const [pageChangeActive, setPageChangeActive] = useState(false);
  const [errorLoading, setErrorLoad] = useState(false);
  const itemsPerPage = 4; 

  //-------------------------------------IMPORTANT NOTE-------------------------------------//
  //Currently this component only works for Teacher.
  //Maybe with some refactoring it can work for Students as well.

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/groups/total`,{
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        const totalGroups = data[0].get_group_teacher_count;
        const calculatedTotalPages = Math.ceil(totalGroups / itemsPerPage);
        setTotalPages(calculatedTotalPages);
      } else {
        console.error("Error al obtener el total de grupos de un profesor:", data.message);
      }
    } catch (error) {
      setErrorLoad(true);
    }
  };
  const getGroups = async (var_page_number,var_page_size) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/groups`,{
        method: "POST",
        headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          var_page_number: var_page_number,
          var_page_size: var_page_size
      }),
      });
      const data = await response.json();
      setGroups(data);
      setActiveIndex(0);
      setErrorLoad(false);
    } catch (error) {
      setErrorLoad(true);
    } finally {
      setLoadingData(false); // Set loading state to false after fetch is done
      setPageChangeActive(false);
    }
  };
  useEffect(() => {
    getGroups(currentPage,itemsPerPage); 
  }, [currentPage]);

  useEffect(() => {
    setLoadingData(true);
    setErrorLoad(false)
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageChangeActive(true);
      setCurrentPage(newPage);
    }
  };

  //UI for loading data
  if (loading) {
    return (
      <UIDisplayInfo
        title="Cargando..."
      />
    )
  }

  //If there are no groups in the data state
  //Check if it was because of an error, else it just so happened that there are no groups.
  if (groups.length === 0) {
    return (
        errorLoading ? ( 
          <>
          <UIDisplayInfo
            title="Error"
            message="Hubo un error al cargar los grupos."
          />
          </>
          ) : (
            <>
              <UIDisplayInfo
                title="Grupos"
                message="No hay grupos que mostrar. Cuando crees uno, la información se mostrará aquí."
              />
              {pagePurpose === "Regular" && (
                <div style={{width: '100%', display:'flex', justifyContent:'center', marginBottom:'1vw'}}>
                <button
                  className={buttonStyles.primary}
                  onClick={() => {
                    router.push(`/teacher/groups/create`)
                  }}
                >
                Crear grupo
                </button>
                </div>
              )}
            </> 
          )
    );
  }
 
  //Normal procedure
  return (
    <div className={styles.groupsMainContainer}>
      <div className={styles.leftContainer}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'2vw'}}>
          <h1 style={{fontSize: "2.1vw", margin: '0'}}>Grupos</h1>
          {pagePurpose === "Regular" && (
            <button
              className={buttonStyles.primary}
              onClick={() => {
                router.push(`/teacher/groups/create`)
              }}
            >
              Crear grupo
            </button>
          )}
        </div>
        {!pageChangeActive && (
        <><div className={styles.groupListContainer}>
            <ul className={styles.groupList}>
              {groups.map((group, index) => (
                <li
                  tabIndex={index}
                  key={index}
                  onClick={() => {
                    console.log(`Grupo enviado: ${groups[index].group_id}`);
                    setActiveIndex(index);
                  } }
                >
                  <ListCard
                    imagePath={LessonImg}
                    lessonName={group.group_name}
                    active={activeIndex === index} />
                </li>
              ))}
            </ul>
          </div><div className={styles.buttonContainer}>
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
            </div></>
        )}
      </div>

      <div className={styles.rightContainer}>
        <GroupInfo pGroup={groups[activeIndex]} pTableType={pagePurpose}/>
      </div>
    </div>
  );
}