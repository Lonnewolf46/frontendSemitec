"use client";
import { useEffect, useState, useReducer, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Keyboard from "@/app/components/keyboard";
import styles from "@/app/_styles/Lesson.module.css";
import { lessonReducer } from "@/app/_reducers/lesson-reducer";
import { metricsReducer } from "@/app/_reducers/metrics-reducer";
import LessonResults from "@/app/components/lesson-results";

export default function Lesson() {
  const pathname = usePathname();
  const router = useRouter();
  const [start, setStart] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const searchParams = useSearchParams();
  const [isOnFocus, setIsOnFocus] = useState(false);
  const focusRef = useRef(null);

  const [metrics, dispatchMetrics] = useReducer(
    metricsReducer,
    metricsReducer()
  );

  const [lessonProps, distpatchLessonProps] = useReducer(
    lessonReducer,
    lessonReducer()
  );

  const getLesson = async (lesson_id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/lesson?lesson_id=${lesson_id}`
      );
      const data = await res.json();
      if (res.ok) {
        distpatchLessonProps({
          type: "set_data",
          words: data.content,
          iterations: data.iterations,
          min_time: data.min_time,
          min_mistakes: data.min_mistakes,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get Lesson on first load
  useEffect(() => {
    getLesson(searchParams.get("lesson_id"));
    focusRef.current.focus();
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

  const speak = (message) => {
    if (!("speechSynthesis" in window)) {
      alert("API de síntesis de voz no soportada en este navegador.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "es-ES"; // Configura el idioma (por ejemplo, español)
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isOnFocus && lessonProps.current.length > 0) {
      speak(
        `Pulsa ${
          lessonProps.current === " " ? "espacio" : lessonProps.current
        } `
      );
    }
  }, [lessonProps]);

  const checkResults = () => {
    if (
      metrics.mistakes <= lessonProps.min_mistakes &&
      metrics.time_taken <= lessonProps.min_time
    ) {
      dispatchMetrics({ type: "set_completed" });
    }
  };

  const handleKeyDown = (event) => {
    event.preventDefault(); // Prevent default behavior
    if (!start) setStart(true); // set start to true in order to start chronometer
    console.log(event.key, lessonProps.current);
    if (event.key === lessonProps.current) {
      distpatchLessonProps({ type: "update_done" });
      dispatchMetrics({ type: "update_valid_keystrokes" });
    } else {
      console.log("Mistake");
      distpatchLessonProps({ type: "update_done" });
      //distpatchLessonProps({ type: "update_mistake", mistake: event.key });
      dispatchMetrics({ type: "update_mistakes" });
    }
    if (lessonProps.next === "") {
      setShowMetrics(true);
      dispatchMetrics({ type: "update_ppm" });
      dispatchMetrics({ type: "update_accuracy_rate" });
      checkResults();
      setStart(false);
    }
  };

  const saveMetrics = async () => {
    const lesson_id = parseInt(searchParams.get("lesson_id"));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/student/lesson/results`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({
            lesson_id: lesson_id,
            time_taken: metrics.time_taken,
            mistakes: metrics.mistakes,
            accuracy_rate: metrics.accuracy_rate,
            ppm: metrics.pulsation_per_minute,
            is_completed: metrics.is_complete,
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRepeat= () => {
    let lesson_id = parseInt(searchParams.get("lesson_id"));
    saveMetrics();
    router.push(`${pathname}?lesson_id=${lesson_id}`);
    getLesson(lesson_id);
    dispatchMetrics({ type: "restart" });
    setShowMetrics(false);
  };

  const handleBack = () => {
    saveMetrics();
    const match = pathname.match(/^\/[^\/]+\/lessons/);
    router.push(match[0] + "/default");
  };
  return (
    <div>
      <div
        role="application"
        ref={focusRef}
        tabIndex={0}
        aria-label="Pantalla de lección"
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOnFocus(true)}
        className={styles.container}
      >
        <div className={styles.text}>
          <span aria-hidden="true" className={styles.done}>
            {lessonProps.done.endsWith(" ") && <>&nbsp;</>}
            {lessonProps.done}
          </span>
          <span aria-hidden="true" className={styles.current}>
            {lessonProps.current}
          </span>
          <span aria-hidden="true" className={styles.next}>
            {lessonProps.next.startsWith(" ") && <>&nbsp;</>}
            {lessonProps.next}
          </span>
        </div>

        <div aria-hidden="true" className={styles.typingArea}>
          <span className={styles.typed}>{lessonProps.typed}</span>
          <span className={styles.mistake}>{lessonProps.mistake}</span>
        </div>
        <Keyboard />
      </div>
      <LessonResults
        metrics={metrics}
        showMetrics={showMetrics}
        handleContinue={handleRepeat}
        handleBack={handleBack}
        restrictions={{
          min_time: lessonProps.min_time,
          min_mistakes: lessonProps.min_mistakes,
        }}
      />
    </div>
  );
}
