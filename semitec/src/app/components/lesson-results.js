import { useEffect, useRef, useState } from "react";
import styles from "@/app/_styles/LessonResults.module.css";
import buttonStyles from "@/app/_styles/Button.module.css";

export default function LessonResults({
  metrics,
  showMetrics,
  handleContinue,
  restrictions,
}) {
  const [message, setMessage] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    if (showMetrics) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }

    if (
      metrics.mistakes > restrictions.min_mistakes &&
      metrics.time_taken > restrictions.min_time
    ) {
      setMessage(
        "Lo estás haciendo excelente. Debes mejorar el tiempo y la precisión."
      );
    } else if (
      metrics.mistakes > restrictions.min_mistakes &&
      metrics.time_taken <= restrictions.min_time
    ) {
      setMessage("Tu tiempo es excelente. Debes mejorar la precisión.");
    } else if (
      metrics.mistakes <= restrictions.min_mistakes &&
      metrics.time_taken > restrictions.min_time
    ) {
      setMessage("Tu precisión es excelente. Debes mejorar el tiempo .");
    } else {
      setMessage("Tu precisión y tiempo son excelntes, sigue así.");
    }
  }, [showMetrics]);

  return (
    <dialog
      className={styles.wrapper}
      ref={dialogRef}
      aria-labelledby="results-title"
    >
      <h2 id="results-title">Resultados de la lección</h2>
      <p>{message}</p>
      <p>Tiempo: {metrics.time_taken} s</p>
      <p>Errores: {metrics.mistakes}</p>
      <p>Precisión: {metrics.accuracy_rate} %</p>
      <p>PPM: {metrics.pulsation_per_minute}</p>
      <p>Pulsaciones válidas: {metrics.valid_keystrokes}</p>
      <div style={{ margin: "auto" }}>
        <button
          style={{ margin: "auto" }}
          className={buttonStyles.primary}
          onClick={handleContinue}
        >
          Siguiente lección
        </button>
      </div>
    </dialog>
  );
}
