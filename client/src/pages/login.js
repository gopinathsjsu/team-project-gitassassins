import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'    
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

//redux
import {connect} from 'react-redux'
import axios from 'axios'
import { LOGIN_USER } from '../redux/types'
import store from '../redux/store'

const styles = (theme) => ({
    ...theme.spread,
    text1 : {
        fontSize : '30px',
        marginTop : '100px',
        fontWeight : '600'
    },
    text2 : {
        fontSize : '20px',
        marginTop : '12px'
    },
    create : {
        color : '#3FC060',
        textDecoration : 'none', 
        marginLeft :'10px',
        fontSize : '15px',
    },
    new : {
        textDecoration : 'none', 
        fontSize : '15px',
    }, 
    textField : {
        marginTop : '10px',
    },
    text3 : {
        marginTop : '10px'
    },
    errors : {
        fontSize : '14px',
        color : "red"
    },
    button : {
        padding : '10px 190px',
        cursor : 'pointer',
        color : 'white',
        marginTop : '20px',
        marginBottom : '40px',
        textTransform : 'capitalize',
        fontFamily: 'Bebas Neue',
        fontWeight : '600',
        fontSize : '20px',
        backgroundColor : 'black',
        borderRadius : '10px'
    }
})

class login extends Component {
    
    state = {
        email : '',
        password : ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        var newUser = {
            email : this.state.email,
            password : this.state.password
        }

        axios.post(`/customer/login`, newUser)
            .then(res => {
                console.log('login customer'+JSON.stringify(res.data))
                store.dispatch({
                    type : LOGIN_USER,
                    payload : res.data
                })

                this.props.history.push('/')
        })
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container direction="row">
                <Grid item sm={4}>
                </Grid>

                <Grid item sm={4}>
                    <Grid item sm={12} className={classes.text1}>
                        Welcome back
                    </Grid>

                    <Grid item sm={12} className={classes.text2}>
                        Log in with your email address.
                    </Grid>
                    
                    <form noValidate onSubmit ={this.handleSubmit }>
                        <TextField 
                            id ="email" 
                            name="email" 
                            placeholder="Email" 
                            type="email"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.email} 
                            onChange= {this.handleChange} fullWidth 
                        />

                        <TextField 
                            id ="password" 
                            name="password" 
                            placeholder="Password" 
                            type="password"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.password} 
                            onChange= {this.handleChange} fullWidth 
                        />

                        <div role="button" onClick={this.handleSubmit} className={classes.button}>
                            {/* <Link to="/" style={{textDecoration: 'none'}}> */}
                                <div className={classes.checkout}  style={{color: 'white'}}>Login</div>
                            {/* </Link> */}
                        </div>

                        {/* <Typography className={classes.errors}>
                            {this.props.errors.loginError ? this.props.errors.loginError : ''}
                        </Typography> */}

                        <Typography type="submit" className={classes.text3}>
                            <span className={classes.new} >
                                New to Marriot hotels? 
                            </span>
                            <Typography className={classes.create} component = {Link} to="/signup" >
                                Create an account
                            </Typography>
                        </Typography>

                        <Typography type="submit" className={classes.text3}>
                            <span className={classes.new} >
                                Are you an admin?
                            </span>
                            <Typography className={classes.create} component = {Link} to="/hotelLogin" >
                                Login here
                            </Typography>
                        </Typography>

                    </form>
                </Grid>

                <Grid item sm={4}>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
})

export default connect(mapStateToProps, {} )(withStyles(styles)(login))