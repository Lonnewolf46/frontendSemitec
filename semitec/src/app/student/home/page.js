"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import WelcomeCard from "@/app/components/welcome-card";
import containers from "@/app/_styles/Containers.module.css";
import ProgressCard from "@/app/components/progressCard";
import StatsCard from "@/app/components/statsCard";
import NextLessonCard from "@/app/components/next-lesson-card";

export default function StudentHome() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState('')
  const [accuracyHistory, setAccuracyHistory] = useState([])
  const [nextLessonId, setNextLessonId] = useState(1)
  const router = useRouter();

  const options = {
    title: {
      text: "Precisión últimas 10 lecciones",
    },
    series: [
      {
        data: accuracyHistory.map((value) => {
          return value.accuracy_rate
        }),
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

  const getStats = async () => {
    try{
      const res = await fetch("http://25.37.76.172:5000/student/lessons/stats", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setStats(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAccuracyHistory = async () => {
    try{
      const res = await fetch("http://25.37.76.172:5000/student/lessons/accuracy-history", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setAccuracyHistory(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getNextLesson = async () => {
    try{
      const res = await fetch("http://25.37.76.172:5000/student/lessons/next-lesson", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setNextLessonId(data.max_lesson_id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleStart = () => {
    router.push(`/student/lessons/lesson?lesson_id=${nextLessonId}`)
  }
  useEffect(() => {
    getUsername();
    getStats();
    getAccuracyHistory();
    getNextLesson()
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
            <ProgressCard amount={stats.avg_mistakes} text={"errores promedio"} />
            <ProgressCard amount={`${stats.avg_time_taken}`} text={"tiempo promedio"} />
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
              <StatsCard value={stats.avg_pulsation_per_minute} name={"PPM"} />
              <StatsCard value={`${stats.avg_accuracy_rate}%`} name={"Precisión"} />
            </div>
          </section>
          <NextLessonCard handleStart={handleStart} lesson_id={nextLessonId}/>
        </div>
      </div>
    </main>
  );
}
