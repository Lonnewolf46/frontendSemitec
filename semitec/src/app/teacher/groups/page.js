"use client";
import { usePathname, useRouter } from "next/navigation";
import TeacherGroupsTable from "../../components/teacher-groups-table";
import buttons from "@/app/_styles/Button.module.css";
import containers from "@/app/_styles/Containers.module.css";
import styles from "@/app/_styles/TeacherGroups.module.css";

export default function TeacherGroups() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(`${pathname}/create`);
  };
  return (
    <main className={styles.mainContainer}>
      <div className={styles.flexContainer}>
        <h1 style={{ fontSize: "2.7vw" }}>Mis grupos</h1>
        <button className={buttons.primary} onClick={handleClick}>
          Nuevo Grupo
        </button>
      </div>
      <TeacherGroupsTable />
    </main>
  );
}
