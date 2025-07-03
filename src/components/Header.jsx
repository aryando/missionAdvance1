import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const isBeranda = location.pathname === "/beranda";
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        navigate("/login");
    }

    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }
    return (
        <header className="Header">
            <div className="logo-container">
                <img src="./public/images/Logo.png" alt="Logo" className="Logo" />
            </div>
            {/* <div className="user-menu">
                <img src="./public/images/user.png" alt="user" className="user-img" />
                <button onClick={handleLogout} className="btn-logout">
                Logout</button>
            </div> */}
            {isBeranda && user && (
                <div className="user-menu">
                    <div className="avatar-wrapper" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <img
                            src="/images/user.png"
                            alt="user"
                            className="user-image"
                        />
                        </div>

                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <button onClick={() => navigate("/Profil")}>Profil</button>
                                <button onClick={() => alert("Fitur belum tersedia")}>Ganti Password</button>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                </div>
            )}
        </header>
    )
}