import { useContext } from "react";
import UserContext from "../context/UserContext";


export default function Dashboard(props){
    const { user } = useContext(UserContext)
    if(!user){
        return <p>Loding....</p>
    }
return (
    <div>
        <h2>Welcome,{user.username}</h2>
    </div>
)
}