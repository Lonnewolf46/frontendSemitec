import TeacherGroupsTable from "@/app/components/teacher-groups-table";
import styles from "../../components/LessonsScreen.module.css";
import Image from "next/image";
import kirbi from '../../ui/Kirby.svg'

export default function TeacherHome() {
  return (
    <main>
      <div className={styles.lessonsMainContainer}>
        <div className={styles.leftContainer}>
          <div style={{justifyContent: "space-between", display:"flex", backgroundColor: "#ebebeb", borderRadius: "25px", padding: "10px"}}>
            <div>
              <h1>¡Hola Jesús!</h1>
              <p>Qué bueno verte de nuevo.</p>
            </div>
            <div>
              <Image src={kirbi} alt="Kirbi dandote la bienvenida!" />
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <TeacherGroupsTable />
        </div>
      </div>
    </main>
  );
}
