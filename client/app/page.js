"use client";
import React, { use } from "react";
import ListingGallery from "./component/listingGallery";
import ContactForm from "./component/contact_form";

async function getMainListing() {
  const url = `${process.env.API_ENDPOINT}/listing/home`;
  const res = await fetch(url);
  return res.json();
}

const dataPromise = getMainListing();

export default function Page() {
  const listing = use(dataPromise);
  console.log({ listing });
  return (
    <main>
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
              alt={`Cover image of ${data.address} in ${data.city}`}
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
      <section className="contact_form">
        <ContactForm content="지금 연락하세요" />
      </section>
    </main>
  );
}
