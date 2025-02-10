'use client'
import Loading from '@/components/Loading/Loading';
import PostCard from '@/components/PostCard/PostCard';
import PostForm from '@/components/PostForm/PostForm';
import { useAppDispatch, useAppSelector } from '@/hooks/store.hooks';
import { getPosts, getUserPosts } from '@/store/slices/posts.slice';
import Grid from '@mui/material/Grid2';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getData } from '@/store/slices/user.slice';
import { Box, Container, Paper } from '@mui/material';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
export default function Profile() {
  const router = useRouter()
  const token = useAppSelector((store)=> store.userReducer.token)
   let x:any;
  if(token){
    x = jwtDecode<JwtPayload>(token); // Returns with the JwtPayload type 
    }    
    //* 34an ageb el posts lazm useAppSelector
  const posts = useAppSelector((store)=>store.PostReducer.posts)
  const dispatch = useAppDispatch()
  const user = useAppSelector((store)=>store.userReducer.user)  
  useEffect(()=>{
    if(token==null){
      router.push("/login")
    }else{
        dispatch(getUserPosts(x.user))
        dispatch(getData())    }
  },[])
  return (
    <>
    <Grid container>
    <Grid size={1}></Grid>
    <Grid size={10} sx={{my:2}}>
    <Container>
        <Box sx={{ maxWidth: "sm", mx: "auto", my: 5,textAlign:"center" }}>
          <ProfileCard/>
          <img src={user?.photo} className='w-56 h-56 rounded-full object-cover mx-auto' alt="Profile Picture" />
          <h2 className='font-bold text-blue-700 text-4xl'>{user?.name}</h2>
        </Box>
      </Container>
      <PostForm/>
      {posts?posts.map((post)=><PostCard key={post._id}  postInfo={post}/>):<Loading/>}
    </Grid>
    <Grid size={1}></Grid>
    </Grid>
    </>
  );
}
