"use client";
import { useEffect, useState } from "react";
import Profile from "@/app/components/profile-data"
import ProfileEdit from "@/app/components/profile-edit";
import buttonStyles from "@/app/_styles/Button.module.css"

export default function profile_student() {
  const [username, setUsername] = useState("");
  const [institution, setInstitution] = useState("");
  const [canton, setCanton] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [district, setDistrict] = useState("");
  const [otherSigns, setOtherSigns] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [edLevel, setEdLevel] = useState("");
  const [view, setView] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/student/profile`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);}
        setUsername(data.name);
        setInstitution(data.institution);
        setDistrict(data.district);
        setCanton(data.canton);
        setProvince(data.province);
        setCountry(data.country);
        setEmail(data.email);
        setUserType(data.user_type);
        setOtherSigns(data.other_signs);
        setEdLevel(data.education_level);
        setDateBirth(data.date_birth);
        setDataLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setView(false);
  };

  useEffect(() => {
    getData();
  }, []);


  if(view){
    return (
      <main>
        <Profile username={username} institution={institution} user_type={userType} email={email} country={country} province={province} canton={canton} district={district}/>
        <div style={{display:'flex', justifyContent:'center', margin: '0 auto 10vh'}}>
          <button className={buttonStyles.primary} onClick={handleEditClick} disabled={!dataLoaded}>Editar perfil</button>
        </div>
      </main>
      
    );
  }
  else if(!view){
      return(
      <main>
        <ProfileEdit
          inUsername={username}
          inInstitution={institution}
          inEducationalLevel={edLevel}
          inDateOfBirth={dateBirth}
          inEmail={email}
          inCountry={country}
          inProvince={province}
          inCanton={canton}
          inDistrict={district}
          inOtherSigns={otherSigns}/>
      </main>
      )
    }
  }