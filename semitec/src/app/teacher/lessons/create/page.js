"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/app/_styles/CreateLesson.module.css";
import info from "@/app/ui/info-circle.svg";

import buttonStyles from "@/app/_styles/Button.module.css";
import { Content } from "next/font/google";
export default function CreatLesson() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [level_id, setLevelID] = useState();
  const [words, setVarWords] = useState("");
  const [description, setDescription] = useState("");
  const [max_time, setMaxTime] = useState("");
  const [max_mistakes, setMaxMistakes] = useState("");
  const [iterations, setIterations] = useState("1");  
  const [publicActivity, setPublicActivity] = useState(false);
  const [available_lexemes, setLexemes] = useState([]);
  const [available_levels, setAvLevels] = useState([]);

  const createLesson = async () => {
    try {
      var sharedvalue = 0;
      if(publicActivity){sharedvalue = 1}
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/lessons/create`,// TODO: cambiar a /teacher/lessons/create
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //"auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({
            level_id: level_id,
            teacher_id: 1,//TODO: CAMBIAR EN PROD
            content: words,
            iterations: iterations,
            max_time: max_time,
            max_mistakes: max_mistakes,
            name: name,
            description: description,
            shared: sharedvalue
          }),
        }
      );
      const data = await response.json();
        if (data.success === true) {
          var helper = data.outlesson_id; //Contiene el ID de la lección ingresada
          router.push("/teacher/lessons");
          //Ir a asignación
        }
      else{
        alert("No se ha podido crear la lección, inténtelo de nuevo más tarde.");
      }
    } catch (error) {
      console.log(error);
      alert("Ha ocurrido un error al crear la lección, inténtelo de nuevo más tarde.")
    }
  };

  const getLexemes = async() => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/lessons/lexemes`);
      const data = await response.json();
      const lexemeNames = data.map(item => item.lexeme_name);
      setLexemes(lexemeNames);
    } catch (error) {
      console.log(error);
    }
  };

  const getLevels = async() => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/lessons/levels`);
      const data = await response.json();
      const levelsData = data.map(item => ({
        level_id: item.level_id,
        name: item.name, }));
      setAvLevels(levelsData);
      if (levelsData.length > 0 && !level_id) {
        setLevelID(levelsData[0].level_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeWords = (event) => {
    setVarWords(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeMaxTime = (event) => {
    if(event.target.value >= 0)
      setMaxTime(event.target.value);
  };
  const handleChangeMaxMistakes = (event) => {
    if(event.target.value >= 0)
      setMaxMistakes(event.target.value);
  };
  const handleChangeIterations = (event) => {
    if(event.target.value > 0)
      setIterations(event.target.value);
  }
  const handleChangeLevel = (event) => {
    setLevelID(event.target.value);
  };
  const handleChangePublic = (event) => {
    setPublicActivity(event.target.checked);
  }

  const handleClickLex = (lexeme) => {
    if(words.length!=0){
      setVarWords(words + ' ' + lexeme);
    }
    else{
      setVarWords(lexeme);
    }
  };

  useEffect(
    () => {
      getLexemes();
      getLevels();
    },[]);

  const validateForms = () => {
    const leftForm = document.getElementById('left-form');
    const rightForm = document.getElementById('right-form');
    if (leftForm.checkValidity() && rightForm.checkValidity() && level_id) {
      var sharedvalue = 0;
      if(publicActivity){sharedvalue = 1}
      createLesson();
    }
    else { 
        alert('Verifique que todos los campos estén llenos.'); 
      } 
    };

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>Crear Actividad</h1>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div className={styles.leftContainer}>
          <form id="left-form">
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
          </form>
          </div>
          <div className={styles.midContainer}>
            <h2 className={styles.sectionHeader}>Lexemas disponibles</h2>
            <p className={styles.sectionHeader} style={{marginTop: '-1vw'}}>(Opcional)</p>
            <div className={styles.lexemesContainer}>
              <div className={styles.lexemesContent}>
              {available_lexemes.length === 0 ? (
              <p className={styles.formsLabel}>No hay lexemas disponibles</p>
              ) : (
                available_lexemes.map((lexeme, index) => (
                  <button
                    className={styles.buttnedText}
                    key={index}
                    onClick={() => handleClickLex(lexeme)}> 
                  {lexeme}
                  </button>
                ))
              )}
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
          <form id="right-form">
            <h2 className={styles.sectionHeader}>Personalización de la lección</h2>
            <label htmlFor="min_time" className={styles.formsLabel}>Límite de tiempo (Segundos)</label>
            <input
              required
              value={max_time}
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
              value={max_mistakes}
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
              style={{width:'95%'}}
              onChange={(e) => {
                handleChangeLevel(e);
              }}
            >
              {available_levels.length === 0 ? (
                <option disabled>Error obteniendo los niveles</option>
              ) : ( available_levels.map((level) => (
                <option
                  key={level.level_id}
                  value={level.level_id}>
                    {level.name}
                </option> 
               )) 
              )}
            </select>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <input
              style={{width: '24px', height: '24px', margin: '1vw'}}
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
                  alt="" 
                  style={{ maxHeight: '24px', maxWidth: '24px', marginLeft: '10px' }} 
                />
                <span className={styles.tooltipText}>
                  <p className={styles.formsLabel}>
                    Marque esta casilla si desea que su actividad sea pública y cualquier otro usuario pueda completarla.
                  </p>
                </span>
              </div>
            </div>
            </form>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={buttonStyles.secondary}>
            Cancelar
          </button>
          <button id="validate-button" className={buttonStyles.primary} onClick={validateForms}>
            Asignar
          </button>
        </div>
      </div>
    </div>
  );
}
