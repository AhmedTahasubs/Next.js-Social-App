'use client'
import Loading from '@/components/Loading/Loading';
import PostCard from '@/components/PostCard/PostCard';
import PostForm from '@/components/PostForm/PostForm';
import { useAppDispatch, useAppSelector } from '@/hooks/store.hooks';
import { getPosts } from '@/store/slices/posts.slice';
import Grid from '@mui/material/Grid2';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import "flowbite"
export default function Home() {
  const router = useRouter()
  const token = useAppSelector((store)=> store.userReducer.token)
  
    //* 34an ageb el posts lazm useAppSelector
  const posts = useAppSelector((store)=>store.PostReducer.posts)
  const dispatch = useAppDispatch()
  useEffect(()=>{
    if(token==null){
      router.push("/login")
    }
    dispatch(getPosts())
  },[])
  return (
    <>
    <Grid container>
    <Grid size={1}></Grid>
    <Grid size={10} sx={{mt:2}}>
      <PostForm/>
      {posts?posts.map((post)=><PostCard key={post._id}  postInfo={post}/>):<Loading/>}
    </Grid>
    <Grid size={1}></Grid>
    </Grid>
    </>
  );
}
