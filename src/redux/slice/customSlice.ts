import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Option } from "../../types";

const initialState: { Option: Option[] } = { Option: [] };

export const createCustomSlice = (name: string) => {
  const {
    actions: { addOption },
    reducer,
  } = createSlice({
    name,
    initialState,
    reducers: {
      addOption: {
        reducer: (state, action: PayloadAction<Option>) => {
          state.Option.push(action.payload);
        },
        prepare: ({
          label,
          isParent,
          parentId,
        }: {
          label: string;
          isParent: boolean;
          parentId: string;
        }) => ({
          payload: {
            id: uuidv4(),
            label,
            createdAt: new Date().toLocaleString(),
            isParent: isParent,
            parentId: parentId ? parentId : null,
          } as unknown as Option,
        }),
      },
    },
  });

  return {
    actions: {
      addOption,
    },
    reducer,
  };
};
