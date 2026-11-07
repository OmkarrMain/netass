import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Wifi, ShieldCheck, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AdPanel from "../components/AdPanel";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z
  .object({
    fullName: z.string().min(3, "Name must contain at least 3 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    terms: z
      .boolean()
      .refine((value) => value, "Please accept the terms and conditions"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();

  const schema = mode === "login" ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  function switchMode(nextMode) {
    setMode(nextMode);
    setServerError("");
    reset();
  }

  async function submit(values) {
    setServerError("");

    try {
      if (mode === "login") {
        await login({
          email: values.email,
          password: values.password,
        });
      } else {
        await registerUser({
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          phone: values.phone,
          password: values.password,
        });
      }

      navigate("/plans", { replace: true });
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          error.message ||
          "Unable to complete your request. Please try again.",
      );
    }
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-brand-navy px-5 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="rounded-xl bg-white px-4 py-3 text-2xl font-bold text-brand-navy">
              NetAss
            </span>
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
            Welcome to NetAss
          </h1>

          <p className="mt-3 text-sm text-white/65">
            Connect to reliable internet services with ease.
          </p>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_minmax(380px,460px)_1fr]">
          <div className="hidden lg:block">
            <AdPanel placement="login_left" />
          </div>

          <section className="h-fit rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-7 flex rounded-xl bg-page p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`flex-1 rounded-lg py-3 text-sm font-bold transition ${
                  mode === "login"
                    ? "bg-brand-blue text-white shadow"
                    : "text-muted hover:text-brand-navy"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`flex-1 rounded-lg py-3 text-sm font-bold transition ${
                  mode === "register"
                    ? "bg-brand-blue text-white shadow"
                    : "text-muted hover:text-brand-navy"
                }`}
              >
                Register
              </button>
            </div>

            <div className="mb-6">
              <div className="mb-3 inline-flex rounded-xl bg-orange-50 p-3 text-brand-orange">
                <Wifi size={25} />
              </div>

              <h2 className="text-2xl font-bold text-brand-navy">
                {mode === "login" ? "Welcome Back!" : "Create Your Account"}
              </h2>

              <p className="mt-2 text-sm text-muted">
                {mode === "login"
                  ? "Enter your credentials to access your NetAss account."
                  : "Register to book connections and manage your services."}
              </p>
            </div>

            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              {mode === "register" && (
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />
              )}

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />

              {mode === "register" && (
                <Input
                  label="Mobile Number"
                  placeholder="Enter 10-digit mobile number"
                  inputMode="numeric"
                  maxLength={10}
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              )}

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  error={errors.password?.message}
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[39px] text-muted"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {mode === "register" && (
                <>
                  <div className="relative">
                    <Input
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      error={errors.confirmPassword?.message}
                      {...register("confirmPassword")}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-[39px] text-muted"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>

                  <label className="flex items-start gap-3 text-sm text-muted">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-brand-blue"
                      {...register("terms")}
                    />
                    <span>
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="font-semibold text-brand-blue"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="font-semibold text-brand-blue"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {errors.terms && (
                    <p className="text-xs text-danger">
                      {errors.terms.message}
                    </p>
                  )}
                </>
              )}

              {mode === "login" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setServerError(
                        "Password reset is not available yet. Please contact NetAss support.",
                      )
                    }
                    className="text-sm font-semibold text-brand-blue hover:text-brand-orange"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {serverError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-danger">
                  {serverError}
                </div>
              )}

              <Button type="submit" variant="cta" block loading={isSubmitting}>
                {mode === "login" ? "Login to Your Account" : "Create Account"}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-line" />
              <span className="text-xs font-medium text-muted">OR</span>
              <div className="h-px flex-1 bg-line" />
            </div>

            <Link to="/plans">
              <Button variant="outline" block>
                Continue as Guest
              </Button>
            </Link>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
              <ShieldCheck size={16} className="text-success" />
              Your account credentials are securely processed.
            </div>
          </section>

          <div className="hidden lg:block">
            <AdPanel placement="login_right" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
