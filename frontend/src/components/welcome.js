import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
//import ps from '../illustrations/ps.svg';
import welcome1 from '../illustrations/welcome-1.svg';
// import  Container  from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


const color = '#bf2604';

const useStyles = makeStyles(theme => ({
    btn: {
        border: `2 px solid ${color}`,
        backgroundColor: color,
        color: 'white',
        '&:hover': {
            backgroundColor: color
        }
    }
}))

const Welcome = (props) => {

    const classes = useStyles();
    const handleClick = () => {
        return props.history.push('/auth/signup');
    }
    return (
        <>
            <br />

            <Grid container spacing={4}>
                <Grid item xs>
                    <img src={welcome1} />
                </Grid>
                <Grid item xs>
                    <Typography variant='h3'
                        style={{ fontWeight: '700' }}>
                        <br />
            A place for all your society related matters
            
         </Typography>
                    <Typography variant='h6'>
                        <br />
           Join now to stay connected with your society and it's important matters. <br />
             Get better at maintaining managerial tasks <br /> with our easy to use society ecosystem features.
         </Typography>
                    <br />
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleClick}
                        className={classes.btn}
                    >
                        Get started
          </Button>
                </Grid>

            </Grid>


            <footer>

                <small style={{ fontFamily: 'Roboto' }}>Copyright &copy;  {new Date().getFullYear()} <Link color='inherit' href='/'>Society+ | </Link> <Link color='inherit' href='/'>Terms  </Link>
         | <Link color='inherit' href='/'> Privacy</Link></small>



            </footer>
        </>
    )
}

export default withRouter(Welcome);
