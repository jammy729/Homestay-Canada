"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

// PLUGINS

export default function Page() {
  const [listing, setListing] = useState({
    address: "",
    city: "",
    price: "",
    description: "",
    coverImage: "",
    imageGallery: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setListing({ ...listing, [name]: value });
  };

  const handleImageChange = (event, index) => {
    const { value } = event.target;
    const imageGallery = [...listing.imageGallery];
    imageGallery[index] = value;
    setListing({ ...listing, imageGallery });
  };

  const handleAddImage = () => {
    const imageGallery = [...listing.imageGallery, ""];
    setListing({ ...listing, imageGallery });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:8000/listing`, { ...listing });

      alert("Listing Created");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container-layout">
      <section>
        <form onSubmit={handleSubmit}>
          <TextField
            label="주소"
            type="text"
            id="address"
            name="address"
            value={listing.address}
            onChange={handleChange}
          />
          <TextField
            label="도시"
            type="text"
            id="city"
            name="city"
            value={listing.city}
            onChange={handleChange}
          ></TextField>

          <TextField
            label="가격 $"
            type="text"
            id="price"
            name="price"
            value={listing.price}
            onChange={handleChange}
          ></TextField>
          <TextField
            label="방 정보"
            type="text"
            id="description"
            name="description"
            value={listing.description}
            onChange={handleChange}
          />
          <TextField
            label="커버 사진 링크"
            type="text"
            id="coverImage"
            name="coverImage"
            value={listing.coverImage}
            onChange={handleChange}
          />

          <Grid
            sx={{
              display: "flex",
              flexWarp: "wrap",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Button
              type="submit"
              onClick={handleAddImage}
              variant="contained"
              size="large"
            >
              사진 더하기
            </Button>
            <Grid
              sx={{
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {listing.imageGallery.map((imageGallery, index) => (
                <TextField
                  sx={{ width: "calc(50% - 5px)" }}
                  label="방 사진 링크"
                  key={index}
                  type="text"
                  name="imageGallerys"
                  value={imageGallery}
                  onChange={(event) => handleImageChange(event, index)}
                />
              ))}
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            size="large"
            color="success"
          >
            리스팅 만들기
          </Button>
        </form>
      </section>
    </main>
  );
}
