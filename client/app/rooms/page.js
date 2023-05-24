"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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

  const handleCityFilter = async (city) => {
    setSelectedCity(city);
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
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    } else {
      // Fetch all listings if no city is filtered
      getListing()
        .then((data) => {
          setListing(data);
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
        <button onClick={() => handleCityFilter("")}>All Cities</button>
        {cities.map((city) => (
          <button key={city} onClick={() => handleCityFilter(city)}>
            {city}
          </button>
        ))}
      </section>

      {/* LISTINGS */}
      <section className="city_lists container-layout">
        {/* Render the selected city */}
        <h3>Selected City: {selectedCity}</h3>
      </section>

      <section className="listings two_column container-full-layout">
        {listing.map((listingData, dataIndex) => (
          <div className="listings_img_container" key={dataIndex}>
            <Link href={`/detail/${listingData.address}`}>
              <div
                className="hover_image listings_img"
                style={{
                  backgroundImage: `url(${listingData.coverImage})`,
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
        ))}
      </section>
    </main>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";

// // Update your getListing function to log the API endpoint
// // async function getListing(city) {
// //   const apiEndpoint = `${process.env.API_ENDPOINT}/city?city=${city}`;
// //   console.log("API Endpoint:", apiEndpoint); // Log the API endpoint
// //   const apiResponse = await fetch(apiEndpoint);
// //   return apiResponse.json();
// // }

// async function getListing(city) {
//   let apiEndpoint = `${process.env.API_ENDPOINT}/city`;
//   if (city && city !== "All") {
//     apiEndpoint += `?city=${encodeURIComponent(city)}`;
//   }
//   console.log("API Endpoint:", apiEndpoint); // Log the API endpoint
//   const apiResponse = await fetch(apiEndpoint);
//   return apiResponse.json();
// }
// export default function Page() {
//   const [listing, setListing] = useState([]);
//   const [filteredCity, setFilteredCity] = useState("");
//   const cities = ["Surrey", "Burnaby"];

//   useEffect(() => {
//     if (filteredCity) {
//       getListing(filteredCity)
//         .then((data) => {
//           setListing(data);
//         })
//         .catch((error) => {
//           console.error("Failed to fetch data:", error);
//         });
//     } else {
//       // Fetch all listings if no city is filtered
//       getListing()
//         .then((data) => {
//           setListing(data);
//         })
//         .catch((error) => {
//           console.error("Failed to fetch data:", error);
//         });
//     }
//   }, [filteredCity]);

//   const handleFilterByCity = (city) => {
//     setFilteredCity(city);
//   };

//   console.log("the filtered city", filteredCity);
//   return (
//     <main>
//       {/* FILTER BY CITY */}
//       <section className="city_filter container-layout">
//         <button onClick={() => handleFilterByCity("")}>All Cities</button>
//         {cities.map((city) => (
//           <button key={city} onClick={() => handleFilterByCity(city)}>
//             {city}
//           </button>
//         ))}
//       </section>

//       {/* LISTINGS */}
//       <section className="city_lists container-layout"></section>

//       <section className="listings two_column container-full-layout">
//         {listing.map((listingData, dataIndex) => (
//           <div className="listings_img_container" key={dataIndex}>
//             <Link href={`/detail/${listingData.address}`}>
//               <div
//                 className="hover_image listings_img"
//                 style={{
//                   backgroundImage: `url(${listingData.coverImage})`,
//                 }}
//               >
//                 <div className="overlay dark" style={{ zIndex: "1" }}></div>
//                 <div className="listing_content" style={{ zIndex: "2" }}>
//                   <h4>{renderTitle(listingData.address)}</h4>
//                   <h4>{listingData.city}</h4>
//                   <h4>${listingData.price}</h4>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </section>
//     </main>
//   );
// }

// // remove (-)
