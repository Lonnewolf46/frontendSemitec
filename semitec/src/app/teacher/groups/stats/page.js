"use client";
import StudentStats from "@/app/components/student-stats"
import UIDisplayInfo from "@/app/components/UIStateDisplay"
import { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';

export default function GroupInfo() {
  const [studentId, setStudentID] = useState();
  const [studentName, setStudentName] = useState();

  const decryptData = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, process.env.NEXT_PUBLIC_ENCRYPT_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };
  
  useEffect(()=>{
    const _studentId = sessionStorage.getItem('student');
    const _studentName = sessionStorage.getItem('studentName');
    if (_studentId && _studentName) {
       setStudentID(decryptData(_studentId))
       sessionStorage.removeItem('student');
       setStudentName(_studentName);
       sessionStorage.removeItem('studentName');
      } else { // Handle permission denied case
        //console.error('Permission denied'); // Optionally, redirect or show an error message
      }
  },[]);
  
  if(!studentId){
    return(
      <UIDisplayInfo
        title="Error: No autorizado"
        message="Para ver estadísticas de un estudiante utilice el menú de Grupos.">
      </UIDisplayInfo>
    )
  }
  return (
    <div>
      <StudentStats student_ID={studentId} student_Name={studentName}></StudentStats>
    </div>
  );
}
