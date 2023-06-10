"use client";
import React, { useState } from "react";
import axios from "axios";

// PLUGINS
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

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

  const handleRemoveImage = () => {
    const imageGallery = [...listing.imageGallery];
    imageGallery.pop();
    setListing((prevListing) => ({
      ...prevListing,
      imageGallery,
    }));
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
      await axios.post(`${process.env.API_ENDPOINT}/listing`, { ...listing });

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

          <div className="imageGallery_container">
            <div className="btn_container">
              <Button
                startIcon={<AddIcon />}
                type="button"
                variant="contained"
                size="large"
                onClick={handleAddImage}
              >
                사진 더하기
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                type="button"
                variant="contained"
                size="large"
                color="error"
                onClick={handleRemoveImage}
              >
                사진 지우기
              </Button>
            </div>
            <div className="imageGallery_field">
              {listing.imageGallery.map((imageGallery, index) => (
                <TextField
                  label="방 사진 링크"
                  key={index}
                  multiline
                  required
                  type="text"
                  name="imageGallery"
                  helperText="사진은 이 링크: https://postimages.org/ 에서 업로드 하시기 바랍니다"
                  value={imageGallery}
                  onChange={(event) => handleImageChange(event, index)}
                />
              ))}
            </div>
          </div>

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
