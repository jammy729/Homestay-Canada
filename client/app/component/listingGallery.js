import React from "react";
import Link from "next/link";
import detectStringType from "@/utils/regex";
import Image from "next/image";
const ListingGallery = ({
  address,
  id,
  city,
  price,
  coverImage,
  accommodationType,
  alt,
}) => {
  return (
    <div className="listings_img_container">
      <Link
        href={`/listing/detail?address=${encodeURIComponent(
          address
        )}&id=${encodeURIComponent(id)}`}
      >
        <div className="listing">
          <div className="listing_image">
            <Image
              src={`${coverImage}`}
              width={1080}
              height={800}
              alt={alt}
            ></Image>
          </div>
          <div className="listing_content">
            <h5 id="address">{address}</h5>
            <h5 id="city">{city}</h5>
            <h5 id="price">{detectStringType(price)}</h5>
            <h5 id="accommodation">{accommodationType}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingGallery;
