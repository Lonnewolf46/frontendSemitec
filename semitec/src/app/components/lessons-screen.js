"use client";
import styles from "./LessonsScreen.module.css";
import { useEffect, useState } from "react";
import ListCard from "./list-card";
import LessonImg from "../ui/lesson-img.svg";
import LessonInfo from "./lesson-info";

export default function LeesonsScreen() {
  const [lessons, setLessons] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const getLessons = async () => {
    try {
      const response = await fetch("http://25.37.76.172:5000/lessons");
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLessons();
  }, []);

  return (
    <div className={styles.lessonsMainContainer}>
      <div className={styles.leftContainer}>
        <h1 style={{fontSize: "2.1vw"}}>Lecciones</h1>
        <div className={styles.lessonListContainer}>
          <ul className={styles.lessonList}>
            {lessons.map((lesson, index) => (
              <li
                tabIndex={index}
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                }}
              >
                <ListCard
                  imagePath={LessonImg}
                  lessonName={lesson.name}
                  active={activeIndex === index}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.rightContainer}>
        {lessons.length > 0 ? (
          <LessonInfo lesson={lessons[activeIndex]} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
