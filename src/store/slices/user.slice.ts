"use client"
import { userType } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';
let toastId:string;
const initialState:userType = {
    token:window.localStorage.getItem("token"),      
    user: null,
}
//* ht3aml m3 api lazm a3ml el createAsyncThunk we 34an el login hy8yr fe state fe ely hy8yro hwa el reducers aw
//* el extra reducers we lazm nst2blha fe variable 34an n7oto fe el extra reducers
//* we lazm a3ml no3 el values ely hwa el email we el password no3hom eh
//* 3obara 3an object we feh el email we el password string
export const login = createAsyncThunk("user/login",async(values:{email:string,password:string})=>{
    //* el api call
    const options = {
        url:"https://linked-posts.routemisr.com/users/signin",
        method: 'POST',
        data:values,
    }
    toastId = toast.loading("logging in")
    const {data} = await axios.request(options)
    return data
})
export const signUp = createAsyncThunk("user/signUp",async(values:{name:string,email:string,password:string,rePassword:string,dateOfBirth:string,gender:string})=>{
    //* el api call
    const options = {
        url:"https://linked-posts.routemisr.com/users/signup",
        method: 'POST',
        data:values,
    }
    toastId = toast.loading("Signing Up")
    const {data} = await axios.request(options)
    return data
})
export const changePass = createAsyncThunk("user/changePass",async(values:{password:string,newPassword:string},{getState})=>{
    const state:any = getState()
    const token = state.userReducer.token
    //* el api call
    const options = {
        url:"https://linked-posts.routemisr.com/users/change-password",
        method: 'PATCH',
        data:values,
        headers:{
            token,
        }
    }
    
    toastId = toast.loading("Changing Password")
    const {data} = await axios.request(options)
    return data
})
export const getData = createAsyncThunk("user/getDate",async(_,{getState})=>{
    const state:any = getState()
    const token = state.userReducer.token
    //* el api call
    const options = {
        url:"https://linked-posts.routemisr.com/users/profile-data",
        method: 'GET',
        headers:{
            token,
        }
    }
    const {data} = await axios.request(options)
    return data
})
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{},
    //! lazm a7ot el cases
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled,(state,action)=>{
            toast.dismiss(toastId)
            toast.success("Welcome back")
            state.token = action.payload.token
            window.localStorage.setItem("token",action.payload.token)
        })
        builder.addCase(login.rejected,()=>{
            toast.dismiss(toastId)
            toast.error("Incorrect email or password")
            
        })
        builder.addCase(signUp.fulfilled,()=>{
            toast.dismiss(toastId)
            toast.success("Account created successfully")
            
        })
        builder.addCase(signUp.rejected,()=>{
            toast.dismiss(toastId)
            toast.error("User Already Exists")
            
        })
        builder.addCase(changePass.fulfilled,()=>{
            toast.dismiss(toastId)
            toast.success("Password changed successfully")
        })
        builder.addCase(changePass.rejected,()=>{
            toast.dismiss(toastId)
            toast.error("Invalid Entries")
            
        })
        builder.addCase(getData.fulfilled,(state,action)=>{
            state.user=action.payload.user            
        })
        builder.addCase(getData.rejected,()=>{
            
        })
    }
})
export const userReducer = userSlice.reducer;
