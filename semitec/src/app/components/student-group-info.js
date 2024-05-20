import styles from "./LessonInfo.module.css";
import StudentsTable from "./group-members-table";
export default function StudentGroupInfo({ group }) {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <>
      <div className={styles.wrapper}>
        <h2>{group.group_name}</h2>
        <p>{`${group.day} ${group.hour}`}</p>
      </div>
      <div className={styles.wrapper}>
        <h3>Profesor</h3>
        <p>{group.teacher_name}</p>
        <h4>Estudiantes</h4>
      </div>
      <StudentsTable group_id={group.group_id}/>
    </>
  );
}
