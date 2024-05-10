"use client";
import { useEffect, useState, useReducer } from "react";
import Keyboard from "@/app/components/keyboard";
import styles from "@/app/_styles/Lesson.module.css";
import { lessonReducer } from "@/app/_reducers/lesson-reducer";
import { metricsReducer } from "@/app/_reducers/metrics-reducer";

export default function Lesson() {
  const [metrics, dispatchMetrics] = useReducer(
    metricsReducer,
    metricsReducer()
  );
  const [lessonProps, distpatchLessonProps] = useReducer(
    lessonReducer,
    lessonReducer()
  );
  const [start, setStart] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);

  // chronometer
  useEffect(() => {
    let chronometer;
    if (start) {
      chronometer = setInterval(() => {
        dispatchMetrics({ type: "update_time_taken" });
      }, 1000); // update every 1 second
    }
    return () => clearInterval(chronometer);
  }, [start]);

  // caputre key down
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // clean up the key listened
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  const handleKeyDown = (event) => {
    event.preventDefault(); // Prevent default behavior
    if (!start) setStart(true); // set start to true in order to start chronometer
    if (event.key === lessonProps.current) {
      distpatchLessonProps({ type: "update_done" });
      dispatchMetrics({ type: "update_valid_keystrokes" });
      if (lessonProps.next === "") {
        setShowMetrics(true);
        setStart(false);
      }
    } else {
      distpatchLessonProps({ type: "update_mistake", mistake: event.key });
      dispatchMetrics({ type: "update_mistakes" });
    }
  };

  return (
    <div tabIndex={0} className={styles.container}>
      <div className={styles.text}>
        <span className={styles.done}>{lessonProps.done}</span>
        <span className={styles.current}>{lessonProps.current}</span>
        <span className={styles.next}>{lessonProps.next}</span>
      </div>
      <dialog open={showMetrics}>Resultados{metrics.time_taken}</dialog>
      <div className={styles.typingArea}>
        <span className={styles.typed}>{lessonProps.typed}</span>
        <span className={styles.mistake}>{lessonProps.mistake}</span>
      </div>
      <Keyboard />
    </div>
  );
}
