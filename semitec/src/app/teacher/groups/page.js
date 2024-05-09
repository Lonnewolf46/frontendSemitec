import TeacherGroupsTable from '../../components/teacher-groups-table';

export default function TeacherGroups() {
  return (
    <main style={{ width: "90vw", margin: "30px auto ", height: "70vh"}}>
      <h1>Mis grupos</h1>
      <TeacherGroupsTable />
    </main>
  );
}