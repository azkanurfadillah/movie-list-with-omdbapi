import { createSlice, current } from "@reduxjs/toolkit";
import { GetMovies } from "../services";

export const initialState = {
    movies: { Search: [] },
    loading: false,
    error: null,
};

export const movieSlice = createSlice({
    name: "movie",
    initialState: initialState,
    extraReducers: {
        [GetMovies.fulfilled]: (state, action) => {
            const { payload } = action
            const prevState = current(state)
            state.error = null
            state.movies = {
                ...payload,
                Search: [...prevState.movies.Search, ...payload.Search,]
            }
        },
        [GetMovies.rejected]: (state, action) => {
            const { payload } = action
            state.movies = [];
            state.error = payload.error
        },

    },
});

export default movieSlice.reducer;