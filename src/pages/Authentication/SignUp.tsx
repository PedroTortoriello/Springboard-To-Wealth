import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import api from './api';
import Logo from '@/images/Verde-escuro_e_Dourado_Elegante_Finanças_e_Banco_Logotipo__1_-removebg-preview.png';
import InputMask from 'react-input-mask'

const RegisterUserFormSchema = z.object({
  userName: z.string().min(3, { message: "Nome de usuário deve ter no mínimo 3 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  CPF: z
  .string()
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF deve estar no formato 000.000.000-00" }),
telefone: z
  .string()
  .regex(/^\+55 \(\d{2}\) \d{4,5}-\d{4}$/, { message: "Telefone deve estar no formato +55 (XX) XXXXX-XXXX" }),
});

type RegisterUserFormData = z.infer<typeof RegisterUserFormSchema>;

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(RegisterUserFormSchema),
  });

  const registerUser = async (data: RegisterUserFormData) => {
    setLoading(true);
    try {
      await api.post("/newUsers", data);
      localStorage.setItem("userEmail", data.email);
      navigate("/Checkout");
    } catch (error) {
      setError("Erro ao registrar. Tente novamente.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };


  return (

      <div
        className="register-page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #1f2a3c, #0b0e11)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#fff",
        }}
      >
        <div
          className="register-form"
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "2rem",
            backgroundColor: "#2a2f3a",
            borderRadius: "10px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <img src={Logo} alt="Logo" style={{ maxWidth: "60%", height: "120px" }} />
          </div>
          <form onSubmit={handleSubmit(registerUser)} style={{ display: "flex", flexDirection: "column" }}>
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="username" style={{ color: "#A0AEC0", marginBottom: "0.5rem" }}>
                Nome de Usuário
              </label>
              <input
                id="username"
                type="text"
                {...register("userName")}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #3a3f4a",
                  backgroundColor: "#3a3f4a",
                  color: "#fff",
                  outline: "none",
                }}
              />
              {errors.userName && <p style={{ color: "#F56565" }}>{errors.userName.message}</p>}
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="email" style={{ color: "#A0AEC0", marginBottom: "0.5rem" }}>
                E-mail
              </label>
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
                }}
              />
              {errors.email && <p style={{ color: "#F56565" }}>{errors.email.message}</p>}
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="CPF" style={{ color: "#A0AEC0", marginBottom: "0.5rem" }}>
                CPF
              </label>
              <InputMask
                id="CPF"
                mask="999.999.999-99"
                {...register("CPF")}
                maskPlaceholder={null}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #3a3f4a",
                  backgroundColor: "#3a3f4a",
                  color: "#fff",
                  outline: "none",
                }}
              />
              {errors.CPF && <p style={{ color: "#F56565" }}>{errors.CPF.message}</p>}
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
  <label htmlFor="phone" style={{ color: "#A0AEC0", marginBottom: "0.5rem" }}>
    Telefone
  </label>
  <InputMask
    id="phone"
    mask="+55 (99) 99999-9999"
    {...register("telefone")}
    maskPlaceholder={null}
    style={{
      width: "100%",
      padding: "0.75rem",
      borderRadius: "8px",
      border: "1px solid #3a3f4a",
      backgroundColor: "#3a3f4a",
      color: "#fff",
      outline: "none",
    }}
  />
  {errors.telefone && <p style={{ color: "#F56565" }}>{errors.telefone.message}</p>}
</div>


            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="password" style={{ color: "#A0AEC0", marginBottom: "0.5rem" }}>
                Senha
              </label>
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
                }}
              />
              {errors.password && <p style={{ color: "#F56565" }}>{errors.password.message}</p>}
            </div>

            {error && <p style={{ color: "#F56565", textAlign: "center" }}>{error}</p>}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "linear-gradient(90deg, #00BFFF, #00A3CC)",
                color: "#fff",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Carregando..." : "Registrar"}
            </button>
          </form>
        </div>
      </div>

  );
};

export default SignUp;
