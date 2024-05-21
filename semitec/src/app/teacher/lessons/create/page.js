"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/_styles/CreateLesson.module.css";

import buttonStyles from "@/app/_styles/Button.module.css";
export default function CreatLesson() {
  const router = useRouter();
  const [var_name, setVarName] = useState("");
  const [var_level_id, setLevelID] = useState("");
  const [var_words, setVarWords] = useState("");
  const [var_description, setDescription] = useState("");
  const [var_min_time, setMinTime] = useState("");
  const [var_min_mistakes, setMinMistakes] = useState("");
  const [success, setSucess] = useState("");

  const createLesson = async () => {
    try {
      const response = await fetch(
        "http://25.37.76.172:5000/teacher/lessons/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ var_name : var_name, var_level_id : var_level_id, var_words : var_words, var_description : var_description, var_min_time : var_min_time, var_min_mistakes : var_min_mistakes }), 
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        success = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeName = (event) => {
    setVarName(event.target.value);
  };
  const handleChangeLevel = (event) => {
    setLevelID(event.target.value);
  };
  const handleChangeWords = (event) => {
    setVarWords(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeMaxTime = (event) => {
    setMinTime(event.target.value);
  };
  const handleChangeMaxMistakes = (event) => {
    setMinMistakes(event.target.value);
  };
  
  const handleClick = () => {
    createLesson();
    console.log(JSON.stringify({ var_name : var_name, var_level_id : var_level_id, var_words : var_words, var_description : var_description, var_min_time : var_min_time, var_min_mistakes : var_min_mistakes }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Crear Lección</h1>
        <div style={{ marginBottom: "15px", textAlign: "left", fontSize: "1.3vw", }}>
          <label
            style={{ display: "block", marginBottom: "0.5em" }}
            htmlFor="correo"
          >
            Nombre
          </label>
          <input style={{width: "100%", fontSize: "1.3vw", borderRadius: "4px", border: "solid 1px #ebebeb", padding: "0.3em" }}
            value={var_name}
            minLength={1}
            maxLength={16}
            onChange={handleChangeName}
            type="text"
            id="var_name"
          />
          <label
            style={{ display: "block", marginBottom: "0.5em" }}
            htmlFor="correo"
          >
            Nivel
          </label>
          <input style={{width: "100%", fontSize: "1.3vw", borderRadius: "4px", border: "solid 1px #ebebeb", padding: "0.3em" }}
            value={var_level_id}
            minLength={1}
            maxLength={16}
            onChange={handleChangeLevel}
            type="number" 
            required min="1"
            id="var_level_id"
          />
          <label
            style={{ display: "block", marginBottom: "0.5em" }}
            htmlFor="correo"
          >
            Texto
          </label>
          <textarea style={{width: "100%", fontSize: "1.3vw", borderRadius: "4px", border: "solid 1px #ebebeb", padding: "0.3em" }}
            value={var_words}
            rows="5" 
            minLength={1}
            maxLength={1000}
            onChange={handleChangeWords}
            type="text"
            id="var_words"
          />
          <label
            style={{ display: "block", marginBottom: "0.5em" }}
            htmlFor="correo"
          >
            Descripción
          </label>
          <textarea style={{width: "100%", fontSize: "1.3vw", borderRadius: "4px", border: "solid 1px #ebebeb", padding: "0.3em" }}
            value={var_description}
            rows="5" 
            minLength={1}
            maxLength={1000}
            onChange={handleChangeDescription}
            type="text"
            id="var_description"
          />
          <label
            style={{ display: "block", marginBottom: "0.5em" }}
            htmlFor="correo"
          >
            Límite de tiempo en segundos
          </label>
          <input style={{width: "100%", fontSize: "1.3vw", borderRadius: "4px", border: "solid 1px #ebebeb", padding: "0.3em" }}
            value={var_min_time}
            minLength={1}
            maxLength={16}
            onChange={handleChangeMaxTime}
            type="text"
            id="var_min_time"
          />
          <label
            style={{ display: "block", marginBottom: "0.5em" }}
            htmlFor="correo"
          >
            Cantidad máxima de errores
          </label>
          <input style={{width: "100%", fontSize: "1.3vw", borderRadius: "4px", border: "solid 1px #ebebeb", padding: "0.3em" }}
            value={var_min_mistakes}
            minLength={1}
            maxLength={16}
            onChange={handleChangeMaxMistakes}
            type="text"
            id="var_min_mistakes"
          />
        </div>
        {!success ? (
          <button onClick={handleClick} className={buttonStyles.primary}>
            Crear
          </button>
        ) : (
          <button
            onClick={() => {
              router.push("/teacher/lessons");
            }}
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  );
}
