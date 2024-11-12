import LessonsScreen from '../../../components/lessons-screen' 

export default function TeacherAssignments() {
  return (
    <main>
      <LessonsScreen title="Tareas"
        lessonByCodeRoute="/teacher/lessons/created-by-code"
        lessonCountRoute="/teacher/lessons/private/total"
        pagedLessonsRoute="/teacher/lessons/private"
        />
    </main>
  );
}