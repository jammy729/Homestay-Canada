export async function getIndividualListing(address, id) {
  const url =
    `${process.env.API_ENDPOINT}/listing/detail?address=` +
    `${encodeURIComponent(address)}` +
    `&id=${encodeURIComponent(id)}`;

  const res = await fetch(url);
  return res.json();
}
