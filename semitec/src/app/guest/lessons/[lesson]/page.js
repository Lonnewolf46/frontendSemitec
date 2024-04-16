import Keyboard from "@/app/components/keyboard";
import { Atkinson_Hyperlegible, Atkinson_Hyperlegible } from "next/font/google";
const atkinson_Hyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400",
});
import styles from "./Lesson.module.css";
export default function Lesson() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <span className={styles.done}>asdf jklñ a</span>
        <span className={styles.current}>s</span>
        <span className={styles.next}>df jklñ a</span>
      </div>
      <textarea className={atkinson_Hyperlegible.className}></textarea>
      <Keyboard />
    </div>
  );
}
