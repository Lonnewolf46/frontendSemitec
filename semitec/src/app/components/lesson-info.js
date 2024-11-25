"use client";
import styles from "./LessonInfo.module.css";
import buttonStyles from "@/app/_styles/Button.module.css";
import { usePathname, useRouter } from "next/navigation";
import CryptoJS from 'crypto-js';

export default function LessonInfo({ lesson }) {
  const router = useRouter();
  const pathname = usePathname();
  const LESSON_KEY = "lesson";
  const EXPIRY_TIME = 20 * 1000;

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.NEXT_PUBLIC_ENCRYPT_KEY).toString();
  };

  const handleClick = () => {
    router.push(`/student/lessons/lesson?lesson_id=${lesson.lesson_id}`);
  };

  // Copy lesson to use it on create lesson
  const handleCopyLesson = () => {
    const now = new Date().getTime();
    sessionStorage.setItem(LESSON_KEY,
      encryptData(
      JSON.stringify({
        level_id: lesson.level_id,
        content: lesson.content,
        iterations: lesson.iterations,
        max_time: lesson.min_time,
        max_mistakes: lesson.min_mistakes,
        name: lesson.name,
        description: lesson.description,
        shared: 1,
        expiry: now + EXPIRY_TIME
      })
    ));
    router.push("/teacher/lessons/create");
  }

  return (
    <>
      <div className={styles.wrapper}>
        <h1>Detalles de la actividad</h1>
        <h2>Descripción</h2>
        <p>
          En esta lección practicarás <strong>{lesson.level_name}</strong>{" "}
          mediante la repetición de las palabras{" "}
          <strong>{lesson.content}</strong> por {lesson.iterations} iteraciones.
        </p>
        <p>{lesson.description}</p>
        <h2>Criterios de aprobación</h2>
        <p>Errores máximos {lesson.min_mistakes}</p>
        <p>Tiempo máximo {lesson.min_time} segundos</p>
        {!pathname.includes("teacher/lessons/assignment") && (
          <>
            <h2>Lección creada por</h2>
            <p>{lesson.teacher_name}</p>
          </>
        )}
        {pathname.includes("teacher/lessons/public") && (
          <div className={styles.buttonContainer}>
            <button className={buttonStyles.primary}
            onClick={handleCopyLesson}>Copiar Lección</button>
          </div>
        )}
      </div>
      {pathname.includes("teacher") ? (
        <></>
      ) : (
        <div className={styles.buttonContainer}>
          <button onClick={handleClick} className={styles.startButton}>
            Iniciar Lección
          </button>
        </div>
      )}
    </>
  );
}
