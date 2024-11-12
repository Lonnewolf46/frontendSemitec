import styles from '@/app/_styles/AssignedLessonsCard.module.css'

export default function AssignedLesssonsCard({ //cambiar handleStart por la func que inicie la leccion asignada handleStartAssigned
    handleStart,
    quantity,
    }) {
    console.log(quantity)
    console.log("I have printed")
    return (
        <article className={`${styles.container} card-container-theme`}>
          
          {quantity === 0 && (
            (<div>
              <div className={styles.info}> No tenés lecciones asignadas.</div>
            </div>)
        )
          }
            <div>
            <div className={styles.info}>Tenés {quantity} lecciones asignadas.</div>
            </div>
            <button className={styles.button} onClick={handleStart}>
            Iniciar
            </button>
              
        
        
      </article>
    );
}