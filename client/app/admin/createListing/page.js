"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// PLUGINS
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Page() {
  const router = useRouter();

  const [listing, setListing] = useState({
    address: "",
    city: "",
    price: "",
    description: "",
    coverImage: "",
    imageGallery: [],
  });

  console.log({ listing });

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
    router.push("/admin/dashboard");
  };

  return (
    <main className="container-layout">
      <section className="page_history" style={{ marginBottom: "30px" }}>
        <Button
          aria-label="back"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          뒤로 가기
        </Button>
      </section>
      <section>
        <form onSubmit={handleSubmit} className="listing_form">
          <TextField
            required
            label="주소"
            type="text"
            id="address"
            name="address"
            helperText="주소 대신 제목을 넣으셔도 됩니다"
            value={listing.address}
            onChange={handleChange}
          />
          <TextField
            required
            label="도시"
            type="text"
            id="city"
            name="city"
            value={listing.city}
            onChange={handleChange}
          ></TextField>
          <TextField
            required
            label="가격 $"
            type="text"
            id="price"
            name="price"
            helperText="ex. 1200, 연락주세요"
            value={listing.price}
            onChange={handleChange}
          ></TextField>
          <TextField
            required
            label="방 정보"
            type="text"
            id="description"
            name="description"
            multiline
            value={listing.description}
            onChange={handleChange}
          />
          <TextField
            label="커버 사진 링크"
            type="text"
            id="coverImage"
            name="coverImage"
            helperText="사진은 이 링크: https://postimages.org/ 에서 업로드 하시기 바랍니다"
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
