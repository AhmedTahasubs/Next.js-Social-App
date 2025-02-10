"use client";
import { useAppDispatch } from "@/hooks/store.hooks";
import { login, signUp } from "@/store/slices/user.slice";
import { Box, Button, Container, Paper, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import React from "react";
export default function page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required.")
      .min(3, "Name must be more than 3 letters.")
      .max(10, "Name must be less than 10 letters")
      .matches(
        /^[A-Za-z]+(?:[-'\s][A-Za-z]+)*$/,
        "Invalid characters in name."
      ),
    email: yup
      .string()
      .required("Email is required.")
      .email("Invalid email format."),
    password: yup
      .string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?]{8,}$/,
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character."
      ),
    rePassword: yup
      .string()
      .required("Both password fields are required.")
      .oneOf([yup.ref("password")], "Passwords do not match."),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },

    onSubmit: (values) => {
      dispatch(signUp(values))
        .then((res) => {
          if (res.payload.message === "success") {
            setTimeout(() => {
              router.push("/login");
            }, 1000);
          }
        })
        .catch((error) => {
        });
    },
    validationSchema,
  });
  
  return (
    <>
      <Container>
        <Box sx={{ maxWidth: "sm", mx: "auto", my: 5 }}>
          <Paper elevation={10} sx={{ p: 4 }}>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-3 flex flex-col"
            >
              <TextField
                label="Name"
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
                value={formik.values.name}
                variant="outlined"
                fullWidth
                sx={{}}
                required
              />
              {formik.errors.name && formik.touched.name ? (
                <p className="text-red-600">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i>
                  {formik.errors.name}
                </p>
              ) : null}
              <TextField
              onBlur={formik.handleBlur}
                required
                label="Email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                autoComplete="email"
                value={formik.values.email}
                variant="outlined"
                fullWidth
                sx={{}}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="text-red-600">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i>
                  {formik.errors.email}
                </p>
              ) : null}
              <TextField
              onBlur={formik.handleBlur}
                required
                label="Password"
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
                label="Confirm Password"
                onBlur={formik.handleBlur}
                type="password"
                name="rePassword"
                onChange={formik.handleChange}
                autoComplete="password"
                value={formik.values.rePassword}
                variant="outlined"
                fullWidth
                sx={{}}
              />
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <p className="text-red-600">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i>
                  {formik.errors.rePassword}
                </p>
              ) : null}
              <div className="w-1/2 ">
                <label
                  htmlFor="datepicker"
                  className="text-sm font-normal text-[#00000099]"
                >
                  Enter Your Birthdate
                </label>
                <input
                  name="dateOfBirth"
                  required
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  id="datepicker"
                  type="date"
                  className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                  placeholder="Select date"
                />
              </div>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    required
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    required
                  />
                </RadioGroup>
              </FormControl>

              <Button type="submit" variant="contained" fullWidth>
                Sign Up
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
