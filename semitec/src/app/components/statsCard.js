import styles from '@/app/_styles/StatsCard.module.css'

export default function StatsCard({ value, name }) {
    return (
        <article className={styles.container}>
            <div className={styles.value}>{value}</div>
            <div className={styles.name}>{name}</div>
        </article>
    )
}