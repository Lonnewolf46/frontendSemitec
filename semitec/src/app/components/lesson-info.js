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
        <h1>Detalle de lección</h1>
        <h2>Nombre</h2>
        <p>{lesson.name}</p>
        <h2>Palabras</h2>
        <p>{lesson.words}</p>
        <h2>Descripción</h2>
        <p>{lesson.description}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleClick} className={styles.startButton}>
          Iniciar Lección
        </button>
      </div>
    </>
  );
}
