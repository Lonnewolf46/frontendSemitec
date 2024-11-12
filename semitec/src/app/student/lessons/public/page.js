import LessonsScreen from "../../../components/lessons-screen";

export default function PublicLessons() {
  return (
    <main>
      <LessonsScreen title="Actividades públicas"
        lessonByCodeRoute="/lessons/public-by-code"
        lessonCountRoute="/lessons/public/total"
        pagedLessonsRoute="/lessons/public"
      />
    </main>
  );
}