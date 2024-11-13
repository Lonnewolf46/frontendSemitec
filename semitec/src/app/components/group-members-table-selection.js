"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/app/_styles/GroupsTable.module.css";
import stylesAlt from "./view-groups.module.css"
import buttonStyles from "@/app/_styles/Button.module.css";
import UIDisplayInfo from "./UIStateDisplay"
import CryptoJS from 'crypto-js';

//TODO: Extract the lesson_id from inside the localStorage
export default function StudentsTableAssign({ group_id }) {

  //Consts for student selection
  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.NEXT_PUBLIC_ENCRYPT_KEY).toString(); 
  };
  const decryptData = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, process.env.NEXT_PUBLIC_ENCRYPT_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };
  const [checkedStudents, setCheckedStudents] = useState(() => {
    const saved = sessionStorage.getItem('checkedStudents');
    return saved ? decryptData(saved) : [];
  });
  //Regular consts
  const pathname = usePathname();
  const [studentsDB, setStudents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoadingData] = useState(true); 
  const [errorLoading, setErrorLoad] = useState(false); 
  const itemsPerPage = 5;

  const fetchCount = async () => {
    try {
      const userType = pathname === "/student/groups" ? "student" : "teacher";
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

  const getStudents = async (ingroupId,page_number,page_size) => {
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
            var_group_id: ingroupId,
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

  const handleCheckboxChange = (student_id) => {
    setCheckedStudents((prev) => {
      if (prev.includes(student_id)) { 
        return prev.filter((id) => id !== student_id); 
      } else { 
        return [...prev, student_id]; 
      } 
    }); 
  };

  useEffect(() => { // Save the state to localStorage whenever it changes
    sessionStorage.setItem('checkedStudents',encryptData(checkedStudents));
  }, [checkedStudents]);

  useEffect(() => {
    getStudents(group_id,currentPage,itemsPerPage);
  }, [currentPage, group_id]);

  useEffect(() => {
    setLoadingData(true);
    setErrorLoad(false);
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
  if (studentsDB.length === 0) {
    return (
      errorLoading ? ( 
        <UIDisplayInfo
          title="Error"
          message="Hubo un error al cargar los estudiantes."
        />
        ) : (
            <UIDisplayInfo
              title="Estudiantes"
              message="No hay estudiantes en este grupo"
            />
        )
    );
  }

  return (
    <>
    <div className={styles.container}>
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
              <td>{student.student_name}</td>
              <td>
                <input
                  style={{ width: '4vh', height: '4vh', margin: '1vw' }}
                  type="checkbox"
                  checked={checkedStudents.includes(student.student_id)}
                  onChange={() => handleCheckboxChange(student.student_id)}
                  alt={`Incluir a ${student.student_name} en la actividad.`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className={styles.buttonContainer}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={buttonStyles.primary}
          aria-label="Estudiantes: anterior página"
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
          aria-label="Estudiantes: siguiente página"
        >
          Siguiente
        </button>
      </div>
      </>
  );
}
