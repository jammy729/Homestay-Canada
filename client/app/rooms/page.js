"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

async function getListing(city) {
  let apiEndpoint = `${process.env.API_ENDPOINT}/city`;
  if (city && city !== "All") {
    apiEndpoint += `?city=${encodeURIComponent(city)}`;
  }
  console.log("API Endpoint:", apiEndpoint); // Log the API endpoint
  const apiResponse = await fetch(apiEndpoint);
  return apiResponse.json();
}

export default function Page() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [listing, setListing] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const handleCityFilter = async (event) => {
    setSelectedCity(event.target.value);
  };
  function renderTitle(title) {
    var renderedTitle = title.replace(/-/g, " ");
    return renderedTitle;
  }
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
      // Fetch all listings if no city is filtered
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
      // Update the state or perform other actions with the fetched listing data
    };

    fetchData();

    // Update the URL parameter when a different city is selected
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
          <p>No results found</p>
        ) : (
          listing.map((listingData, dataIndex) => (
            <div className="listings_img_container" key={dataIndex}>
              <Link href={`/detail/${listingData.address}`}>
                <div
                  className="hover_image listings_img"
                  style={{
                    backgroundImage: `url(${
                      listingData.coverImage ||
                      (listingData.imageGallery.length > 0
                        ? listingData.imageGallery[0]
                        : defaultImage)
                    })`,
                  }}
                >
                  <div className="overlay dark" style={{ zIndex: "1" }}></div>
                  <div className="listing_content" style={{ zIndex: "2" }}>
                    <h4>{renderTitle(listingData.address)}</h4>
                    <h4>{listingData.city}</h4>
                    <h4>${listingData.price}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
        {}
      </section>
    </main>
  );
}
