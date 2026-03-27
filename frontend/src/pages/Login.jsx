import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  let error = false;
  let loading = false;

  let successMessage = true;

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
      {/* bg glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-rose-900/25 rounded-full blur-[130px]" />
        <div className="absolute -bottom-32 -left-20 w-[450px] h-[450px] bg-amber-700/20 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
        {/* ── Left form panel ── */}
        <div className="flex items-center justify-center px-8 py-12 bg-[#111111]">
          <div className="w-full max-w-sm">
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors mb-8"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to register
            </Link>

            <div className="flex items-center gap-2 mb-8">
              <div className="w-7 h-7 bg-amber-500/10 border border-amber-500/25 rounded-lg flex items-center justify-center">
                <span className="text-amber-400 text-xs">✦</span>
              </div>
              <span className="text-white font-bold tracking-tight">
                Inkwell
              </span>
            </div>

            <p className="text-amber-500 text-xs uppercase tracking-[0.15em] mb-2">
              Welcome back
            </p>
            <h2 className="text-3xl font-bold text-white mb-1">Sign In</h2>
            <p className="text-white/35 text-sm mb-8">
              New to Inkwell?{" "}
              <Link
                to="/register"
                className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2"
              >
                Create an account
              </Link>
            </p>

            {successMessage && (
              <div className="flex gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-[10px] font-bold">
                    ✓
                  </span>
                </div>
                <p className="text-green-400 text-sm">{successMessage}</p>
              </div>
            )}

            {error && (
              <div className="flex gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-[10px] font-bold">✕</span>
                </div>
                <div>
                  <p className="text-red-400 text-sm font-semibold">
                    Sign in failed
                  </p>
                  <p className="text-red-400/60 text-xs mt-0.5">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-[11px] text-amber-500/50 hover:text-amber-400 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
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
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
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

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/[0.07]" />
                <span className="text-white/25 text-xs">or continue with</span>
                <div className="flex-1 h-px bg-white/[0.07]" />
              </div>

              {/* Social */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Google",
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: "GitHub",
                    icon: (
                      <svg
                        className="w-4 h-4 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013.01-.4c1.02.005 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    ),
                  },
                ].map(({ label, icon }) => (
                  <button
                    key={label}
                    type="button"
                    className="flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl py-2.5 text-sm text-white/50 hover:text-white/80 transition-all"
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>

        {/* ── Right branding panel ── */}
        <div className="hidden lg:flex flex-col justify-center px-12 py-14 bg-gradient-to-br from-[#111] to-[#0a0a0a] border-l border-white/[0.08]">
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

          <div className="flex flex-col gap-6">
            {[
              {
                emoji: "✍️",
                title: "Rich Writing Editor",
                desc: "Distraction-free environment for your best work",
              },
              {
                emoji: "👁️",
                title: "Engaged Readers",
                desc: "Connect with an audience that loves your genre",
              },
              {
                emoji: "📊",
                title: "Deep Analytics",
                desc: "Understand what resonates with your community",
              },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-9 h-9 bg-white/[0.04] border border-white/[0.07] rounded-xl flex items-center justify-center flex-shrink-0 text-base">
                  {emoji}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-white/35 text-xs mt-0.5 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
