import React from "react";
import Link from "next/link";
import detectStringType from "@/utils/regex";

const ListingGallery = ({ address, id, city, price, coverImage }) => {
  return (
    <div className="listings_img_container">
      <Link href={`/detail/${address}/${id}`}>
        <div
          className="hover_image listings_img"
          style={{
            backgroundImage: `url(${coverImage})`,
          }}
        >
          <div className="overlay dark" style={{ zIndex: "1" }}></div>
          <div className="listing_content" style={{ zIndex: "2" }}>
            <h4>{address}</h4>
            <h4>{city}</h4>
            <h4>{detectStringType(price)}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingGallery;
