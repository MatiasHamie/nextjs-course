import { db, SHOP_CONSTANTS } from "@/database";
import { IProduct } from "@/interfaces";
import { Product } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductsBySlug(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProductsBySlug = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const product = await Product.findOne({ slug: req.query.slug }).lean();
  await db.disconnect();

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  return res.status(200).json(product);
};
