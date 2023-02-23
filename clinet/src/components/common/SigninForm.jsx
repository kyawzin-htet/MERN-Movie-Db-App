import {LoadingButton} from '@mui/lab';
import {Alert, Box, Button, Stack, TextField} from '@mui/material';
import {useFormik} from "formik";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from '../../redux/featuers/authModalSlice';
import { setUser } from '../../redux/featuers/userSlice';


const SigninForm = ({switchAuthState}) => {
    const dispatch = useDispatch();

    const [isLoadingRequest, setIsLoadingRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const signinForm = useFormik({
        initialValues:{
            password:"",
            username:""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(8, "username minimum 8 characters").required("username is required"),
            password: Yup.string()
                .min(8, "password minimum 8 characters").required("password is required"),
        }),
        onSubmit: async values =>{
            setErrorMessage(undefined)
            setIsLoadingRequest(true)
            const {response, err} = await userApi.signin(values)
            setIsLoadingRequest(false)

            if(response){
                signinForm.resetForm()
                dispatch(setUser(response))
                dispatch(setAuthModalOpen(false))
                toast.success("Sign in success")
            }

            if(err) setErrorMessage(err.message)
        }
    })
  return (
   <Box component="form" onSubmit={signinForm.handleSubmit}>
        <Stack spacing={3}>
            <TextField
                type="text"
                placeholder='username'
                name="username"
                fullWidth
                value={signinForm.values.username}
                onChange={signinForm.handleChange}
                color="success"
                error={signinForm.touched.username && signinForm.errors.username !== undefined}
                helperText={signinForm.touched.username && signinForm.errors.username}
            />

<           TextField
                type="password"
                placeholder='password'
                name="password"
                fullWidth
                value={signinForm.values.password}
                onChange={signinForm.handleChange}
                color="success"
                error={signinForm.touched.password && signinForm.errors.password !== undefined}
                helperText={signinForm.touched.password && signinForm.errors.password}
            />
        </Stack>

        <LoadingButton
            type="submit"
            fullWidth
            size="large"
            variant="outlined"
            sx={{marginTop:4}}
            loading={isLoadingRequest}
        >
            sign in
        </LoadingButton>

        <Button
            fullWidth
            sx={{marginTop: "1rem"}}
            onClick={() =>switchAuthState()}
        >
            sign up
        </Button>

        {errorMessage && (
            <Box sx={{marginTop: 2}}>
                <Alert severity='error' variant='outlined'>{errorMessage}</Alert>
            </Box>
        )}
   </Box>
  )
}

export default SigninForm