import { useState, useContext } from 'react';

import { Box, TextField, Button, styled, Typography } from '@mui/material';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 5px rgb(0 0 0/ 0.6);
`

const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Text = styled(Typography)`
    color: #878787;
`

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}

const loginInitialValues = {
    username: '',
    password: ''
}

const Login = ({ isUserAuthenticated }) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png'

    const [account, toggleAccount] = useState('signup');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'login' ? toggleAccount('signup') : toggleAccount('login')
    }

    const onSignupInputChange = async(e) => {
        console.log('fieldname: ', e.target.name);
        console.log('fieldname: ', e.target.value);
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const onLoginInputChange = async(e) => {
        console.log('fieldname: ', e.target.name);
        console.log('fieldname: ', e.target.value);
        setLogin({...login, [e.target.name]: e.target.value });
    }

    const signupUser = async() => {
        const response = await API.userSignup(signup);
        if(response.isSuccess){
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            setError('Something went wrong! Please try again.');
        }
    }

    const loginUser = async() => {
        const response = await API.userLogin(login);
        if(response.isSuccess){
            setError('');
            sessionStorage.setItem('accessToken', 'Bearer ' + response.data.accessToken);
            sessionStorage.setItem('refreshToken', 'Bearer ' + response.data.refreshToken);

            setAccount({ username: response.data.username, name: response.data.name})

            isUserAuthenticated(true);

            navigate('/');
        } else {
            setError('Something went wrong! Please try again.');
        }
    }

    return (
        <Component>
            <Image src={imageURL} alt="login" />
            {
                account === 'login' ?
                    <Wrapper>
                        <TextField id="username" value={login.username} name="username" onChange={(e) => onLoginInputChange(e)} label="Enter Username" variant="standard" />
                        <TextField id="password" value={login.password} name="password" onChange={(e) => onLoginInputChange(e)} label="Enter Password" variant="standard" type={'password'} />
                        { error && <Error>{error}</Error>}
                        <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                        <Text style={{ textAlign: ' center' }}>OR</Text>
                        <SignupButton variant="text" onClick={() => toggleSignup()}>Create an account</SignupButton>
                    </Wrapper>
                    :
                    <Wrapper>
                        <TextField id="name" name='name' onChange={(e) => onSignupInputChange(e)} label="Enter Name" variant="standard" />
                        <TextField id="username" name='username' onChange={(e) => onSignupInputChange(e)} label="Enter Username" variant="standard" />
                        <TextField 
                            id="password" 
                            onChange={(e) => onSignupInputChange(e)} 
                            label="Enter Password" 
                            variant="standard" 
                            type={'password'} 
                            name='password'
                        />
                        { error && <Error>{error}</Error>}
                        <SignupButton onClick={() => signupUser()} variant="text">Signup</SignupButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                    </Wrapper>
            }

        </Component>
    )
}

export default Login;