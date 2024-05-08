import styles from "./LessonInfo.module.css";

export default function LessonInfo({ lesson }) {
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
        <button className={styles.startButton}>Iniciar Lección</button>
      </div>
    </>
  );
}
