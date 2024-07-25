import Image from "next/image";
import kirby from "@/app/ui/semitec-doggo.gif";
import styles from "@/app/_styles/WelcomeCard.module.css";

export default function WelcomeCard({ username }) {
  return (
    <>
      <div className={styles.container}>
        <div>
          <h1 className={styles.name}>¡Hola {username}!</h1>
          <p className={styles.message}>Qué bueno verte de nuevo.</p>
        </div>
        <div>
          <Image width={232} height={189} src={kirby} alt="La mascota de semitec, un perro guía, dandote la bienvenida!" />
        </div>
      </div>
    </>
  );
}
