import { db } from "@/database";
import { IOrder } from "@/interfaces";
import { Product } from "@/models";
import Order from "@/models/Order";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad Request" });
  }
  // res.status(200).json({ message: "Example" });
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;

  // verificar que tengamos un usuario
  const session = (await getSession({ req })) as any;

  if (!session) {
    return res.status(401).json({
      message: "Debe de estar autenticado para hacer esto",
    });
  }

  // Crear un arreglo con los productos que la persona quiere
  const productIds = orderItems.map((product) => product._id);
  await db.connect();

  const dbProducts = await Product.find({ _id: { $in: productIds } }).lean();

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      // comparamos el precio que me viene del front con el que tengo almacenado en mongo
      // para evitar fraudes
      // const currentPrice = dbProducts.find((p) => p.id === current._id)?.price;
      const currentPrice = dbProducts.find(
        (p) => new mongoose.Types.ObjectId(p._id).toString() === current._id
      )?.price;

      if (!currentPrice) {
        throw new Error("Verifique el carrito de nuevo, producto no existe");
      }

      return current.quantity * currentPrice + prev;
    }, 0)!;

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * (taxRate + 1);

    if (total !== backendTotal) {
      throw new Error("El total no cuadra con el monto");
    }

    // Todo bien hasta este punto
    const userId = session.user!._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      message: error.message || "Revise logs del servidor",
    });
  }

  // res.status(201).json(body);
};
