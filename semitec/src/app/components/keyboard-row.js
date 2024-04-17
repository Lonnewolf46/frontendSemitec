import Key from "./key";

import styles from "./Keyboard.module.css";
export default function KeyboardRow({ keyList }) {
  return (
    <div className={styles.row}>
      {keyList.map((key) => (
        <Key key={key} value={key.value} color={key.color} />
      ))}
    </div>
  );
}