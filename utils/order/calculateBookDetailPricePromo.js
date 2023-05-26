export default function calculateBookDetailPricePromo(bookdetail) {
  let promotionbook = Array.isArray(bookdetail?.promotionbook)
    ? bookdetail?.promotionbook
    : [];
  const maxdiscountpromo = promotionbook.reduce((acc, curr) => {
    return Math.max(acc.promotion.DiscountPercent, curr.promotion.DiscountPercent) >= acc.promotion.DiscountPercent ? curr: acc;
  }
    , { promotion: { DiscountPercent: 0 } })
  // console.log("maxdiscountpromo", maxdiscountpromo)
  bookdetail.CurrentPromotion = maxdiscountpromo.promotion.DiscountPercent > 0 ? maxdiscountpromo.promotion : null;
  bookdetail.FinalPrice =  +parseFloat(bookdetail.Price - (bookdetail.Price * maxdiscountpromo.promotion.DiscountPercent / 100)).toFixed(2);
  return bookdetail;
}