"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./GroupsTable.module.css";

export default function StudentsTable({ group_id }) {
  const pathname = usePathname()
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    const userType = pathname === '/student/groups' ? 'student' : 'teacher'
       try {
      const res = await fetch(
        `http://25.37.76.172:5000/${userType}/groups/members?group_id=${group_id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setStudents(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStudents();
  }, [group_id]);

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre completo</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
