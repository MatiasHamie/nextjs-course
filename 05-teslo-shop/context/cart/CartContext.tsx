import { ICartProduct } from "@/interfaces";
import { createContext } from "react";
import { ShippingAddress } from "./CartProvider";

interface ContextProps {
  isLoaded?: boolean;
  children?: JSX.Element | JSX.Element[];
  cart?: ICartProduct[];
  numberOfItems: number | undefined;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);
