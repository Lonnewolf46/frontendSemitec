'use client'
import styles from "./faqs.module.css"
import dropdownArrowIcon from "@/app/ui/arrow-drop-down.svg"
import { useState } from "react";
import Image from "next/image";


export default function FAQs() {
    const [selectedFAQ, setSelectedFAQ] = useState(null)
    const data = [
        {
            "id": 0,
            "question": "¿Cómo puedo acceder a <NAME>?",
            "answer": "Puedes acceder a todo lo que <NAME> tiene para ofrecerte mediante la sección de registro. Simplemente dirígete a la pantaña de inicio de sesión y selecciona 'Registrarse'."
        },
        {
            "id": 1,
            "question": "¿Qué habilidades de mecanografía puedo aprender en <NAME>?",
            "answer": "<NAME> ofrece un programa completo de aprendizaje de mecanografía, desde las lecciones básicas de posicionamiento de dedos hasta la práctica avanzada de velocidad y precisión en el teclado alfanumérico y la tecla 'Enter'."
        },
        {
            "id": 2,
            "question": "¿Qué opciones de accesibilidad están disponibles en <NAME>?",
            "answer": "<NAME> ofrece opciones de diferentes temas visuales y tamaños de letra. Tus preferencias son guardadas y estarán esperando ahí para la próxima vez que inicies sesión."
        },
        {
            "id": 3,
            "question": "¿Cómo puedo guardar mi progreso en <NAME>?",
            "answer": "El progreso de una lección se guarda automáticamente con al terminarla. Todo lo que necesitas es una conexión a internet estable y un navegador web."
        },
        {
            "id": 4,
            "question": "¿Qué tipo de seguimiento y retroalimentación puedo esperar en mientras uso <NAME>?",
            "answer": "Respuesta"
        },
        {
            "id": 5,
            "question": "¿En qué consisten los niveles de práctica?",
            "answer": "<NAME> ofrece 3 distintos niveles de dificultdad. El comportamiento del sintetizador de voz es lo que varía en cada nivel. En el Nivel 1 el sintetizador de voz irá caracter por caracter, mientras que en niveles superiores considerará lexemas completos."
        }
    ]

    const handleFAQClick = (id) => {
        setSelectedFAQ(selectedFAQ === id ? null : id);
    }

    return (
    <main>
        <div className={styles.splitMainContainer}>
            <div className={styles.parentContainer}>
                <div className={styles.containerTitle}>
                    <h1>Preguntas Frecuentes</h1>
                </div>
                <div>
                    <ul>
                        {data.map((item) => (
                            <>
                            <li
                                key={item.id}
                                onClick={() => handleFAQClick(item.id)}
                                className={`${styles.questionItem} ${selectedFAQ === item.id ? styles.expanded : ''}`}
                            >
                                <button
                                    aria-expanded={selectedFAQ === item.id}
                                    className={styles.buttnedText}
                                >
                                    <div className={styles.buttonContent}>
                                    <span>
                                        <p className={styles.containerParagraph}>{item.question}</p>
                                    </span>
                                        <Image src={dropdownArrowIcon} className={`${styles.buttonIcon} ${selectedFAQ === item.id ? styles.invertedIcon: ''}`} alt=''/>
                                    </div>
                                </button>
                            </li>
                            <>
                            {selectedFAQ === item.id && (
                                <div className={styles.answer}>
                                    {item.answer}
                                </div>)}
                            </>
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </main>
    )
}