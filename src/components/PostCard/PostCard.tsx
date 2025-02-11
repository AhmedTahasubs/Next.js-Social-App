"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { Post } from "@/types/posts.types";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import CommentCard from "../CommentCard/CommentCard";
import { Box, Button, Divider, Menu, MenuItem, styled, TextField } from "@mui/material";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { deletePost } from "@/store/slices/posts.slice";
import { addComment } from "@/store/slices/comment.slice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Button as Btn, Modal } from "flowbite-react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
export default function PostCard({
  postInfo,
  showAllComments = false,
}: {
  postInfo: Post;
  showAllComments?: boolean;
}) {
  const [openModal, setOpenModal] = React.useState(false);
  const token = useAppSelector((store) => store.userReducer.token);
  let x: any;
  if (token) {
    x = jwtDecode<JwtPayload>(token); // Returns with the JwtPayload type
  }
  let toastId: string;
  const [comment, setComment] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
    const [postValue, setPostValue] = React.useState(postInfo.body);
  const pathName = usePathname()
      const postContentRef = React.useRef(postInfo.body);
      const postFileRef = React.useRef(postInfo.image);
      const newPostContentRef = React.useRef<HTMLInputElement>(null);
      const newPostFileRef = React.useRef<HTMLInputElement>(null);

      const router = useRouter()
     async function editPost() {
      toastId = toast.loading("Editing...");
      // //* hna ana bgeb el value 34an da input
      const newContent:any = newPostContentRef.current?.value || postContentRef.current;
      // //* lkn hna zy el crud lazm a3ml files?.[0] 34an ygeb awl file we lazm ykon fe file asln
      const newFile:any = newPostFileRef.current?.files?.[0] || postFileRef.current; 

      const newPostDate = new FormData();
      newPostDate.append("body", newContent);
      if (newFile) {
        newPostDate.append("image", newFile);
      }
      const options = {
        url: `https://linked-posts.routemisr.com/posts/${postInfo._id}`,
        method: "PUT",
        headers: {
          token,
        },
        data: newPostDate,
      };
      try {
        const { data } = await axios.request(options);
        if (data.message === "success") {
          toast.success("Edited Successfully");
        }
        else{
          toast.error("Failed to Edit");
        }
      }finally {
        toast.dismiss(toastId);
        window.location.reload();
      }
    }
  const isMenuOpen = Boolean(anchorEl);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {postInfo.user._id===x.user?<MenuItem
        onClick={() => {
          handleMenuClose();
          setOpenModal(true);
        }}
      >
        Edit
      </MenuItem>:null}
           

      {pathName===`/post/${postInfo._id}`?null:
     <Link href={`/post/${postInfo._id}`}>
        <MenuItem
          onClick={() => {
            handleMenuClose();
          }}
        >
          Show Post
        </MenuItem>
        </Link>
        } 
        {
          postInfo.user._id===x.user?<MenuItem
          onClick={() => {
            dispatch(deletePost(postInfo?._id));
            handleMenuClose()
            setTimeout(() => {
              if(pathName===`/post/${postInfo._id}`)
              {
                router.push("/profile")
              }
              else {
                location.reload()
              }
            }, 1000);
          }}
        >
          Delete
        </MenuItem>:null
        }
    </Menu> 
    
  );
  return (<>
    
      <Card sx={{ maxWidth: "75%", mx: "auto", mt: 2, p: 2 }}>
        <CardHeader
          avatar={
            <Image
              src={postInfo?.user?.photo}
              alt={`${postInfo?.user?.name} Profile Image`}
              width={50}
              className="object-cover rounded-full"
              height={50}
            />
          }
          action={
          <IconButton
                size="large"
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                aria-label="settings"
              >
                <MoreVertIcon />
              </IconButton>
            }
            
          title={postInfo?.user?.name}
          subheader={new Date(postInfo.createdAt).toDateString()}
        />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {postInfo?.body}
        </Typography>
        {postInfo?.image && (
          <CardMedia
            component="img"
            image={postInfo.image}
            alt="Paella dish"
            height="50%"
          />
        )}
        <CardContent></CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton aria-label="Like">
            <ThumbUpIcon />
          </IconButton>
          <IconButton aria-label="comment">
            <CommentIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <Divider sx={{ my: 2 }}>Comments</Divider>
        {postInfo.comments.length > 0 && !showAllComments && (
          <CommentCard commentInfo={postInfo.comments[0]} />
        )}
        {postInfo.comments.length >= 1 &&
          showAllComments &&
          postInfo.comments.map((comment) => (
            <CommentCard key={comment._id} commentInfo={comment} />
          ))}
        {!showAllComments && postInfo.comments.length > 0 && (
          <Link
            href={`/post/${postInfo._id}`}
            onClick={() => {
              if (window.localStorage.getItem("token") == null) {
                window.location.reload();
              }
            }}
          >
            <Button fullWidth variant="contained" sx={{ mb: 2 }}>
              Show more comments
            </Button>
          </Link>
        )}
        <div className="relative">
          <TextField
            fullWidth
            placeholder="Add a comment"
            inputRef={inputRef}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button
            variant="contained"
            sx={{ position: "absolute", right: 0, top: 0, bottom: 0 }}
            onClick={() => {
              dispatch(addComment({ post: postInfo._id, content: comment }));
            }}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </div>
      </Card>
      {renderMenu}

      {/* Main modal */}
      <Modal dismissible show={openModal} onClose={() => {
        setOpenModal(false)
        setPostValue(postInfo.body)
        }}>
        <Modal.Header>Edit Post</Modal.Header>
        <Modal.Body>
        <TextField
          multiline
          fullWidth
          minRows={4}
          variant="outlined"
          placeholder="What's on your mind"
          inputRef={newPostContentRef}
          value={postValue}
          onChange={(e)=>{setPostValue(e.target.value)}}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput type="file"
             ref={newPostFileRef}
              />
          </Button>
        </Box>
          
        </Modal.Body>
        <Modal.Footer>
          <Btn onClick={() =>
            {
              setOpenModal(false)
              editPost()
              }}>Edit</Btn>
          <Btn color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Btn>
        </Modal.Footer>
      </Modal>
      </>
  );
}
