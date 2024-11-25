"use client";
import styles from "./LessonInfo.module.css";
import { usePathname, useRouter } from "next/navigation";

export default function LessonInfo({ lesson }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(`/student/lessons/lesson?lesson_id=${lesson.lesson_id}`);
  };

  // Copy lesson to use it on create lesson
  const handleCopyLesson = () => {
    /*
    Hi Keilor, this is the copy lesson function.

    The desing is very human and very easy to use.

    I hope this was what you need :).
    */
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
        <h2>Criterios de aprobción</h2>
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
            <button className={styles.startButton}
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
