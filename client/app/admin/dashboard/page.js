"use client";

import React, { useState } from "react";

import axios from "axios";
import Image from "next/image";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import detectStringType from "@/utils/regex";

async function getListing() {
  const apiResponse = await fetch(`${process.env.API_ENDPOINT}/listing`);
  if (!apiResponse.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return apiResponse.json();
}

export default async function Page() {
  const listing = await getListing();
  console.log(listing.length);
  const deleteListing = (id) => {
    axios.delete(`${process.env.API_ENDPOINT}/listing/delete/${id}`);
    alert("Listing Deleted");
    router.push("/admin/dashboard");
  };

  return (
    <React.Fragment>
      <section className="container-fluid listing">
        <div className="listing_container">
          {listing.length === 0 ? (
            <p>No Results found</p>
          ) : (
            listing.map((listingData, dataIndex) => (
              <div className="listings_img_container" key={dataIndex}>
                <div className="thumbnail">
                  <Image
                    src={listingData.coverImage}
                    width={1080}
                    height={800}
                    alt={listingData.address}
                  />
                </div>
                <div className="listing_detail">
                  <h3>ID: {listingData._id}</h3>
                  <h3>Address: {listingData.address}</h3>
                  <h3>City: {listingData.city}</h3>
                  <h3>Price: {detectStringType(listingData.price)}</h3>
                </div>
                <div className="cta">
                  <Stack
                    spacing={2}
                    sx={{ justifyContent: "center", height: "100%" }}
                  >
                    <Button
                      variant="contained"
                      endIcon={<AiFillEdit />}
                      href={`/admin/${listingData._id}`}
                    >
                      수정
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="error"
                      endIcon={<AiFillDelete />}
                      onClick={() => deleteListing(listingData._id)}
                    >
                      지우기
                    </Button>
                  </Stack>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </React.Fragment>
  );
}
