"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import { useParams } from "next/navigation";

import GalleryImage from "./Image";
import Photos from "./photos";

//plugins
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import PhotoAlbum from "react-photo-album";

const page = () => {
  const [listing, setListing] = useState([]);
  const params = useParams();
  const address = params.id;

  //plugins
  const [index, setIndex] = useState(-1);
  const [targetRowHeight, setTargetRowHeight] = useState(270); // Set the initial targetRowHeight
  const [columns, setColumns] = useState(4); // Set the initial number of columns

  //remove (-)
  function renderTitle(title) {
    var renderedTitle = title.replace(/-/g, " ");
    return renderedTitle;
  }
  useEffect(() => {
    axios
      .get(`http://localhost:8000/listing/detail/${address}`)
      .then((response) => {
        console.log(response.data);
        setListing(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    function handleResize() {
      // Update the targetRowHeight and columns based on the viewport size
      const screenWidth = window.innerWidth;
      if (screenWidth >= 992) {
        setTargetRowHeight(270); // Laptop view: 4:1 aspect ratio
        setColumns(4);
      } else if (screenWidth >= 765) {
        setTargetRowHeight(540); // Tablet view: 2:1 aspect ratio
        setColumns(2);
      } else {
        setTargetRowHeight(1080); // Mobile view: 1:1 aspect ratio
        setColumns(1);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [address]);

  return (
    <main id="listings-detail">
      {listing.map((data, dataIndex) => (
        <div key={dataIndex}>
          <section className="cover_image_container">
            <Image
              src={data.coverImage}
              alt="hello"
              className="cover_image"
              width={1080}
              height={800}
            />
          </section>

          <section className="desc_container container-layout">
            <h1>{renderTitle(data.address)}</h1>
            <h2 style={{ textTransform: "uppercase" }}>{data.city}</h2>
            <h3 className="description_title">방 정보</h3>
            <p>{data.description}</p>
          </section>
          <section className="img_gallery_container container-layout">
            <h3>방 사진 갤러리</h3>
            <div className="img_gallery">
              <Image
                src={`https://i.postimg.cc/${data.imageGallery}`}
                width={1080}
                height={800}
              />
             
            </div>
          </section>
          <section className="contact_me container-layout">
            <h2>Contact Me Form</h2>
          </section>
        </div>
      ))}
    </main>
  );
};

export default page;



 {
   /* <PhotoAlbum
                layout="rows"
                photos={Photos}
                renderPhoto={GalleryImage}
                targetRowHeight={targetRowHeight}
                columns={columns}
                onClick={({ index }) => setIndex(index)}
              />
              <Lightbox
                plugins={[Captions]}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                slides={Photos}
                afterClose={() => {
                  setTargetRowHeight(targetRowHeight);
                  setColumns(columns);
                }}
              /> */
 }