"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    setLoading(false);

    if (result?.error) {
      setError("Email atau password salah.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="relative border-[3px] border-true-black bg-paper-white neo-shadow p-10">
      {/* Corner accent */}
      <div className="absolute -right-[3px] -top-[3px] h-12 w-12 bg-primary-container" />

      <p className="font-body text-label-mono uppercase text-on-surface-variant">
        INTERNAL ACCESS
      </p>
      <h2 className="mt-3 font-display text-headline-lg-mobile uppercase leading-none text-true-black">
        SIGN IN
      </h2>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-1 block font-body text-label-mono uppercase text-on-surface-variant">
            EMAIL
          </label>
          <input
            id="admin-email"
            type="email"
            required
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className="neo-input w-full px-4 py-3 font-body text-body-md text-on-surface"
            placeholder="admin@mavenforge.com"
          />
        </div>

        <div>
          <label className="mb-1 block font-body text-label-mono uppercase text-on-surface-variant">
            PASSWORD
          </label>
          <div className="relative">
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="neo-input w-full px-4 py-3 pr-12 font-body text-body-md text-on-surface"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-0 top-0 flex h-full w-12 items-center justify-center border-l-[3px] border-true-black bg-surface-container text-on-surface-variant transition-colors hover:bg-secondary-container hover:text-true-black"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

        </div>

        {error && (
          <div className="border-[3px] border-primary-container bg-primary-container/10 px-4 py-3">
            <p className="font-body text-label-mono uppercase text-primary-container">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full border-[3px] border-true-black bg-true-black px-6 py-4 font-display text-headline-md uppercase text-paper-white neo-shadow transition-all hover:bg-primary-container hover:border-primary-container active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "AUTHENTICATING..." : "ACCESS FORGE"}
        </button>
      </form>
    </div>
  );
}
