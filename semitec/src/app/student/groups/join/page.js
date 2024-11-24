"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import buttonStyles from "@/app/_styles/Button.module.css";
import styles from "@/app/_styles/JoinGroup.module.css";
import Dialog from "@/app/components/modularPopup/modularpopup";

export default function JoinGroup() {
  const router = useRouter();
  const [groupCode, setGroupCode] = useState("");
  //DialogControl
  const [dialogVisible, setDialogVisible] = useState(false);
  const [modalTitle, setDialogTitle] = useState();
  const [modalMessage, setDialogMessage] = useState();
  const [opCompleteStatus, setOpCompleteStatus] = useState();//Used to change the modal dynamically depending on the response.

  const join = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/student/groups/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ var_group_code: groupCode }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data[0].insert_student_in_group) {
        setDialogTitle("Éxito");
        setDialogMessage("Ahora eres parte del grupo.");
        setDialogVisible(true);
        setOpCompleteStatus(true);
      }
      else{
        setDialogTitle("Fallo");
        setDialogMessage("No fue posible unirte al grupo. Es posible que ya estés en el grupo o el código sea incorrecto.");
        setDialogVisible(true);
      }
    } catch (error) {
      setDialogTitle("Fallo de conexión");
      setDialogMessage("Ha ocurrido un error al intentar unirte al grupo.");
      setDialogVisible(true);
    }
  };

  const handleJoinGroup = (event) => {
    event.preventDefault();
    join();
  };

  const handleCodeInputChange = (event) => {
    setGroupCode(event.target.value);
  };

  const handleDialogAccept = () => {
    if(opCompleteStatus){
      setDialogVisible(false);
      router.push("/student/groups");
    }
    else{
      setDialogVisible(false);
    }
  }

  //Watch for the event of escape key when the dialog is opened, then remove the listener.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDialogVisible(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={handleJoinGroup}>
        <h1 className={styles.title}>Unirse a un grupo</h1>
        <div className={styles.formContainer}>
          <label htmlFor="code">Código del grupo</label>
          <input
            onChange={handleCodeInputChange}
            required
            id="code"
            type="text"
            maxLength={16}
          />
        </div>
        <div>
          <button type="submit" className={buttonStyles.primary}>
            Continuar
          </button>
        </div>
      </form>
      <Dialog
        title={modalTitle}
        message={modalMessage}
        onConfirm={handleDialogAccept}
        show={dialogVisible}
        showCancel={false}
      />
    </div>
  );
}
