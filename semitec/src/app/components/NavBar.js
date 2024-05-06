"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "../ui/logo.svg";
import NavItem from "./NavItem";
import styles from "./NavBar.module.css";
import { useState } from "react";

export default function NavBar({ menuList }) {
    const [activeId, setActiveId] = useState(-1)

  return (
    <header>
      <nav className={styles.navBar}>
        <Link href={menuList[0].href}>
          <Image
            src={Logo}
            width={75}
            height={38}
            alt="Logo de SEMITEC. Figura de teclado braile con la palabra SEMITEC debajo"
          />
        </Link>
        <div className={styles.navMenu}>
          { menuList.map((item, index) => (
            <div key={index} onClick={() => {
                setActiveId(index)
            }}>
                <NavItem active={activeId === index} text={item.text} href={item.href}/>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}
