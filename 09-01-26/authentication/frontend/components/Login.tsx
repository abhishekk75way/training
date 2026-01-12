import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../src/utils/api/api";  
import { decodeToken } from "../src/utils/jwt";


const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
  try {
    const res = await login(data);
    const token = res.data.token;

    localStorage.setItem("token", token);

    const payload = decodeToken(token);
    console.log("JWT PAYLOAD:", payload.role);
    
    alert("Login successful");

    if (payload.role === 'admin') {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  } catch (err: any) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h4>Login</h4>

        <div className="input-group">
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Login</button>

        <div className="auth-links">
          <p><Link to="/signup">If Don't Have Account? Signup</Link></p>
          <p><Link to="/forgot-password">Forgot Password?</Link></p>
        </div>
      </form>
    </div>
  );
}
