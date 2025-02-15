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
      if (data.length > 0) {
        setRecentActivity(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
              buttonText="Ir"
              handleClick={() => router.push("/teacher/lessons/assignment")}
            />
            <ActivityManagementCard
              text="Practicas predeterminadas"
              buttonText="Ir"
              handleClick={() => router.push("/teacher/lessons/default")}
            />
            <ActivityManagementCard
              text="Actividades públicas"
              buttonText="Ir"
              handleClick={() => router.push("/teacher/lessons/public")}
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
                key={activity.id} // Unique key prop
                title={`${activity.student_name} ha ${activity.is_complete === "1" ? 'completado' : 'fallado'}: ${activity.lesson_name}`}
                subtitle={formatDate(activity.completion_date)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}