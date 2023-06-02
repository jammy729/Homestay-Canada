"use client";
import React, { useState } from "react";
import Image from "next/image";

const LightBox = ({ children, src, alt, zIndex = 100 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  console.log("is it open?:", isOpen);

  return (
    <div onClick={toggleIsOpen} style={{ height: "100%" }}>
      {children}
      {isOpen ? (
        <div
          onClick={toggleIsOpen}
          onMouseDown={stopPropagation} // Stop click event propagation on the inner div
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
          <Image
            src={src}
            alt={alt}
            width={1080}
            height={800}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "none",
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

async function getListing(id) {
  const apiResponse = await fetch(
    `${process.env.API_ENDPOINT}/listing/detail/${id}`,
    {
      cache: "no-store",
    }
  );

  return apiResponse.json();
}

export default async function Page({ params }) {
  const { id } = params;

  const listing = await getListing(id);
  console.log(listing);

  return (
    <main id="listings-detail">
      {listing.map((data, dataIndex) => (
        <div key={dataIndex}>
          <section className="cover_image_container container-layout">
            <div className="cover_image_scroll">
              <Image
                src={
                  data.coverImage ||
                  (data.imageGallery.length > 0
                    ? data.imageGallery[0]
                    : defaultImage)
                }
                alt="hello"
                className="cover_image"
                width={1080}
                height={800}
              />
            </div>
          </section>

          <section className="desc_container container-layout">
            <h1>{data.address}</h1>
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
                data.imageGallery.map((imageData, index) => (
                  <div className="img_gallery" key={index}>
                    <LightBox
                      src={imageData}
                      alt={`Images for ${data.address}, in ${data.city}`}
                    >
                      <Image
                        src={imageData}
                        width={1080}
                        height={800}
                        alt={`Images for ${data.address}, in ${data.city}`}
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
