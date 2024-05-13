import { AccessibilityBar } from "../components/accessibility-bar";
import NavBar from "../components/NavBar";

const menuList = [
  { text: "Inicio", href: "/student/home" },
  { text: "Mis grupos", href: "/student/groups" },
  { text: "Lecciones", href: "/student/lessons" },
  { text: "Acerca de", href: "/student/about" },
  { text: "Preguntas frecuentes", href: "/student/faqs" },
];

export default function StudentLayout({
    children,
}) {
    return (
        <>
      <NavBar menuList={menuList} />
      <AccessibilityBar />
            {children}
        </>
    )
}