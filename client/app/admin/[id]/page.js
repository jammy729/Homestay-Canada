"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

async function getListing(id) {
  const apiResponse = await fetch(`${process.env.API_ENDPOINT}/admin/${id}`, {
    cache: "no-store",
  });
  return apiResponse.json();
}

export default async function Page({ params }) {
  const [listing, setListing] = useState(null);
  const { id } = params;

  useEffect(() => {
    async function fetchListing() {
      const response = await getListing(id);
      setListing(response.data);
    }

    fetchListing();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setListing((prevListing) => ({
      ...prevListing,
      [name]: value,
    }));
  };

  const handleAddImage = () => {
    setListing((prevListing) => ({
      ...prevListing,
      imageGallery: [...prevListing.imageGallery, ""],
    }));
  };

  const handleImageChange = (event, index) => {
    const { value } = event.target;
    setListing((prevListing) => {
      const updatedGallery = [...prevListing.imageGallery];
      updatedGallery[index] = value;
      return {
        ...prevListing,
        imageGallery: updatedGallery,
      };
    });
  };

  const updateListing = async (listingId) => {
    // Perform the update operation using the updated listing object
    try {
      await axios.put(
        `http://localhost:8000/listing/admin/${listingId}`,
        listing
      );
      // Handle success or show a success message
    } catch (error) {
      // Handle error or show an error message
    }
  };

  if (!listing) {
    return <div>Loading...</div>; // Add a loading state while fetching the listing
  }
  // const listing = await getListing(id);

  return (
    <main className="container-layout">
      <section>
        <h4>{listing.address}</h4>
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
              type="submit"
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
              {listing.data.imageGallery.map((imageGallery, index) => (
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
            onClick={() => updateListing(listing.data._id)}
          >
            리스팅 수정 업데이트
          </Button>
        </form>
      </section>
    </main>
  );
}
