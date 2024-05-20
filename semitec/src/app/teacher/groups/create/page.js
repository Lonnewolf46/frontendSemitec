"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/_styles/CreateGroup.module.css";

import buttonStyles from "@/app/_styles/Button.module.css";
export default function CreateGroup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [groupCode, setGroupCode] = useState("");

  const createGroup = async () => {
    try {
      const response = await fetch(
        "http://25.37.76.172:5000/teacher/groups/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ name: name }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setGroupCode(data.group_code);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleClick = () => {
    createGroup();
    console.log(name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Crear Grupo</h1>
        <div style={{ marginBottom: "15px", textAlign: "left", fontSize: "1.3vw", }}>
          <label
            style={{ display: "block", marginBottom: "0.5em" }}
            htmlFor="correo"
          >
            Nombre
          </label>
          <input style={{width: "100%", fontSize: "1.1vw", borderRadius: "4px", border: "solid 1px #ebebeb", padding: "0.3em" }}
            value={name}
            maxLength={16}
            onChange={handleChangeName}
            type="text"
            id="groupName"
          />
        </div>
        {groupCode ? (
          <p>
            <strong>{groupCode}</strong>
          </p>
        ) : (
          <></>
        )}
        {!groupCode ? (
          <button onClick={handleClick} className={buttonStyles.primary}>
            Generar código
          </button>
        ) : (
          <button
            onClick={() => {
              router.push("/teacher/groups");
            }}
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  );
}
