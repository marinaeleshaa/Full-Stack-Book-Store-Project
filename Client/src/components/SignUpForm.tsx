import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface SignUpFormProps {
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
  onSwitchToLogin?: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = () =>
  // onSubmit,
  {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      if (!agreedToTerms) {
        alert("Please agree to the terms and conditions");
        return;
      }
      // onSubmit(formData);
    };

    const passwordsMatch = formData.password === formData.confirmPassword;
    const isPasswordValid = formData.password.length >= 8;

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
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
              <h2 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h2>
              <p className="text-white/70">Join our community today</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium text-sm">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 pl-11 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all"
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

              {/* Password Field */}
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
                        : "border-white/20 focus:ring-violet-400/50 focus:border-violet-400/50"
                    }`}
                    placeholder="Create a password"
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                    )}
                  </button>
                </div>
                {formData.password && !isPasswordValid && (
                  <p className="text-red-300 text-sm">
                    Password must be at least 8 characters long
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
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
                        : "border-white/20 focus:ring-violet-400/50 focus:border-violet-400/50"
                    }`}
                    placeholder="Confirm your password"
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                    )}
                  </button>
                </div>
                {formData.confirmPassword && !passwordsMatch && (
                  <p className="text-red-300 text-sm">Passwords don't match</p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${
                      agreedToTerms
                        ? "bg-violet-500/20 border-violet-400/50"
                        : "bg-white/10 border-white/20"
                    }`}
                  >
                    {agreedToTerms && (
                      <svg
                        className="w-3 h-3 text-violet-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </label>
                <div className="text-sm text-white/70 leading-relaxed">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-violet-300 hover:text-violet-200 transition-colors"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-violet-300 hover:text-violet-200 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!agreedToTerms || !passwordsMatch || !isPasswordValid}
                className="w-full px-6 py-3 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-white font-semibold rounded-xl border border-violet-400/30 hover:border-violet-400/50 hover:bg-gradient-to-r hover:from-violet-500/30 hover:to-indigo-500/30 shadow-lg hover:shadow-violet-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-violet-400/30 disabled:hover:bg-gradient-to-r disabled:hover:from-violet-500/20 disabled:hover:to-indigo-500/20"
              >
                Create Account
              </button>

              {/* Divider */}
              {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-transparent px-2 text-white/50">
                  Or sign up with
                </span>
              </div>
            </div> */}

              {/* Social Sign Up */}
              {/* <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex justify-center items-center px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white/80 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>
              <button
                type="button"
                className="flex justify-center items-center px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white/80 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div> */}
            </form>

            {/* Switch to Login */}
            <div className="mt-6 text-center">
              <p className="text-white/70">
                Already have an account?{" "}
                <Link
                  to={"/signIn"}
                  className="text-violet-300 hover:text-violet-200 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default SignUpForm;
