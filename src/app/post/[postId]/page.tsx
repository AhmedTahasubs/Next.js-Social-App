'use client'
import Loading from "@/components/Loading/Loading";
import PostCard from "@/components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { getPostDetails } from "@/store/slices/posts.slice";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
export default function page({params}:{params : Promise<{postId:string}>}) {
    const router = useRouter()
  const token = useAppSelector((store)=> store.userReducer.token)
  if(token==null){
    window.location.reload()
    router.push("/login")
  }
    const {postId} = use(params);
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(getPostDetails(postId))
    },[postId])
    const postDetails = useAppSelector((store)=>store.PostReducer.postDetails)

  return (
    <>
      {postDetails?<PostCard postInfo={postDetails} showAllComments={true}/>:<Loading/>}
    </>
  )
}
