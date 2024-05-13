"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import buttonStyles from "@/app/_styles/Button.module.css";
export default function CreateGroup() {
    const router = useRouter();
    const [name, setName] = useState('')
    const [groupCode, setGroupCode] = useState('')

    const createGroup = async () => {
      try {
        const response = await fetch(
          "http://25.37.76.172:5000/teacher/groups/create", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("auth-token"),
            },
            body: JSON.stringify({"name":name})
          }
        );
        const data = await response.json()
        console.log(data) 
        if (response.ok) {
          setGroupCode(data.group_code)
        }

      } catch (error){
        console.log(error)
      }
    }

    const handleChangeName = (event) => {
      setName(event.target.value)
    }
    const handleClick = () => {
      createGroup()
      console.log(name);
    }

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
        <input value={name}
        onChange={handleChangeName}type="text" id="groupName" />
</div>
        {groupCode ? <p><strong>{groupCode}</strong></p>: <></>}
        {!groupCode ? <button onClick={handleClick} className={buttonStyles.primary}>Generar código</button> :
        <button onClick={() => {
          router.push('/teacher/groups')
        }}>Continuar</button> }
    </div>
  );
}
