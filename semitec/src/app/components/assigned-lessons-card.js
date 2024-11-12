import styles from '@/app/_styles/AssignedLessonsCard.module.css'

export default function AssignedLesssonsCard({ //cambiar handleStart por la func que inicie la leccion asignada handleStartAssigned
    handleStart,
    quantity,
    }) {
    return (
        <article className={`${styles.container} card-container-theme`}>
          
          
          <div>
            <div className={styles.info}>Tenés {quantity} tareas asignadas.</div>
          </div>
          {quantity !== 0 && (
            (<button className={styles.button} onClick={handleStart}>
              Iniciar
            </button>)
          )
          }
          
              
        
        
      </article>
    );
}