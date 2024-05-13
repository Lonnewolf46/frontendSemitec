import "./profile-data.css"

export default function Profile() {
    return (
        <div className="flex-container">
            <div className={"data-container"}> 
                <div className="header-format">
                    <div className="name-format">
                        Name
                    </div>
                    <div className="institution-format">
                        Institution
                    </div>
                    <div className="id-format">
                        ID number
                    </div>
                </div>
            
                <div className="body-format">
                    <div className="data">
                        type
                    </div>
                    <div className="data">
                        email
                    </div>
                    <div className="data">
                    location
                    </div>
                </div>
            </div>
        </div>
    );
  }