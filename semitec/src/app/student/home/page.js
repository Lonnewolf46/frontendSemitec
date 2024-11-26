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
import AssignedLesssonsCard from "@/app/components/assigned-lessons-card";
import {useTheme } from "next-themes";

const themes = {
  Predeterminado: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    legendColor: '#000000',
  },
  Amanecer: {
    backgroundColor: '#FFFAEF',
    textColor: '#3D3D3D',
    legendColor: '#202020',
  },
  Ceniza: {
    backgroundColor: '#2D3236',
    textColor: '#ffffff',
    legendColor: '#B6F6F0',
  },
  Grafito: {
    backgroundColor: '#202020',
    textColor: '#ffff',
    legendColor: '#ffff',
  },
  Noche: {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    legendColor: '#ffee32',
  },
};

export default function StudentHome() {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState({avg_time_taken: 0, avg_mistakes: 0, avg_accuracy_rate: 0, avg_pulsation_per_minute:0 })
  const [metricsHistory, setAccuracyHistory] = useState([])
  const [medium_accuracy, setAccuracy] = useState();
  const [medium_ppm, setPPM] = useState()
  const [nextLessonId, setNextLessonId] = useState();
  const [assignedLessons, setAssignedLessons] = useState();
  const [nextAssignedLessonId, setNextAssignedLessonId] = useState();
  const router = useRouter();

  const currentTheme = themes[theme.theme] || themes.Predeterminado;

  const options = {
    chart: {
      backgroundColor: currentTheme.backgroundColor,
      style: {
        color: currentTheme.textColor,
      }
    },
    title: {
      text: "Estadísticas últimas 10 lecciones",
      style: {
        color: currentTheme.textColor,
      }
    },
    xAxis: {
      labels: {
        style: {
          color: currentTheme.textColor,
        }
      }
    },
    yAxis: {
      title: {
        style: {
          color: currentTheme.textColor,
        }
      },
      labels: {
        style: {
          color: currentTheme.textColor,
        }
      }
    },
    legend: {
      itemStyle: {
        color: currentTheme.legendColor, // Set the color of the legend labels dynamically 
      }
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
        setStats(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getNextAssignedLesson = async () => {
    {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/student/lessons/next-assignment`, {
            method: 'POST',
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            }
          })
          const data = await response.json()
          if (data.length!==0)
            setNextAssignedLessonId(data[0].lesson_id)

    } catch (error){
        console.log(error)
    }
  }  
  }

  const getAccuracyHistory = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/student/lessons/stats`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        setAccuracyHistory(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getPPMandAccuracy = async () => {
    {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/student/ppm-and-accuracy`, {
            method: 'POST',
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            }
          })
          
          const data = await response.json()
          {
            if (data.length !== 0)
              {
                const initialValue = 0;
                let sum_ppm = data.reduce(
                  (accumulator, currentValue) => accumulator + currentValue.pulsation_per_minute,
                  initialValue,
                );

                let sum_accuracy = data.reduce(
                  (accumulator, currentValue) => accumulator + currentValue.accuracy_rate,
                  initialValue,
                );

                sum_accuracy /= data.length
                sum_ppm /= data.length
                setPPM(sum_ppm.toFixed(0))
                setAccuracy(sum_accuracy.toFixed(0))
              }
            else
            {
              setPPM(0)
              setAccuracy(0)
            }
          }
          
          
          
    } catch (error){
        console.log(error)
    }
  }  
  }
  
  const getAssignedLessons = async () => {
    {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/student/lessons/count-pending`, {
            method: 'POST',
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
            body: JSON.stringify
                ({
                  teacher_id: ""//id del prof en teoria es opc?
                })
          });
          const data = await response.json()
          setAssignedLessons(data[0].assigned_lessons_count)

    } catch (error){
        console.log(error)
    }
  }}

  const getNextLesson = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/student/lessons/next-lesson`, {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          }
        })
        const data = await response.json()
        setNextLessonId(data[0].get_last_lesson)

  } catch (error) {
      console.log(error)
  }}

  const handleStartLesson = () => {
    router.push(`/student/lessons/lesson?lesson_id=${nextLessonId + 1}`);
  }

  const handleStartAssignedLesson = () => {
    router.push(`/student/lessons/lesson?lesson_id=${nextAssignedLessonId}`);
  }
  useEffect(() => {
    getUsername();
    getStats();
    getAccuracyHistory();
    getPPMandAccuracy();
    getNextLesson();
    getAssignedLessons();
    getNextAssignedLesson();
    accessibility(Highcharts);
  }, []);

  return (
    <main>
    <div className={styles.main_container}>
        <div className={styles.halfScreenContainer}>
          <WelcomeCard username={username} />
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "solid 6px #007172",
              paddingBottom: "50px",
            }}
          />
          <div className={styles.column}>    
            <section className={styles.halfScreenContainer}>
              <h1 className={styles.headerText}>¿Qué haremos hoy?</h1>
              <div className={styles.cardWrapper}>
              <AssignedLesssonsCard handleStartAssignedLesson={handleStartAssignedLesson} quantity= {assignedLessons} assignedLesson_id = {nextAssignedLessonId}/>
              <NextLessonCard handleStartLesson={handleStartLesson} lesson_id={nextLessonId + 1}/>
              </div>
            </section>
          </div>
        </div>
        <div className={styles.halfScreenContainer}>
          <section className={styles.container}>
            {
              metricsHistory.length!==0 ?
              <div className="highcharts-container container-center-contents" >
                  <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
              :<>
              <div className="container-center-contents">
                <h1 style={{
                  fontSize: "3vw"
                }}>
              Estadísticas últimas 10 lecciones</h1>
                <h2 style={{
                  fontWeight: 150
                }}>Empezá a practicar para visualizar aquí las estadísticas de tus últimas 10 lecciones.</h2>
              </div>
              </>
            }
          </section>

          <section className={styles.container}>
            <h1 className="container-center-contents">Estadísticas</h1>
              <div style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}>
                  <StatsCard value={medium_ppm} name={"PPM"} /> 
                  <StatsCard value={`${medium_accuracy}%`} name={"Precisión"} />
              </div>
          </section>
          
        </div>
      </div>
    </main>
  );
}
