import { FC, useReducer, useContext } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen?: boolean;
  children: JSX.Element | JSX.Element[];
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  children: [],
};

export const UIProvider: FC<UIState> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const openSideMenu = () => dispatch({ type: "UI - Open Sidebar" });
  const closeSideMenu = () => dispatch({ type: "UI - Close Sidebar" });
  const values = { ...state, openSideMenu, closeSideMenu };

  return <UIContext.Provider value={values}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
