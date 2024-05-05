import KeyboardRow from "./keyboard-row";
import data from "../lib/keyboard";
import styles from "./Keyboard.module.css";
import Key from "./key";
export default function Keyboard() {
  return (
    <div className={styles.keyboardContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.functionKeys}>
          <KeyboardRow keyList={data.keyboard.firstFunCol} />
          <KeyboardRow keyList={data.keyboard.secondFunCol} />
          <KeyboardRow keyList={data.keyboard.thirdFunCol} />
          <KeyboardRow keyList={data.keyboard.fourthFunCol} />
        </div>
        <div className={styles.alphaKeys}>
          <KeyboardRow keyList={data.keyboard.firstAlphaRow} />
          <KeyboardRow keyList={data.keyboard.secondAlphaRow} />
          <KeyboardRow keyList={data.keyboard.thirdAlphaRow} />
          <KeyboardRow keyList={data.keyboard.fourthAlphaRow} />
          <KeyboardRow keyList={data.keyboard.fifthAlphaRow} />
        </div>
      </div>
      <div className={styles.control}>
        <div className={styles.firstControlRow}>
          <KeyboardRow keyList={data.keyboard.firstControlRow} />
        </div>
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
