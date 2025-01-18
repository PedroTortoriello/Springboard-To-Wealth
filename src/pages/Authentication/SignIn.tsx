import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import api from './api';
import Logo from '@/images/Verde-escuro_e_Dourado_Elegante_Finanças_e_Banco_Logotipo__1_-removebg-preview.png'; // Substitua pelo caminho correto para a imagem
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';  // Importe o GoogleLogin
import { CredentialResponse } from '@react-oauth/google';

const AuthUserFormSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

type AuthUserFormData = z.infer<typeof AuthUserFormSchema>;

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AuthUserFormData>({
    resolver: zodResolver(AuthUserFormSchema),
  });

  useEffect(() => {
    setValue('email', loggedInEmail);
  }, [loggedInEmail, setValue]);

  async function AuthUser(data: AuthUserFormData) {
    setLoading(true);
  
    try {
      const response = await api.post("/autenticacao", data);
  
      const { token, authenticate, email, userId, CPF } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("loggedInEmail", email);
      localStorage.setItem("CPF", CPF);
      localStorage.setItem("userId", userId);
      localStorage.setItem("authenticate", JSON.stringify(authenticate));
  
      if (authenticate === false) {
        setError("Usuário ou senha incorreta!");
        setTimeout(() => setError(""), 2100);
      } else {
        setLoggedInEmail(data.email);
        localStorage.setItem("userEmail", data.email);
        navigate("/Principal/page", { state: { loggedInEmail: data.email } });
      }
    } catch (error) {
      setError("Erro ao autenticar. Tente novamente.");
      setTimeout(() => setError(""), 2100);
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      console.error("Credencial não encontrada na resposta do Google.");
      return;
    }
  
    try {
      const res = await api.post('/autenticacao', { googleToken: response.credential });
  
      localStorage.setItem('token', res.data.token);
      // Use a URL absoluta aqui
      navigate("/Principal/page");
    } catch (error) {
      console.error("Erro ao autenticar com Google:", error);
    }
  };
  
  return (
    <GoogleOAuthProvider clientId="818808720192-abjed32u8dj5jrsd4hf75iasnlvifi19.apps.googleusercontent.com">
      <div
        className="login-page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #1f2a3c, #0b0e11)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#fff"
        }}
      >
        <div
          className="login-form"
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "2rem",
            backgroundColor: "#2a2f3a",
            borderRadius: "10px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            animation: "fadeIn 0.5s ease-in-out"
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <img src={Logo} alt="Logo" style={{ maxWidth: "60%", height: "120px" }} />
          </div>
          <form onSubmit={handleSubmit(AuthUser)} style={{ display: "flex", flexDirection: "column" }}>
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="email" style={{ color: "#A0AEC0", marginBottom: "0.5rem" }}>E-mail</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #3a3f4a",
                  backgroundColor: "#3a3f4a",
                  color: "#fff",
                  outline: "none",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#00BFFF"}
                onBlur={(e) => e.target.style.borderColor = "#3a3f4a"}
              />
              {errors.email && <p style={{ color: "#F56565", marginTop: "0.5rem" }}>{errors.email.message}</p>}
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="password" style={{ color: "#A0AEC0", marginBottom: "0.5rem" }}>Senha</label>
              <input
                id="password"
                type="password"
                {...register("password")}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #3a3f4a",
                  backgroundColor: "#3a3f4a",
                  color: "#fff",
                  outline: "none",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#00BFFF"}
                onBlur={(e) => e.target.style.borderColor = "#3a3f4a"}
              />
              {errors.password && <p style={{ color: "#F56565", marginTop: "0.5rem" }}>{errors.password.message}</p>}
            </div>

            {error && <p style={{ color: "#F56565", marginBottom: "1.5rem", textAlign: "center" }}>{error}</p>}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "linear-gradient(90deg, #00BFFF, #00A3CC)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background 0.3s"
              }}
              disabled={loading}
            >
              {loading ? "Carregando..." : "Entrar"}
            </button>
          </form>
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <p style={{ color: "#A0AEC0", marginBottom: "0.5rem" }}>
              Ainda não tem uma conta?
            </p>
            <button
              onClick={() => navigate('/Cadastro')}
              style={{
                padding: "0.5rem 1rem",
                background: "linear-gradient(90deg, #00BFFF, #00A3CC)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background 0.3s",
                fontSize: "0.875rem",
              }}
            >
              Criar Conta
            </button>
          </div>

          {/* Botão Google */}
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            useOneTap={true}
          />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;