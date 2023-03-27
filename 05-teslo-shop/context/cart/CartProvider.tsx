import { ICartProduct } from "@/interfaces";
import { FC, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from ".";
import Cookie from "js-cookie";

export interface CartState {
  cart?: ICartProduct[];
  children?: JSX.Element | JSX.Element[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  children: [],
};

export const CartProvider: FC<CartState> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      // Esto es por si manipulan la cookie
      const cart = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cart,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart!.length > 0) Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart!.some((p) => p._id === product._id);
    if (!productInCart) {
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart!, product],
      });
    }

    const productInCartButDifferentSize = state.cart!.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize) {
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart!, product],
      });
    }

    const updatedProducts = state.cart!.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      p.quantity += product.quantity;

      return p;
    });

    return dispatch({
      type: "[Cart] - Update products in cart",
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Change product quantity",
      payload: product,
    });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addProductToCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
