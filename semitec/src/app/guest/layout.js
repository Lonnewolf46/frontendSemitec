import { AccessibilityBar } from "../components/accessibility-bar";
import NavBar from "../components/NavBar";

const menuList = [
  { text: "Lecciones", href: "/guest/lessons", children: [{text: "Predeterminadas", href: "/teacher/lessons"}, {text: "Públicas", href: "/teacher/lessons"}]  },
  { text: "Acerca de", href: "/guest/about", children: [] },
  { text: "Preguntas frecuentes", href: "/guest/faqs", children: [] },
];

export default function GuestLayout({ children }) {
  return (
    <>
      <NavBar menuList={menuList} />
      <AccessibilityBar />
      {children}
    </>
  );
}
