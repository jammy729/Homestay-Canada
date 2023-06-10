"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

// PLUGINS
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const [fetchedData, setFetchedData] = useState(null);
  const [listing, setListing] = useState({
    address: "",
    city: "",
    price: "",
    description: "",
    coverImage: "",
    imageGallery: [],
  });

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.API_ENDPOINT}/listing/admin/${id}`)
      .then((response) => {
        const fetchedListing = response.data;
        setFetchedData(fetchedListing);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    if (fetchedData) {
      setListing(fetchedData.data);
    }
  }, [fetchedData]);

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

  const updateListing = (event) => {
    event.preventDefault();
    axios
      .put(`${process.env.API_ENDPOINT}/listing/update`, { ...listing, id })
      .then(() => {
        alert("Listing Edited");
      })
      .catch((error) => {
        console.error(error);
      });
    router.push("/admin/dashboard");
  };

  if (!listing) {
    return <div>Loading...</div>; // Add a loading state while fetching the listing
  }

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
        <div style={{ marginBottom: "20px" }}>
          <h4>ID: {listing._id}</h4>
        </div>

        <form className="listing_form">
          <TextField
            label="주소"
            type="text"
            id="address"
            name="address"
            required
            value={listing.address}
            onChange={handleInputChange}
          />
          <TextField
            label="도시"
            type="text"
            id="city"
            name="city"
            required
            value={listing.city}
            onChange={handleInputChange}
          ></TextField>
          <TextField
            label="가격 $"
            type="text"
            id="price"
            name="price"
            helperText="ex. 1200, 연락주세요"
            required
            value={listing.price}
            onChange={handleInputChange}
          ></TextField>
          <TextField
            label="방 정보"
            type="text"
            id="description"
            name="description"
            required
            rows={8}
            multiline
            value={listing.description}
            onChange={handleInputChange}
          />
          <TextField
            label="커버 사진 링크"
            type="text"
            id="coverImage"
            name="coverImage"
            multiline
            required
            helperText="사진은 이 링크: https://postimages.org/ 에서 업로드 하시기 바랍니다"
            value={listing.coverImage}
            onChange={handleInputChange}
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
            onClick={updateListing}
          >
            리스팅 수정 업데이트
          </Button>
        </form>
      </section>
    </main>
  );
}
