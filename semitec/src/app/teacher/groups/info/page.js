"use client";
import StudentsTable from "@/app/components/group-members-table";
import StudentsTableSelection from "@/app/components/group-members-table-selection";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import buttonStyles from "@/app/_styles/Button.module.css";
import styles from "@/app/_styles/GroupView.module.css"
import options from "@/app/ui/three-dots.svg";
import { useEffect, useState } from "react";
import Dialog from "@/app/components/modularPopup/modularpopup";

/*
pTableType defines which type of table is shown as children
1: Table for student's management
2: Table for student's selection for assignments
3: Table for just showing students, no controls or buttons

pGroup contains the following information from a Group:
  -Id
  -Name
  -Code
*/
export default function GroupInfo({pGroup, pTableType, onDeleteSuccess}) {
  const router = useRouter();
  const [groupInfo, setGroupInfo] = useState(pGroup);
  const [tableType, setTableType] = useState(pTableType);
  const [optionsVisible, setOptionsVisible] = useState(false);

  //DialogControl
  const [dialogVisible, setDialogVisible] = useState(false);
  const [modalTitle, setDialogTitle] = useState();
  const [modalMessage, setDialogMessage] = useState();
  const [opCompleteStatus, setOpCompleteStatus] = useState();//Used to change the modal dynamically depending on the response.
  const [showCancelDialog, setShowCancel] = useState(true);
  
  const getGroupInfo = async () => {//This const can be safely removed
    try {
      //console.log(`Middle recieved: ${pGroup.group_id}`)
    } catch (error) {
      console.log(error);
    }
  };

  const leaveGroup = async(inGroup_id) => {
    try{
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/student/groups/members/remove`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            var_group_id: inGroup_id
        })
        }
      );
      const data = await response.json();
      if (data[0].delete_student_from_group) {
        setDialogTitle("Éxito");
        setDialogMessage("Has salido del grupo.");
        setShowCancel(false);
        setOpCompleteStatus(true);
      }
      else{
        setDialogTitle("Fallo");
        setDialogMessage("No se ha podido salir del grupo. Inténtelo de nuevo más tarde.");
        setShowCancel(false);
        setOpCompleteStatus(true);
      }
    } catch (error) {
      setDialogTitle("Fallo de conexión");
      setDialogMessage("Ha ocurrido un error al intentar salir del grupo.");
      setShowCancel(false);
      setOpCompleteStatus(true);
    }
  }

  useEffect(() => {
    setGroupInfo(pGroup);
    setTableType(pTableType);
    getGroupInfo();
  }, [pGroup, pTableType]);

  const handleAddStudentClick = () => {
    const groupId = groupInfo.group_id; 
    router.push(`/teacher/groups/students/add?group_id=${groupId}`);
  };
  
  const handleOptionsClick = () => {
    setOptionsVisible(!optionsVisible);
  }

  const handleLeaveGroupClick = () => {
    setOptionsVisible(!optionsVisible);
    setDialogTitle("Confirmación");
    setDialogMessage(`¿Está seguro de que desea salir del grupo ${pGroup.group_name}? Puede unirse de nuevo más tarde.`);
    setShowCancel(true);
    setOpCompleteStatus(false);
    setDialogVisible(true);
  }

  const handleDialogAccept = () => {
    if(opCompleteStatus){
      setDialogVisible(false);
      onDeleteSuccess();
      return;
    }
    else{
      leaveGroup(groupInfo.group_id);
    }
  }

  const handleDialogCancel = () => {
    setDialogVisible(false);
  }

  //Watch for the event of escape key when the dialog is opened, then remove the listener.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDialogVisible(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if(tableType === "Regular"){
    return (
      <div>
        <div className={styles.header_container}>
          <div>
            <h2>Información del grupo</h2>
            <p className={styles.compact} style={{ fontWeight: "bold", marginRight: "10%"}}>{groupInfo.group_name}</p>
            <p className={styles.compact}>Código: {groupInfo.group_code}</p>
          </div>
          <div>
            <button onClick={handleAddStudentClick} className={buttonStyles.primary}>Agregar Estudiante</button>
          </div>
        </div>
        <section>
          <h3 className={styles.heading}
              style={{ fontSize: "1.5vw" }}>
            Estudiantes
          </h3>
          <StudentsTable group_id={groupInfo.group_id} actions={true} />
        </section>
      </div>
    );
  }
  if(tableType === "Assignment"){
    return (
      <div>
        <section>
          <h2 className={styles.heading}
              style={{ fontSize: "1.5vw" }}>
            Estudiantes
          </h2>
          <StudentsTableSelection group_id={groupInfo.group_id} />
        </section>
      </div>
    );
  }
  if(tableType === "Read"){
    return (
    <>
      <div>
        <div className={styles.header_container}>
          <div>
            <h2 style={{margin:'0'}}>Información del grupo</h2>
            <p className={styles.compact} style={{ fontWeight: "bold", marginRight: "10%" }}>{groupInfo.group_name}</p>
            <p className={styles.compact}>Código: {groupInfo.group_code}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
            <div className={styles.buttonPopupcontainer}>
              <button
                style={{ backgroundColor: 'transparent' }}
                aria-label='Más opciones'
                aria-expanded={optionsVisible} onClick={handleOptionsClick} className={buttonStyles.primary}>
                <Image src={options} style={{ maxHeight: '3vh' }} alt=""></Image>
              </button>
              {optionsVisible && (
                <div className={styles.popup}>
                  <div style={{ display: 'flex', padding: '4px' }}>
                    <button
                      className={buttonStyles.primary}
                      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                      onClick={handleLeaveGroupClick}
                      aria-label={`Salir del grupo ${groupInfo.group_name}`}
                    >
                      Salir
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <section>
          <h3 className={styles.heading}
            style={{ fontSize: "1.5vw" }}>
            Estudiantes
          </h3>
          <StudentsTable group_id={groupInfo.group_id} actions={false} />
        </section>
      </div>
      <Dialog
        title={modalTitle}
        message={modalMessage}
        onCancel={handleDialogCancel}
        onConfirm={handleDialogAccept}
        show={dialogVisible}
        showCancel={showCancelDialog}
      />
    </>
    );
  }
  return(
    <>
    </>
  )
}
