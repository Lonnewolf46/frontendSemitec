"use client";
import { useEffect, useState } from "react";
import TeacherGroupsTable from "@/app/components/teacher-groups-table";
import styles from "../../components/LessonsScreen.module.css";
import WelcomeCard from "@/app/components/welcome-card";

export default function TeacherHome() {
  const [username, setUsername] = useState("");
  const getUsername = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/username`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setUsername((data.username).split(" ")[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <main>
      <div className={styles.lessonsMainContainer}>
        <div className={styles.leftContainer}>
          <WelcomeCard username={username} />
        </div>
        <section className={styles.rightContainer}>
          <h1 style={{ fontSize: "2.7vw"}}>Mis grupos</h1>
          <TeacherGroupsTable />
        </section>
      </div>
    </main>
  );
}
