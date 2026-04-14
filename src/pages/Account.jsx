import { useContext } from "react";
import UserContext from "../context/Usercontext";

export default function Account(props){
    const { user } = useContext(UserContext)
    if(!user){
        return <p>Loding....</p>
    } 
return (
    <div>
        <h2>Account Component</h2>
      <p>username-{user.username}</p>
        <p>email-{user.email}</p>
        <p>user-{user.role}</p>
    </div>
)
}