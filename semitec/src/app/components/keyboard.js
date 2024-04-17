import KeyboardRow from "./keyboard-row";
import data from "../lib/keyboard";
import styles from './Keyboard.module.css'
import Key from "./key";
export default function Keyboard() {
  return (
    <div className={styles.keyboardContainer}>
    <div>
      <div className={styles.functionKeys}> { /*
        <KeyboardRow keyList={['Esc']}/><KeyboardRow keyList={['', '', '', '']}/>
        <KeyboardRow keyList={['', '', '', '']}/>
  <KeyboardRow keyList={['', '', '','']}/> */}
      </div>
      <div className={styles.alphaKeys}>
        <KeyboardRow keyList={data.keyboard.firstAlphaRow} />
        <KeyboardRow keyList={data.keyboard.secondAlphaRow} />
        <KeyboardRow keyList={data.keyboard.thirdAlphaRow} />
        <KeyboardRow keyList={data.keyboard.thirdAlphaRow} />
        <KeyboardRow keyList={data.keyboard.fifthAlphaRow} />
      </div>
    </div>
    <div className={styles.control}> { /*
      <KeyboardRow keyList={['','','']} />
      <div>
      <KeyboardRow keyList={['','','']} />
      <KeyboardRow keyList={['','','']} />
      </div>
      <div>
      <KeyboardRow keyList={['↑']}/>
      <KeyboardRow keyList={['←','↓','→']} />
    </div> */}
    </div>
  </div>
  );
}