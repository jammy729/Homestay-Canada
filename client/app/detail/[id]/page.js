"use client";
import React, { useState } from "react";
import Image from "next/image";

const LightBox = ({ children, src, alt, Wrapper = "div", zIndex = 100 }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper onClick={toggleIsOpen} style={{ height: "100%" }}>
      {children}
      {isOpen ? (
        <div
          onClick={toggleIsOpen}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.7)",
            cursor: "pointer",
            zIndex,
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ) : null}
    </Wrapper>
  );
};

async function getListing(id) {
  const apiResponse = await fetch(`${process.env.API_ENDPOINT}/detail/${id}`, {
    cache: "no-store",
  });

  return apiResponse.json();
}

export default async function Page({ params }) {
  const { id } = params;

  const listing = await getListing(id);

  function renderTitle(title) {
    var renderedTitle = title.replace(/-/g, " ");
    return renderedTitle;
  }
  console.log(listing);

  return (
    <main id="listings-detail">
      {listing.map((data, dataIndex) => (
        <div key={dataIndex}>
          <section className="cover_image_container container-layout">
            <div className="cover_image_scroll">
              <Image
                src={data.coverImage}
                alt="hello"
                className="cover_image"
                layout="responsive"
                width={1080}
                height={800}
              />
            </div>
          </section>

          <section className="desc_container container-layout">
            <h1>{renderTitle(data.address)}</h1>
            <h2 style={{ textTransform: "uppercase" }}>{data.city}</h2>
            <h3 className="description_title">방 정보</h3>
            <p>{data.description}</p>
          </section>
          <section className="img_gallery_container container-layout">
            <h3>방 사진 갤러리</h3>
          </section>
          <section className="img_gallery_container container-full-layout">
            <div className="img_gallery_wrapper">
              {listing.map((data) =>
                data.imageGallery.map((image, index) => (
                  <div className="img_gallery" key={index}>
                    <LightBox src={image} alt={"hello"}>
                      <Image
                        src={image}
                        width={1080}
                        height={800}
                        alt={"hello"}
                      />
                    </LightBox>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      ))}
    </main>
  );
}
