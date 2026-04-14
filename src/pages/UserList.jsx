import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext.jsx";
import axios from "../config/axios.js";

export default function UserList() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/user", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [user]);

  const handleRemove = async (id) => {
    const userConfirm = window.confirm("Are you sure?");
    if (userConfirm) {
      try {
        const response = await axios.delete(`/user/remove/${id}`, {
          headers: { Authorization: localStorage.getItem("token",) },
        });
        const newArr = users.filter((ele) => ele._id !== response.data._id);
        setUsers(newArr);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((ele) => (
            <tr key={ele._id}>
              <td>{ele.username}</td>
              <td>{ele.email}</td>
              <td>{ele.role}</td>
              <td>
                <button onClick={() => handleRemove(ele._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
