import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export const dynamic = 'force-dynamic';

export default async function Merch () {
  const getAllProducts = await productByCategory("campusMerch");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
