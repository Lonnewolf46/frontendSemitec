"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/_styles/CreateLesson.module.css";

import buttonStyles from "@/app/_styles/Button.module.css";
export default function CreatLesson() {
  const router = useRouter();
  const [name, setVarName] = useState("");
  const [level_id, setLevelID] = useState("");
  const [words, setVarWords] = useState("");
  const [description, setDescription] = useState("");
  const [min_time, setMinTime] = useState("");
  const [min_mistakes, setMinMistakes] = useState("");
  const [success, setSucess] = useState("");

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
        "http://25.37.76.172:5000/teacher/lessons/create",
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
    setMinTime(event.target.value);
  };
  const handleChangeMaxMistakes = (event) => {
    setMinMistakes(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    createLesson();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Crear Lección</h1>
        <form
          onSubmit={handleClick}
          style={{ marginBottom: "15px", textAlign: "left", fontSize: "1.3vw" }}
        >
          <label
            style={{ display: "block", marginBottom: "0.5em" }}
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            style={{
              width: "100%",
              fontSize: "1.3vw",
              borderRadius: "4px",
              border: "solid 1px #ebebeb",
              padding: "0.3em",
            }}
            required
            value={name}
            minLength={1}
            maxLength={16}
            onChange={handleChangeName}
            type="text"
            id="name"
          />
          <label
            style={{
              display: "block",
              marginTop: "1em",
              marginBottom: "0.5em",
            }}
            htmlFor="level_id"
          >
            Nivel
          </label>

          <select
            id="level_id"
            style={{
              width: "100%",
              fontSize: "1.3vw",
              borderRadius: "4px",
              border: "solid 1px #ebebeb",

              padding: "0.3em",
            }}
            onChange={(e) => {
              setLevelID(e.target.value);
            }}
          >
            <option value="1">Nivel 1</option>
            <option value="2">Nivel 2</option>
            <option value="3">Nivel 3</option>
            <option value="4">Nivel 4</option>
          </select>

          <label
            style={{
              display: "block",
              marginTop: "1em",
              marginBottom: "0.5em",
            }}
            htmlFor="words"
          >
            Contenido de la Lección
          </label>
          <textarea
            required
            style={{
              width: "100%",
              fontSize: "1.3vw",
              borderRadius: "4px",
              border: "solid 1px #ebebeb",
              padding: "0.3em",
            }}
            value={words}
            rows="5"
            minLength={1}
            maxLength={1000}
            onChange={handleChangeWords}
            type="text"
            id="words"
          />
          <label
            style={{
              display: "block",
              marginTop: "1em",
              marginBottom: "0.5em",
            }}
            htmlFor="description"
          >
            Descripción
          </label>
          <textarea
            required
            style={{
              width: "100%",
              fontSize: "1.3vw",
              borderRadius: "4px",
              border: "solid 1px #ebebeb",

              padding: "0.3em",
            }}
            value={description}
            rows="5"
            minLength={1}
            maxLength={1000}
            onChange={handleChangeDescription}
            type="text"
            id="description"
          />
          <label
            style={{
              display: "block",
              marginTop: "1em",
              marginBottom: "0.5em",
            }}
            htmlFor="min_time"
          >
            Límite de tiempo en segundos
          </label>
          <input
            required
            style={{
              width: "100%",
              fontSize: "1.3vw",
              borderRadius: "4px",
              border: "solid 1px #ebebeb",
              padding: "0.3em",
            }}
            value={min_time}
            minLength={1}
            maxLength={8}
            onChange={handleChangeMaxTime}
            type="number"
            id="min_time"
          />
          <label
            style={{
              display: "block",
              marginTop: "1em",
              marginBottom: "0.5em",
            }}
            htmlFor="min_mistakes"
          >
            Cantidad máxima de errores
          </label>
          <input
            required
            style={{
              width: "100%",
              fontSize: "1.3vw",
              borderRadius: "4px",
              border: "solid 1px #ebebeb",
              padding: "0.3em",
            }}
            value={min_mistakes}
            minLength={1}
            maxLength={8}
            onChange={handleChangeMaxMistakes}
            type="number"
            id="min_mistakes"
          />
          <div style={{ margin: "auto", width: "fit-content" }}>
            <button
              style={{ marginTop: "1em" }}
              type="submit"
              className={buttonStyles.primary}
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
