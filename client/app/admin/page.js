"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
      <section className="login-form">
        <h1>LOGIN</h1>
        <form action="POST">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2, padding: "15px 0" }}
            onClick={submit}
          >
            Sign In
          </Button>
        </form>
      </section>
    </div>
  );
}
