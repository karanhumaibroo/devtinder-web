import { createSlice } from '@reduxjs/toolkit';

const requestsSlice = createSlice({
  name: 'requests',
  initialState: [],
  reducers: {
    addrequest: (state, action) => {
      return action.payload; // Replace the state with the new connections data
    },
    removerequest: (state,action) => {
      const newArray=state.filter((r)=>r._id!==action.payload);
      return newArray // Clear the requests state
    }
    // You can add more reducers here if needed
  },
});

export const { addrequest,removerequest } = requestsSlice.actions;
export default requestsSlice.reducer;
