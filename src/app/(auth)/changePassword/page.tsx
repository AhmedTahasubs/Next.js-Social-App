"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { changePass, login, signUp } from "@/store/slices/user.slice";
import { Box, Button, Container, Paper, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
export default function page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((store) => store.userReducer.token);
  const validationSchema = yup.object({
    password: yup.string().required("Old Password is required."),
    newPassword: yup.string().required("New Password is required."),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },

    onSubmit: (values) => {
      dispatch(changePass(values))
        .then((res) => {
          if (res.payload.message === "success") {
            setTimeout(() => {
              window.location.reload();
              localStorage.removeItem("token");
              router.push("/login");
            }, 1000);
          }
        })
        .catch((error) => {});
    },
    validationSchema,
  });
  useEffect(() => {
    if (token == null) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Container>
        <Box sx={{ maxWidth: "sm", mx: "auto", mt: 5 }}>
          <Paper elevation={10} sx={{ p: 4 }}>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-3 flex flex-col"
            >
              <TextField
                onBlur={formik.handleBlur}
                required
                label="Old Password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                autoComplete="password"
                value={formik.values.password}
                variant="outlined"
                fullWidth
                sx={{}}
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="text-red-600">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i>
                  {formik.errors.password}
                </p>
              ) : null}
              <TextField
                required
                label="New Password"
                onBlur={formik.handleBlur}
                type="password"
                name="newPassword"
                onChange={formik.handleChange}
                autoComplete="password"
                value={formik.values.newPassword}
                variant="outlined"
                fullWidth
                sx={{}}
              />
              {formik.errors.newPassword && formik.touched.newPassword ? (
                <p className="text-red-600">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i>
                  {formik.errors.newPassword}
                </p>
              ) : null}
              <Button type="submit" variant="contained" fullWidth>
                Confirm
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
