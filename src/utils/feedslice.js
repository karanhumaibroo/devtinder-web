import { createSlice } from "@reduxjs/toolkit";

const feedslice = createSlice({
    name: "feed",
    initialState: null, // Change to null or [] based on your preference
    reducers: {
        addfeed: (state, action) => {
            return action.payload; // Replace state with new feed data
        },
        removefeed: (state,action) => {
            const newArray=state.filter((r)=>r._id!==action.payload);
      return newArray; // Clear the feed state
        }
    }
});

export const { addfeed, removefeed } = feedslice.actions;
export default feedslice.reducer;
