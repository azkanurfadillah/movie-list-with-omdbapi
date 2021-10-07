import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://www.omdbapi.com/?apikey=921ae785"

export const GetMovies = createAsyncThunk(
    "movie/getList", async ({ q, page = "1" }, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}&s=${q}&page=${page}`);
            return thunkAPI.fulfillWithValue({ ...response.data, currentKeyword: q })
        } catch (error) {
            console.error({ error })
            return thunkAPI.rejectWithValue({ error: error.response.data });

        }
    }
);

export const GetMovieDetails = createAsyncThunk(
    "movie/getDetails", async ({ title }, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}&t=${title}&plot=full`);
            return response
        } catch (error) {
            console.error({ error })
            return thunkAPI.rejectWithValue({ error: error.response.data });

        }
    }
);
