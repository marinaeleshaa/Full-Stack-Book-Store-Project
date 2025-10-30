import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface languageState {
  lang: string;
}

const initialState: languageState = {
  lang: localStorage.getItem("lang") || "en",
};


export const LanguageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload);
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const { setLanguage } = LanguageSlice.actions;
export default LanguageSlice.reducer;
