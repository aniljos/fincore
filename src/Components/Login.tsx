import React, { Component } from 'react';
import { withStyles, StyleRulesCallback, LinearProgress, Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from 'react-router-dom';
import {withRouter} from 'react-router';


interface LoginProps {
    classes: any;
}
//const styles: StyleRulesCallback = (theme) => ({
const styles: StyleRulesCallback<Theme, LoginProps> = (theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(/finacus.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    msgpaper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "crimson"
    },
});



class Login extends Component<RouteComponentProps<LoginProps>>{

    userNameRef: any;
    passwordRef: any;

    state ={
        userNameError: false,
        passwordError: false,
        invalid: false,
        userName : "admin",
        password: "admin",
        validating: false
    }

    login = () => {
        
        const userNameError = !this.userNameRef.value;
        const passwordError = !this.passwordRef.value;
        if(userNameError || passwordError){
            this.setState({
                userNameError: userNameError,
                passwordError: passwordError
            })
            return;
        }
        else{
            if(this.userNameRef.value === "admin" && this.passwordRef.value === "admin"){

                this.setState({
                    validating: true
                })
                setTimeout(() => {
                    this.setState({
                        validating: false
                    })
                    this.props.history.push("/home");
                }, 1000);

                
            }
            else{
                this.setState({
                    invalid: true
                })
            }
        }
    }
    onUserNameChange = (evt) => {
        this.setState({
            userNameError: false,
            userName: evt.target.value
        })
    }
    onPasswordChange = (evt) => {
        this.setState({
            passwordError: false,
            password: evt.target.value
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} >
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Typography hidden={!this.state.invalid} style={{textAlign: 'left', color: 'red'}}>
                            Invalid Credentials
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                error={this.state.userNameError}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="Username"
                                autoFocus
                                inputRef={ref => this.userNameRef=ref}
                                onChange={this.onUserNameChange}
                                value={this.state.userName}
                            />
                            <TextField
                                error={this.state.passwordError}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                inputRef={ref => this.passwordRef=ref}
                                onChange={this.onPasswordChange}
                                value={this.state.password}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.login}
                            >
                                Login
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Paper hidden={!this.state.validating} className={classes.msgpaper}>
                                        <Typography>
                                            Validating. Please Wait..
                                        </Typography>
                                        <LinearProgress color="primary"/>
                                    </Paper>
                                </Grid>
                                {/* <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid> */}
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(withStyles(styles)(Login));