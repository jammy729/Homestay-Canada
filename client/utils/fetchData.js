export async function getListing(address, id) {
  const url =
    `${process.env.API_ENDPOINT}/listing/detail?address=${encodeURIComponent(
      address
    )}` + `&id=${encodeURIComponent(id)}`;

  const apiResponse = await fetch(url, {
    cache: "no-store",
  });

  return apiResponse.json();
}

export async function getHomeListing() {
  const apiEndpoint = `${process.env.API_ENDPOINT}/listing/home`;
  const res = await fetch(apiEndpoint);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getAreaListing(city) {
  const apiEndpoint =
    `${process.env.API_ENDPOINT}/listing/city` +
    `?city=${encodeURIComponent(city)}`;

  const apiResponse = await fetch(apiEndpoint, {
    cache: "no-store",
  });
  return apiResponse.json();
}

export async function getRentalListing(city) {
  let apiEndpoint = `${process.env.API_ENDPOINT}/listing/rental`;
  if (city && city !== "All") {
    apiEndpoint += `?city=${encodeURIComponent(city)}`;
  }
  const apiResponse = await fetch(apiEndpoint);
  return apiResponse.json();
}
