import KeyboardRow from "./keyboard-row";
import data from "../lib/keyboard";
import styles from "./Keyboard.module.css";
import Key from "./key";
export default function Keyboard() {
  return (
    <div aria-hidden="true" className={styles.keyboardContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.alphaKeys}>
          <KeyboardRow keyList={data.keyboard.firstAlphaRow} />
          <KeyboardRow keyList={data.keyboard.secondAlphaRow} />
          <KeyboardRow keyList={data.keyboard.thirdAlphaRow} />
          <KeyboardRow keyList={data.keyboard.fourthAlphaRow} />
          <KeyboardRow keyList={data.keyboard.fifthAlphaRow} />
        </div>
      </div>
      <div className={styles.control}>
        <div>
          <KeyboardRow keyList={data.keyboard.firstControlRow} />
          <KeyboardRow keyList={data.keyboard.firstControlRow} />
        </div>
        <div className={styles.arrows}>
          <KeyboardRow keyList={data.keyboard.firstArrowRow} />
          <KeyboardRow keyList={data.keyboard.secondArrowRow} />
        </div>
      </div>
    </div>
  );
}
