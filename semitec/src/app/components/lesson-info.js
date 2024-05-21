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
        <h1>{lesson.name}</h1>
        <p style={{fontSize: "1.3vw"}}>Palabras: {lesson.words}</p>
      </div>
      <div style={{fontSize: "1.3vw"}} className={styles.wrapper}>
        <h3>Descripción</h3>
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