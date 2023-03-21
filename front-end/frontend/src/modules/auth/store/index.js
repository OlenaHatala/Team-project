import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, loading: false,},
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
        },
        setUserInfo: (state, action) => {
            const { user } = action.payload
            state.user = user
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    },
})

export const { setCredentials, setUserInfo, logOut, setLoading} = authSlice.actions
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectAuthLoadingState = (state) => state.auth.loading

export default authSlice.reducer
