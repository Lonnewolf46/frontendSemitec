"use client";

import styles from "./teacher-groups.module.css";
import buttonStyles from "@/app/_styles/Button.module.css";
import { useEffect, useState } from "react";
import ListCard from "./list-card";
import LessonImg from "../ui/lesson-img.svg";
import GroupInfo from "./lesson-info";
import GroupInfo from "../teacher/groups/info/page";


export default function TeacherGroupsTable() {
  const [groups, setGroups] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const itemsPerPage = 4; 

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/groups/public/total`,{
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await response.json();
      
      if (response.ok) {
        const totalGroups = data.total;
        const calculatedTotalPages = Math.ceil(totalGroups / itemsPerPage);
        setTotalPages(calculatedTotalPages);
      } else {
        console.error("Error al obtener el total de grupos de un profesor:", data.message);
      }
    } catch (error) {
      console.error("Error al llamar al endpoint:", error);
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
          teacher_id: teacher_id,
          var_page_number: var_page_number,
          var_page_size: var_page_size
      }),
      });
      const data = await response.json();
      setGroups(data); 
    } catch (error) {
      console.error('Error al cargar los datos de la API:', error);
    }
  };
  useEffect(() => {
    getGroups(currentPage,itemsPerPage); 
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
    <div className={styles.groupsMainContainer}>
      <div className={styles.leftContainer}>
        <h1 style={{fontSize: "2.1vw"}}>Grupos</h1>
        <div className={styles.groupListContainer}>
          <ul className={styles.groupList}>
            {groups.map((group, index) => (
              <li
                tabIndex={index}
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                }}
              >
                <ListCard
                  imagePath={LessonImg}
                  lessonName={group.name}
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
        {groups.length > 10 ? (
          <GroupInfo group={groups[activeIndex]} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
