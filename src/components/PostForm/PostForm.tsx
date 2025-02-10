"use client";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppSelector } from "@/hooks/store.hooks";
import React, { useRef} from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function PostForm() {
  const token = useAppSelector((store) => store.userReducer.token);
  const postContentRef = useRef<HTMLInputElement>(null);
  const postFileRef = useRef<HTMLInputElement>(null);
  let toastId: string;
  async function createPost() {
    toastId = toast.loading("Posting...");
    //* hna ana bgeb el value 34an da input
    const content = postContentRef.current?.value || "";
    //* lkn hna zy el crud lazm a3ml files?.[0] 34an ygeb awl file we lazm ykon fe file asln
    const file = postFileRef.current?.files?.[0];    
    const postDate = new FormData();
    postDate.append("body", content);
    if (file) {
      postDate.append("image", file);
    }    
    const options = {
      url: `https://linked-posts.routemisr.com/posts`,
      method: "POST",
      headers: {
        token,
      },
      data: postDate,
    };
    try {
      const { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Posted Successfully");
      }
      else{
        toast.error("Failed to post");
      }
    } finally {
      toast.dismiss(toastId);
      window.location.reload();
    }
  }
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
  return (
    <>
      <Box width="75%" sx={{ mx: "auto" }}>
        <TextField
          multiline
          fullWidth
          minRows={4}
          variant="outlined"
          placeholder="What's on your mind"
          inputRef={postContentRef}
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
            <VisuallyHiddenInput type="file" ref={postFileRef} />
          </Button>
          <Button
            onClick={createPost}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Post
          </Button>
        </Box>
      </Box>
    </>
  );
}
