import Image from "next/image";
import styles from "./LessonCard.module.css";
import details from "../ui/details.svg";

export default function ListCard({
  imagePath,
  lessonName,
  active,
  middleInfo,
}) {
  return (
    <div
      className={`${styles.lessonCardContainer} ${active ? styles.active : ""}`}
    >
      <Image src={imagePath} alt="" />
      <div className={styles.itemInfo}>
        <div className={styles.medium}>{lessonName}</div>
        <div className={styles.middle}>{middleInfo}</div>
        <div className={`${styles.medium} ${styles.details}`}>
          <Image src={details} alt="" />
          <div style={{ marginRight: "10px" }}>Detalles</div>
        </div>
      </div>
    </div>
  );
}
