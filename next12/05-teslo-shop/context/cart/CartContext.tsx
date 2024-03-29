import { ICartProduct, ShippingAddress } from "@/interfaces";
import { createContext } from "react";

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
  createOrder: () => Promise<void>;
}

export const CartContext = createContext({} as ContextProps);
