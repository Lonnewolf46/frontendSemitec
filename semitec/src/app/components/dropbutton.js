import { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import styles from './NavBar.module.css';
import dropdownArrowIcon from "@/app/ui/arrow-drop-down.svg"

function DropdownButton({ text, items }) {
    const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter'){
        event.preventDefault();
        setIsOpen((prevState) => !prevState);
      }
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.dropdown} onBlur={handleBlur}>
        <button
             className={`${styles.navDropButton} ${styles.navItem}`}
             onClick={() => setIsOpen((prevState) => !prevState)}
             onKeyDown={handleKeyDown}
            >
              <div className={styles.buttonContent}>
              <span>{text}</span>
              <Image src={dropdownArrowIcon} className={`${styles.buttonIcon} ${isOpen ? styles.invertedIcon: ''}`} alt=''/>
              </div>
        </button>
      {isOpen && (  
        <div className={styles.dropdownContent}>
          {items.map((item, index) => (
            <Link
              key={index}
              className={styles.navItem}
              style={{ padding: '0.5vw', color: 'var(--text)' }} 
              href={item.href}
              onClick={() => setIsOpen((prevState) => !prevState)}
             >
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
