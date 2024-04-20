import Key from "./key";

import styles from "./Keyboard.module.css";
export default function KeyboardRow({ keyList }) {
  return (
    <div className={styles.row}>
      {keyList.map((key, index) => (
        <Key key={index} value={key.value} color={key.color} />
      ))}
    </div>
  );
}
