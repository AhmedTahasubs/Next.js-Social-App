import axios from 'axios';
import {commentState } from './../../types/posts.types';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
const initialState: commentState = {
    comments:null
}
let toastId;
//* mmkn ageb el token btre2ten awl haga el local storage aw mn el function
//* eny awl param hwa ely bb3to le el func lma a3mlha call we tany param
//* hwa el store ely gwah el user slice ely gwah el token asln
export const addComment = createAsyncThunk("addComment",async ({post,content}:{post:string,content:string},{getState})=>{
    toastId = toast.loading("Loading...")
    //! awel tare2a
    const state:any = getState()
    const token = state.userReducer.token
    const options = {
        url:`https://linked-posts.routemisr.com/comments`,
        method: 'POST',
        data:{
            content:content,
            post:post
        },
        headers:{
            token
        }
    }
    
    try {
        
        const {data } = await axios.request(options)
        if(data.message==="success"){
            toast.success("Comment Added successfully")
            setTimeout(() => {
                location.reload()
            }, 300);
        }
    } catch (xError) {
        toast.error("Failed to add comment")
    }
    finally{
        toast.dismiss(toastId)
    }
    })
export const deleteComment = createAsyncThunk("deleteComment",async (commentId:string,{getState})=>{
    toastId = toast.loading("Deleting comment...")
    //! awel tare2a
    const state:any = getState()
    const token = state.userReducer.token
    const options = {
        url:`https://linked-posts.routemisr.com/comments/${commentId}`,
        method: 'DELETE',
        headers:{
            token,
        }
    }
    try {
        
        const {data } = await axios.request(options)
        if(data.message==="success"){
            toast.success("Comment deleted successfully")
            setTimeout(() => {
                location.reload()
            }, 300);
        }
    } catch (error) {
        toast.error("Failed to delete comment")

    }
    finally{
        toast.dismiss(toastId)
    }
    })
const PostSlice= createSlice({
    name: 'comments',
    //* lazm ageb no3 el init shkl el type y3ny 
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(deleteComment.fulfilled,()=>{
        })
        builder.addCase(deleteComment.rejected,()=>{
            
        })
    }
})
//* lazm a3ml export le el reducer 34an a3rf a7oto fe el store
export const PostReducer = PostSlice.reducer