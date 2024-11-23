"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import buttonStyles from "@/app/_styles/Button.module.css";
import styles from "@/app/_styles/JoinGroup.module.css";

export default function JoinGroup() {
  const router = useRouter();
  const [groupCode, setGroupCode] = useState("");

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
        alert("Exito")
        router.push("/student/groups");
      }
      else{
        alert("No fue posible unirte al grupo. Es posible que ya estés dentro de ese grupo");
      }
    } catch (error) {
      console.log(error);
      alert("Algo salió mal")
    }
  };

  const handleJoinGroup = (event) => {
    event.preventDefault();
    join();
  };

  const handleCodeInputChange = (event) => {
    console.log(groupCode);
    setGroupCode(event.target.value);
  };

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
    </div>
  );
}
