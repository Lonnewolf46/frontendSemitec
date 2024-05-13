"use client";
import { useState } from "react";
import buttonStyles from "@/app/_styles/Button.module.css";
export default function CreateGroup() {
    const [name, setName] = useState('')
  return (
    <div
      style={{
        height: "70vh",
        width: "30vw",
        borderRadius: "50px",
        backgroundColor: "#ebebeb",
        padding: "20px",
        textAlign: "center", 
        margin: "10vh auto 10vh auto",
      }}
    >
      <h1>Crear Grupo</h1>
      <div style={ {marginBottom: "15px"}}>
        <label style={{display: "block", marginBottom: "5px"}} htmlFor="correo">Nombre: </label>
        <input type="text" id="groupName" />
</div>
        <button className={buttonStyles.primary}>Generar código</button>
    </div>
  );
}
