"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/app/_styles/GroupsTable.module.css";
import buttonStyles from "@/app/_styles/Button.module.css";
import Image from "next/image";
import UIDisplayInfo from "./UIStateDisplay"
import view from "@/app/ui/see.svg";
import profile from "@/app/ui/avatarFill.svg";
import deleteUser from "@/app/ui/trashcan.svg";

export default function StudentsTable({ group_id, actions }) {
  const pathname = usePathname();
  const router = useRouter();
  const [groupID, setGroupId] = useState(group_id);
  const [students, setStudents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoadingData] = useState(true); 
  const [errorLoading, setErrorLoad] = useState(false);
  const itemsPerPage = 4; 

  const fetchCount = async () => {
    const userType = pathname === "/student/groups" ? "student" : "teacher";
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${userType}/groups/members/total?var_group_id=${group_id}`,{
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        const totalStudents = data[0].get_group_students_count;
        const calculatedTotalPages = Math.ceil(totalStudents / itemsPerPage);
        setTotalPages(calculatedTotalPages);
      } else {
        console.error("Error al obtener el total de estudiantes de un profesor:", data.message);
      }
    } catch (error) {
      setErrorLoad(true);
    }
  };

  const getStudents = async (ingroup_id,page_number,page_size) => {
    const userType = pathname === "/student/groups" ? "student" : "teacher";
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/${userType}/groups/members`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            var_group_id: group_id,
            var_page_number: page_number,
            var_page_size: page_size  
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
    getStudents(group_id,currentPage,itemsPerPage);
  }, [currentPage, group_id]);

  useEffect(() => {
    setLoadingData(true);
    setErrorLoad(false);
    setGroupId(group_id);
    fetchCount();
    setCurrentPage(1);
  }, [group_id]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
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

  //If there are no students in the data state
  //Check if it was because of an error, else it just so happened that there are no groups.
  if (students.length === 0) {
    return (
      errorLoading ? ( 
        <>
        <UIDisplayInfo
          title="Error"
          message="Hubo un error al cargar los estudiantes."
        />
        </>
        ) : (
          <>
            <UIDisplayInfo
              title="Estudiantes"
              message="No hay estudiantes en este grupo"
            />
          </> 
        )
  );
  }

  return (
    <><div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre completo</th>
            {actions === true ? <><th>Estadísticas</th><th>Perfil</th><th>Eliminar</th></> : <></>}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{student.student_name}</td>
              {actions === true ? (
                <>
                  <td>
                    <button aria-label={`Ver estadísticas del estudiante: ${student.student_name}`}
                      onClick={() => {
                        alert("No funcional");
                      } }>
                      <Image src={view} alt="" />
                    </button>
                  </td><td>
                    <button aria-label={`Ver perfil del estudiante: ${student.student_name}`}
                      onClick={() => {
                        router.push(`/teacher/groups/info/student-info?student_id=${student.student_id}`);
                      } }>
                      <Image src={profile} alt="" />
                    </button>
                  </td>
                  <td>
                    <button aria-label={`Eliminar estudiante: ${student.student_name}`}
                      onClick={() => {
                        alert("No funcional");
                      } }>
                      <Image src={deleteUser} alt="" />
                    </button>
                  </td>
                </>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
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
  );
}
