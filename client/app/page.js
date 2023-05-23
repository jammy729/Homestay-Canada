"use client";
import Link from "next/link";
import React from "react";

async function getListing() {
  const apiResponse = await fetch("http://localhost:8000/listing");
  return apiResponse.json();
}
export default async function Page() {
  const listing = await getListing();
  console.log(listing.address);
  return (
    <main>
      {/* GREETINGS */}

      <section className="two_column container-layout">
        <div className="greeting">
          <h1>Welcome to ...</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
            doloribus hic molestias nam placeat quo recusandae nisi eligendi
            voluptates ad! Non fugiat aspernatur hic magni natus similique vel
            consequatur libero.
          </p>
        </div>
        <div className="contact_me_short">
          <h1>Contact Me</h1>
          <p>778 903-0729</p>
        </div>
      </section>

      {/* LISTINGS  */}
      <section className="listings two_column container-full-layout">
        {listing.map((listingData, dataIndex) => (
          <div className="listings_img_container" key={dataIndex}>
            <Link href={`/detail/${listingData.address}`}>
              <div
                className="hover_image listings_img"
                style={{
                  backgroundImage: `url(${listingData.coverImage})`,
                }}
              >
                <div className="overlay dark" style={{ zIndex: "1" }}></div>
                <div className="listing_content" style={{ zIndex: "2" }}>
                  <h4>{renderTitle(listingData.address)}</h4>
                  <h4>{listingData.city}</h4>
                  <h4>${listingData.price}</h4>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}

//remove (-)
function renderTitle(title) {
  var renderedTitle = title.replace(/-/g, " ");
  return renderedTitle;
}
