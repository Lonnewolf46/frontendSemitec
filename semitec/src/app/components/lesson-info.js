"use client";
import styles from "./LessonInfo.module.css";
import { usePathname, useRouter } from "next/navigation";

export default function LessonInfo({ lesson }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(`${pathname}/lesson?lesson_id=${lesson.lesson_id}`);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h1>Detalles de la actividad</h1>
        <h2>Descripción</h2>
        <p>
          En esta lección practicaras {" "}
          <strong>{lesson.level_name}</strong> mediante la repetición de las palabras{" "}
          <strong>{lesson.content}</strong> por {lesson.iterations} iteraciones.
        </p>
        <p>{lesson.description}</p>
        <h2>Criterios de aprobción</h2>
        <p>Errores máximos {lesson.min_mistakes}</p>
        <p>Tiempo máximo {lesson.min_time} segundos</p>
        <h2>Lección creada por</h2>
        <p>{lesson.teacher_name}</p>
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
