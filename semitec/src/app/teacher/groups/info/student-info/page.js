"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import containers from "@/app/_styles/Containers.module.css";
import Profile from "@/app/components/profile-data";
import ProgressCard from "@/app/components/progressCard";
import StatsCard from "@/app/components/statsCard";
export default function StudentInfo() {
    const searchParams = useSearchParams()
    const [profile, setProfile] = useState("");
    const [stats, setStats] = useState({avg_time_taken: 0, avg_mistakes: 0, avg_accuracy_rate: 0, avg_pulsation_per_minute:0 });
    const [medium_accuracy, setAccuracy] = useState(0);
    const [medium_ppm, setPPM] = useState(0)
    const [completedLessons, setCompletedLessons] = useState();
    const [assignedLessons, setAssignedLessons] = useState();

  const getData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/groups/info/student-profile?student_id=${searchParams.get("student_id")}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify
                ({
                  student_id: searchParams.get("student_id")
                })
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
      }
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPPMandAccuracy = async () => {
    {
      console.log("get stats")
      let studentId = Number(searchParams.get("student_id"))
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/lessons/stats`, {
            method: 'POST',
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                  student_id: studentId,
                })
          })
          
          const data = await response.json()
          const initialValue = 0;
          let sum_ppm = data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.pulsation_per_minute,
            initialValue,
          );

          let sum_accuracy = data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.accuracy_rate,
            initialValue,
          );
        
          if (data.length!==0)
          {
            sum_accuracy /= data.length
            sum_ppm /= data.length
            setPPM(sum_ppm.toFixed(0))
            setAccuracy(sum_accuracy.toFixed(0))
          }
          
    } catch (error){
        console.log(error)
    }
  }  
  }

  const getLessons = async () => {
    {
      let studentId = Number(searchParams.get("student_id"))
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/lessons/count-pending`, {
            method: 'POST',
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify
                ({
                  student_id: studentId,
                })
          });
          const data = await response.json()
          setAssignedLessons(data[0].assigned_lessons_count)
          setCompletedLessons(data[0].unique_metrics_count)
    } catch (error) {
        console.log(error)
    }
  }}

  useEffect(() => {
    //getData();
    //getStats();
    getPPMandAccuracy();
    getLessons();
    console.log(medium_accuracy)
    console.log(medium_ppm)
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
            <ProgressCard
              amount={completedLessons}
              text={"actividades completadas"}
            />
            <ProgressCard
              amount={assignedLessons}
              text={"actividades pendientes"}
            />
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
            {console.log(medium_accuracy)}
            {console.log(medium_ppm)}

            {medium_ppm !== 0 && medium_accuracy !==0?
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
    </main>
  );
}
