"use client";
import { useEffect, useState, useReducer, use } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Keyboard from "@/app/components/keyboard";
import styles from "@/app/_styles/Lesson.module.css";
import { lessonReducer } from "@/app/_reducers/lesson-reducer";
import { metricsReducer } from "@/app/_reducers/metrics-reducer";
import LessonResults from "@/app/components/lesson-results";

export default function Lesson() {
  const [message, setMesaje] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [start, setStart] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const searchParams = useSearchParams();

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
        `http://25.37.76.172:5000/lesson?lesson_id=${lesson_id}`
      );
      const data = await res.json();
      if (res.ok) {
        console.log(data);

        distpatchLessonProps({
          type: "set_data",
          words: data.words,
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

  const sayInstruccion = () => {
    message[0] === "P"
      ? setMesaje(
          (prev) =>
            `pulsa ${
              lessonProps.current === " " ? "espacio" : lessonProps.current
            }`
        )
      : setMesaje(
          (prev) =>
            `Pulsa ${
              lessonProps.current === " " ? "espacio" : lessonProps.current
            } `
        );
  };

  useEffect(() => {
    sayInstruccion();
  }, [lessonProps]);

  const checkResults = () => {
    console.log("mistakes", metrics.mistakes, lessonProps.min_mistakes);
    console.log("time", metrics.time_taken, lessonProps.min_time);
    if (
      metrics.mistakes <= lessonProps.min_mistakes &&
      metrics.time_taken <= lessonProps.min_time
    ) {
      dispatchMetrics({ type: "set_completed" });
    }
  };

  const handleKeyDown = (event) => {
    console.log(message);
    event.preventDefault(); // Prevent default behavior
    if (!start) setStart(true); // set start to true in order to start chronometer
    if (event.key === lessonProps.current) {
      distpatchLessonProps({ type: "update_done" });
      dispatchMetrics({ type: "update_valid_keystrokes" });
    } else {
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

  const handleRepeat = () => {
    distpatchLessonProps({ type: "restart" });
    setShowMetrics(false);
  };

  const saveMetrics = async () => {
    const lesson_id = parseInt(searchParams.get("lesson_id"));

    try {
      const res = await fetch(
        "http://25.37.76.172:5000/student/lesson/results",
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
            is_complete: metrics.is_complete,
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleContinue = () => {
    let lesson_id = parseInt(searchParams.get("lesson_id"));
    saveMetrics();
    if (metrics.is_complete === 1) {
      lesson_id = lesson_id + 1;
    }
    router.push(`${pathname}?lesson_id=${lesson_id}`);
    getLesson(lesson_id);
    setShowMetrics(false);
    dispatchMetrics({ type: "restart" });
  };

  const handleBack = () => {
    const match = pathname.match(/^\/[^\/]+\/lessons/)
    router.push(match[0])
  }
  return (
    <div
      tabIndex={0}
      aria-label="Pantalla de lección. Ingrese al modo foco para comenzar"
      onKeyDown={handleKeyDown}
      className={styles.container}
    >
      <div className={styles.text}>
        <span aria-hidden="true" className={styles.done}>
          {lessonProps.done}
        </span>
        <span
          id="instrucction"
          aria-live="assertive"
          aria-relevant="all"
          style={{ fontSize: "0px", width: "0px" }}
        >
          {message}
        </span>
        <span aria-hidden="true" className={styles.current}>
          {lessonProps.current}
        </span>
        <span aria-hidden="true" className={styles.next}>
          {lessonProps.next}
        </span>
      </div>
      <LessonResults
        metrics={metrics}
        showMetrics={showMetrics}
        handleContinue={handleContinue}
        handleBack={handleBack}
        restrictions={{min_time: lessonProps.min_time, min_mistakes: lessonProps.min_mistakes}}
      />
      <div aria-hidden="true" className={styles.typingArea}>
        <span className={styles.typed}>{lessonProps.typed}</span>
        <span className={styles.mistake}>{lessonProps.mistake}</span>
      </div>
      <Keyboard />
    </div>
  );
}
