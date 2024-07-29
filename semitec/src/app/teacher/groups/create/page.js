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
        `${process.env.NEXT_PUBLIC_API_HOST}/teacher/groups/create`,
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
  const handleClick = (event) => {
    event.preventDefault();
    createGroup();
  };

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={handleClick}>
        <h1 className={styles.title}>Crear Grupo</h1>
        <div className={styles.formContainer}>
          <label htmlFor="groupName">Nombre</label>
          <input
            required
            value={name}
            maxLength={16}
            onChange={handleChangeName}
            type="text"
            id="groupName"
          />
        </div>
        {groupCode ? (
          <p className={styles.code}>
            <strong>{groupCode}</strong>
          </p>
        ) : (
          <></>
        )}
        <button
          hidden={groupCode !== ""}
          type="submit"
          className={buttonStyles.primary}
        >
          Generar código
        </button>
      </form>
      <button
        hidden={groupCode === ""}
        className={buttonStyles.primary}
        onClick={() => {
          router.push("/teacher/groups");
        }}
      >
        Continuar
      </button>
    </div>
  );
}
