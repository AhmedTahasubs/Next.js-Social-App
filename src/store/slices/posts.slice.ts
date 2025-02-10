import axios from 'axios';
import { postState } from './../../types/posts.types';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
const initialState: postState = {
    posts: null,
    postDetails:null
}
let toastId;
//* mmkn ageb el token btre2ten awl haga el local storage aw mn el function
//* eny awl param hwa ely bb3to le el func lma a3mlha call we tany param
//* hwa el store ely gwah el user slice ely gwah el token asln
export const getPosts = createAsyncThunk("posts/getPosts",async (_,{getState})=>{
    //! awel tare2a
    const state:any = getState()
    const token = state.userReducer.token
    const options = {
        url:"https://linked-posts.routemisr.com/posts?limit=50",
        method: 'GET',
        headers:{
            //! tany tre2a
            token: localStorage.getItem("token")
        }
    }
    const {data } = await axios.request(options)
    return data.posts
})
export const getUserPosts = createAsyncThunk("posts/getUserPosts",async (userId:string,{getState})=>{
    //! awel tare2a
    const state:any = getState()
    const token = state.userReducer.token
    const options = {
        url:`https://linked-posts.routemisr.com/users/${userId}/posts?limit=50`,
        method: 'GET',
        headers:{
            //! tany tre2a
            token,
        }
    }
    const {data } = await axios.request(options)
    return data.posts
})
export const getPostDetails = createAsyncThunk("posts/getPostDetails",async (id:string)=>{
    const options = {
        url:`https://linked-posts.routemisr.com/posts/${id}`,
        method: 'GET',
        headers:{
            //! tany tre2a
            token: localStorage.getItem("token")
        }
    }
    const {data } = await axios.request(options)
    return data.post
})
export const deletePost = createAsyncThunk("posts/deletePost",async (id:string)=>{
    toastId= toast.loading("Deleting...")
    const options = {
        url:`https://linked-posts.routemisr.com/posts/${id}`,
        method: 'DELETE',
        headers:{
            //! tany tre2a
            token: localStorage.getItem("token")
        }
    }
    const {data } = await axios.request(options)
    if(data.message==="success"){
        toast.dismiss(toastId)
        toast.success("Post deleted successfully")
    }
})


const PostSlice= createSlice({
    name: 'posts',
    //* lazm ageb no3 el init shkl el type y3ny 
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts=action.payload
        })
        builder.addCase(getPosts.rejected, () => {
        })
        builder.addCase(getUserPosts.fulfilled, (state, action) => {
            state.posts=action.payload
        })
        builder.addCase(getUserPosts.rejected, () => {
        })
        builder.addCase(getPostDetails.fulfilled, (state, action) => {
            state.postDetails=action.payload
        })
        builder.addCase(getPostDetails.rejected, () => {
        })
        builder.addCase(deletePost.fulfilled, () => {
        })
        builder.addCase(deletePost.rejected, () => {
        })
    }
})
//* lazm a3ml export le el reducer 34an a3rf a7oto fe el store
export const PostReducer = PostSlice.reducer