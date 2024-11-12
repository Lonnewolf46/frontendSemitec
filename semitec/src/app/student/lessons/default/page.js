import LessonsScreen from "../../../components/lessons-screen";

export default function DefaultLessons() {
  return (
    <main>
      <LessonsScreen
        title="Actividades predeterminadas"
        lessonByCodeRoute="/lessons/default-by-code"
        lessonCountRoute="/lessons/default/total"
        pagedLessonsRoute="/lessons/default"
      />
    </main>
  );
}
