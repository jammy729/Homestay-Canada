"use client";

import React from "react";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

async function getListing() {
  const apiResponse = await fetch("http://localhost:8000/listing");
  return apiResponse.json();
}

export default async function Page() {
  const listing = await getListing();
  console.log();
  const deleteListing = (id) => {
    axios.delete(`http://localhost:8000/listing/delete/${id}`);
  };

  return (
    <React.Fragment>
      <section className="container-fluid listing">
        <div className="listing_container">
          {listing.map((listingData, dataIndex) => (
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
                <h3>Price: ${listingData.price}</h3>
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
          ))}
        </div>
      </section>
    </React.Fragment>
  );
}
