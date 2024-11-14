import styles from '@/app/_styles/ProgressCard.module.css'

export default function ProgressCard({ amount, text}) {
  return(
  
  <article className={`${styles.container} card-container-theme`}>
    <div className={styles.amount}>{amount}</div>
    <div className={styles.text}>{text}</div>
  </article>);
}
