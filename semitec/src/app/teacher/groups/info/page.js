"use client";
import StudentsTable from "@/app/components/group-members-table";
import { useParams, useSearchParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GroupInfo() {
  const [groupInfo, setGroupInfo] = useState("");
  const searchParams = useSearchParams();

  const getGroupInfo = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/teacher/groups/info?group_id=${searchParams.get(
          "group_id"
        )}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setGroupInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroupInfo();
  }, []);

  return (
    <div
      style={{
        width: "70vw",
        margin: "7vh auto",
        border: "solid 1px #ebebeb",
        padding: "2vw",
        borderRadius: "10px",
      }}
    >
      <div style={{display: "flex", margin: "0 20% 0 0%", fontSize: "1.3vw"}}>
        <div style={{ fontWeight: "bold", marginRight: "10%"}}>{groupInfo.group_name}</div>
        <div>
          <p style={{marginTop: "0"}}>
            <strong>Código</strong>
          </p>
          <p>{groupInfo.group_code}</p>
        </div>
      </div>
      <section>
        <h1 style={{ fontSize: "2.7vw" }}>Estudiantes</h1>
        <StudentsTable group_id={searchParams.get("group_id")} actions={true} />
      </section>
    </div>
  );
}
