"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@mavenforge.com");
  const [password, setPassword] = useState("forge-admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="brutal-card bg-paper p-8">
      <p className="text-xs uppercase tracking-[0.3em]">Internal Access</p>
      <h1 className="mt-4 font-[family:var(--font-display)] text-6xl uppercase leading-none">
        Admin Login
      </h1>
      <p className="mt-4 text-sm leading-7">
        Use the credentials from `.env` or the fallback development account.
      </p>

      <div className="mt-8 grid gap-5">
        <label>
          <span className="editor-label">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="editable-field"
          />
        </label>
        <label>
          <span className="editor-label">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="editable-field"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-signal">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 rounded-full border-[3px] border-black bg-ink px-6 py-3 text-sm uppercase tracking-[0.25em] text-paper"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
