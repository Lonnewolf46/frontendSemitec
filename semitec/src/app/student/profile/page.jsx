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

  const getData = async () => {
    try {
      const res = await fetch("http://25.37.76.172:5000/teacher/username", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);}
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <Profile />
    </main>
  );
  }