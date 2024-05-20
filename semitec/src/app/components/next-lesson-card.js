import styles from '@/app/_styles/NextLessonCard.module.css'

export default function NextLessonCard() {
  return (
    <article className={styles.container}>
      <div>
        <div className={styles.title}>Siguiente lección</div>
        <div className={styles.info}>Lección 6: a, s, d, f</div>
      </div>
      <button className={styles.button}>Iniciar</button>
    </article>
  );
}
