import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  let successMessage = true;
  let error = false;
  let loading = false;

  const handleSubmit = () => {};
  const handleChange = () => {};

  const strength = Math.min(4, Math.floor(formData.password.length / 2));
  const strengthColor =
    strength <= 1
      ? "bg-red-500"
      : strength <= 2
        ? "bg-yellow-500"
        : strength <= 3
          ? "bg-blue-400"
          : "bg-green-500";

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
      {/* bg glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-violet-900/30 rounded-full blur-[130px]" />
        <div className="absolute -bottom-32 -right-20 w-[450px] h-[450px] bg-amber-700/20 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
        {/* ── Left branding panel ── */}
        <div className="hidden lg:flex flex-col justify-center px-12 py-14 bg-gradient-to-br from-[#111] to-[#0a0a0a] border-r border-white/[0.08]">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-center justify-center mb-8">
            <span className="text-amber-400 text-xl">✦</span>
          </div>
          <h1 className="text-[2.5rem] font-bold text-white tracking-tight leading-none mb-2">
            Inkwell
          </h1>
          <p className="text-white/35 text-sm italic mb-10">
            Where stories find their voice
          </p>
          <div className="w-10 h-px bg-amber-500/40 mb-10" />
          <blockquote className="text-white/45 text-sm leading-relaxed italic mb-3">
            "The scariest moment is always just before you start."
          </blockquote>
          <cite className="text-amber-500 text-xs tracking-[0.15em] uppercase not-italic">
            — Stephen King
          </cite>
          <div className="flex gap-8 mt-12 pt-10 border-t border-white/[0.06]">
            {[
              ["12K+", "Writers"],
              ["48K+", "Stories"],
              ["2M+", "Readers"],
            ].map(([num, label]) => (
              <div key={label}>
                <p className="text-amber-400 text-xl font-bold">{num}</p>
                <p className="text-white/25 text-xs uppercase tracking-wider mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="flex items-center justify-center px-8 py-12 bg-[#111111]">
          <div className="w-full max-w-sm">
            <p className="text-amber-500 text-xs uppercase tracking-[0.15em] mb-2">
              Begin your journey
            </p>
            <h2 className="text-3xl font-bold text-white mb-1">
              Create Account
            </h2>
            <p className="text-white/35 text-sm mb-8">
              Already a writer?{" "}
              <Link
                to="/login"
                className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2"
              >
                Sign in
              </Link>
            </p>

            {successMessage && (
              <div className="flex gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-[10px] font-bold">
                    ✓
                  </span>
                </div>
                <div>
                  <p className="text-green-400 text-sm font-semibold">
                    Account created!
                  </p>
                  <p className="text-green-400/60 text-xs mt-0.5">
                    {successMessage} — check your inbox to verify.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="flex gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-[10px] font-bold">✕</span>
                </div>
                <div>
                  <p className="text-red-400 text-sm font-semibold">
                    Something went wrong
                  </p>
                  <p className="text-red-400/60 text-xs mt-0.5">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-amber-500/50 focus:bg-amber-500/[0.04] focus:ring-2 focus:ring-amber-500/10 transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-amber-500/50 focus:bg-amber-500/[0.04] focus:ring-2 focus:ring-amber-500/10 transition-all"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 pr-16 text-sm text-white placeholder:text-white/20 outline-none focus:border-amber-500/50 focus:bg-amber-500/[0.04] focus:ring-2 focus:ring-amber-500/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold tracking-wider text-white/30 hover:text-amber-400 transition-colors"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
                {formData.password && (
                  <div className="flex gap-1.5 mt-1">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${n <= strength ? strengthColor : "bg-white/10"}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-amber-500/25 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Creating account…
                  </>
                ) : (
                  <>
                    Create Account
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="text-white/20 text-xs text-center mt-6 leading-relaxed">
              By registering you agree to our{" "}
              <a
                href="#"
                className="text-amber-500/50 hover:text-amber-400 transition-colors"
              >
                Terms
              </a>{" "}
              &amp;{" "}
              <a
                href="#"
                className="text-amber-500/50 hover:text-amber-400 transition-colors"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
