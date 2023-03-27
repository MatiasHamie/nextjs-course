import { ICartProduct } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  children?: JSX.Element | JSX.Element[];
  cart?: ICartProduct[];
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
