export default function LessonResults({ metrics, showMetrics, handleContinue, handleRepeat }) {

  return (
    <dialog
      role="dialog"
      aria-labelledby="Resultados de la lección"
      aria-modal="true"
      open={showMetrics}
    >
      <h2>Resultados de la lección</h2>
      <p>Tiempo: {metrics.time_taken} s</p>
      <p>Errores: {metrics.mistakes}</p>
      <p>Precisión: {metrics.accuracy_rate} %</p>
      <p>PPM: {metrics.pulsation_per_minute}</p>
      <p>Pulsaciones válidas: {metrics.valid_keystrokes}</p>
      <button onClick={handleContinue}>Continuar</button>
    </dialog>
  );
}
