import React from "react";
import styles from "./Keyboard.module.css";
export default function KeyboardRow({ keyList }) {
  return (
    <div className={styles.row}>
      {keyList.map((keyValue) => (
        <div key={keyValue} className={styles.key}>
          <span>{keyValue}</span>
        </div>
      ))}
    </div>
  );
}
