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

    const getStats = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/groups/info/student-info?user_id=${searchParams.get("student_id")}`, {
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

  const getData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/groups/info/student-profile?user_id=${searchParams.get("student_id")}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
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

  useEffect(() => {
    getData();
    getStats();
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
              justifyContent: "space-between",
              borderBottom: "solid 6px #007172",
              paddingBottom: "50px",
            }}
          >
            <ProgressCard
              amount={stats.avg_mistakes}
              text={"errores promedio"}
            />
            <ProgressCard
              amount={`${stats.avg_time_taken}`}
              text={"tiempo promedio"}
            />
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
              <StatsCard
                value={`${stats.avg_accuracy_rate}%`}
                name={"Precisión"}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
