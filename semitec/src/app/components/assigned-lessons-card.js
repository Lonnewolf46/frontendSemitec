import styles from '@/app/_styles/AssignedLessonsCard.module.css'

export default function AssignedLesssonsCard({ //cambiar handleStart por la func que inicie la leccion asignada handleStartAssigned
    handleStartAssignedLesson,
    quantity,
    }) {
    return (
        <article className={`${styles.container} card-container-theme`}>
          
          
          <div>
            <div className={styles.title}>Siguiente tarea</div>
            {
              quantity !== 1?
                <div className={styles.info}>Tenés {quantity} tareas pendientes.</div>
              :
                <div className={styles.info}>Tenés {quantity} tarea pendiente.</div>
            }
            
          </div>
          {quantity !== 0 && (
            (<button className={styles.button} onClick={handleStartAssignedLesson}>
              Iniciar
            </button>)
          )
          }

      </article>
    );
}