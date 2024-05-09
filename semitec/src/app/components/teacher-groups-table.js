"use client";
import { useEffect, useState } from "react";
import styles from "./GroupsTable.module.css";

export default function TeacherGroupsTable() {
  const [groups, setGroups] = useState([]);

  const getGroups = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/teacher/groups?teacher_id=11"
      );
      const data = await response.json();
      setGroups(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    console.log("editar");
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Progreso</th>
            <th>Estudiantes </th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={index}>
              <td>{group.group_id}</td>
              <td>{group.name}</td>
              <td>{group.progress}</td>
              <td>{group.total_students}</td>
              <td>
                <button onClick={handleEdit}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
