"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import LightBox from "@/component/lightbox";

export default async function Page() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const id = searchParams.get("id");
  const area = searchParams.get("area")
  const data = await getListing(address, id, area);

  return (
    <main id="listings-detail">
      <section className="cover_image_container container-layout">
        <Image
          src={
            data.coverImage ||
            (data.imageGallery.length > 0 ? data.imageGallery[0] : defaultImage)
          }
          alt="hello"
          className="cover_image"
          width={1080}
          height={800}
        />
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
          {data.imageGallery.map((imageData, index) => (
            <div className="img_gallery" key={index}>
              <LightBox
                src={imageData}
                alt={`Images for ${data.address}, in ${data.city}`}
              >
                <Image
                  className="img_gallery_thumbnails"
                  src={imageData}
                  width={1080}
                  height={800}
                  alt={`Images for ${data.address}, in ${data.city}`}
                />
              </LightBox>
            </div>
          ))}
        </div>
      </section>
      <section className="similar_listings">
        <h2>{data.city}</h2>
      </section>
    </main>
  );
}

async function getListing(address, id, area) {
  const url = `${
    process.env.API_ENDPOINT
  }/listing/detail?address=${encodeURIComponent(
    address
  )}&id=${encodeURIComponent(id)}&area=${encodeURIComponent(area)}`;

  const apiResponse = await fetch(url, {
    cache: "no-store",
  });

  return apiResponse.json();
}
