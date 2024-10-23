import { AccessibilityBar } from "../components/accessibility-bar";
import NavBar from "../components/NavBar";

const menuList = [
  { text: "Lecciones", href: "/guest/lessons" },
  { text: "Acerca de", href: "/guest/about" },
  { text: "Preguntas frecuentes", href: "/guest/faqs" },
];

export default function GuestLayout({ children }) {
  return (
    <>
      <header>
        <NavBar menuList={menuList} />
        <AccessibilityBar />
      </header>
      {children}
    </>
  );
}
