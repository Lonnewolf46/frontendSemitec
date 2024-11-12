import "./profile-data.css";
import Image from "next/image";
import contrast from "@/assets/bg_images/location.svg";
import emailIcon from "@/assets/bg_images/email.svg";
import briefcase from "@/assets/bg_images/briefcase.svg";

import avatar from "@/app/ui/avatar.svg";

export default function Profile({
  username,
  institution,
  user_type,
  email,
  country,
  province,
  canton,
  district
}) {
  return (
    <>
      <div className="flex-container">
        <div className="icon"></div>
        <div className={"data-container card-container-theme"}>
          <div className="header-format">
            <div className="name-format">{username}</div>
            <div className="institution-format">{institution}</div>
          </div>

          <div>
            <div className="body-line">
              <Image src={briefcase} alt="" />
              <div className="data">{user_type}</div>
            </div>
            <div className="body-line">
              <Image src={emailIcon} alt="" />
              <div className="data">{email}</div>
            </div>
            <div className="body-line">
              <Image src={contrast} alt="" />
              <div className="data">
                {country}, {province}, {canton}, {district}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
