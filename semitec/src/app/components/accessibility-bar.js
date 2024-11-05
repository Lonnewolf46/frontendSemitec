import styles from "./AccessibilityBar.module.css";
import Image from "next/image";
import voiceSpeed from "../ui/speed.svg";
import typography from "../ui/typography.svg";
import smaller from "../ui/smaller.svg";
import bigger from "../ui/bigger.svg";
import contrast from "../ui/contrast.svg";

export function AccessibilityBar() {
  return (
    <div className={styles.bar}>
      <button aria-label="Disminuir tamaño de letra">

        <Image src={smaller} alt="" />
      </button>
      <button aria-label="Aumentar tamaño de letra">
        <Image src={bigger} alt="" />
      </button>
      <button aria-label="Seleccionar tipografía">
        <Image src={typography} alt="" />
      </button>
      <button aria-label="Selecionar tema de contraste" style={{ marginRight: "16px" }}>
        <Image src={contrast} sizes="(max-width: 24px) 1.6vw, 2.2vw" alt="" />
      </button>
    </div>
  );
}
