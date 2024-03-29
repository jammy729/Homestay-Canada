"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListingGallery from "../component/listingGallery";

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
            <div className="btn primary">rentals</div>
          </Link>
          <Link href="/rooms/homestay">
            <div className="btn primary">homestays</div>
          </Link>
        </div>
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
      {noResultsFound ? (
        <div className="container-layout">
          <p>No results found</p>
        </div>
      ) : (
        <section className="listings two_column container-full-layout">
          {listing.map((data, dataIndex) => (
            <ListingGallery
              key={dataIndex}
              address={data.address}
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
          ))}
        </section>
      )}
    </main>
  );
}

async function getListing(city) {
  let url = `${process.env.API_ENDPOINT}/listing/city`;
  if (city && city !== "All") {
    url += `?city=${encodeURIComponent(city)}`;
  }
  const res = await fetch(url);
  return res.json();
}
