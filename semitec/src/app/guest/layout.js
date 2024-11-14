import { AccessibilityBar } from "../components/accessibility-bar";
import NavBar from "../components/NavBar";

const menuList = [
  { text: "Actividades", href: "/guest/lessons", children: [{text: "Predeterminadas", href: "/guest/lessons/default"}, {text: "Públicas", href: "/guest/lessons/public"}]  },
  { text: "Acerca de", href: "/guest/about", children: [] },
  { text: "Preguntas frecuentes", href: "/guest/faqs", children: [] },
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
