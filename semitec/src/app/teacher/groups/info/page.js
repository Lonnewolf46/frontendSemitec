'use client'
import StudentsTable from "@/app/components/group-members-table"
import { useParams, useSearchParams, useSearchParams } from "next/navigation"

export default function GroupInfo() {
    const searchParams = useSearchParams()

    return (<div style={ {width: "70vw", margin: "7vh auto", border: "solid 1px #ebebeb", padding: "2vw", borderRadius: "10px"}}> 
        <div>

        </div>
        <section>
            <h1 style={{ fontSize: "2.7vw"}}>Estudiantes</h1>
            <StudentsTable group_id={searchParams.get('group_id')}/>
        </section>

    </div>)
}