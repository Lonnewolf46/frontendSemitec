import LessonsScreen from '../../../components/lessons-screen' 

export default function StudentAssignments() {
  return (
    <main>
      <LessonsScreen title="Tareas"
        lessonByCodeRoute="/student/lessons/assigned-by-code"
        lessonCountRoute="/student/lessons/assigned/total"
        pagedLessonsRoute="/student/lessons/assigned"
        />
    </main>
  );
}