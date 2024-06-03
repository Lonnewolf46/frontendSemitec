"use client";
import styles from "./LessonsScreen.module.css";
import sub_styles from "./LessonInfo.module.css";
import ad_styles from "./teacher-lessons-additional.module.css"
import buttonStyles from '@/app/_styles/Button.module.css'

import { useEffect, useState } from "react";
import ListCard from "./list-card";
import LessonImg from "../ui/lesson-img.svg";
import LessonInfo from "./teacher-lesson-info";
import { useRouter, usePathname } from "next/navigation";

export default function LeesonsScreen() {
  const router = useRouter();
  const pathname = usePathname();
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

  const handleClick = () => {
    router.push(`${pathname}/create`)
  };

  return (
    <div className={styles.lessonsMainContainer}>
      <div className={styles.leftContainer}>
        <div className={ad_styles.flexcontainer}> 
            <h1>Lecciones</h1>
                <button onClick={handleClick} className={buttonStyles.primary}>
                Crear Lección
                </button>
        </div>
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
