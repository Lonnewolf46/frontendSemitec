"use client";
import styles from "./../_styles/Menu.module.css";

export default function Menu({ isOpen, menuList, handleClick }) {
  return (
    <menu
      style={{
        position: "absolute",
        top: "125px",
        right: "10px", 
        margin: "0",
        padding: "0px",
        border: "1px solid white",
        zIndex: 1000,
      }}
    >
      {isOpen && (
        <ul className={styles.menuList}>
          {menuList.map((item, index) => (
            <li tabIndex={index} onClick={() => {handleClick(index)}} key={index}>
              <div style={{ padding: "5px" }}>{item}</div>
            </li>
          ))}
        </ul>
      )}
    </menu>
  );
}
