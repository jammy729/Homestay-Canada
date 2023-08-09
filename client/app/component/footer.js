"use client";
import React from "react";
import Link from "next/link";
import Logo from "./logo";
import NavbarItems from "../../json/navigationItems.json";
const footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer id="footer">
      <section className="container-fluid">
        <div id="footer_logo">
          <Link href="/">
            <Logo width={200} height={200} />
          </Link>
        </div>

        <div id="footer_menu">
          <h4 style={{ fontWeight: "bold" }}>메뉴</h4>
          {NavbarItems.map((data, dataIndex) => (
            <React.Fragment key={dataIndex}>
              {data.path === "/contact" ? (
                // Render something else for /contact
                <Link href="#footer_contact_form">
                  <p>{data.name}</p>
                </Link>
              ) : (
                // Render the standard link for other paths
                <Link href={`${data.path}`}>
                  <p>{data.name}</p>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        <div id="footer_contact">
          <h4 style={{ margin: "0", fontWeight: "bold" }}>문의 하기</h4>

          <h3 style={{ marginTop: "10px" }}>캐나다 홈스테이</h3>
          <p>
            <Link href="tel:1-778-903-0729" className="phone_number">
              778.903.0729
            </Link>
          </p>
          <p>
            <Link href="mailto:homestaycanada92@gmail.com" className="email">
              homestaycanada92@gmail.com
            </Link>
          </p>
        </div>
      </section>
      <section className="footer_end">
        <p>&copy;{year} 홈스테이 캐나다 Homestay Canada</p>
      </section>
    </footer>
  );
};

export default footer;
