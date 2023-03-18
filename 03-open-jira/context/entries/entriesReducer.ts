import { Entry } from "@/interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | {
      type: "[Entry] - Add";
      payload: Entry;
    }
  | {
      type: "[Entry] - Update";
      payload: Entry;
    }
  | {
      type: "[Entry] - Initial Refresh";
      payload: Entry[];
    };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry] - Add":
      return {
        ...state,
        entries: [...state.entries!, action.payload],
      };

    case "[Entry] - Update":
      return {
        ...state,
        entries: state.entries?.map((entry) =>
          entry._id === action.payload._id ? action.payload : entry
        ),
      };

    case "[Entry] - Initial Refresh":
      return {
        ...state,
        entries: [...action.payload],
      };

    default:
      return state;
  }
};
