"use client";
import { useEffect, useState, useReducer } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Keyboard from "@/app/components/keyboard";
import styles from "@/app/_styles/Lesson.module.css";
import { lessonReducer } from "@/app/_reducers/lesson-reducer";
import { metricsReducer } from "@/app/_reducers/metrics-reducer";
import LessonResults from "@/app/components/lesson-results";

export default function Lesson() {
  const pathname = usePathname();
  const router = useRouter();

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
  const searchParams = useSearchParams();

  const getLesson = async (lesson_id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/lesson?lesson_id=${lesson_id}`
      );
      const data = await res.json();

      distpatchLessonProps({
        type: "set_data",
        words: data.words,
        iterations: data.iterations,
        min_time: data.min_time,
        min_mistakes: data.min_mistakes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLesson(searchParams.get("lesson_id"));
  }, []);

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
        dispatchMetrics({ type: "update_ppm" });
        dispatchMetrics({ type: "update_accuracy_rate" });
        setStart(false);
      }
    } else {
      distpatchLessonProps({ type: "update_mistake", mistake: event.key });
      dispatchMetrics({ type: "update_mistakes" });
    }
  };

  const handleRepeat = () => {
    distpatchLessonProps({ type: "restart" });
    setShowMetrics(false);
  };
  const handleContinue = () => {
    const lesson_id = parseInt(searchParams.get("lesson_id")) + 1;
    router.push(`${pathname}?lesson_id=${lesson_id}`);
    getLesson(lesson_id);
    setShowMetrics(false);
    console.log(metrics); 
  };

  return (
    <div tabIndex={0} className={styles.container}>
      <div className={styles.text}>
        <span className={styles.done}>{lessonProps.done}</span>
        <span className={styles.current}>{lessonProps.current}</span>
        <span className={styles.next}>{lessonProps.next}</span>
      </div>
      <LessonResults
        metrics={metrics}
        showMetrics={showMetrics}
        handleContinue={handleContinue}
        handleRepeat={handleRepeat}
      />
      <div className={styles.typingArea}>
        <span className={styles.typed}>{lessonProps.typed}</span>
        <span className={styles.mistake}>{lessonProps.mistake}</span>
      </div>
      <Keyboard />
    </div>
  );
}
