"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useRouter();

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post(`${process.env.API_ENDPOINT}/user/login`, {
          email,
          password,
        })
        .then((res) => {
          if (res.data == "success") {
            history.push("/admin/dashboard", { state: { id: email } });
          } else if (res.data === "incorrect") {
            alert("User have not sign up");
          } else if (res.data === "notexist") {
            alert("User has not signed up");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container-layout">
      <h1>Login Page</h1>
      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input type="submit" onClick={submit} />
      </form>

      <Link href="/admin/signup">Signup Page</Link>
    </div>
  );
}
