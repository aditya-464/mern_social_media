import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    viewProfile: null,
    viewportSize : null,
    navbarSize : null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            }
            else {
                console.error("User has no friends!");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setViewProfile: (state, action) => {
            state.viewProfile = action.payload;
        },
        setViewportSize:(state, action)=>{
            state.viewportSize = action.payload;
        },
        setNavbarSize : (state, action)=>{
            state.navbarSize = action.payload;
        },
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setViewProfile, setViewportSize, setNavbarSize } = authSlice.actions;
export default authSlice.reducer;



