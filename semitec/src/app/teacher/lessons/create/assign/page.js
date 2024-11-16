"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GroupsScreen from "@/app/components/view-groups";
import styles from "@/app/_styles/CreateLesson.module.css";
import buttonStyles from "@/app/_styles/Button.module.css";
import UIDisplayInfo from "@/app/components/UIStateDisplay"
import CryptoJS from 'crypto-js';
import { useEffect } from "react";

export default function TeacherLessonAssign() {
  const LESSON_KEY = "lesson";
  const EXPIRY_TIME = 10 * 1000;

  const router = useRouter();
  const [submiting, setSubmitting] = useState(false);
  const [validEntry, setValidEntry] = useState();

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.NEXT_PUBLIC_ENCRYPT_KEY).toString();
  };

  const decryptData = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, process.env.NEXT_PUBLIC_ENCRYPT_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  const checkLessonTimeout = () => {
    const lessonContent = sessionStorage.getItem(LESSON_KEY);
    if(lessonContent){
      const now = new Date().getTime();
      const data = JSON.parse(decryptData(lessonContent));
      if (now > data.expiry) {
        sessionStorage.removeItem(LESSON_KEY);
        return false;
      }
      else{
        return true;
      }
    }
    else{
      return false;
    }
  }

  const updateLessonExpiry = () => {
    try{
      const lessonContent = sessionStorage.getItem(LESSON_KEY);
      const now = new Date().getTime();
      const data = JSON.parse(decryptData(lessonContent));
      data.expiry = now + EXPIRY_TIME;
      sessionStorage.setItem(LESSON_KEY, encryptData(JSON.stringify(data)));
    } catch(error) {
      //The lesson data was corrupted or broken, deleting it.
      sessionStorage.removeItem(LESSON_KEY);
    }
  }

  const createAssignLessonAPI = async (inBody) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/teacher/lesson/create/assign/bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: inBody,
        }
      );
      const data = await response.json();
        if (data[0].successcode) {
          sessionStorage.removeItem('checkedStudents');
          sessionStorage.removeItem('lesson');
          alert("Lección creada y asignada con éxito");
          router.push("/teacher/home");
        }
        else{
          alert("Algo ha salido mal al crear la lección, inténtelo de nuevo más tarde.");
        }
    } catch (error) {
      console.log(error);
      alert("Ha ocurrido un error al crear la lección, inténtelo de nuevo más tarde.")
    }
  };

  //Logic:
  //1- Check if there are items in the sessionStorage
  //2- Try to extract the contents, if it fails; notify the user. Posibily due to user manipulation.
  //3- Check if there are students that were assigned and check for an existing lesson to assign them to.
  const createAssignLesson = async() =>{
    setSubmitting(true);
    const saved = sessionStorage.getItem('checkedStudents');
    const lessonContent = sessionStorage.getItem(LESSON_KEY);
    //1
    if(saved.length > 0 && lessonContent.length > 0){
      try{
        const decryptedArray = decryptData(saved);
        const descrypedParsedLesson = JSON.parse(decryptData(lessonContent));
        //3
        if(decryptedArray.length > 0){
          descrypedParsedLesson.students_ids = decryptedArray;
          const fullData = JSON.stringify(descrypedParsedLesson);
          await createAssignLessonAPI(fullData);
          
        } else if(decryptedArray.length === 0) {
          alert("Elija al menos a 1 estudiante para asignar una lección"); 
        }

        //2
      } catch(error) {
        alert("Ha ocurrido un error inesperado irrecuperable. Por favor, cree la lección de nuevo.");
        sessionStorage.removeItem('checkedStudents');
        sessionStorage.removeItem(LESSON_KEY);
        router.push("/teacher/lessons/create");
      }
    }
    setSubmitting(false);
  }

  const handleOnCancelClick = () =>{
    sessionStorage.removeItem('checkedStudents');
    updateLessonExpiry();
    router.push("/teacher/lessons/create");
  }

  useEffect(()=>{
    const valid = checkLessonTimeout();
    if (valid) {
      setValidEntry(true);
    } else {
      setValidEntry(false);
    }
  },[]);
  
  if(!validEntry){
    return(
      <UIDisplayInfo
        title="Error: No autorizado"
        message="Para crear y asignar una lección utilice la de creación de actividades.">
      </UIDisplayInfo>
    )
  }
  return (
    <main>
      <div style={{textAlign:'center', margin: '0'}}>
        <h1 className={styles.title} style={{marginBottom: '0'}}>Asignar a estudiantes</h1>
      </div>
        <GroupsScreen usage={"Assignment"} />
      <div className={styles.buttonContainer}>
          <button className={buttonStyles.secondary} onClick={handleOnCancelClick}>
            Regresar
          </button>
          <button id="validate-button" className={buttonStyles.primary} onClick={createAssignLesson} disabled={submiting}>
            Asignar
          </button>
      </div>
    </main>
  );
}