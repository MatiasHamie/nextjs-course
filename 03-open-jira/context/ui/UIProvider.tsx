import { FC, useReducer, useContext } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen?: boolean;
  isAddingEntry?: boolean;
  isDragging?: boolean;
  children: JSX.Element | JSX.Element[];
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
  children: [],
};

export const UIProvider: FC<UIState> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const openSideMenu = () => dispatch({ type: "[UI] - Open Sidebar" });
  const closeSideMenu = () => dispatch({ type: "[UI] - Close Sidebar" });

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "[UI] - Set IsAddingEntry", payload: isAdding });
  };

  const startDragging = () => dispatch({ type: "[UI] - Start Dragging" });
  const endDragging = () => dispatch({ type: "[UI] - End Dragging" });

  const values = {
    ...state,
    openSideMenu,
    closeSideMenu,
    setIsAddingEntry,
    startDragging,
    endDragging,
  };

  return <UIContext.Provider value={values}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
