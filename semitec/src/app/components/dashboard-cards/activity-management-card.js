import styles from "./activityManagementCard.module.css";

export default function ActivityManagementCard({
  text,
  buttonText,
  handleClick,
}) {
  return (
    <article className={`${styles.container} card-container-theme`}>
      <div>
        <div className={styles.title}>{text}</div>
      </div>
        <button className={styles.button} onClick={handleClick}>
          {buttonText}
        </button>
    </article>
  );
}