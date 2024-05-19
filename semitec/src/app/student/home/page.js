"use client";
import { useEffect, useState } from "react";
import WelcomeCard from "@/app/components/welcome-card";
import containers from "@/app/_styles/Containers.module.css";
import ProgressCard from "@/app/components/progressCard";

export default function StudentHome() {
  const [username, setUsername] = useState('');
  const getUsername = async () => {
    try {
      const res = await fetch("http://25.37.76.172:5000/student/username", {
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
      <div className={containers.fullScreenContainer}>
        <div className={containers.halfScreenContainer}>
          <WelcomeCard username={username}/>
          <div>Ultimas 10 lecciones</div>
        </div>
        <div className={containers.halfScreenContainer}>
          <div style={{ display: "flex",justifyContent: "space-between" }}>
            <ProgressCard amount={5} text={"lecciones completadas"}/>
            <ProgressCard amount={6} text={"lecciones pendientes"}/>
          </div>
          <div>Stasts</div>
          <div>next lesson</div>
        </div>
      </div>
    </main>
  );
}
