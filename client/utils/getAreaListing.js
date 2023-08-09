export async function getAreaListing(city) {
  const url =
    `${process.env.API_ENDPOINT}/listing/city` +
    `?city=${encodeURIComponent(city)}`;
  const res = await fetch(url);
  return res.json();
}
