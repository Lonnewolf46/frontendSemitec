"use client";
import { useEffect, useState } from "react";
import Profile from "@/app/components/profile-data"

export default function profile_student() {
  const [username, setUsername] = useState("");
  const [institution, setInstitution] = useState("");
  const [canton, setCanton] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [user_code, setUserCode] = useState("");
  const [user_type, setUserType] = useState("");
  const [district, setDistrict] = useState("");

  const getData = async () => {
    try {
      const res = await fetch("http://25.37.76.172:5000/student/profile", {
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
        setUserCode(data.user_code);
        setUserType(data.user_type);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <main>
      <Profile username={username} institution={institution} user_code={user_code} user_type={user_type} email={email} country={country} province={province} canton={canton} district={district}/>
    </main>
  );
  }