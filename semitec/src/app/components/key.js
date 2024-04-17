import styles from "./Keyboard.module.css";
export default function Key({value, color}) {
    return (
        <div className={styles.key} style={{backgroundColor: color}}>
            <span>{value}</span>
        </div>
    )
}