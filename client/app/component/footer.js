"use client";
import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiOutlineSend } from "react-icons/ai";
import Snackbar from "@mui/material/Snackbar";

import Link from "next/link";
import emailjs from "@emailjs/browser";
import Logo from "./logo";
import NavbarItems from "../../json/navigationItems.json";
const footer = () => {
  const date = new Date();
  let year = date.getFullYear();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <Button color="primary" size="small" onClick={handleClose}>
        지우기
      </Button>
    </>
  );

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleMessage = (event) => {
    setMessage(event.target.value);
  };
  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_e6ouy5j",
        "template_br1d57i",
        form.current,
        "MlWnv73jh5_sjtIRS"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("email successful");

          setEmail("");
          setName("");
          setMessage("");
          setPhoneNumber("");
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  const form = useRef();
  return (
    <footer>
      <section className="container-fluid">
        <div id="footer_logo">
          <Link href="/">
            <Logo width={200} height={200} />
          </Link>
        </div>

        <div id="footer_menu">
          <h4 style={{ fontWeight: "bold" }}>메뉴</h4>
          {NavbarItems.map((data, dataIndex) => (
            <Link href={`${data.path}`} key={dataIndex}>
              <p>{data.name}</p>
            </Link>
          ))}
        </div>

        <div id="footer_contact">
          <h4 style={{ margin: "0", fontWeight: "bold" }}>문의 하기</h4>
          <h3 style={{ marginTop: "10px" }}>캐나다 홈스테이</h3>
          <p>
            <Link href="tel: 7789030729" className="phone_number">
              778.903.0729
            </Link>
          </p>
          <p>
            <Link href="mailto:homestaycanada92@gmail.com" className="email">
              homestaycanada92@gmail.com
            </Link>
          </p>
        </div>

        <div id="footer_contact_form">
          <h4 style={{ margin: "0", fontWeight: "bold" }}>등록 문의</h4>
          <form ref={form} onSubmit={sendEmail}>
            <TextField
              label="이름"
              type="text"
              variant="standard"
              name="from_name"
              value={name}
              onChange={handleName}
            />
            <TextField
              label="이메일"
              variant="standard"
              name="from_email"
              type="email"
              value={email}
              onChange={handleEmail}
            />
            <TextField
              label="전화번호"
              variant="standard"
              type="number"
              name="phone_number"
              value={phoneNumber}
              onChange={handlePhoneNumber}
            />
            <TextField
              label="문의 메세지"
              type="text"
              variant="standard"
              name="message"
              value={message}
              onChange={handleMessage}
              rows={4}
            />
            <Button
              variant="contained"
              endIcon={<AiOutlineSend />}
              sx={{ marginTop: "10px" }}
              disabled={!email || !name || !message}
              type="submit"
              onClick={handleClick}
            >
              보내기
            </Button>
            <Snackbar
              open={open}
              severity="success"
              autoHideDuration={6000}
              onClose={handleClose}
              message="이메일 보냈습니다"
              action={action}
            />
          </form>
        </div>
      </section>
      <section className="footer_end">
        <p>&copy;{year} 홈스테이 캐나다 Homestay Canada</p>
      </section>
    </footer>
  );
};

export default footer;
