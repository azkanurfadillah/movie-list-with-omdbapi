import { createSlice, current } from "@reduxjs/toolkit";
import { GetMovies, GetMovieDetails } from "../services";

export const initialState = {
    movies: { Search: [] },
    loading: false,
    error: null,
    singleMovie: undefined
};

export const movieSlice = createSlice({
    name: "movie",
    initialState: initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: {
        [GetMovies.fulfilled]: (state, action) => {
            const { payload } = action
            const prevState = current(state)
            state.error = null
            state.movies = {
                ...payload,
                Search: payload?.Search ? [...prevState.movies.Search, ...payload.Search,] : []
            }
        },
        [GetMovies.rejected]: (state, action) => {
            const { payload } = action
            state.movies = initialState.movies;
            state.error = payload.error
        },
        [GetMovieDetails.fulfilled]: (state, action) => {
            const { payload } = action
            state.singleMovie = payload.data
        },
        [GetMovieDetails.rejected]: (state, action) => {
            const { payload } = action
            state.singleMovie = initialState.singleMovie;
            state.error = payload.error
        }
    },
});

export const { reset } = movieSlice.actions;
export default movieSlice.reducer;