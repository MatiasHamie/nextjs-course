import { ISize } from "./products";

export interface ICartProduct {
  _id: string;
  images: string;
  price: number; // solo para visualizar
  size?: ISize;
  slug: string;
  title: string;
  gender: "men" | "women" | "kid" | "unisex";
  quantity: number;
}
