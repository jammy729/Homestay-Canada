"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavbarItems from "@/json/navigationItems.json";
import DashboardItems from "@/json/dashboardItems.json";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import MobileLogo from "./mobile_logo";
const header = () => {
  const pathname = usePathname();
  // /admin and additional path
  const isDashboard = pathname.startsWith("/admin") && pathname.length > 6;
  const [open, setOpen] = useState(false);
  const handleMobileDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMobileLinkClicked = () => {
    if (document.readyState === "complete") {
      setTimeout(() => {
        setOpen(!open);
      }, 350);
    }
  };

  const [logoState, setLogoState] = useState(false);
  const isMobileView = () => {
    return window.innerWidth < 576;
  };
  useEffect(() => {
    const handleResize = () => {
      if (isMobileView()) {
        setLogoState(!isMobileView());
        console.log("mobile view");
      }
      setLogoState(isMobileView());
      console.log("desktop view");
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(logoState);
  return (
    <React.Fragment>
      <header>
        <div id="navbar">
          <div className="navbar_logo">
            <Link
              href="/"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {logoState ? <MobileLogo /> : <Logo width={128} height={128} />}
            </Link>
          </div>
          <div className="navbar_menu">
            {isDashboard
              ? DashboardItems.map((data, index) => (
                  <Link href={data.path} key={index}>
                    <div className="navbar_items">{data.name}</div>
                  </Link>
                ))
              : NavbarItems.map((data, index) => (
                  <Link href={data.path} key={index}>
                    <div className="navbar_items">{data.name}</div>
                  </Link>
                ))}
          </div>
          <div
            onClick={handleMobileDrawerToggle}
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
            {NavbarItems.map((data, mobileIndex) => (
              <div className="mobile_items" key={mobileIndex}>
                <Link href={data.path} onClick={handleMobileLinkClicked}>
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
