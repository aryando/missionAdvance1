import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profil() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [nama, setNama] = useState("");
    const [email, setemail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            navigate("/Login");
        } else {
            setUser(storedUser);
            setNama(storedUser.nama);
            setemail(storedUser.email);
            setPhone(storedUser.phone || "");
        }
    }, [navigate]);

    const handleSave = () => {
        const updateUser = { ...user, nama, email, phone };
        setUser(updateUser);
        localStorage.setItem("user", JSON.stringify(updateUser));

        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        const updateAccounts = accounts.map(acc =>
            acc.email === user.email ? updateUser : acc
        );
        localStorage.setItem("accounts", JSON.stringify(updateAccounts));
        alert("Profil berhasil diperbarui!");
        navigate("/beranda");
    }

    return (
        <>
            <Header />
            <main className="profil-page">
                <h3>Ubah Profil</h3>
                <p> Ubah data diri Anda</p>
                <div className="profil-header">
                    <h4>Profil Saya</h4>
                    <h4>Kelas Saya</h4>
                    <h4>Pesanan saya</h4>
                </div>
                <div className="profil-card">
                    <img src="./images/user.png" alt="user" className="user-img" />
                    <h4>{user ? user.nama : "nama"}</h4>
                    <p>{user ? user.email : "Email"}</p>
                    <label>Nama Lengkap</label>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Masukkan nama lengkap"
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder="Masukkan email"
                    />
                    <label>No.Hp</label>
                    <input
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Masukkan nomor Hp"
                    />
                    <button className="btn" onClick={handleSave}>Simpan Perubahan</button>
                </div>
            </main>
            <Footer />
        </>
    )
}