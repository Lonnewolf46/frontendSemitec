"use client";
import Keyboard from "@/app/components/keyboard";
import { Atkinson_Hyperlegible, Atkinson_Hyperlegible } from "next/font/google";
const atkinson_Hyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400",
});
import styles from "./Lesson.module.css";
import { useEffect, useState } from "react";
import lesson from "@/app/lib/lessons";

export default function Lesson() {
  const [done, setDone] = useState("");
  const [current, setCurrent] = useState(lesson.words.charAt(0));
  const [next, setNext] = useState(lesson.words.slice(1));
  const [isStarted, setIsStarted] = useState(false);
  const [typed, setTyped] = useState("");
  const [mistake, setMistake] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === current) {
      setDone(done + current);
      console.log();
      setCurrent(next.charAt(0));
      console.log(current);
      setNext(next.slice(1));
      console.log(next);
      setMistake("");
      setTyped(typed + current);
    } else {
      setMistake(event.key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div tabIndex={0} className={styles.container}>
      <div className={styles.text}>
        <span className={styles.done}>{done}</span>
        <span className={styles.current}>{current}</span>
        <span className={styles.next}>{next}</span>
      </div>
      <div className={styles.typingArea}>
        <span className={styles.done}>{typed}</span>
        <span className={styles.mistake}>{mistake}</span>
      </div>
      <Keyboard />
    </div>
  );
}
