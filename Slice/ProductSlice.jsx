import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


  
export const Fetchdata = createAsyncThunk("product", async () => {

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    let result = await fetch(`${BASE_URL}/messlist`, {
        method: "GET",
    });

    result = await result.json();

    return result.items; 
});

const initialState = {
    status: undefined,
    item: [],
    error: null
};

const GetData = createSlice({
    name: "getData", 
    initialState,

    extraReducers: (builder) => {

        builder.addCase(Fetchdata.pending, (state) => {
            state.status = "Pending";
        });

        builder.addCase(Fetchdata.fulfilled, (state, action) => {
            state.status = "Successful";
            state.item = action.payload; 
        });

        builder.addCase(Fetchdata.rejected, (state, action) => {
            state.status = "Rejected";
            state.error = action.error.message;
        });
    }
});

export default GetData.reducer;