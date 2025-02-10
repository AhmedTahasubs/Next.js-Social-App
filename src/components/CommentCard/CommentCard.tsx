import {
  Box,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import { Comment } from "@/types/posts.types";
import image from "../../../public/user.png";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { deleteComment } from "@/store/slices/comment.slice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Button as Btn, Modal } from "flowbite-react";
import toast from "react-hot-toast";
import axios from "axios";
export default function CommentCard({ commentInfo }: { commentInfo: Comment }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState(commentInfo.content);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const token = useAppSelector((store) => store.userReducer.token);
  let x: any;
  if (token) {
    x = jwtDecode<JwtPayload>(token); // Returns with the JwtPayload type
  }
  const dispatch = useAppDispatch();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  let toastId: string;

  async function editComment() {
    toastId = toast.loading("Editing...");
    // //* hna ana bgeb el value 34an da input
    const options = {
      url: `https://linked-posts.routemisr.com/comments/${commentInfo._id}`,
      method: "PUT",
      headers: {
        token,
      },
      data: {
        content: commentValue,
      },
    };
    try {
      const { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Edited Successfully");
      } else {
        toast.error("Failed to edit");
      }
    } finally {
      toast.dismiss(toastId);
      window.location.reload();
    }
  }

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
      <MenuItem
        onClick={() => {
          handleMenuClose();
          setOpenModal(true);
        }}
      >
        Update
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          dispatch(deleteComment(commentInfo._id));
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
  function handleImagePath(path: string) {
    if (path.includes("undefined")) {
      return image;
    } else {
      return path;
    }
  }
  return (
    <>
      <Box sx={{ bgcolor: "#eee", px: 3, py: 2, borderRadius: "8px", my: 2 }}>
        <CardHeader
          action={
            commentInfo.commentCreator._id === x.user ? (
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
            ) : null
          }
          avatar={
            <Image
              src={handleImagePath(commentInfo.commentCreator.photo)}
              alt={`${commentInfo.commentCreator.name} Profile Image`}
              width={50}
              height={50}
            />
          }
          title={commentInfo.commentCreator.name}
          subheader={new Date(commentInfo.createdAt).toDateString()}
        />
        <Typography component={"p"} sx={{ color: "text.secondary", pl: 5 }}>
          {commentInfo.content}
        </Typography>
      </Box>
      {renderMenu}
      <Modal
        dismissible
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setCommentValue(commentInfo.content);
        }}
      >
        <Modal.Header>Edit Comment</Modal.Header>
        <Modal.Body>
          <TextField
            multiline
            fullWidth
            minRows={4}
            variant="outlined"
            placeholder="What's on your mind"
            // inputRef={newPostContentRef}
            value={commentValue}
            onChange={(e) => {
              setCommentValue(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Btn
            onClick={() => {
              setOpenModal(false);
              editComment();
            }}
          >
            Edit
          </Btn>
          <Btn color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Btn>
        </Modal.Footer>
      </Modal>
    </>
  );
}
