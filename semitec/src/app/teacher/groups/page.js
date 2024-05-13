"use client"
import { usePathname, useRouter } from 'next/navigation';
import TeacherGroupsTable from '../../components/teacher-groups-table';
import buttons from '@/app/_styles/Button.module.css'
import containers from '@/app/_styles/Containers.module.css'

export default function TeacherGroups() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(`${pathname}/create`)
    
  }
  return (
    <main style={{ width: "90vw", margin: "30px auto ", height: "70vh"}}>
      <h1>Mis grupos</h1>
      <TeacherGroupsTable />
      <div className={containers.alignLeft}>
        <button className={buttons.primary} onClick={ handleClick }>Nuevo Grupo</button>
      </div>
    </main>
  );
}