import { AppBar, Toolbar, Typography, styled, Link } from '@mui/material';

const Component = styled(AppBar)`
    background-color: #ffffff;
    color: #000000;
`

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: inherit;
        text-decoration: none;
    }
`

const Header = () => {
    return (
        <Component position="static">
            <Container>
                <Link href='/'>HOME</Link>
                <Link href='/about'>ABOUT</Link>
                <Link href='/contact'>CONTACT</Link>
                <Link href='/login'>LOGOUT</Link>
            </Container>
        </Component>
    )
};

export default Header;