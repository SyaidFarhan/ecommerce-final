import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export const dynamic = 'force-dynamic';

export default async function Sports () {
  const getAllProducts = await productByCategory("sportsEquipment");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
