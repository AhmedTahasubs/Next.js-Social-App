'use client'
import { useAppDispatch } from '@/hooks/store.hooks';
import { login } from '@/store/slices/user.slice';
import { Box, Button, Container, Paper, TextField } from '@mui/material'
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
export default function page() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      },
      onSubmit: (values)=>{
        dispatch(login(values)).then((res)=>{
          if(res.payload.message ==="success"){
            setTimeout(() => {
              router.push("/")
            }, 1000);
          }
        })
      },
        });

  return (
    <>
      <Container>
        <Box sx={{maxWidth:"sm",mx:"auto",mt:5,}}>
          <Paper elevation={10} sx={{p:4}}>
            <form onSubmit={formik.handleSubmit}  className='space-y-3'>
              <TextField label="Email" required type='email' name='email' onChange={formik.handleChange} autoComplete='email' value={formik.values.email}  variant='outlined' fullWidth sx={{}}/>
              <TextField label="Password" required type='password' name='password' onChange={formik.handleChange} autoComplete='password' value={formik.values.password}  variant='outlined' fullWidth sx={{}}/>
              <Button type='submit' variant='contained' fullWidth>Login</Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  )
}
