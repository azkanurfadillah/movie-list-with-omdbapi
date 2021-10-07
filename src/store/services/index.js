import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://www.omdbapi.com/?apikey=921ae785"

export const GetMovies = createAsyncThunk(
    "movie/getByTitle", async (payload) => await axios.get(`${BASE_URL}&s=${payload}`)
);
