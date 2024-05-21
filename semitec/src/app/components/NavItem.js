import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavItem({ text, href, active }) {
  return (
    <Link className={`${styles.navItem} ${active ? styles.active : ''}`} href={href}>
      {text}
    </Link>
  );
}
