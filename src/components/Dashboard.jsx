import { RegistrationContext } from "../context/registrationContext";
import { useContext } from "react";
const Dashboard = () =>{
    const {User} = useContext(RegistrationContext);
    return (
        <div className="text-white flex flex-col justify-center items-center h-[91vh] ">
            {
                (User !== '') ? (<div className="text-center"><p>Hi,<span className="text-red-500 mr-4 text-lg bold "> {User} </span></p><p>This is your Dashboard</p></div>):(<p>Login first to see Your Dashboard</p>)
            }
        </div>
    )
}
export default Dashboard;