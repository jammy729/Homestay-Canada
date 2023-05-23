"use client";
import React from "react";
import Image from "next/image";

async function getListing(id) {
  const apiResponse = await fetch(
    `http://localhost:8000/listing/detail/${id}`,
    {
      cache: "no-store",
    }
  );
  return apiResponse.json();
}

export default async function Page({ params }) {
  const { id } = params;

  const listing = await getListing(id);

  function renderTitle(title) {
    var renderedTitle = title.replace(/-/g, " ");
    return renderedTitle;
  }

  return (
    <main id="listings-detail">
      {listing.map((data, dataIndex) => (
        <div key={dataIndex}>
          <section className="cover_image_container">
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
            <div className="img_gallery_wrapper">
              {listing.map((data) =>
                data.imageGallery.map((image, index) => (
                  <div className="img_gallery" key={index}>
                    <Image
                      src={image}
                      width={1080}
                      height={800}
                      alt={"hello"}
                    />
                  </div>
                ))
              )}
            </div>
          </section>
          <section className="contact_me container-layout">
            <h2>Contact Me Form</h2>
          </section>
        </div>
      ))}
    </main>
  );
}
