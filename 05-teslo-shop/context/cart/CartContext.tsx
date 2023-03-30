import { ICartProduct } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  children?: JSX.Element | JSX.Element[];
  cart?: ICartProduct[];
  numberOfItems: number | undefined;
  subTotal: number;
  tax: number;
  total: number;
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
