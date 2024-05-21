import "./profile-data.css"
import avatar from "@/app/ui/avatar.svg"

export default function Profile({username,institution,user_code,user_type,email,country,province,canton,district}) {
    return (
        <div>
            <div className="icon">
                
            </div>
            <div className="flex-container">
                <div className={"data-container"}> 
                    <div className="header-format">
                        <div className="name-format">
                            {username}
                        </div>
                        <div className="institution-format">
                            {institution}
                        </div>
                        <div className="id-format">
                            #{user_code}
                        </div>
                    </div>
                
                    <div className="body-format">
                        <div className="body-line">
                            <div className="type-icon"/>
                            <div className="data">
                                {user_type}
                            </div>
                        </div>
                        <div className="empty-space"/>
                        <div className="body-line">
                            <div className="email-icon"/>
                            <div className="data">
                                {email}
                            </div>
                        </div>
                        <div className="empty-space"/>
                        <div className="body-line">
                            <div className="location-icon"/>
                            <div className="data">
                                {country}, {province}, {canton}, {district}
                            </div>
                        </div>
                        <div className="empty-space"/>
                    </div>
                </div>
            </div>
        </div>
    );
  }