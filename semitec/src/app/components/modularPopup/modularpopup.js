'use client'
import React, { useRef, useEffect } from 'react';
import styles from './modularpopup.module.css';
import buttonStyles from "@/app/_styles/Button.module.css";

const Overlay = ({ title, message, onConfirm, onCancel, show, showCancel }) => {
    //title: Title of the dialog. H2. If it's not present, it may cause weird behavior on Screen Readers.
    //message: Message on the center of the dialog
    //onConfirm: Action to take on case of a yes
    //onCancel: Action to take on cancel. Usually just hides the dialog.
    //show: Boolean attribute linked to the visibility of the dialog
    //showCancel: Boolean to indicate whether to show or not the Cancel Button.
    const dialogRef = useRef(null);
    const headingRef = useRef(null);
    const messageRef = useRef(null);
    
    useEffect(() => {
        if (show) {
            dialogRef.current.showModal();
            headingRef.current.focus();
        } else {
            dialogRef.current.close();
        }
    }, [show]);

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}>
            {title &&
                <h2 id="dialog-title" ref={headingRef} style={{margin:'0'}}>{title}</h2>
            }
            <div id="dialog-message" ref={messageRef} role="alert" aria-live="polite">
                <p>{message}</p>
            </div>
            {showCancel ? (
                <div className={styles.multipleButtons}>
                    <button className={buttonStyles.secondary} onClick={onCancel}>Cancelar</button>
                    <button className={buttonStyles.primary} onClick={onConfirm}>Aceptar</button>
                </div>
            ):(
                <div className={styles.singleButton}>                
                    <button className={buttonStyles.primary} onClick={onConfirm}>Aceptar</button>
                </div>
            )
                
            }
        </dialog> 
    );
};

export default Overlay;
