"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListingGallery from "@/component/listingGallery";

async function getListing(city) {
  let apiEndpoint = `${process.env.API_ENDPOINT}/listing/city`;
  if (city && city !== "All") {
    apiEndpoint += `?city=${encodeURIComponent(city)}`;
  }
  console.log("API Endpoint:", apiEndpoint);
  const apiResponse = await fetch(apiEndpoint);
  return apiResponse.json();
}

export default function Page() {
  const query = useSearchParams();
  const cityquery = query.get("city");
  console.log(cityquery);
  const [selectedCity, setSelectedCity] = useState(cityquery || "All");

  const [listing, setListing] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const handleCityFilter = async (event) => {
    setSelectedCity(event.target.value);
  };

  const cities = ["Surrey", "Burnaby"];

  useEffect(() => {
    if (selectedCity) {
      getListing(selectedCity)
        .then((data) => {
          setListing(data);
          setNoResultsFound(data.length === 0);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    } else {
      getListing()
        .then((data) => {
          setListing(data);
          setNoResultsFound(data.length === 0);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    }
    const fetchData = async () => {
      const listing = await getListing(selectedCity);
      console.log(listing.address);
    };

    fetchData();

    const url = new URL(window.location.href);
    if (selectedCity === "All") {
      url.searchParams.delete("city");
    } else {
      url.searchParams.set("city", selectedCity);
    }
    window.history.replaceState({}, "", url);
  }, [selectedCity]);

  return (
    <main>
      {/* City Filter Buttons */}
      <section className="header container-layout">
        <h2>방보기 - View Listings</h2>
        <div className="btn_group">
          <Link href="/rooms/rental">
            <div className="btn primary">렌탈 방 보기</div>
          </Link>
          <Link href="/rooms/homestay">
            <div className="btn primary">홈 스테이 방 보기</div>
          </Link>
        </div>
      </section>
      <section className="city_filter container-layout">
        <FormControl className="city_filter_form">
          <InputLabel>도시</InputLabel>
          <Select
            labelId="city-filter-label"
            id="city-filter"
            value={selectedCity}
            label="City"
            onChange={handleCityFilter}
          >
            <MenuItem value="All">All Cities</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </section>

      {/* LISTINGS */}
      <section className="listings two_column container-full-layout">
        {noResultsFound ? (
          <div className="container-layout">
            <p>No results found</p>
          </div>
        ) : (
          listing.map((data, dataIndex) => (
            <ListingGallery
              key={dataIndex}
              address={data.address}
              accommodationType={data.accommodationType}
              id={data._id}
              city={data.city}
              price={data.price}
              coverImage={
                data.coverImage ||
                (data.imageGallery.length > 0
                  ? data.imageGallery[0]
                  : data.imageGallery[1])
              }
            />
          ))
        )}
      </section>
    </main>
  );
}
