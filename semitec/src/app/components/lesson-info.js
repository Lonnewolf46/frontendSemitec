"use client";
import styles from "./LessonInfo.module.css";
import { usePathname, useRouter } from "next/navigation";

export default function LessonInfo({ lesson }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(`${pathname}/lesson`);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2>{lesson.name}</h2>
        <p>Palabras: {lesson.words}</p>
      </div>
      <div className={styles.wrapper}>
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