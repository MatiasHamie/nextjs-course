import { IProduct } from "@/interfaces";
import { Product } from "@/models";
import { db } from ".";

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }
  // recordar q hago esto de esta forma (hay otras) para que el ID
  // de mongo no de error, lo serializamos asi
  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select("slug -_id").lean();
  await db.disconnect();

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  term = term.toString().toLowerCase();

  await db.connect();
  const products = await Product.find({ $text: { $search: term } })
    .select("title images price inStock slug -_id")
    .lean();
  await db.disconnect();
  return products;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();
  const products = await Product.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(products));
};
