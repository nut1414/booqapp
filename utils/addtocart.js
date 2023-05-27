import fetch from "./fetch";

export default async function addToCart(BookID) {
  return new Promise((resolve, reject) => {
    const url = `/api/order/cart`;
    const opts = {
      method: "POST",
      body: JSON.stringify({ BookID }),
    };
    fetch(url, opts)
      .then((res) => res.json())
      .then(async (result) => {
        console.log(result);
        resolve(result);
      })
      .catch(reject);
   })
  
}