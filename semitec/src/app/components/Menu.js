"use client";
import { useEffect, useRef } from "react";
import styles from "./../_styles/Menu.module.css";

export default function Menu({ isOpen, menuList, handleClick }) {
  const firstItemRef = useRef(null);

  useEffect(() => {
    if (isOpen && firstItemRef.current) {
      firstItemRef.current.focus();
    }
  }, [isOpen]);
  return (
    <menu
      style={{
        position: "absolute",
        top: "125px",
        right: "10px",
        margin: "0",
        padding: "0px",
        border: "0px solid white",
        zIndex: 1000,
      }}
    >
      {isOpen && (
        <ul className={styles.menuList}>
          {menuList.map((item, index) => (
            <li
              tabIndex={0}
              onClick={() => {
                handleClick(index);
              }}
              key={index}
              ref={index === 0 ? firstItemRef : null}
            >
              <div style={{ padding: "5px" }}>{item}</div>
            </li>
          ))}
        </ul>
      )}
    </menu>
  );
}
