import { createContext } from "react";

interface ContextProps {
  isAddingEntry?: boolean;
  isDragging?: boolean;
  sidemenuOpen?: boolean;
  closeSideMenu: () => void;
  endDragging: () => void;
  openSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  startDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
