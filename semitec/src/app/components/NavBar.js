"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import avatar from "@/app/ui/avatar.svg";
import NavItem from "./NavItem";
import styles from "./NavBar.module.css";
import { useState } from "react";
import DropdownButton from "./dropbutton";
import ProfileDropdown from "./profileDropdown";


export default function NavBar({ menuList }) {
  const [activeId, setActiveId] = useState(0);
  const [optionsMenuStatus, setProfileOptionsMenuStatus] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const options = ["Ver Perfil", "Cerrar Sesión"];

  const handleProfileClick = () => {
    if (pathname.includes("/teacher")) {
      router.push("/teacher/profile");
    } else {
      router.push("/student/profile");
    }
  };

  const openOptionsMenu = () => {
    setProfileOptionsMenuStatus((prev) => !prev);
  };

  const handleProfileOptions = (index) => {
    console.log("seleccionando opcion", index);
    if (index ===0){
      openOptionsMenu()
      handleProfileClick()
    }
    else
    {
      openOptionsMenu()
      localStorage.removeItem("auth-token")
      router.push("/login");
    }
  }

  return (
    <div>
      <nav className={styles.navBar}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {" "}
            <Link href={"/login"}>
              <svg
                width="75"
                height="38"
                viewBox="0 0 75 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_134_20912)">
                  <path
                    className="logo"
                    d="M2.7525 37.734C2.19825 37.734 1.731 37.6208 1.35225 37.3943C0.973499 37.1678 0.704999 36.8513 0.546749 36.444L1.6455 36.0473C1.71675 36.2918 1.85025 36.4718 2.046 36.5888C2.24175 36.7058 2.4795 36.7643 2.75925 36.7643C2.907 36.7643 3.0495 36.7478 3.18675 36.7148C3.324 36.6818 3.43875 36.6255 3.53025 36.5468C3.62175 36.468 3.6675 36.3623 3.6675 36.2303C3.6675 36.0525 3.58125 35.9138 3.408 35.814C3.23475 35.715 3.01125 35.64 2.73675 35.589L2.11875 35.4668C1.84425 35.4105 1.5885 35.3258 1.3515 35.211C1.11525 35.0963 0.925499 34.944 0.782999 34.7528C0.640499 34.5623 0.569249 34.3215 0.569249 34.0313C0.569249 33.7568 0.632999 33.5198 0.759749 33.3218C0.887249 33.123 1.056 32.9603 1.2675 32.8335C1.47825 32.706 1.7115 32.6108 1.96575 32.547C2.22 32.4833 2.47425 32.4518 2.72925 32.4518C3.00375 32.4518 3.27 32.49 3.5265 32.5665C3.783 32.643 4.01325 32.7608 4.21725 32.9213C4.4205 33.0818 4.57575 33.294 4.683 33.5588L3.59175 33.9555C3.52575 33.7823 3.40725 33.6503 3.237 33.5588C3.06675 33.4673 2.862 33.4215 2.62275 33.4215C2.3835 33.4215 2.19375 33.4635 2.03925 33.5475C1.884 33.6315 1.80675 33.7523 1.80675 33.9098C1.80675 34.0373 1.86 34.146 1.96725 34.2383C2.0745 34.3305 2.214 34.3935 2.38725 34.4288L3.07425 34.566C3.28275 34.6065 3.49425 34.659 3.708 34.7228C3.92175 34.7865 4.119 34.8705 4.29975 34.9748C4.4805 35.079 4.62675 35.2178 4.7385 35.391C4.85025 35.5643 4.9065 35.7825 4.9065 36.0473C4.9065 36.312 4.84425 36.5573 4.71975 36.7688C4.59525 36.9803 4.4295 37.1565 4.224 37.299C4.01775 37.4415 3.7875 37.5495 3.53325 37.623C3.279 37.6965 3.0195 37.734 2.75475 37.734H2.7525Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M12.2842 37.6425V32.5447H16.2067V33.6052H13.4895V34.4902H15.1455V35.5507H13.4895V36.5812H16.2067V37.6417H12.2842V37.6425Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M23.5793 37.6425V32.5447H25.3882L26.4487 36.2002L27.525 32.5447H29.334V37.6425H28.1588V33.636L26.9452 37.6425H25.953L24.747 33.636V37.6425H23.5793Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M36.9728 37.6425V36.696H37.6905V33.4905H36.9728V32.544H39.5977V33.4905H38.8958V36.696H39.5977V37.6425H36.9728Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M48.657 37.6425V33.6052H47.016V32.5447H51.4958V33.6052H49.8548V37.6425H48.6563H48.657Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M58.815 37.6425V32.5447H62.7375V33.6052H60.0203V34.4902H61.6762V35.5507H60.0203V36.5812H62.7375V37.6417H58.815V37.6425Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M72.4448 37.734C71.9153 37.734 71.46 37.6275 71.079 37.4138C70.6972 37.2 70.4048 36.8948 70.2015 36.498C69.9983 36.1013 69.8963 35.6333 69.8963 35.094C69.8963 34.5548 70.002 34.0883 70.2127 33.6938C70.4235 33.2993 70.7228 32.994 71.1098 32.778C71.496 32.562 71.952 32.454 72.4755 32.454C72.9585 32.454 73.38 32.5605 73.7385 32.7743C74.097 32.988 74.373 33.2753 74.5665 33.6368L73.4977 34.026C73.386 33.8175 73.233 33.6683 73.0395 33.5798C72.846 33.4905 72.645 33.4463 72.4365 33.4463C72.2025 33.4463 71.9888 33.5108 71.7953 33.6413C71.6018 33.771 71.4495 33.9593 71.337 34.206C71.2252 34.4528 71.169 34.749 71.169 35.0948C71.169 35.6288 71.292 36.0375 71.5395 36.3195C71.7862 36.6015 72.09 36.7433 72.4515 36.7433C72.645 36.7433 72.8445 36.7028 73.0508 36.621C73.257 36.54 73.4182 36.3893 73.5352 36.171L74.5957 36.5603C74.3925 36.9218 74.1038 37.2075 73.7295 37.419C73.3553 37.6305 72.927 37.7355 72.4432 37.7355L72.4448 37.734Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M70.7167 0.245247H64.4302C62.3977 0.245247 60.7492 1.893 60.7492 3.92625V15.2137H53.7067C51.9427 15.2137 50.5132 16.6432 50.5132 18.4072V25.668C50.5132 27.432 51.9427 28.8615 53.7067 28.8615H70.7167C72.7492 28.8615 74.3977 27.2137 74.3977 25.1805V3.9255C74.3977 1.893 72.75 0.245247 70.7167 0.245247ZM67.7033 22.365C67.7033 22.7295 67.4077 23.0257 67.0425 23.0257H57.288L58.599 24.3367C58.857 24.5947 58.857 25.0125 58.599 25.2705C58.47 25.3995 58.3013 25.464 58.1318 25.464C57.9623 25.464 57.7935 25.3995 57.6645 25.2705L55.3365 22.9425C55.134 22.83 54.9967 22.614 54.9967 22.365C54.9967 22.359 54.9967 22.353 54.9975 22.347C54.9975 22.341 54.9967 22.335 54.9967 22.329C54.9967 22.1535 55.0665 21.9855 55.1902 21.8617L57.6645 19.3875C57.9225 19.1295 58.3402 19.1295 58.5982 19.3875C58.8562 19.6455 58.8562 20.0632 58.5982 20.3212L57.2152 21.7042H66.3818V17.5035C66.3818 17.139 66.6772 16.8427 67.0425 16.8427C67.4077 16.8427 67.7033 17.1382 67.7033 17.5035V22.365Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M16.0605 15.2542H7.49625C6.09225 15.2542 4.9545 16.392 4.9545 17.796V26.3603C4.9545 27.7642 6.09225 28.902 7.49625 28.902H16.0605C17.4645 28.902 18.6022 27.7642 18.6022 26.3603V17.796C18.6022 16.392 17.4645 15.2542 16.0605 15.2542ZM9.50625 26.6865C8.97225 26.6865 8.54025 26.2537 8.54025 25.7205C8.54025 25.1873 8.973 24.7545 9.50625 24.7545C10.0395 24.7545 10.4722 25.1873 10.4722 25.7205C10.4722 26.2537 10.0395 26.6865 9.50625 26.6865ZM9.50625 23.0857C8.97225 23.0857 8.54025 22.653 8.54025 22.1197C8.54025 21.5865 8.973 21.1537 9.50625 21.1537C10.0395 21.1537 10.4722 21.5865 10.4722 22.1197C10.4722 22.653 10.0395 23.0857 9.50625 23.0857ZM14.0505 23.0857C13.5165 23.0857 13.0845 22.653 13.0845 22.1197C13.0845 21.5865 13.5172 21.1537 14.0505 21.1537C14.5837 21.1537 15.0165 21.5865 15.0165 22.1197C15.0165 22.653 14.5837 23.0857 14.0505 23.0857ZM14.0505 19.4857C13.5165 19.4857 13.0845 19.053 13.0845 18.5197C13.0845 17.9865 13.5172 17.5538 14.0505 17.5538C14.5837 17.5538 15.0165 17.9865 15.0165 18.5197C15.0165 19.053 14.5837 19.4857 14.0505 19.4857Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M31.0238 15.2542H22.4595C21.0555 15.2542 19.9178 16.392 19.9178 17.796V26.3603C19.9178 27.7642 21.0555 28.902 22.4595 28.902H31.0238C32.4278 28.902 33.5655 27.7642 33.5655 26.3603V17.796C33.5655 16.392 32.4278 15.2542 31.0238 15.2542ZM24.4695 19.4857C23.9355 19.4857 23.5035 19.053 23.5035 18.5197C23.5035 17.9865 23.9363 17.5538 24.4695 17.5538C25.0028 17.5538 25.4355 17.9865 25.4355 18.5197C25.4355 19.053 25.0028 19.4857 24.4695 19.4857ZM29.0138 23.0857C28.4798 23.0857 28.0478 22.653 28.0478 22.1197C28.0478 21.5865 28.4805 21.1537 29.0138 21.1537C29.547 21.1537 29.9798 21.5865 29.9798 22.1197C29.9798 22.653 29.547 23.0857 29.0138 23.0857Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M45.987 15.2542H37.4228C36.0188 15.2542 34.881 16.392 34.881 17.796V26.3603C34.881 27.7642 36.0188 28.902 37.4228 28.902H45.987C47.391 28.902 48.5288 27.7642 48.5288 26.3603V17.796C48.5288 16.392 47.391 15.2542 45.987 15.2542ZM39.4328 19.4857C38.8988 19.4857 38.4668 19.053 38.4668 18.5197C38.4668 17.9865 38.8995 17.5538 39.4328 17.5538C39.966 17.5538 40.3988 17.9865 40.3988 18.5197C40.3988 19.053 39.966 19.4857 39.4328 19.4857ZM43.977 19.4857C43.443 19.4857 43.011 19.053 43.011 18.5197C43.011 17.9865 43.4438 17.5538 43.977 17.5538C44.5103 17.5538 44.943 17.9865 44.943 18.5197C44.943 19.053 44.5103 19.4857 43.977 19.4857Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M11.5087 0.204002H2.94525C1.54125 0.204002 0.402748 1.34175 0.402748 2.74575V11.31C0.402748 12.714 1.5405 13.8518 2.9445 13.8518H11.5087C12.9127 13.8518 14.0505 12.714 14.0505 11.31V2.74575C14.0505 1.34175 12.9127 0.204002 11.5087 0.204002ZM4.9545 11.6355C4.4205 11.6355 3.9885 11.2028 3.9885 10.6695C3.9885 10.1363 4.42125 9.7035 4.9545 9.7035C5.48775 9.7035 5.9205 10.1363 5.9205 10.6695C5.9205 11.2028 5.48775 11.6355 4.9545 11.6355ZM4.9545 8.0355C4.4205 8.0355 3.9885 7.60275 3.9885 7.0695C3.9885 6.53625 4.42125 6.1035 4.9545 6.1035C5.48775 6.1035 5.9205 6.53625 5.9205 7.0695C5.9205 7.60275 5.48775 8.0355 4.9545 8.0355ZM9.4995 4.43475C8.9655 4.43475 8.5335 4.002 8.5335 3.46875C8.5335 2.9355 8.96625 2.50275 9.4995 2.50275C10.0327 2.50275 10.4655 2.9355 10.4655 3.46875C10.4655 4.002 10.0327 4.43475 9.4995 4.43475Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M26.472 0.204002H17.9078C16.5038 0.204002 15.366 1.34175 15.366 2.74575V11.31C15.366 12.714 16.5038 13.8518 17.9078 13.8518H26.472C27.876 13.8518 29.0138 12.714 29.0138 11.31V2.74575C29.0138 1.34175 27.876 0.204002 26.472 0.204002ZM19.9178 4.43475C19.3838 4.43475 18.9518 4.002 18.9518 3.46875C18.9518 2.9355 19.3845 2.50275 19.9178 2.50275C20.451 2.50275 20.8838 2.9355 20.8838 3.46875C20.8838 4.002 20.451 4.43475 19.9178 4.43475ZM24.4628 8.0355C23.9288 8.0355 23.4968 7.60275 23.4968 7.0695C23.4968 6.53625 23.9295 6.1035 24.4628 6.1035C24.996 6.1035 25.4288 6.53625 25.4288 7.0695C25.4288 7.60275 24.996 8.0355 24.4628 8.0355Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M41.4353 0.204002H32.871C31.467 0.204002 30.3293 1.34175 30.3293 2.74575V11.31C30.3293 12.714 31.467 13.8518 32.871 13.8518H41.4353C42.8392 13.8518 43.977 12.714 43.977 11.31V2.74575C43.977 1.34175 42.8392 0.204002 41.4353 0.204002ZM34.881 11.6355C34.347 11.6355 33.915 11.2028 33.915 10.6695C33.915 10.1363 34.3478 9.7035 34.881 9.7035C35.4143 9.7035 35.847 10.1363 35.847 10.6695C35.847 11.2028 35.4143 11.6355 34.881 11.6355ZM34.881 4.43475C34.347 4.43475 33.915 4.002 33.915 3.46875C33.915 2.9355 34.3478 2.50275 34.881 2.50275C35.4143 2.50275 35.847 2.9355 35.847 3.46875C35.847 4.002 35.4143 4.43475 34.881 4.43475ZM39.426 4.43475C38.892 4.43475 38.46 4.002 38.46 3.46875C38.46 2.9355 38.8928 2.50275 39.426 2.50275C39.9593 2.50275 40.392 2.9355 40.392 3.46875C40.392 4.002 39.9593 4.43475 39.426 4.43475Z"
                    fill="white"
                  />
                  <path
                    className="logo"
                    d="M56.3985 0.204002H47.8342C46.4302 0.204002 45.2925 1.34175 45.2925 2.74575V11.31C45.2925 12.714 46.4302 13.8518 47.8342 13.8518H56.3985C57.8025 13.8518 58.9403 12.714 58.9403 11.31V2.74575C58.9403 1.34175 57.8025 0.204002 56.3985 0.204002ZM49.8443 8.0355C49.3103 8.0355 48.8783 7.60275 48.8783 7.0695C48.8783 6.53625 49.311 6.1035 49.8443 6.1035C50.3775 6.1035 50.8102 6.53625 50.8102 7.0695C50.8102 7.60275 50.3775 8.0355 49.8443 8.0355ZM54.3893 4.43475C53.8553 4.43475 53.4233 4.002 53.4233 3.46875C53.4233 2.9355 53.856 2.50275 54.3893 2.50275C54.9225 2.50275 55.3553 2.9355 55.3553 3.46875C55.3553 4.002 54.9225 4.43475 54.3893 4.43475Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_134_20912">
                    <rect width="75" height="37.938" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <div className={styles.navMenu}>
              {menuList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setActiveId(index);
                  }}
                  onFocus={() => {
                    setActiveId(index);
                  }}
                >
                  {item.children && item.children.length > 0 ? (
                      <DropdownButton
                        text={item.text}
                        items={item.children}
                      />
                    ) : (
                      <NavItem
                        active={activeId === index}
                        text={item.text}
                        href={item.href}
                      />
                    )}
                </div>
              ))}
            </div>
          </div>
          <div>
            {" "}
            {pathname.includes("teacher") || pathname.includes("student") ? (
              <div>
                <button
                  aria-label="Ver opciones de perfil de usuario"
                  style={{ borderRadius: "100px", top: "55px", padding: "0", border: "0" }}
                  onClick={openOptionsMenu}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="avatar-fill"
                      r="30"
                      cx="32"
                      cy="32"
                      fill="#F29325"
                    />
                    <g clipPath="url(#clip0_169_20134)">

                      <path
                        className="avatar-figure"
                        d="M31.9996 31.9992C33.5909 31.9992 35.1171 31.3671 36.2423 30.2418C37.3675 29.1166 37.9996 27.5905 37.9996 25.9992C37.9996 24.4079 37.3675 22.8818 36.2423 21.7566C35.1171 20.6313 33.5909 19.9992 31.9996 19.9992C30.4083 19.9992 28.8822 20.6313 27.757 21.7566C26.6318 22.8818 25.9996 24.4079 25.9996 25.9992C25.9996 27.5905 26.6318 29.1166 27.757 30.2418C28.8822 31.3671 30.4083 31.9992 31.9996 31.9992ZM35.9996 25.9992C35.9996 27.0601 35.5782 28.0775 34.8281 28.8276C34.0779 29.5778 33.0605 29.9992 31.9996 29.9992C30.9388 29.9992 29.9214 29.5778 29.1712 28.8276C28.4211 28.0775 27.9996 27.0601 27.9996 25.9992C27.9996 24.9383 28.4211 23.9209 29.1712 23.1708C29.9214 22.4206 30.9388 21.9992 31.9996 21.9992C33.0605 21.9992 34.0779 22.4206 34.8281 23.1708C35.5782 23.9209 35.9996 24.9383 35.9996 25.9992ZM43.9996 41.9992C43.9996 43.9992 41.9996 43.9992 41.9996 43.9992H21.9996C21.9996 43.9992 19.9996 43.9992 19.9996 41.9992C19.9996 39.9992 21.9996 33.9992 31.9996 33.9992C41.9996 33.9992 43.9996 39.9992 43.9996 41.9992ZM41.9996 41.9912C41.9976 41.4992 41.6916 40.0192 40.3356 38.6632C39.0316 37.3592 36.5776 35.9992 31.9996 35.9992C27.4196 35.9992 24.9676 37.3592 23.6636 38.6632C22.3076 40.0192 22.0036 41.4992 21.9996 41.9912H41.9996Z"
                        fill="white"
                      />
                    </g>

                  </svg>
                </button>
                <ProfileDropdown
                  isOpen={optionsMenuStatus}
                  openHandler={setProfileOptionsMenuStatus}
                >
                  <div>
                    <ul className={styles.options}>
                      {
                      options.map((option, index)=><li className={styles.optionsText} aria-label={option} onClick={() => handleProfileOptions(index)}>
                        {option}
                      </li>)
                      }
                    </ul>
                  </div>
                </ProfileDropdown>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}