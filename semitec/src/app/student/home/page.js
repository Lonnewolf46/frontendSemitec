"use client";
import { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import WelcomeCard from "@/app/components/welcome-card";
import containers from "@/app/_styles/Containers.module.css";
import ProgressCard from "@/app/components/progressCard";
import StatsCard from "@/app/components/statsCard";
import NextLessonCard from "@/app/components/next-lesson-card";

export default function StudentHome() {
  const [username, setUsername] = useState("");

  const options = {
    title: {
      text: "Precisión últimas 10 lecciones",
    },
    series: [
      {
        data: [10, 9, 5, 20, 30, 25, 29, 33, 32, 40],
      },
    ],
  };

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
    <main>
      <div className={containers.fullScreenContainer}>
        <div className={containers.halfScreenContainer}>
          <WelcomeCard username={username} />
          <div style={{ marginTop: "10px" }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
        <div className={containers.halfScreenContainer}>
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "solid 6px #007172",
              paddingBottom: "50px",
            }}
          >
            <ProgressCard amount={5} text={"lecciones completadas"} />
            <ProgressCard amount={6} text={"lecciones pendientes"} />
          </section>
          <section>
            <div
              style={{
                fontSize: "2.7vw",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Estadísticas
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <StatsCard value={"58.4"} name={"PPM"} />
              <StatsCard value={"97%"} name={"Precisión"} />
            </div>
          </section>
          <NextLessonCard />
        </div>
      </div>
    </main>
  );
}
