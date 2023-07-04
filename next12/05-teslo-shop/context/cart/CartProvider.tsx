import { ICartProduct, IOrder, ShippingAddress } from "@/interfaces";
import { FC, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from ".";
import Cookie from "js-cookie";
import Cookies from "js-cookie";
import { tesloApi } from "@/api";

export interface CartState {
  isLoaded: boolean;
  cart?: ICartProduct[];
  children?: JSX.Element | JSX.Element[];
  numberOfItems: number | undefined;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  children: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

export const CartProvider: FC<CartState> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  useEffect(() => {
    if (Cookies.get("firstName") !== undefined) {
      const shippingAddress = {
        firstName: Cookies.get("firstName") || "",
        lastName: Cookies.get("lastName") || "",
        address: Cookies.get("address") || "",
        address2: Cookies.get("address2") || "",
        zip: Cookies.get("zip") || "",
        city: Cookies.get("city") || "",
        country: Cookies.get("country") || "",
        phone: Cookies.get("phone") || "",
      };

      dispatch({
        type: "[Cart] - Load Address from cookies",
        payload: shippingAddress,
      });
    }
  }, []);

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

  useEffect(() => {
    const numberOfItems = state.cart?.reduce(
      (prev, current) => current.quantity + prev,
      0
    );

    const subTotal = state.cart?.reduce(
      (prev, current) => current.quantity * current.price + prev,
      0
    )!;

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({
      type: "[Cart] - Update order summary",
      payload: orderSummary,
    });
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

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Remove product in cart",
      payload: product,
    });
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookies.set("firstName", address.firstName);
    Cookies.set("lastName", address.lastName);
    Cookies.set("address", address.address);
    Cookies.set("address2", address.address2 || "");
    Cookies.set("zip", address.zip);
    Cookies.set("city", address.city);
    Cookies.set("country", address.country);
    Cookies.set("phone", address.phone);
    dispatch({
      type: "[Cart] - Update Address",
      payload: address,
    });
  };

  const createOrder = async () => {
    if (!state.shippingAddress) {
      throw new Error("No hay dirección de entrega");
    }

    const body: IOrder = {
      orderItems: state.cart!.map((product) => ({
        ...product,
        size: product.size!,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    };
    try {
      const { data } = await tesloApi.post("/orders", body);
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
