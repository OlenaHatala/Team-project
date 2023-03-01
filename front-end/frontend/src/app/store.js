import { configureStore } from "@reduxjs/toolkit";

import boardReducer from '../components/board/boardSlice';

export const store = configureStore({
    reducer: {
        board: boardReducer,
    }
})