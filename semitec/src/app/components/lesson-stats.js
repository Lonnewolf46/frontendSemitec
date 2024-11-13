"use client";

import styles from "./lesson-stats.module.css";
import buttonStyles from "@/app/_styles/Button.module.css";
import UIDisplayInfo from "./UIStateDisplay";
import StatsCard from "./statsCard"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function StatsDetailed({lessonId, studentId}) {

    const pathname = usePathname();
    const [userID, setUserID] = useState(studentId);
    const [lessonID, setlessonID] = useState(lessonId)
    const [userType, setUserType] = useState(pathname === "/student/groups" ? "student" : "teacher");
    const [stats, setStats] = useState([]);
    const [selectedStat, setSelectedStat] = useState(null);
    const [loading, setLoadingData] = useState(true); 
    const [errorLoading, setErrorLoad] = useState(false);

    const getLessonMetrics = async() =>{
        try {
            console.log(`Obtained: ${lessonId}, ${userID}`);
            //If the user is a teacher, then the student_ID must come from another screen.
            //If the user is a student, then the student_ID is provided on the header.
            let response;
        if(userType === "teacher"){
            response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${userType}/lessons/studentstats?user_id=${userID}`,{
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("auth-token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lesson_id: lessonId
                })
              });
        }
        else{
            response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${userType}/lessons/studentstats`,{
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("auth-token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lesson_id: lessonID
                })
              });
        }
          const data = await response.json();
          if (!Array.isArray(data)) {
                throw new Error('Unexpected data format');
            }
            console.log(data);
            setStats(data);
            const firstStat = { ...data[0], uniqueId: generateUniqueId(data[0], 0) };
            setSelectedStat(firstStat);
            setErrorLoad(false);
        } catch (error) {
            setErrorLoad(true);
        } finally {
          setLoadingData(false); // Set loading state to false after fetch is done
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const generateUniqueId = (stat, index) => {
        return `stat-${index}`;
    };

    const formatCompletion = (number) => {
        if(number === "1"){return "Completada"}
        else{return "Fallida"}
    }

    const handleChangeStats = (e) => {
        const selectedValue = e.target.value;
        const selectedStat = stats.find((stat, index) => generateUniqueId(stat, index) === selectedValue);
        setSelectedStat(selectedStat);
    };

    useEffect(() => {
        setUserID(studentId);
        setlessonID(lessonId);
        setLoadingData(true);
        setErrorLoad(false);
        getLessonMetrics();
      }, [lessonId]);
    
    const handleRetryLoad = () => {
        setLoadingData(true);
        setErrorLoad(false);
        getLessonMetrics();
    }

    //UI for loading data
    if (loading) {
        return (
        <UIDisplayInfo
            title="Cargando..."
        />
        )
    }

    if(errorLoading){
        return(
        <><UIDisplayInfo
            title="Error"
            message="Hubo un error al cargar las métricas." /><div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1vw' }}>
            <button
                className={buttonStyles.primary}
                onClick={handleRetryLoad}
            >
                Reintentar
            </button>
            </div></>
        )
    }
    return(
        <div>
            <label htmlFor="stat" className={styles.formsLabel}>Fecha de completación</label>
            <select
              id="stat"
              className={styles.select}
              onChange={handleChangeStats}
              value={selectedStat ? selectedStat.uniqueId : ''}
            >
              {stats.length === 0 ? (
                <option disabled>Algo salió mal</option>
              ) : (
                stats.map((stat, index) => {
                const uniqueId = generateUniqueId(stat, index);
                return(
                    <option
                    key={uniqueId}
                    value={uniqueId}
                    >
                        {formatDate(stat.completion_date)}
                    </option>
                );
                }) 
              )}
            </select>
            {selectedStat && (
                <>
                <div style={{ display: 'flex', maxWidth: '100%' ,alignContent: 'center', justifyContent: 'center'}}>
                    <StatsCard name={formatCompletion(selectedStat.is_complete)}></StatsCard>
                </div>
                <div style={{ display: 'flex', maxWidth: '100%' ,alignContent: 'center', justifyContent: 'space-around'}}>
                    <StatsCard name={"Tiempo (segundos)"} value={selectedStat.time_taken}></StatsCard>
                    <StatsCard name={"Errores"} value={selectedStat.mistakes}></StatsCard>
                </div>
                <div style={{ display: 'flex', maxWidth: '100%' ,alignContent: 'center', justifyContent: 'space-around'}}>
                    <StatsCard name={"Precisión"} value={`${selectedStat.accuracy_rate}%`}></StatsCard>
                    <StatsCard name={"PPM"} value={selectedStat.pulsation_per_minute}></StatsCard>
                </div>
                </>
            )}
        </div>
    )
}