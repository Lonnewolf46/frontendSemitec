"use client";
import { useRouter, usePathname } from "next/navigation";
import styles from "../../components/LessonsScreen.module.css";
import { useEffect, useState } from "react";
import ListCard from "../../components/list-card";
import LessonImg from "../../ui/lesson-img.svg";
import StudentGroupInfo from "@/app/components/student-group-info";
import buttonStyles from "@/app/_styles/Button.module.css";

export default function StudentGroups() {
  const router = useRouter()
  const pathname = usePathname()
  const [groups, setGroups] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const getGroups = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/student/groups`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
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

  const handleJoinGroup = () => {
    router.push(`${pathname}/join`)

  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <main>
      <div className={styles.lessonsMainContainer}>
        <div className={styles.leftContainer}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>Mis grupos</h1>
            <div style={{marginRight: "10px"}}>
              <button onClick={handleJoinGroup} className={buttonStyles.primary}>Unirme a grupo</button>
            </div>
          </div>
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
