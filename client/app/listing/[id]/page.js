"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import LightBox from "@/component/lightbox";
import Link from "next/link";
import detectStringType from "@/utils/regex";
export default async function Page() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const id = searchParams.get("id");

  const data = await getListing(address, id);

  const areaData = await getAreaListing(data.city);
  const similarListings = areaData
    .filter((areaData) => areaData._id !== id)
    .slice(0, 3);

  console.log({ similarListings });
  return (
    <main id="listings-detail">
      <section className="cover_image_container container-full-layout">
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
      {similarListings.length > 0 && (
        <section className="similar_listings_container container-layout">
          <div className="similar_listings_title">
            <h3>{data.city} 에 있는 리스팅 더 보기</h3>
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
      {/* {similarListings.length === 0 ? (
        <div></div>
      ) : (
        similarListings.map((data, dataIndex) => (
          <section
            className="similar_listings_container container-layout"
            key={dataIndex}
          >
            <div id="similar_listings_title">
              <h3>{data.city} 에 있는 리스팅 더 보기</h3>
            </div>
            <div className="similar_listing_wrapper">
              <div className="similar_listing">
                <Image
                  className="similar_listing_thumbnail"
                  src={data.coverImage}
                  width={1080}
                  height={800}
                  alt={`Images for ${data.address}, in ${data.city}`}
                />
              </div>
            </div>
          </section>
        ))
      )} */}
    </main>
  );
}

async function getListing(address, id) {
  const url = `${
    process.env.API_ENDPOINT
  }/listing/detail?address=${encodeURIComponent(
    address
  )}&id=${encodeURIComponent(id)}`;

  const apiResponse = await fetch(url, {
    cache: "no-store",
  });

  return apiResponse.json();
}

async function getAreaListing(city) {
  let apiEndpoint = `${process.env.API_ENDPOINT}/listing/city`;
  apiEndpoint += `?city=${encodeURIComponent(city)}`;

  console.log("API Endpoint:", apiEndpoint); // Log the API endpoint
  const apiResponse = await fetch(apiEndpoint, {
    cache: "no-store",
  });
  return apiResponse.json();
}
