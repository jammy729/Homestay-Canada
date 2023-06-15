"use client";

import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./logo";
const navbarItems = [
  { path: "/rooms", name: "방 보기" },
  // { path: "/information", name: "안내" },
  // { path: "/faq", name: "공지사항" },
  { path: "/contact", name: "문의" },
];

const dashboardItems = [
  { path: "/admin/createListing", name: "리스팅 더하기" },
];

const header = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/admin");

  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <header>
        <div id="navbar">
          <div className="navbar_logo">
            <Link
              href="/"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Logo width={128} height={128} />
            </Link>
          </div>
          <div className="navbar_menu">
            {isDashboard
              ? dashboardItems.map((data, index) => (
                  <Link href={data.path} key={index}>
                    <div className="navbar_items">{data.name}</div>
                  </Link>
                ))
              : navbarItems.map((data, index) => (
                  <Link href={data.path} key={index}>
                    <div className="navbar_items">{data.name}</div>
                  </Link>
                ))}
          </div>
          <div
            onClick={() => setOpen(!open)}
            className={"mobile_menu " + (open ? "fixed" : "")}
          >
            <span
              className={"hamburger_menu " + (open ? "white" : "black")}
            ></span>
            <span
              className={"hamburger_menu " + (open ? "white" : "black")}
            ></span>
            <span
              className={"hamburger_menu " + (open ? "white" : "black")}
            ></span>
          </div>
          <div className={"mobile_drawer " + (open ? "open" : "close")}>
            {navbarItems.map((data, mobileIndex) => (
              <div className="mobile_items" key={mobileIndex}>
                <Link href={data.path}>
                  <div className="navbar_items">
                    <h2>{data.name}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default header;
