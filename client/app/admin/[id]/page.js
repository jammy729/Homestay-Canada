"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useParams } from "next/navigation";

export default function Page() {
  // const [posting, setPosting] = useState([]);
  const [listing, setListing] = useState({
    address: "",
    city: "",
    price: "",
    description: "",
    coverImage: "",
    imageGallery: [],
  });

  const { id } = useParams();
  console.log(id);
  console.log({ listing });
  // useEffect(() => {
  //   const fetchListing = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.API_ENDPOINT}/listing/admin/${id}`
  //       );
  //       setPosting(response.data);
  //       console.log(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchListing();
  // }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setListing((prevListing) => ({
      ...prevListing,
      [name]: value,
    }));
  };

  const handleAddImage = () => {
    const imageGallery = [...listing.imageGallery, ""];
    setListing({ ...listing, imageGallery });
  };

  const handleImageChange = (event, index) => {
    const { value } = event.target;
    const imageGallery = [...listing.imageGallery];
    imageGallery[index] = value;
    setListing({ ...listing, imageGallery });
  };

  const updateListing = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${process.env.API_ENDPOINT}/listing/update`, {
        ...listing,
      });
      alert("Listing Edited");
    } catch (error) {
      console.error(error);
    }
  };

  if (!listing) {
    return <div>Loading...</div>; // Add a loading state while fetching the listing
  }

  return (
    <main className="container-layout">
      <section>
        <form>
          <TextField
            label="주소"
            type="text"
            id="address"
            name="address"
            value={listing.address}
            onChange={handleInputChange}
          />
          <TextField
            label="도시"
            type="text"
            id="city"
            name="city"
            value={listing.city}
            onChange={handleInputChange}
          ></TextField>

          <TextField
            label="가격 $"
            type="text"
            id="price"
            name="price"
            value={listing.price}
            onChange={handleInputChange}
          ></TextField>
          <TextField
            label="방 정보"
            type="text"
            id="description"
            name="description"
            value={listing.description}
            onChange={handleInputChange}
          />
          <TextField
            label="커버 사진 링크"
            type="text"
            id="coverImage"
            name="coverImage"
            value={listing.coverImage}
            onChange={handleInputChange}
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
              type="button"
              variant="contained"
              size="large"
              onClick={handleAddImage}
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
                  name="imageGallery"
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
            onClick={() => updateListing()}
          >
            리스팅 수정 업데이트
          </Button>
        </form>
      </section>
    </main>
  );
}
