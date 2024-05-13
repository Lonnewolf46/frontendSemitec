import "./profile-data.css"

export default function Profile({username,institution,user_code,user_type,email,country,province,canton,district}) {
    return (
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
                    <div className="data">
                        {user_type}
                    </div>
                    <div className="data">
                        {email}
                    </div>
                    <div className="data">
                        {country}, {province}, {canton}, {district}
                    </div>
                </div>
            </div>
        </div>
    );
  }