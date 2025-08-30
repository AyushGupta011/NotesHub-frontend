import React, { useState } from "react";

export default function AuthUI({ onLogin, onSignup }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (mode === "login") await onLogin(form.email, form.password);
    else await onSignup(form.name, form.email, form.password);
  };

  return (
    <div className="flex items-center justify-center">
    <div className="auth-container  bg-white rounded-2xl shadow-xl ">
      <h3 className="text-xl text-indigo-600 font-bold text-center mb-4">
        {mode === "login" ? "Login" : "Sign Up"}
      </h3>
      <form onSubmit={submit} className="flex flex-col gap-3">
        {mode === "signup" && (
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded-lg"
          />
        )}
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-lg">
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
      <button
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
        className="mt-3 text-sm text-indigo-600"
      >
        {mode === "login" ? "New user? Sign up" : "Already have account? Login"}
      </button>
    </div>
    </div>
  );
}
