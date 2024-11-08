"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import WelcomeCard from "@/app/components/welcome-card";
import ActivityManagementCard from "@/app/components/dashboard-cards/activity-management-card";
import RecentActivityCard from "@/app/components/dashboard-cards/recent-activity-card";
import { useRouter } from "next/navigation";

export default function TeacherHome() {
  const [username, setUsername] = useState("");
  const [recentActivity, setRecentActivity] = useState([]);
  const router = useRouter();
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

  const getRecentActivity = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/teacher/recent-activity`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setRecentActivity(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleActivities = () => {
    router.push("/teacher/lessons");
  };

  useEffect(() => {
    getUsername();
    getRecentActivity();
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
              handleClick={handleActivities}
            />
            <ActivityManagementCard
              text="Practicas predeterminadas"
              buttonText="Ver"
              handleClick={handleActivities}
            />
            <ActivityManagementCard
              text="Actividades públicas"
              buttonText="Ver"
              handleClick={handleActivities}
            />
          </div>
        </section>
        <section className={styles.halfScreenContainer}>
          <h1>Actividad reciente</h1>
          <div className={styles.cardWrapper}>
            {recentActivity.length === 0 && (
              <p>
                No hay actividad reciente que mostrar. Cuando un alumno complete
                una actividad, la información se mostrará aquí.{" "}
              </p>
            )}
            {recentActivity.map((activity) => (
              <RecentActivityCard
                title={activity.message}
                subtitle={activity.date}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
