import { FC, useReducer } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState {
  isMenuOpen?: boolean;
  children: JSX.Element | JSX.Element[];
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
  children: [],
};

export const UiProvider: FC<UiState> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "[UI] - ToggleMenu" });
  };

  return (
    <UiContext.Provider value={{ ...state, toggleSideMenu }}>
      {children}
    </UiContext.Provider>
  );
};
