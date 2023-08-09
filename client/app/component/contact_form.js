"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Link from "next/link";

const ContactForm = ({ content }) => {
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

  const Alert = function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  };

  const action = (
    <React.Fragment>
      <Button color="primary" size="small" onClick={handleClose}>
        지우기
      </Button>
    </React.Fragment>
  );

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (form.current) {
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
      e.currentTarget.reset();
    }
  };

  const form = useRef();

  return (
    <div
      className="contact_form"
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/XJp8NYK6/City-Centre-Plan.jpg",
      }}
    >
      <div className="overlay dark"></div>
      <div className="form_content container-layout">
        <div id="form_content_wrapper">
          <h2>{content}</h2>
          <h4>
            <Link href="tel:1-778-903-0729" className="phone_number">
              778.903.0729
            </Link>
          </h4>
        </div>
        <div id="footer_contact_form">
          <form
            ref={form}
            onSubmit={sendEmail}
            method="post"
            encType="multipart/form-data"
          >
            <div className="form_input_wrapper">
              <label htmlFor="name">name</label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                value={name}
                onChange={handleName}
              />
            </div>

            <div className="form_input_wrapper">
              <label htmlFor="email">email</label>
              <input
                type="text"
                id="from_email"
                name="from_email"
                value={email}
                onChange={handleEmail}
              />
            </div>

            <div className="form_input_wrapper">
              <label htmlFor="phone_number">phone number</label>
              <input
                type="number"
                id="phone_number"
                name="phone_number"
                value={phoneNumber}
                onChange={handlePhoneNumber}
              />
            </div>

            <div className="form_input_wrapper">
              <label htmlFor="message">message</label>
              <input
                type="text"
                id="message"
                name="message"
                value={message}
                onChange={handleMessage}
              />
            </div>
            <div className="submit_btn">
              <button
                disabled={!email || !name || !message}
                type="submit"
                onClick={handleClick}
                style={{ marginTop: "10px" }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || "Space") {
                    handleClick();
                  }
                }}
              >
                Send
              </button>
            </div>
          </form>
          <Snackbar
            open={open}
            // autoHideDuration={5000}
            onClose={handleClose}
            action={action}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              이메일 보냈습니다!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
