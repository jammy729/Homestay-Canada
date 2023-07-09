"use client";
import React from "react";
import ListingGallery from "./component/listingGallery";

export default async function Page() {
  const listing = await getListing();

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
        {listing.length === 0 ? (
          <div className="container-layout">No results found</div>
        ) : (
          listing.map((data, dataIndex) => (
            <ListingGallery
              key={dataIndex}
              id={data._id}
              address={data.address}
              city={data.city}
              price={data.price}
              accommodationType={data.accommodationType}
              coverImage={
                data.coverImage ||
                (data.imageGallery.length > 0
                  ? data.imageGallery[0]
                  : data.imageGallery[1])
              }
            />
          ))
        )}
      </section>
    </main>
  );
}

async function getListing() {
  const apiResponse = await fetch(`${process.env.API_ENDPOINT}/listing`);
  return apiResponse.json();
}
