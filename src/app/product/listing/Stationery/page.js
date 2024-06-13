import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function Stationery() {
  const getAllProducts = await productByCategory("stationeryOffice");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
