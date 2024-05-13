import Image from "next/image";
import kirby from "@/app/ui/Kirby.svg";
import styles from "@/app/_styles/WelcomeCard.module.css";

export default function WelcomeCard({ username }) {
  return (
    <>
      <div className={styles.container}>
        <div>
          <h1>¡Hola {username}!</h1>
          <p>Qué bueno verte de nuevo.</p>
        </div>
        <div>
          <Image src={kirby} alt="Kirby dandote la bienvenida!" />
        </div>
      </div>
    </>
  );
}
