"use client";
import StudentsTable from "@/app/components/group-members-table";
import StudentsTableSelection from "@/app/components/group-members-table-selection";
import { useParams, useSearchParams, useSearchParams } from "next/navigation";
import buttonStyles from "@/app/_styles/Button.module.css";
import styles from "@/app/_styles/TeacherGroups.module.css"
import { useEffect, useState } from "react";

/*
pTableType defines which type of table is shown as children
1: Table for student's management
2: Table for student's selection for assignments
*/
export default function GroupInfo({pGroup, pTableType}) {
  const [groupInfo, setGroupInfo] = useState(pGroup);
  const [tableType, setTableType] = useState(pTableType);

  const getGroupInfo = async () => {//This const can be safely removed
    try {
      //console.log(`Middle recieved: ${pGroup.group_id}`)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setGroupInfo(pGroup);
    setTableType(pTableType);
    getGroupInfo();
  }, [pGroup, pTableType]);

  if(tableType === "Regular"){
    return (
      <div>
        <div className={styles.header_container}>
          <div>
            <p className={styles.compact} style={{ fontWeight: "bold", marginRight: "10%"}}>{groupInfo.group_name}</p>
            <p className={styles.compact}>{groupInfo.group_code}</p>
          </div>
          <div >
            <button className={buttonStyles.primary}>Agregar Estudiante</button>
          </div>
        </div>
        <section>
          <h1 className={styles.heading}
              style={{ fontSize: "1.5vw" }}>
            Estudiantes
          </h1>
          <StudentsTable group_id={groupInfo.group_id} actions={true} />
        </section>
      </div>
    );
  }
  if(tableType === "Assignment"){
    return (
      <div>
        <section>
          <h1 className={styles.heading}
              style={{ fontSize: "1.5vw" }}>
            Estudiantes
          </h1>
          <StudentsTableSelection group_id={groupInfo.group_id} />
        </section>
      </div>
    );
  }
  
  return(
    <>
    </>
  )
}
