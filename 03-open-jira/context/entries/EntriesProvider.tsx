import { Entry } from "@/interfaces";
import { v4 as uuidv4 } from "uuid";
import { FC, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
  entries?: Entry[];
  children: JSX.Element | JSX.Element[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: "Pendiente: loremipsum",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "In progress: loremipsum2",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "Terminadas: loremipsum3",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
  children: [],
};

export const EntriesProvider: FC<EntriesState> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: "[Entry] - Add", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry] - Update", payload: entry });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
