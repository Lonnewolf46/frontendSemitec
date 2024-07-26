"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import accessibility from 'highcharts/modules/accessibility';
import WelcomeCard from "@/app/components/welcome-card";
import containers from "@/app/_styles/Containers.module.css";
import styles from './styles.module.css'
import ProgressCard from "@/app/components/progressCard";
import StatsCard from "@/app/components/statsCard";
import NextLessonCard from "@/app/components/next-lesson-card";

export default function StudentHome() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState({avg_time_taken: 0, avg_mistakes: 0, avg_accuracy_rate: 0, avg_pulsation_per_minute:0 })
  const [metricsHistory, setAccuracyHistory] = useState([])
  const [nextLessonId, setNextLessonId] = useState(1)
  const router = useRouter();

  const options = {
    title: {
      text: "Estadísticas últimas 10 lecciones",
    },
    series: [
      {
        name: 'Precisión',
        data: metricsHistory.map((value) => {
          return value.accuracy_rate
        }),
      },
      {
        name: 'Tiempo',
        data: metricsHistory.map((value) => {
          return value.time_taken
        })
      },
      {
        name: 'Errores',
        data: metricsHistory.map((value) => {
          return value.mistakes
        })
      },
      {
        name: 'PPM',
        data: metricsHistory.map((value) => {
          return value.pulsation_per_minute
        })
      }
    ],
  };

  const getUsername = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/student/username`, {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/student/lessons/stats`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (res.ok && data.avg_accuracy_rate !== null) {
        console.log(data);
        setStats(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAccuracyHistory = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/student/lessons/accuracy-history`, {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/student/lessons/next-lesson`, {
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
    router.push(`/student/lessons/lesson?lesson_id=${nextLessonId + 1}`)
  }
  useEffect(() => {
    getUsername();
    getStats();
    getAccuracyHistory();
    getNextLesson()
    accessibility(Highcharts);
  }, []);

  return (
    <main>
    <div className={styles.main_container}>
        <div className={styles.left_section}>
          <WelcomeCard username={username} />
          <div style={{ marginTop: "10px", height: "55vh", alignContent: "center" }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
        <div className={styles.right_section}>
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "solid 6px #007172",
              paddingBottom: "50px",
            }}
          >
            <ProgressCard amount={stats.avg_mistakes} text={"errores promedio"} />
            <ProgressCard amount={`${stats.avg_time_taken}`} text={"tiempo promedio ⓘ"} />
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
              <StatsCard value={stats.avg_pulsation_per_minute} name={"PPM ⓘ"} />
              <StatsCard value={`${stats.avg_accuracy_rate}%`} name={"Precisión"} />
            </div>
          </section>
          <NextLessonCard handleStart={handleStart} lesson_id={nextLessonId + 1}/>
        </div>
      </div>
    </main>
  );
}
