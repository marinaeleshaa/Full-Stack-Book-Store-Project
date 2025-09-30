import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddUser } from "../handlers/UserApiHandler";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    try {
      await AddUser(formData);
      navigate("/signIn");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const passwordsMatch = formData.password === formData.confirmPassword;
  const isPasswordValid = formData.password.length >= 8;

  return (
    <div className="min-h-screen flex items-center justify-center p-10">
      <div className="bg-gradient-to-tl from-indigo-600/80 via-cyan-600/80 to-slate-800/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400/40 via-blue-400/40 to-indigo-400/40"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-violet-400/5 to-blue-400/5 rounded-full blur-xl"></div>

        <div className="p-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-400/20 to-indigo-400/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-white/70">Join our community today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-white/90 font-medium text-sm">
                User Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                placeholder="John"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-white/90 font-medium text-sm">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 pl-11 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                  placeholder="john@example.com"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
            </div>

         {/* Password */}
<div className="space-y-2">
  <label className="block text-white/90 font-medium text-sm">
    Password
  </label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      className={`w-full bg-white/10 backdrop-blur-sm border rounded-xl px-4 py-3 pl-11 pr-11 text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
        formData.password && !isPasswordValid
          ? "border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50"
          : "border-white/20 focus:ring-cyan-400/50 focus:border-cyan-400/50"
      }`}
      placeholder="Create a password"
      required
    />
    {/* eye icon */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
    >
      {showPassword ? (
        // eye open
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ) : (
        // eye closed
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-4.362M9.88 9.88A3 3 0 0114.12 14.12M6.1 6.1l11.8 11.8"
          />
        </svg>
      )}
    </button>
  </div>
</div>

{/* Confirm Password */}
<div className="space-y-2">
  <label className="block text-white/90 font-medium text-sm">
    Confirm Password
  </label>
  <div className="relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      className={`w-full bg-white/10 backdrop-blur-sm border rounded-xl px-4 py-3 pl-11 pr-11 text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
        formData.confirmPassword && !passwordsMatch
          ? "border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50"
          : "border-white/20 focus:ring-cyan-400/50 focus:border-cyan-400/50"
      }`}
      placeholder="Confirm your password"
      required
    />
    {/* eye icon */}
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
    >
      {showConfirmPassword ? (
        // eye open
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ) : (
        // eye closed
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-4.362M9.88 9.88A3 3 0 0114.12 14.12M6.1 6.1l11.8 11.8"
          />
        </svg>
      )}
    </button>
  </div>
</div>


            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="m-1"
              />
              <span className="text-sm text-white/70 leading-relaxed">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-cyan-300 hover:text-cyan-200"
                >
                  Terms & Conditions
                </button>
              </span>
            </div>

            {error && (
              <p className="text-red-400 text-center text-sm mt-2">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-tl from-indigo-500/20 to-cyan-500/20 text-white font-semibold rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 hover:-translate-y-1 bg-white/20 shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Switch to Sign In */}
          <div className="mt-6 text-center">
            <p className="text-white/70">
              Already have an account?{" "}
              <Link
                to={"/signIn"}
                className="text-white hover:text-cyan-200 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
