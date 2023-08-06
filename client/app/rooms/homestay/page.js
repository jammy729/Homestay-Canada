"use client";
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListingGallery from "../../component/listingGallery";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const query = useSearchParams();
  const cityquery = query.get("city");
  const [selectedCity, setSelectedCity] = useState(cityquery || "All");

  const [listing, setListing] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const handleCityFilter = async (event) => {
    setSelectedCity(event.target.value);
  };

  const cities = ["Surrey", "Burnaby"];

  useEffect(() => {
    if (selectedCity) {
      getHomestayListing(selectedCity)
        .then((data) => {
          setListing(data);
          setNoResultsFound(data.length === 0);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    } else {
      getHomestayListing()
        .then((data) => {
          setListing(data);
          setNoResultsFound(data.length === 0);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    }

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
        <h2>홈 스테이 - Homestay</h2>
      </section>
      <section className="city_filter container-layout">
        <FormControl className="city_filter_form">
          <InputLabel>City</InputLabel>
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
              alt={`Cover image of ${data.address} in ${data.city}`}
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

async function getHomestayListing(city) {
  let url = `${process.env.API_ENDPOINT}/listing/homestay`;
  if (city && city !== "All") {
    url += `?city=${encodeURIComponent(city)}`;
  }
  const res = await fetch(url);
  return res.json();
}
