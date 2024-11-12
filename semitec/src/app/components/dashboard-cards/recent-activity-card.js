import styles from './recent-activity-card.css';
export default function RecentActivityCard({title, subtitle}) {
    return (
        <article className={`${styles.container} card-container-theme`}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.info}>{subtitle}</div>
        </div>
      </article>
    );
}