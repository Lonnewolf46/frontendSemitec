"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/app/_styles/CreateLesson.module.css";
import info from "@/app/ui/info-circle.svg";

import buttonStyles from "@/app/_styles/Button.module.css";
export default function CreatLesson() {
  const router = useRouter();
  const [name, setVarName] = useState("");
  const [level_id, setLevelID] = useState(1);
  const [words, setVarWords] = useState("");
  const [description, setDescription] = useState("");
  const [min_time, setMinTime] = useState("");
  const [min_mistakes, setMinMistakes] = useState("");
  const [iterations, setIterations] = useState("1");
  const [publicActivity, setPublicActivity] = useState(false);

  const createLesson = async () => {
    try {
      console.log(
        JSON.stringify({
          name: name,
          level_id: level_id,
          words: words,
          description: description,
          min_time: min_time,
          min_mistakes: min_mistakes,
        })
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/teacher/lessons/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({
            name: name,
            level_id: level_id,
            words: words,
            description: description,
            min_time: min_time,
            min_mistakes: min_mistakes,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        router.push("/teacher/lessons");
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
    if(event.target.value >= 0)
      setMinTime(event.target.value);
  };
  const handleChangeMaxMistakes = (event) => {
    if(event.target.value >= 0)
      setMinMistakes(event.target.value);
  };
  const handleChangeIterations = (event) => {
    if(event.target.value > 0)
      setIterations(event.target.value);
  }
  const handleChangePublic = (event) => {
    console.log(event.target.checked);
    setPublicActivity(event.target.checked);
  }

  const handleClick = (event) => {
    event.preventDefault();
    createLesson();
  };

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>Crear Actividad</h1>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div className={styles.leftContainer}>
            <h2 className={styles.sectionHeader}>Información de la lección</h2>
            <label htmlFor="name" className={styles.formsLabel}>Nombre</label>
            <input
              required
              value={name}
              placeholder="Ingrese el nombre de la actividad"
              minLength={1}
              maxLength={16}
              onChange={handleChangeName}
              type="text"
              id="name"
            />
            <label htmlFor="description" className={styles.formsLabel}>Descripción</label>
            <textarea
              required
              value={description}
              placeholder="Ingrese la descripción de la actividad"
              rows="5"
              minLength={1}
              maxLength={256}
              onChange={handleChangeDescription}
              type="text"
              id="description"
            />
            <label htmlFor="words" className={styles.formsLabel}>Contenido de la Lección</label>
            <textarea
              required
              value={words}
              placeholder="Ingrese el contenido de la actividad"
              rows="5"
              minLength={1}
              maxLength={256}
              onChange={handleChangeWords}
              type="text"
              id="words"
            />
          </div>
          <div className={styles.midContainer}>
            <h2 className={styles.sectionHeader}>Lexemas disponibles</h2>
            <p className={styles.sectionHeader} style={{marginTop: '-1vw'}}>(Opcional)</p>
          </div>
          <div className={styles.rightContainer}>
            <h2 className={styles.sectionHeader}>Personalización de la lección</h2>
            <label htmlFor="min_time" className={styles.formsLabel}>Límite de tiempo (Segundos)</label>
            <input
              required
              value={min_time}
              placeholder="Ingrese el tiempo máximo"
              minLength={1}
              maxLength={8}
              onChange={handleChangeMaxTime}
              type="number"
              id="min_time"
            />
            <label htmlFor="min_mistakes" className={styles.formsLabel}>Cantidad máxima de errores</label>
            <input
              required
              value={min_mistakes}
              placeholder="Ingrese el máximo de errores permitidos"
              minLength={1}
              maxLength={8}
              onChange={handleChangeMaxMistakes}
              type="number"
              id="min_mistakes"
            />

            <label htmlFor="iterations" className={styles.formsLabel}>Iteraciones</label>
            <input
              required
              placeholder="Ingrese las iteraciones del contenido"
              value={iterations}
              minLength={0}
              maxLength={2}
              onChange={handleChangeIterations}
              type="number"
              id="iterations"
            />
            <label htmlFor="level_id" className={styles.formsLabel}>Nivel</label>
            <select
              id="level_id"
              onChange={(e) => {
                setLevelID(e.target.value);
              }}
            >
              <option value="1">Nivel 1</option>
              <option value="2">Nivel 2</option>
              <option value="3">Nivel 3</option>
              <option value="4">Nivel 4</option>
            </select>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <input
              style={{width: '24px', height: '24px', margin: '0vw'}}
              type="checkbox"
              value={publicActivity}
              onChange={handleChangePublic}
              id="publicActivity"
              alt="Marque esta casilla si desea que la actividad sea pública y cualquier usuario pueda realizarla."
              />
              <label
                htmlFor="publicActivity"
                className={styles.formsLabel}
                style={{ flexGrow: 1, marginLeft: '10px', whiteSpace: 'nowrap'}}>
                  Actividad pública
              </label>
              <div className={styles.tooltip}>
                <Image 
                  src={info} 
                  alt="Info" 
                  style={{ maxHeight: '24px', maxWidth: '24px', marginLeft: '10px' }} 
                />
                <span className={styles.tooltipText}>
                  <p className={styles.formsLabel}>
                    Marque esta casilla si desea que su actividad sea pública y cualquier otro usuario pueda completarla.
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={buttonStyles.secondary}>
            Cancelar
          </button>
          <button className={buttonStyles.primary}>
            Asignar
          </button>
        </div>
      </div>
    </div>
  );
}
