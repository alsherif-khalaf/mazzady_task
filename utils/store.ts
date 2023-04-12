import create from "zustand";

type State = {
  finalSelected: Record<string, unknown> | Array<Record<string, unknown>> | null;
  isMulti: boolean;
  setValues: (values: Record<string, unknown> | Array<Record<string, unknown>> | null, isMulti: boolean) => void;
};

export const useValues = create<State>((set) => ({
  finalSelected: null,
  isMulti: false,
  setValues: (values: Record<string, unknown> | Array<Record<string, unknown>> | null, isMulti: boolean) =>
    set((state) => ({
      ...state,
      finalSelected: values,
      isMulti,
    })),
}));

