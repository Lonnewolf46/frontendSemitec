"use client";
import styles from "../../components/LessonsScreen.module.css";
import { useEffect, useState } from "react";
import ListCard from "../../components/list-card";
import LessonImg from "../../ui/lesson-img.svg";
import StudentGroupInfo from "@/app/components/student-group-info";

export default function StudentGroups() {
  const [groups, setGroups] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const getGroups = async () => {
    try {
      const response = await fetch(
        "http://25.37.76.172:5000/student/groups?student_id=1", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          }
        }
      );
      const data = await response.json();
      if (response.ok) {
        setGroups(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <main>
      <div className={styles.lessonsMainContainer}>
        <div className={styles.leftContainer}>
          <h1>Mis grupos</h1>
          <div className={styles.lessonListContainer}>
            <ul className={styles.lessonList}>
              {groups.map((group, index) => (
                <li
                  tabIndex={index}
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                >
                  <ListCard
                    imagePath={LessonImg}
                    middleInfo={`${group.day} ${group.hour}`}
                    lessonName={group.group_name}
                    active={activeIndex === index}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.rightContainer}>
        {groups.length > 0 ? (
          <StudentGroupInfo group={groups[activeIndex]} />
        ) : (
          <></>
        )}
        </div>
      </div>
    </main>
  );
}
