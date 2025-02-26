"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/_styles/CreateGroup.module.css";
import Popup from "@/app/components/modularPopup/modularpopup";
import buttonStyles from "@/app/_styles/Button.module.css";

export default function CreateGroup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [modalMessage, setModalMessage] = useState();

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
          body: JSON.stringify({ var_group_name: name }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        { if (data[0].hasOwnProperty('out_group_code')) {
          setGroupCode(data[0].out_group_code);
        } else { 
          throw new Error('Expected data field "out_group_code" not found'); 
        }
      }
      }
    } catch (error) {
      setModalMessage("Ha ocurrido un error al crear el grupo.");
      setShowOverlay(true);
    }
  };

  //Watch for the event of escape key when the dialog is opened, then remove the listener.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowOverlay(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    createGroup();
  };
  
  const handleOverlayClickYes = () =>{
    setShowOverlay(false);
  }

  const handleOnExitClick = () => {
    router.push(`/teacher/groups`);
  }

  return (
    <>
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
            disabled={groupCode !== ""}/>
        </div>
        {groupCode ? (
          <>
          <p className={styles.sectionHeader}>Código del grupo</p>
          <p className={styles.code}>
              <strong>{groupCode}</strong>
          </p></>
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
        } }
      >
        Continuar
      </button>
    </div>
    <div className={styles.buttonContainer} style={{ marginBottom: '0.25vw' }}>
      <button hidden={groupCode !== ""} className={buttonStyles.secondary} onClick={handleOnExitClick}>
        Regresar
      </button>
    </div>
      <Popup
        title="Confirmación"
        message={modalMessage}
        onConfirm={handleOverlayClickYes}
        show={showOverlay}
        showCancel={false}/>
    </>
    
  );
}
