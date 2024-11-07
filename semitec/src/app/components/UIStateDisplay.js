import React from 'react';
import styles from "./teacher-groups.module.css"; // Import your styles

const ErrorOrLoadingDisplay = ({ title, message }) => {
    return (
        <div style={{ width: '100%', textAlign: 'center', margin: '0.2vw' }}>
            <h1 style={{ fontSize: "2.1vw" }}>{title}</h1>
            {message && <p className={styles.formsLabel}>{message}</p>}
        </div>
    );
};

export default ErrorOrLoadingDisplay;
