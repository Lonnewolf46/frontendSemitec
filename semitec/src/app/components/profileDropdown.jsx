import { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import styles from './NavBar.module.css';
import dropdownArrowIcon from "@/app/ui/arrow-drop-down.svg"

const ProfileDropdown = ({ isOpen, openStateHandler, children }) => {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter'){
        event.preventDefault();
        openStateHandler((prevState) => !prevState);
      }
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
        openStateHandler(false);
    }
  };

  return (
    <div onBlur={handleBlur}>
      {isOpen && (  
        children
      )}
    </div>
  );
}

export default ProfileDropdown;