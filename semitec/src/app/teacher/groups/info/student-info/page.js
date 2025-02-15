"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import containers from "@/app/_styles/Containers.module.css";
import Profile from "@/app/components/profile-data";
import ProgressCard from "@/app/components/progressCard";
import StatsCard from "@/app/components/statsCard";
import buttonStyles from "@/app/_styles/Button.module.css";

function StudentInfoComponent() { // Rename function here
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState("");
  const [stats, setStats] = useState({avg_time_taken: 0, avg_mistakes: 0, avg_accuracy_rate: 0, avg_pulsation_per_minute:0 });
  const [medium_accuracy, setAccuracy] = useState(0);
  const [medium_ppm, setPPM] = useState(0);
  const [completedLessons, setCompletedLessons] = useState();
  const [assignedLessons, setAssignedLessons] = useState();

  const getData = async () => {
    let studentId = Number(searchParams.get("student_id"));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/student-info`, {
        method: 'POST',
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ student_id: studentId })
      });
      const data = await res.json();
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPPMandAccuracy = async () => {
    let studentId = Number(searchParams.get("student_id"));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/lessons/stats`, {
        method: 'POST',
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ student_id: studentId })
      });
      const data = await response.json();
      const initialValue = 0;
      let sum_ppm = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue.pulsation_per_minute,
        initialValue,
      );

      let sum_accuracy = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue.accuracy_rate,
        initialValue,
      );

      if (data.length !== 0) {
        sum_accuracy /= data.length;
        sum_ppm /= data.length;
        setPPM(sum_ppm.toFixed(0));
        setAccuracy(sum_accuracy.toFixed(0));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLessons = async () => {
    let studentId = Number(searchParams.get("student_id"));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/lessons/count-pending`, {
        method: 'POST',
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ student_id: studentId })
      });
      const data = await response.json();
      setAssignedLessons(data[0].assigned_lessons_count - data[0].unique_metrics_count);
      setCompletedLessons(data[0].unique_metrics_count);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnExitClick = () => {
    router.push(`/teacher/groups`);
  };

  useEffect(() => {
    getData();
    getPPMandAccuracy();
    getLessons();
  }, []);

  return (
    <main>
      <div className={containers.fullScreenContainer}>
        <div className={containers.halfScreenContainer}>
          <Profile
            username={profile.name}
            institution={profile.institution}
            user_code={profile.user_code}
            user_type={profile.user_type}
            email={profile.email}
            country={profile.country}
            province={profile.province}
            canton={profile.canton}
            district={profile.district}
          />
        </div>
        <div className={containers.halfScreenContainer}>
          <section
            style={{
              display: "flex",
              justifyContent: "space-around",
              borderBottom: "solid 6px #007172",
              paddingBottom: "50px",
              marginRight: "32px"
            }}
          >
            {completedLessons !== 1 ?
              <ProgressCard
                amount={completedLessons}
                text={"actividades completadas"}
              />
              :
              <ProgressCard
                amount={completedLessons}
                text={"actividad completada"}
              />
            }

            {assignedLessons !== 1 ?
              <ProgressCard
                amount={assignedLessons}
                text={"actividades pendientes"}
              />
              :
              <ProgressCard
                amount={assignedLessons}
                text={"actividad pendiente"}
              />
            }
          </section>
          <section>
            <div
              style={{
                fontSize: "2.7vw",
                fontWeight: "bold",
                marginTop: "20px"
              }}
            >
              Estadísticas
            </div>
            {medium_ppm !== 0 && medium_accuracy !== 0 ?
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <StatsCard value={medium_ppm} name={"PPM"} />
                <StatsCard
                  value={`${medium_accuracy}%`}
                  name={"Precisión"}
                />
              </div>
              :
              <h2>No hay datos que mostrar.</h2>
            }

          </section>
        </div>
      </div>
      <div className={containers.buttonContainer} style={{ marginBottom: '0.25vw' }}>
        <button className={buttonStyles.secondary} onClick={handleOnExitClick}>
          Regresar
        </button>
      </div>
    </main>
  );
}

export default function StudentInfo() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <StudentInfoComponent />
    </Suspense>
  );
}
