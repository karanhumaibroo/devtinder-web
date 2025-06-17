import { createSlice } from '@reduxjs/toolkit';

const connectionsSlice = createSlice({
  name: 'connections',
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      return action.payload; // Replace the state with the new connections data
    },
    // You can add more reducers here if needed
  },
});

export const { addConnection } = connectionsSlice.actions;
export default connectionsSlice.reducer;
