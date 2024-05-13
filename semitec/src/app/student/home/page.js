"use client";
import { useEffect, useState } from "react";
import WelcomeCard from "@/app/components/welcome-card";
import containers from "@/app/_styles/Containers.module.css";

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
        </div>
        <div className={containers.halfScreenContainer}></div>
      </div>
    </main>
  );
}
