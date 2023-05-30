"use client";
import Link from "next/link";
import React from "react";
import ListingGallery from "@/component/listingGallery";
async function getListing() {
  const apiResponse = await fetch(`${process.env.API_ENDPOINT}/listing`);

  return apiResponse.json();
}
export default async function Page() {
  const listing = await getListing();
  console.log(listing);

  return (
    <main>
      {/* GREETINGS */}

      <section className="container-layout">
        <div className="greeting">
          <h1>홈스테이 캐나다</h1>
          <p>
            홈스테이 캐나다는 한인 유학생들을 위한 한인가정 배정전문
            플랫폼입니다
          </p>
        </div>
      </section>

      {/* LISTINGS  */}
      <section className="listings two_column container-full-layout">
        {listing.map((data, dataIndex) => (
          <ListingGallery
            key={dataIndex}
            address={data.address}
            city={data.city}
            price={data.price}
            coverImage={
              data.coverImage ||
              (data.imageGallery.length > 0
                ? data.imageGallery[0]
                : data.imageGallery[1])
            }
          />
          // <div className="listings_img_container" key={dataIndex}>
          //   <Link href={`/detail/${listingData.address}`}>
          //     <div
          //       className="hover_image listings_img"
          //       style={{
          //         backgroundImage: `url(${
          //           listingData.coverImage ||
          //           (listingData.imageGallery.length > 0
          //             ? listingData.imageGallery[0]
          //             : defaultImage)
          //         })`,
          //       }}
          //     >
          //       <div className="overlay dark" style={{ zIndex: "1" }}></div>
          //       <div className="listing_content" style={{ zIndex: "2" }}>
          //         <h4>{listingData.address}</h4>
          //         <h4>{listingData.city}</h4>
          //         <h4>{detectStringType(listingData.price)}</h4>
          //       </div>
          //     </div>
          //   </Link>
          // </div>
        ))}
      </section>
    </main>
  );
}
