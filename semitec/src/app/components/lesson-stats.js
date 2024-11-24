"use client";

import styles from "./lesson-stats.module.css";
import buttonStyles from "@/app/_styles/Button.module.css";
import UIDisplayInfo from "./UIStateDisplay";
import StatsCard from "./statsCard"
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import accessibility from 'highcharts/modules/accessibility';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export default function StatsDetailed({lessonId, studentId}) {
    const theme = useTheme();
    const pathname = usePathname();
    const [userID, setUserID] = useState(studentId);
    const [lessonID, setlessonID] = useState(lessonId)
    const [userType, setUserType] = useState(pathname === "/student/groups" ? "student" : "teacher");
    const [stats, setStats] = useState([]);
    const [selectedStat, setSelectedStat] = useState();
    const [loading, setLoadingData] = useState(true); 
    const [errorLoading, setErrorLoad] = useState(false);
    const [graphVisible, setGraphVisible] = useState(false);
    const [selectedDataType, setSelectedDataType] = useState('Pulsaciones por minuto');

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
    const currentTheme = themes[theme.theme] || themes.Predeterminado;
    const getChartData = () => {
        switch(selectedDataType){
            case "Pulsaciones por minuto":
                return stats.map(stat => stat.pulsation_per_minute)
            case "Errores":
                return stats.map(stat => stat.mistakes);
            case "Tiempo (segundos)":
                return stats.map(stat => stat.time_taken);
            case "Precisión (Porcentaje)":
                return stats.map(stat => stat.accuracy_rate);
        }   
    }
    const options = {
        chart: {
          backgroundColor: currentTheme.backgroundColor,
          style: {
            color: currentTheme.textColor,
          }
        },
        title: {
          text: "Estadísticas generales",
          style: {
            color: currentTheme.textColor,
          }
        },
        xAxis: {
            title: { text: 'Intento', // Label for the x-axis
                style: { 
                    color: currentTheme.textColor, 
                } 
            }, 
            categories: stats.map(stat => stat.stats_id+1), // Assuming x-axis is based on stats_id
            labels: {
                style: { 
                    color: currentTheme.textColor, 
                } 
            } 
        },
        yAxis: {
          title: {
            text: selectedDataType.charAt(0).toUpperCase() + selectedDataType.slice(1).replace('_', ' '),
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
            name: selectedDataType.charAt(0).toUpperCase() + selectedDataType.slice(1).replace('_', ' '),
            data: getChartData(),
          }
        ],
      };

    const getLessonMetrics = async() =>{
        try {
            //If the user is a teacher, then the student_ID must come from another screen.
            //If the user is a student, then the student_ID is provided on the header.
            let response;
        //Teacher
        if(studentId){
            response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/teacher/lessons/studentstats?user_id=${userID}`,{
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
        //Student
        else{
            response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/student/lessons/studentstats`,{
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
            data.forEach((stat, index) => {
                stat.stats_id = index; // Adding a unique stats_id starting from 1 
            });
            setStats(data);
            setSelectedStat(data[0].stats_id);
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

    const formatCompletion = (number) => {
        if(number === "1"){return "Completada"}
        else{return "Fallida"}
    }

    const handleChangeStats = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setSelectedStat(selectedValue);
    };

    const handleGraphChange = () => {
        setGraphVisible(!graphVisible);
    }

    const handleDataTypeChange = (e) => {
        setSelectedDataType(e.target.value);
    }

    useEffect(() => {
        setUserID(studentId);
        setlessonID(lessonId);
        setLoadingData(true);
        setErrorLoad(false);
        setGraphVisible(false);
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
        <div style={{maxHeight:'100%'}}>
            {graphVisible === false ? (
                <>
                <label htmlFor="stat" className={styles.formsLabel}>Fecha de completación</label>
                <select id="stat"
                    className={styles.select}
                    onChange={handleChangeStats}
                    value={selectedStat !== null ? selectedStat : ''}
                > {stats.length === 0 ? (
                    <option disabled>Algo salió mal</option>
                    ) : (
                        stats.map((stat) => (
                        <option
                            key={stat.stats_id}
                            value={stat.stats_id}
                        > {
                            formatDate(stat.completion_date)
                            }
                        </option> 
                        ))
                        )
                    }
                </select>
                {selectedStat !== null && (
                    <>
                    <div style={{ display: 'flex', maxWidth: '100%' ,alignContent: 'center', justifyContent: 'center'}}>
                        <StatsCard name={formatCompletion(stats[selectedStat].is_complete)}></StatsCard>
                    </div>
                    <div style={{ display: 'flex', maxWidth: '100%' ,alignContent: 'center', justifyContent: 'space-around'}}>
                        <StatsCard name={"Tiempo (segundos)"} value={stats[selectedStat].time_taken}></StatsCard>
                        <StatsCard name={"Errores"} value={stats[selectedStat].mistakes}></StatsCard>
                    </div>
                    <div style={{ display: 'flex', maxWidth: '100%' ,alignContent: 'center', justifyContent: 'space-around'}}>
                        <StatsCard name={"Precisión"} value={`${stats[selectedStat].accuracy_rate}%`}></StatsCard>
                        <StatsCard name={"PPM"} value={stats[selectedStat].pulsation_per_minute}></StatsCard>
                    </div>
                    </>
                )}
                </>
                ) : (
                <>
                    <fieldset style={{borderRadius:'4px'}}>
                        <legend>Seleccione la métrica que desea en el gráfico:</legend>
                        <div className={styles.radioContainer}>
                            <div style={{display: 'flex', alignItems:'center'}}>
                                <label for="PPMRadio">PPM</label>
                                <input id="PPMRadio" type="radio" value="Pulsaciones por minuto" checked={selectedDataType === "Pulsaciones por minuto"} onChange={handleDataTypeChange} />
                            </div>

                            <div style={{display: 'flex', alignItems:'center'}}>
                                <label for="mistakesRadio">Errores</label>
                                <input id="mistakesRadio" type="radio" value="Errores" checked={selectedDataType === "Errores"} onChange={handleDataTypeChange} /> 
                            </div>
                            <div style={{display: 'flex', alignItems:'center'}}>
                                <label for="timeRadio">Tiempo</label>
                                <input id="timeRadio" type="radio" value="Tiempo (segundos)" checked={selectedDataType === "Tiempo (segundos)"} onChange={handleDataTypeChange} />
                            </div>
                            <div style={{display: 'flex', alignItems:'center'}}>
                                <label for="precisionRadio">Precisión</label>
                                <input id="precisionRadio" type="radio" value="Precisión (Porcentaje)" checked={selectedDataType === "Precisión (Porcentaje)"} onChange={handleDataTypeChange} />
                            </div>
                        </div>
                    </fieldset>
                    <div className={styles.chartContainer}>
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ className: 'highcharts-container' }}/>
                    </div>
                </>
            )}
            {stats.length > 1 && ( 
                <div className={styles.buttonContainer}>
                    <button id="validate-button" className={buttonStyles.primary} onClick={handleGraphChange}>
                        {graphVisible ? 'Ver estadísticas' : 'Ver gráfico'}
                    </button>
                </div>
            )
            }
        </div>
    )
}