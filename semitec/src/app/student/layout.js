import { AccessibilityBar } from "../components/accessibility-bar";
import NavBar from "../components/NavBar";

const menuList = [
  { text: "Inicio", href: "/student/home", children: []  },
  { text: "Mis grupos", href: "/student/groups", children: []  },
  { text: "Actividades", href: "/student/lessons", children: [{text: "Tareas", href: "/student/lessons/assignment"}, {text: "Predeterminadas", href: "/student/lessons/default"}, {text: "Públicas", href: "/student/lessons/public"}]  },
  { text: "Acerca de", href: "/student/about", children: []  },
  { text: "Preguntas frecuentes", href: "/student/faqs", children: []  },
];

export default function StudentLayout({ children }) {
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
