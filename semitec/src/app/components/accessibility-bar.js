"use client";
import {useState} from "react";
import styles from "./AccessibilityBar.module.css";
import Image from "next/image";
import voiceSpeed from "../ui/speed.svg";
import typography from "../ui/typography.svg";
import smaller from "../ui/smaller.svg";
import bigger from "../ui/bigger.svg";
import contrast from "../ui/contrast.svg";
import { useTheme } from "next-themes";
import Menu from "@/app/components/Menu.js";

export function AccessibilityBar() {
  const { theme, setTheme } = useTheme();
  const [themesMenuStatus, setThemesMenuStatus] = useState(false)

  const themes = ["claro", "oscuro", "blanco", "negro", "gris"];
  const openThemesMenu = () => {
    setThemesMenuStatus((prev) => !prev);
  };

  const handleThemeChange = (index) => {
    console.log('changing theme', index)
    setTheme(themes[index]);
  };

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
      <button aria-label="Seleccionar velocidad de voz">
        <Image src={voiceSpeed} alt="" />
      </button>
      <button
        aria-label="Selecionar tema de contraste"
        style={{ marginRight: "16px" }}
        onClick={openThemesMenu}
      >
        <Image src={contrast} sizes="(max-width: 24px) 1.6vw, 2.2vw" alt="" />
      </button>
      <Menu
        isOpen={themesMenuStatus}
        menuList={themes}
        handleClick={handleThemeChange}
      />
    </div>
  );
}
