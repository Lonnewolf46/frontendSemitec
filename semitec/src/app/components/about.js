import styles from "@/app/_styles/About.module.css"
import logo from "@/app/ui/semitec_logo.svg"
import Image from "next/image"   

export default function About() {
    return (<main>
        <div className={styles.containerTitle}><h1>Acerca de SEMITEC</h1></div>
        <div className={styles.containerParagraph}><p>SEMITEC es una plataforma desarrollada por el Tecnológico de, Costa Rica para facilitar
            el aprendizaje de la mecanografía a personas con discapacidad visual. Nuestra plataforma
            autónoma ofrece un proceso de aprendizaje progresivo, desde la exploración inicial
            del teclado hasta el dominio completo de la mecanógrafía. </p>
            <p>Nos comprometemos a brindar una experiencia educativa inclusiva y accesible para todos los usuarios.
                Con característícas como selección de tamaños de fuente, tipografías y temas de contraste,
                así como opciones de velocidad de voz ajustable, estamos dedicados a hacer
                que el aprendizaje sea cómodo y efectivo para cada persona.</p>
            <p>Nuestro equipo está formado por expertos en educación especial, desarrollo web y accesibilidad digital,
                comprometidos con la calidad y la inclusión.
                Creemos en el acceso igualitario a la educación y trabajamos para hacer que nuestras herramientas educativas sean accesibles para todos</p>
            <p>iÚnete a nosotros en nuestro esfuerzo por hacer que la educación sea verdaderamente inclusiva!</p>
            </div>
            <div className={styles.containerImage}><Image src={logo} alt="Logo de SEMITEC. Teclado braile con la leyenda SEMITEC en la parte inferior"/></div>
    </main>)
}