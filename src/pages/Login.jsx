import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
export default function Login () {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const onSubmit = (data) => {
        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        const akun = accounts.find(
            (acc) => acc.email === data.email && acc.password === data.password);
            console.log("Input dari form:", data);
            console.log("Akun tersimpan:", accounts);
            if (!akun) {
                alert("email atau kata sandi dalah!");
                return;
            }

            localStorage.setItem("isLogin", "true");
            localStorage.setItem("user", JSON.stringify(akun));
            alert("Login berhasil!");
            console.log("navigate dipanggil");

            navigate("/beranda");

        
    }
    return (
        <>
        <Header />
        <main>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="masuk-ke">
                    <h1>Masuk ke Akun</h1>
                    <p>Yuk, lanjutin belajarmu di videobelajar.</p>
                </div>
                <div className="form-group">
                        <FormInput
                            id="email"
                            label="E-Mail"
                            type="email"
                            register={register}
                            errors={errors}
                        /> 

                        <FormInput
                            id="password"
                            label="Kata Sandi"
                            type="password"
                            register={register}
                            errors={errors}
                        />
                    <div className="forgot-password">
                        <button type="button" className="forgot-password">Lupa Password?</button>
                    </div>
                    <button type="submit" className="btn">Masuk</button>
                    <button type="button" className="btn" onClick={() => navigate("/register")}>Daftar</button>
                    <div className="divider">atau</div>
                    <button type="button" className="google-btn"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="google-logo"/>Masuk dengan Google</button>
                </div>
            </form>
        </main>
        </>
    )
}