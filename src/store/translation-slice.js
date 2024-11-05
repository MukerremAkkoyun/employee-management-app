import {createSlice} from '@reduxjs/toolkit';

const translationSlice = createSlice({
  name: 'translations',
  initialState: [],
  reducers: {
    setLanguage: (state, action) => {
      return action.payload;
    },
  },
});

export const {setLanguage} = translationSlice.actions;
export default translationSlice.reducer;
