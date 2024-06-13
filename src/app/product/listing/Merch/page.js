import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function Merch () {
  const getAllProducts = await productByCategory("campusMerch");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
