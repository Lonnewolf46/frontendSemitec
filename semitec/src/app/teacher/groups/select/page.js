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
    <div>
      <section>
        <h1 style={{ fontSize: "1.5vw" }}>Estudiantes</h1>
        <StudentsTable group_id={searchParams.get("group_id")} actions={true} />
      </section>
    </div>
  );
}
