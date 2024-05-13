"use client"
import { useEffect, useState } from 'react'
import styles from "./GroupsTable.module.css";

export default function StudentsTable() {
    const [students, setStudents] = useState([])

    const getStudents = async () => {
        try {
            const res = await fetch("http://25.37.76.172:5000/group/students")
            const data = await res.json()
                console.log(data)
            if (res.ok) {
                setStudents(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getStudents()
    },[])

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
                    {
                        students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.student_id}</td>
                                <td>{student.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>


    )
}