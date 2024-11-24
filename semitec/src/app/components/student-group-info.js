import styles from "./LessonInfo.module.css";
import StudentsTable from "./group-members-table";
export default function StudentGroupInfo({ group }) {
  return (
    <>
      <div  className={styles.wrapper}>
        <h1>{group.group_name}</h1>
      </div>
      <div style={{fontSize: "1.3vw" }} className={styles.wrapper}>
        <h3>Profesor</h3>
        <p>{group.teacher_name}</p>
        <h4>Estudiantes</h4>
      </div>
      <StudentsTable group_id={group.group_id}/>
    </>
  );
}
