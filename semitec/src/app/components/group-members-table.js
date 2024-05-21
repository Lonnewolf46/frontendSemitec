"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/app/_styles/GroupsTable.module.css";
import Image from "next/image";
import view from "@/app/ui/see.svg";

export default function StudentsTable({ group_id, actions }) {
  const pathname = usePathname();
  const router = useRouter();
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    const userType = pathname === "/student/groups" ? "student" : "teacher";
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
            {actions === true ? <th>Acción</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
              {actions === true ? (
                <td>
                  <button aria-label={`Ver estudiante ${student.name}`}
                  onClick={() => {
                    router.push(`/teacher/groups/info/student-info?student_id=${student.student_id}`)
                  }}>
                    <Image src={view} alt="" />
                  </button>
                </td>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
