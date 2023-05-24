"use client";

import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { usePathname } from "next/navigation";

const navbarItems = [
  { path: "/rooms", name: "방 보기" },
  { path: "/information", name: "안내" },
  { path: "/faq", name: "공지사항" },
  { path: "/contact", name: "문의" },
];

const dashboardItems = [
  { path: "/admin/createListing", name: "리스팅 더하기" },
];

const header = () => {
  const pathname = usePathname();
  console.log(pathname);

  const isDashboard = pathname === "/admin";

  if (isDashboard) {
    console.log("this is admin");
  } else {
    console.log("this is not admin");
  }

  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
      <header>
        <div id="navbar" style={{ maxWidth: "100%", padding: "20px" }}>
          <div className="navbar_logo">
            <Link href="/">
              <span id="h1_style">밴쿠버 홈스테이/렌탈</span>
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
            {/* {navbarItems.map((data, index) => (
              <Link href={data.path} key={index}>
                <div className="navbar_items">{data.name}</div>
              </Link>
            ))} */}
          </div>
          <div className="mobile_menu" onClick={() => setShow(!show)}>
            <div
              className={"hamburger_menu " + (show ? "white" : "black")}
            ></div>
            <div
              className={"hamburger_menu " + (show ? "white" : "black")}
            ></div>
            <div
              className={"hamburger_menu " + (show ? "white" : "black")}
            ></div>
          </div>
          {show && (
            <div className="mobile_drawer">
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
          )}
        </div>
      </header>
    </React.Fragment>
  );
};

export default header;
