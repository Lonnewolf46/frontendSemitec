"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import WelcomeCard from "@/app/components/welcome-card";
import ActivityManagementCard from "@/app/components/dashboard-cards/activity-management-card";
import RecentActivityCard from "@/app/components/dashboard-cards/recent-activity-card";

export default function TeacherHome() {
  const [username, setUsername] = useState("");
  const getUsername = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/teacher/username`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setUsername(data.username.split(" ")[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <main className={styles.mainWrapper}>
      <section>
        <WelcomeCard username={username} />
      </section>
      <div className={styles.column}>
        <section className={styles.halfScreenContainer}>
          <h1>Gestor de actividades</h1>
          <div className={styles.cardWrapper}>
            <ActivityManagementCard
              text="Actividades creadas"
              buttonText="Ver"
            />
            <ActivityManagementCard
              text="Practicas predeterminadas"
              buttonText="Ver"
            />
            <ActivityManagementCard
              text="Actividades públicas"
              buttonText="Ver"
            />
          </div>
        </section>
        <section className={styles.halfScreenContainer}>
          <h1>Actividad reciente</h1>
          <div className={styles.cardWrapper}>
            <RecentActivityCard
              title="Jesus ha completado: Tarea 1"
              subtitle="8 de noviembre de 2024"
            />
            <RecentActivityCard
              title="George ha completado: Tarea 3"
              subtitle="27 de setiembre del 2024"
            />
            <RecentActivityCard
              title="Heraldo ha completado tarea: 8"
              subtitle="27 de setiembre del 2024"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
