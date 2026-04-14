import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import  UserContext  from "./context/UserContext.jsx";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Register from "./pages/Register";
import UserList from "./pages/UserList";
import Categories from "./pages/Categories";
import Expenses from "./pages/Expenses";

function App() {
  const { isLoggedIn, handleLogout, user } = useContext(UserContext);

  return (
    <div>
      <h1>Expensify</h1>

      <ul>
        {isLoggedIn ? (
          <>
             <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/account">Account</Link></li>
            {user && (user.role === "admin" || user.role === "moderator") && (
              <>
                <li><Link to="/userList">User List</Link></li>
                <li><Link to="/expenses">Expenses</Link></li>
                <li><Link to="/categories">Categories</Link></li>

              </>
            )}

            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </div>
  );
}

export default App;
