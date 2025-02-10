"use client";
import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getData } from "@/store/slices/user.slice";
import Loading from "@/components/Loading/Loading";
export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((store) => store.userReducer.user);
  const [image, setImage] = useState<string>("user.png");
  const token = useAppSelector((store) => store.userReducer.token);
  const postFileRef = useRef<HTMLInputElement>(null);
  let toastId: string;
  async function uploadImage() {
    toastId = toast.loading("Uploading...");
    //* lkn hna zy el crud lazm a3ml files?.[0] 34an ygeb awl file we lazm ykon fe file asln
    const file = postFileRef.current?.files?.[0];

    const postDate = new FormData();
    if (file) {
      postDate.append("photo", file);
    }
    const options = {
      url: `https://linked-posts.routemisr.com/users/upload-photo`,
      method: "Put",
      headers: {
        token,
      },
      data: postDate,
    };

    try {
      const { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Changed Successfully");
        router.push("/profile");
      } else {
        toast.error("Failed to Change");
      }
    } finally {
      toast.dismiss(toastId);
    }
  }
  useEffect(() => {
    if (token == null) {
      router.push("/login");
    } else {
      dispatch(getData());
      setImage(`${user?.photo}`);
    }
  }, []);
  return (
    <>
      <Box width="40%" sx={{ mx: "auto", mt: 5 }}>
        {user ? (
          <img
            src={user.photo}
            className="mx-auto w-56 h-56 rounded-full object-cover"
            alt=""
          />
        ) : (
          <Loading />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            flexDirection: "column",
            gap: 2,
          }}
        >
          <div className="flex items-center justify-center w-1/2 mx-auto">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImage(file ? URL.createObjectURL(file) : `${user?.photo}`);
                }}
                ref={postFileRef}
              />
            </label>
          </div>

          <Button
            onClick={uploadImage}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </>
  );
}
