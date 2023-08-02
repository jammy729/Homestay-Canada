"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import LightBox from "../../component/lightbox";
import Link from "next/link";
import detectStringType from "../../../utils/regex";
import ContactForm from "../../component/contact_form";

export default async function Page() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const id = searchParams.get("id");

  const data = await getListing(address, id);
  const areaData = await getAreaListing(data.city);

  const similarListings =
    areaData.length > 0
      ? areaData.filter((areaData) => areaData._id !== id).slice(0, 3)
      : [];

  return (
    <main id="listings-detail">
      <section className="cover_image_container container-full-layout">
        <Image
          src={
            data.coverImage ||
            (data.imageGallery.length > 0
              ? data.imageGallery[0]
              : data.imageGallery[1])
          }
          alt="hello"
          className="cover_image"
          width={1080}
          height={800}
        />
      </section>

      <section className="container-layout listing_content">
        <h1>{`${data.address}, ${data.city}`}</h1>
        <h2 style={{ textTransform: "uppercase" }}>
          {detectStringType(data.price)}
        </h2>
        <a href="#photos" className="photos_btn" style={{ padding: "10px 0" }}>
          <button>Browse for Photos</button>
        </a>
        <h3 className="description_title">Room Description</h3>
        <p>{data.description}</p>
      </section>

      <ContactForm content="지금 연락하세요" />

      <section className="img_gallery_container container-layout">
        <h3>Room photo gallery</h3>
      </section>

      <section className="img_gallery_container container-full-layout">
        <div className="img_gallery_wrapper" id="photos">
          {data.imageGallery.map((imageData, index) => (
            <div className="img_gallery" key={index}>
              <LightBox
                src={imageData}
                alt={`Images for ${data.address}, in ${data.city}`}
                zIndex={100}
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

      {/* SIMILAR LISTINGS */}
      {similarListings.length > 0 && (
        <section className="similar_listings_container container-layout">
          <div className="similar_listings_title">
            <h3>See more listings in {data.city}</h3>
          </div>
          <div className="similar_listing_wrapper">
            {similarListings.map((listing, dataIndex) => (
              <div className="similar_listing" key={dataIndex}>
                <Link
                  href={`/listing/detail?address=${encodeURIComponent(
                    listing.address
                  )}&id=${encodeURIComponent(listing._id)}`}
                >
                  <Image
                    className="similar_listing_thumbnail"
                    src={listing.coverImage}
                    width={1080}
                    height={800}
                    alt={`Images for ${listing.address}, in ${listing.city}`}
                  />
                  <div className="similar_listing_details">
                    <p id="h5_style">{detectStringType(listing.price)}</p>
                    <p id="h5_style">{listing.address}</p>
                    <p id="h5_style">{listing.city}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

async function getListing(address, id) {
  const url =
    `${process.env.API_ENDPOINT}/listing/detail?address=${encodeURIComponent(
      address
    )}` + `&id=${encodeURIComponent(id)}`;

  const apiResponse = await fetch(url, {
    cache: "no-store",
  });

  return apiResponse.json();
}

async function getAreaListing(city) {
  const apiEndpoint =
    `${process.env.API_ENDPOINT}/listing/city` +
    `?city=${encodeURIComponent(city)}`;

  const apiResponse = await fetch(apiEndpoint, {
    cache: "no-store",
  });
  return apiResponse.json();
}
