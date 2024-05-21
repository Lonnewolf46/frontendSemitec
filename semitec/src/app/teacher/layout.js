import { AccessibilityBar } from "../components/accessibility-bar";
import NavBar from "../components/NavBar";

const menuList = [
  { text: "Inicio", href: "/teacher/home" },
  { text: "Mis grupos", href: "/teacher/groups" },
  { text: "Lecciones", href: "/teacher/lessons" },
  { text: "Acerca de", href: "/teacher/about" },
  { text: "Preguntas frecuentes", href: "/teacher/faqs" },
];

export default function TeacherLayout({ children }) {
  return (
    <>
      <NavBar menuList={menuList} />
      <AccessibilityBar />
      {children}
    </>
  );
}
