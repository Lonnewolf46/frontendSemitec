import { useEffect, useState } from "react";
import styles from "./Keyboard.module.css";

export default function Key({ value, color }) {
  const [keyColor, setKeyColor] = useState(color);
  const [fontColor, setFontColor] = useState("#000000");

  const handleKeyDown = (event) => {
    if (value === event.key) {
      setKeyColor("#007172");
      setFontColor("#ffffff");
    }
  };

  const handleKeyUp = (event) => {
    if (value === event.key) {
      setKeyColor(color);
      setFontColor("#000000");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  }, []);
  return (
    <div className={styles.key} style={{ backgroundColor: keyColor }}>
      <span style={{ color: fontColor }}>{value}</span>
    </div>
  );
}
