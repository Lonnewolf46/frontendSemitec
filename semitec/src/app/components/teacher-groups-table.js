"use client";
import { useEffect, useState } from "react";
import styles from "./GroupsTable.module.css";

export default function TeacherGroupsTable() {
  const [groups, setGroups] = useState([]);

  const getGroups = async () => {
    try {
      const response = await fetch(
        "http://25.37.76.172:5000/teacher/groups", {
          headers: {
            'auth-token': localStorage.getItem('auth-token')
          }
        }
      );
      const data = await response.json();
      if (response.ok) {
      console.log(data)
      setGroups(data);
    }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    console.log("editar");
  };

  const handleRead = () => {
    console.log("read")
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Progreso</th>
            <th>Estudiantes </th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={index}>
              <td>{group.group_code}</td>
              <td>{group.name}</td>
              <td>{group.progress}</td>
              <td>{group.total_students}</td>
              <td>
                <button onClick={handleEdit}>Editar</button>
              </td>
              <td>
                <button onClick={handleEdit}>Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
