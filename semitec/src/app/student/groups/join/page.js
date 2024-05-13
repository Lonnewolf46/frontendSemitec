"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import buttonStyles from '@/app/_styles/Button.module.css'

export default function JoinGroup() {
    const router = useRouter()
    const [groupCode, setGroupCode] = useState('')

    const join = async () => {
        try {
            const response = await fetch(
              "http://25.37.76.172:5000/student/groups/join", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({"group_code":groupCode})
              }
            );
            const data = await response.json()
            console.log(data) 
            if (response.ok) {
               router.push('/student/groups') 
            }
    
          } catch (error){
            console.log(error)
          }
    }

    const handleJoinGroup = () => {
        join()
        console.log('join group')
    }

    const handleCodeInputChange = (event) => {
        console.log(groupCode)
        setGroupCode(event.target.value)
    }

  return (
    <div
      style={{ margin: "10vh auto 10vh auto",
        width: "30vw",
        height: "60vh",
        padding: "30px",
        backgroundColor: "#ebebeb",
        borderRadius: "20px",
      }}
    >
      <h1>Unirse a un grupo</h1>
      <p>Digite el código del grupo al que desea unirse</p>

      <input
        onChange={handleCodeInputChange}
        aria-label="Ingrese el codigo del grupo"
        name="code"
        type="text"
        maxLength={16}
      />
      <div>
        <button className={buttonStyles.primary} onClick={handleJoinGroup}>Continuar</button>
      </div>
    </div>
  );
}
